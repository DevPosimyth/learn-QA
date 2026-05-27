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

    /* Sidebar group title — layout */
    nav.space-y-8 > div > p[title] {
      cursor: pointer !important;
      user-select: none !important;
      display: flex !important;
      align-items: center !important;
      gap: 7px !important;
    }

    /* Group icon */
    .wdk-group-icon {
      flex-shrink: 0;
      width: 15px;
      height: 15px;
      opacity: 0.75;
    }

    /* Chevron arrow */
    .wdk-chevron {
      flex-shrink: 0;
      margin-left: auto;
      width: 14px;
      height: 14px;
      opacity: 0.55;
      transition: transform 0.2s ease;
    }
    nav.space-y-8 > div > p[title].wdk-closed .wdk-chevron {
      transform: rotate(-90deg);
    }

    /* Collapsed state */
    nav.space-y-8 > div > ul.wdk-hidden {
      display: none !important;
    }
  `;

  /* ─── 2. Lucide SVG icons per group title ───────────────────── */
  const ICONS = {
    'Account': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'Getting Started': '<path d="M4.5 16.5c-1.5 1.5-1.5 3 0 4.5s3 1.5 4.5 0L21 9a3 3 0 0 0 0-6 3 3 0 0 0-6 0L4.5 16.5z"/><path d="M8.5 12.5 16 5"/><path d="m16 5 2 2"/>',
    'Design Templates': '<rect width="18" height="7" x="3" y="3" rx="1"/><rect width="9" height="7" x="3" y="14" rx="1"/><rect width="5" height="7" x="16" y="14" rx="1"/>',
    'Ready Widgets': '<rect width="7" height="7" x="14" y="3" rx="1"/><path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"/>',
    'Widget Builder': '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
    'Figma Templates & UiChemy': '<path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
    'Code Snippets': '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
    'Troubleshooting': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  };

  function makeIconSVG(paths) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="wdk-group-icon">${paths}</svg>`;
  }

  const CHEVRON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="wdk-chevron"><polyline points="6 9 12 15 18 9"/></svg>`;

  function injectStyles() {
    if (document.getElementById('wdk-brand')) return;
    const s = document.createElement('style');
    s.id = 'wdk-brand';
    s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ─── 3. COLLAPSIBLE SIDEBAR ────────────────────────────────── */
  function initCollapsible() {
    const nav = document.querySelector('nav.space-y-8');
    if (!nav) return;

    const groups = nav.querySelectorAll(':scope > div');
    groups.forEach(group => {
      const titleEl = group.querySelector(':scope > p[title]');
      const pagesList = group.querySelector(':scope > ul');

      if (!titleEl || !pagesList) return;
      if (titleEl.dataset.wdkInit) return;
      titleEl.dataset.wdkInit = '1';

      // Inject group icon at the front
      const groupName = titleEl.getAttribute('title');
      if (ICONS[groupName] && !titleEl.querySelector('.wdk-group-icon')) {
        titleEl.insertAdjacentHTML('afterbegin', makeIconSVG(ICONS[groupName]));
      }

      // Inject chevron at the end
      if (!titleEl.querySelector('.wdk-chevron')) {
        titleEl.insertAdjacentHTML('beforeend', CHEVRON_SVG);
      }

      // Check if this group has the currently active page
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

  /* ─── 4. BOOT ───────────────────────────────────────────────── */
  function run() {
    injectStyles();
    setTimeout(initCollapsible, 800);
    setTimeout(initCollapsible, 1800);
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
