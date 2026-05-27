(function () {
  const css = `
    /* ── WDesignKit Brand Overrides ── */

    :root {
      --wdk-pink:   #C22076;
      --wdk-navy:   #040483;
      --wdk-pink-hover: #a81b64;
    }

    /* Primary brand color on links, active states, selections */
    a,
    [data-active="true"],
    .active,
    [aria-current="page"] {
      color: var(--wdk-pink) !important;
    }

    a:hover {
      color: var(--wdk-pink-hover) !important;
    }

    /* Sidebar active item highlight */
    nav a[aria-current="page"],
    nav [data-active="true"],
    aside a[aria-current="page"] {
      background-color: rgba(194, 32, 118, 0.08) !important;
      color: var(--wdk-pink) !important;
      border-left: 3px solid var(--wdk-pink) !important;
    }

    /* Buttons */
    button[data-primary],
    .btn-primary,
    [class*="primary-button"],
    [class*="cta-button"] {
      background-color: var(--wdk-pink) !important;
      border-color: var(--wdk-pink) !important;
    }

    button[data-primary]:hover,
    .btn-primary:hover {
      background-color: var(--wdk-pink-hover) !important;
    }

    /* Headings */
    h1, h2, h3, h4, h5, h6 {
      color: #0f0f0f !important;
    }

    /* Dark mode overrides */
    @media (prefers-color-scheme: dark) {
      h1, h2, h3, h4, h5, h6 {
        color: #f5f5f5 !important;
      }
    }

    /* Sidebar — dark navy background to match learn.wdesignkit.com */
    aside,
    nav[class*="sidebar"],
    [class*="sidebar-nav"],
    [class*="left-sidebar"],
    [data-sidebar] {
      background-color: #060b2b !important;
    }

    /* Sidebar text */
    aside a,
    nav[class*="sidebar"] a,
    [data-sidebar] a {
      color: #c4c9e0 !important;
    }

    aside a:hover,
    nav[class*="sidebar"] a:hover,
    [data-sidebar] a:hover {
      color: #ffffff !important;
    }

    /* Sidebar group headings */
    aside [class*="group-title"],
    aside [class*="section-title"],
    aside [class*="nav-group"] > span,
    aside [class*="nav-group"] > div > span {
      color: #8892b0 !important;
      font-size: 11px !important;
      letter-spacing: 0.08em !important;
      text-transform: uppercase !important;
      font-weight: 600 !important;
    }

    /* Top navbar */
    header,
    [class*="navbar"],
    [class*="topbar"],
    [class*="header-"] {
      border-bottom-color: rgba(194, 32, 118, 0.15) !important;
    }

    /* Content area headings */
    article h1:first-child,
    main h1:first-child {
      color: #040483 !important;
      font-weight: 700 !important;
    }

    @media (prefers-color-scheme: dark) {
      article h1:first-child,
      main h1:first-child {
        color: #a0aaff !important;
      }
    }

    /* Inline code */
    code:not(pre code) {
      background: rgba(194, 32, 118, 0.08) !important;
      color: #C22076 !important;
      border: 1px solid rgba(194, 32, 118, 0.2) !important;
      border-radius: 4px !important;
      padding: 1px 5px !important;
    }

    /* Search bar focus ring */
    [class*="search"] input:focus,
    [class*="search-input"]:focus {
      border-color: var(--wdk-pink) !important;
      box-shadow: 0 0 0 3px rgba(194, 32, 118, 0.15) !important;
    }

    /* Scrollbar (webkit) */
    ::-webkit-scrollbar-thumb {
      background: rgba(194, 32, 118, 0.3) !important;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--wdk-pink) !important;
    }
  `;

  const style = document.createElement('style');
  style.id = 'wdk-brand-overrides';
  style.textContent = css;

  function inject() {
    if (!document.getElementById('wdk-brand-overrides')) {
      (document.head || document.body || document.documentElement).appendChild(style.cloneNode(true));
    }
  }

  // Inject immediately and on every navigation (SPA-friendly)
  inject();
  const observer = new MutationObserver(inject);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
