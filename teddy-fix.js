/* TeddyPups-Clone patch: drive the "Meet the pups" walking dog with vanilla JS.
   The original (minified React) engine leaves .tp-meet__teddy invisible and never
   animates it on a static deploy, so this takes over that one element only. */
(function () {
  function init() {
    var teddy = document.querySelector('.tp-meet__teddy');
    if (!teddy) return;
    var buddy = teddy.querySelector('.pup-buddy');
    if (buddy) buddy.style.visibility = 'visible';

    var section = teddy.closest('section') || document.body;
    var ticking = false;

    function update() {
      ticking = false;
      var r = section.getBoundingClientRect();
      var vh = window.innerHeight || 800;
      var vw = window.innerWidth || 1200;

      // Scroll progress through the section: 0 as it enters, 1 as it leaves.
      var total = r.height + vh;
      var p = (vh - r.top) / total;
      p = Math.max(0, Math.min(1, p));

      var inView = r.top < vh * 0.85 && r.bottom > vh * 0.15;
      if (inView) {
        // Walk from the left edge of the floor to the right as you scroll.
        // p ~ 0.15 -> x = -12vw (enters), p ~ 0.85 -> x = +38vw (exits right).
        var x = (p - 0.15) / 0.7; // 0..1 across the visible pass
        x = Math.max(-0.25, Math.min(1.15, x));
        var px = (x * 0.5 - 0.12) * vw;
        teddy.style.transform = 'translateX(' + px.toFixed(1) + 'px)';
        teddy.classList.add('teddy-walking');
      } else {
        teddy.classList.remove('teddy-walking');
      }
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
