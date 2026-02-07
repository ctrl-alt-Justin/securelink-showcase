(() => {
  const device = document.getElementById('device');
  const svg = device && device.querySelector('.device-svg');
  const dynamic = document.querySelector('.dynamic-bg');

  // Device tilt interaction
  if (device && svg) {
    device.addEventListener('mousemove', (e) => {
      const rect = device.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = y * 6; // tilt
      const ry = x * -12; // rotate
      svg.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    });
    device.addEventListener('mouseleave', () => {
      svg.style.transform = '';
    });
  }

  // Dynamic background subtle parallax
  if (dynamic && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    let lastX = 0, lastY = 0;
    window.addEventListener('pointermove', (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 10; // range -5..5
      const ny = (e.clientY / window.innerHeight - 0.5) * 10;
      // smooth
      lastX += (nx - lastX) * 0.08;
      lastY += (ny - lastY) * 0.08;
      dynamic.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`;
    });
  }

  // Hero scroll parallax: move device slightly on scroll
  const hero = document.getElementById('hero');
  const deviceImg = document.querySelector('.device-img');
  if (hero && deviceImg) {
    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      const pct = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);
      const translateY = (1 - pct) * 18; // move up as user scrolls down
      const scale = 1 - (1 - pct) * 0.02;
      deviceImg.style.transform = `translateY(${translateY}px) scale(${scale})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Modal open/close
  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-modal');
      const modal = document.getElementById(id);
      if (modal) {
        modal.removeAttribute('hidden');
        // focus first interactive
        const focusable = modal.querySelector('a,button');
        if (focusable) focusable.focus();
      }
    });
  });

  // close modal when clicking backdrop or close button or Esc
  document.addEventListener('click', (e) => {
    if (e.target.matches('.modal-backdrop') || e.target.matches('.modal-close') || e.target.closest('.modal-close')) {
      const modal = e.target.closest('.modal');
      if (modal) modal.setAttribute('hidden', '');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.setAttribute('hidden', ''));
    }
  });
})();

// Set download links to GitHub Release asset if configured
(function(){
  const meta = document.querySelector('meta[name="github-release-download"]');
  const releaseUrl = meta ? meta.getAttribute('content') : null;
  document.querySelectorAll('a.download-asset').forEach(a => {
    const fallback = a.getAttribute('data-fallback');
    if (releaseUrl && !releaseUrl.includes('OWNER/REPO')) {
      a.setAttribute('href', releaseUrl);
    } else if (fallback) {
      a.setAttribute('href', fallback);
    }
  });
})();

