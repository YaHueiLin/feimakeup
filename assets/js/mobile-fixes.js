// Mobile compatibility helpers (kept minimal to avoid interfering with scrolling)
(function(){
  // Minimal object-fit fallback for very old browsers
  if (!('objectFit' in document.documentElement.style)) {
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('img[data-object-fit="cover"]').forEach(function(img){
        var p = img.parentNode; if (!p) return;
        img.style.display = 'none';
        p.style.background = 'center/cover no-repeat url(' + img.src + ')';
      });
    });
  }

  // iOS visual viewport height fix (no global touchmove prevention)
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  function setVH(){
    var h = (window.visualViewport ? Math.round(window.visualViewport.height) : window.innerHeight) || window.innerHeight;
    var vh = h * 0.01; document.documentElement.style.setProperty('--vh', vh + 'px');
  }
  if (isIOS) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setVH, { once: true });
    } else {
      setVH();
    }
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', function(){ setTimeout(setVH, 200); });
    if (window.visualViewport) window.visualViewport.addEventListener('resize', setVH);
    // Ensure inputs remain visible when keyboard opens
    document.addEventListener('focusin', function(e){
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) {
        setTimeout(function(){ try { e.target.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch(_){} }, 150);
      }
    });
  }
})();
