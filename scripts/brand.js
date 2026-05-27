(function () {

  /* ─── 1. CSS ─────────────────────────────────────────────────── */
  const css = `
    :root {
      --wdk-pink:  #C22076;
      --wdk-pink-bg: rgba(194,32,118,0.08);
    }

    /* Headings — always dark, never brand-colored */
    h1, h2, h3, h4, h5, h6 {
      color: #111827 !important;
    }
    .dark h1, .dark h2, .dark h3,
    .dark h4, .dark h5, .dark h6 {
      color: #f9fafb !important;
    }

    /* Inline code */
    code:not(pre code) {
      background: var(--wdk-pink-bg) !important;
      color: var(--wdk-pink) !important;
      border-radius: 4px !important;
      padding: 1px 6px !important;
    }

    /* Sidebar group title — add chevron indicator */
    nav.space-y-8 > div > p[title] {
      cursor: pointer !important;
      user-select: none !important;
      justify-content: space-between !important;
    }
    nav.space-y-8 > div > p[title]::after {
      content: '▾';
      font-size: 11px;
      opacity: 0.45;
      transition: transform 0.2s ease;
      flex-shrink: 0;
      margin-left: auto;
      padding-left: 4px;
    }
    nav.space-y-8 > div > p[title].wdk-closed::after {
      transform: rotate(-90deg);
    }

    /* Collapsed state for group pages list */
    nav.space-y-8 > div > ul.wdk-hidden {
      display: none !important;
    }
  `;

  function injectStyles() {
    if (document.getElementById('wdk-brand')) return;
    const s = document.createElement('style');
    s.id = 'wdk-brand';
    s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ─── 2. COLLAPSIBLE SIDEBAR ────────────────────────────────── */
  function initCollapsible() {
    // The sidebar nav is: <nav class="space-y-8 py-1">
    const nav = document.querySelector('nav.space-y-8');
    if (!nav) return;

    // Each group is a <div class="space-y-0"> direct child of nav
    const groups = nav.querySelectorAll(':scope > div');
    groups.forEach(group => {
      // Group title: <p title="Group Name" ...>
      const titleEl = group.querySelector(':scope > p[title]');
      // Pages list: <ul class="space-y-0">
      const pagesList = group.querySelector(':scope > ul');

      if (!titleEl || !pagesList) return;
      if (titleEl.dataset.wdkInit) return;
      titleEl.dataset.wdkInit = '1';

      // Check if this group has the currently active page
      // Active page link has class "bg-brand/10" or "border-brand"
      const hasActive = pagesList.querySelector('a.bg-brand\\/10, a[class*="bg-brand"]');

      // Collapse all groups except the active one
      if (!hasActive) {
        pagesList.classList.add('wdk-hidden');
        titleEl.classList.add('wdk-closed');
      }

      // Toggle on click
      titleEl.addEventListener('click', function () {
        const isHidden = pagesList.classList.contains('wdk-hidden');
        if (isHidden) {
          pagesList.classList.remove('wdk-hidden');
          titleEl.classList.remove('wdk-closed');
        } else {
          pagesList.classList.add('wdk-hidden');
          titleEl.classList.add('wdk-closed');
        }
      });
    });
  }

  /* ─── 3. BOOT ───────────────────────────────────────────────── */
  function run() {
    injectStyles();
    // Wait for React to hydrate the sidebar
    setTimeout(initCollapsible, 800);
    setTimeout(initCollapsible, 1800); // retry for slow loads
  }

  run();

  // Re-run on SPA route changes
  let lastPath = location.pathname;
  new MutationObserver(() => {
    injectStyles();
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      setTimeout(initCollapsible, 800);
    }
  }).observe(document.documentElement, { childList: true, subtree: true });

})();
