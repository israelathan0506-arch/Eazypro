
(function(){
  const site = document.getElementById('site');
  const toggle = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');
  const STORAGE_KEY = 'site.sidebar.collapsed';
  const MOBILE_BREAKPOINT = 900;

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  // Initialize from localStorage
  function init() {
    const collapsed = localStorage.getItem(STORAGE_KEY) === 'true';
    if (collapsed && !isMobile()) {
      site.classList.add('collapsed');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      site.classList.remove('collapsed');
      toggle.setAttribute('aria-expanded', 'true');
    }
  }

  toggle.addEventListener('click', () => {
    if (isMobile()) {
      // mobile: toggle off-canvas open state
      const open = site.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(open));
    } else {
      // desktop: toggle collapsed docked state
      const collapsed = site.classList.toggle('collapsed');
      toggle.setAttribute('aria-expanded', String(!collapsed));
      // store preference (only for desktop mode)
      localStorage.setItem(STORAGE_KEY, collapsed ? 'true' : 'false');
    }
  });

  // Close off-canvas sidebar when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (!isMobile()) return;
    if (!site.classList.contains('menu-open')) return;
    const inside = sidebar.contains(e.target) || toggle.contains(e.target);
    if (!inside) {
      site.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // keyboard: ESC closes mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (site.classList.contains('menu-open')) {
        site.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Keep state coherent on resize
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      site.classList.remove('menu-open');
    }
    // re-initialize collapsed state on crossing breakpoint
    init();
  });

  init();
})();