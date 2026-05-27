(function () {

  /* ─── 1. INJECT CSS ─────────────────────────────────────────── */
  const css = `
    :root {
      --wdk-pink:       #C22076;
      --wdk-pink-light: rgba(194, 32, 118, 0.08);
      --wdk-pink-mid:   rgba(194, 32, 118, 0.18);
      --wdk-navy:       #040483;
    }

    /* Headings — dark, never pink */
    h1, h2, h3, h4, h5, h6 {
      color: #111827 !important;
    }
    .dark h1, .dark h2, .dark h3,
    .dark h4, .dark h5, .dark h6,
    [data-theme="dark"] h1,
    [data-theme="dark"] h2,
    [data-theme="dark"] h3 {
      color: #f9fafb !important;
    }

    /* Links — brand pink, readable */
    a { color: var(--wdk-pink) !important; }
    a:hover { opacity: 0.8; }

    /* Sidebar active item */
    nav a[aria-current="page"],
    nav [data-active="true"],
    aside a[aria-current="page"] {
      background: var(--wdk-pink-light) !important;
      color: var(--wdk-pink) !important;
      border-left: 3px solid var(--wdk-pink) !important;
      border-radius: 6px !important;
      font-weight: 600 !important;
    }

    /* Sidebar — default light, clean */
    aside a, nav a {
      color: #374151 !important;
    }
    .dark aside a, .dark nav a {
      color: #d1d5db !important;
    }

    /* Inline code chips */
    code:not(pre code) {
      background: var(--wdk-pink-light) !important;
      color: var(--wdk-pink) !important;
      border-radius: 4px !important;
      padding: 1px 6px !important;
      font-size: 0.875em !important;
    }

    /* ── Collapsible sidebar groups ── */
    [data-sidebar-group-content],
    .sidebar-group-content {
      overflow: hidden;
      transition: max-height 0.25s ease, opacity 0.2s ease;
    }
    [data-sidebar-group-content].wdk-collapsed,
    .sidebar-group-content.wdk-collapsed {
      max-height: 0 !important;
      opacity: 0;
    }
    [data-sidebar-group-title],
    .sidebar-group-title {
      cursor: pointer;
      user-select: none;
    }
    [data-sidebar-group-title]::after,
    .sidebar-group-title::after {
      content: '▾';
      float: right;
      font-size: 11px;
      opacity: 0.5;
      transition: transform 0.2s ease;
    }
    [data-sidebar-group-title].wdk-closed::after,
    .sidebar-group-title.wdk-closed::after {
      transform: rotate(-90deg);
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
    // Find all sidebar nav group containers
    // documentation.ai uses varying class names — we find by structure
    const sidebar = document.querySelector('aside, [class*="sidebar"], nav[class*="nav"]');
    if (!sidebar) return;

    // Find group title elements (elements containing group labels that are NOT links)
    const allTexts = sidebar.querySelectorAll('p, span, div, li');
    allTexts.forEach(el => {
      // Skip if it's a link or inside a link
      if (el.closest('a') || el.tagName === 'A') return;
      // Skip if it has children that are links (it's a container)
      if (!el.querySelector('a') && el.children.length === 0) return;

      const style = window.getComputedStyle(el);
      const text = el.textContent.trim();
      // Group titles tend to be short, uppercase-ish or bold
      if (
        text.length > 0 &&
        text.length < 40 &&
        (style.fontWeight >= 600 || style.textTransform === 'uppercase') &&
        !el.closest('a')
      ) {
        setupGroup(el);
      }
    });
  }

  function setupGroup(titleEl) {
    if (titleEl.dataset.wdkInit) return;
    titleEl.dataset.wdkInit = '1';

    // Find the sibling or parent's sibling that contains the pages list
    const parent = titleEl.parentElement;
    if (!parent) return;

    // Look for a UL or list of links as the "content" of the group
    let content = null;
    let next = parent.nextElementSibling;
    if (next && next.querySelector('a')) {
      content = next;
    } else {
      // Try children of parent
      const lists = parent.querySelectorAll('ul, ol, [class*="pages"], [class*="items"]');
      if (lists.length) content = lists[0];
    }

    if (!content) return;

    // Check if active page is inside this group
    const hasActivePage = content.querySelector('[aria-current="page"], [data-active="true"]');

    // Collapse inactive groups by default
    if (!hasActivePage) {
      content.style.maxHeight = '0px';
      content.style.overflow = 'hidden';
      content.style.opacity = '0';
      content.style.transition = 'max-height 0.25s ease, opacity 0.2s ease';
      titleEl.dataset.wdkClosed = '1';
    } else {
      content.style.transition = 'max-height 0.25s ease, opacity 0.2s ease';
    }

    titleEl.style.cursor = 'pointer';
    titleEl.addEventListener('click', function (e) {
      e.stopPropagation();
      const isClosed = titleEl.dataset.wdkClosed === '1';
      if (isClosed) {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
        delete titleEl.dataset.wdkClosed;
      } else {
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        titleEl.dataset.wdkClosed = '1';
      }
    });
  }

  /* ─── 3. RUN & OBSERVE ──────────────────────────────────────── */
  function run() {
    injectStyles();
    setTimeout(initCollapsible, 600);
  }

  run();

  // Re-run on SPA navigation
  const observer = new MutationObserver(() => {
    injectStyles();
    setTimeout(initCollapsible, 600);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

})();
