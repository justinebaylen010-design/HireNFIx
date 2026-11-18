/* Site-wide search dialog. Loaded on demand from the header; indexes pages, guide topics and FAQs. */
(function () {
  var PAGES = [
    ['index.html', 'Home', 'Find, hire and fix: what HireNFix is and how it works'],
    ['system-information.html', 'System Information', 'Overview, background, objectives, target users and requirements'],
    ['features.html', 'System Features', 'Resident, provider and administrator features'],
    ['guides.html', 'User Guides', 'Step-by-step manuals, screenshots and FAQs'],
    ['installation.html', 'Installation Guide', 'Check your device, install, register and log in'],
    ['download.html', 'Download App', 'Android download, QR code and requirements'],
    ['about.html', 'About Us and Policies', 'Project background, mission, team, terms and privacy']
  ];
  var index = null, dlg, input, list, status;
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function plain(x) { return String(x).replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' '); }
  function load(src, cb) {
    var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = function () { cb(true); }; document.head.appendChild(s);
  }
  function build() {
    index = PAGES.map(function (p) { return { href: p[0], title: p[1], tag: 'Page', text: p[2].toLowerCase() }; });
    var G = window.HF_GUIDES || {};
    Object.keys(G).forEach(function (r) {
      (G[r].chapters || []).forEach(function (c) {
        (c.topics || []).forEach(function (t) {
          index.push({ href: 'guides.html#' + t.id, title: t.title, tag: G[r].role + ' guide', text: (t.title + ' ' + (t.summary || '') + ' ' + plain(JSON.stringify(t.blocks || []))).toLowerCase(), sum: t.summary || '' });
        });
      });
    });
    (window.hfFaq || []).forEach(function (f) { index.push({ href: 'guides.html#faq', title: plain(f[0]), tag: 'FAQ', text: (plain(f[0]) + ' ' + plain(f[1])).toLowerCase(), sum: plain(f[1]).slice(0, 110) }); });
  }
  function hl(text, words) {
    var out = esc(text);
    words.forEach(function (w) { out = out.replace(new RegExp('(' + esc(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); });
    return out;
  }
  var SUGGEST = ['register', 'token', 'receipt', 'password', 'report', 'verify'];
  function make() {
    dlg = document.createElement('dialog'); dlg.className = 'gsearch'; dlg.setAttribute('aria-label', 'Search HireNFix');
    dlg.innerHTML = '<form method="dialog" class="gs-top" role="search"><label for="gs-input" class="sr-only">Search HireNFix</label>' + window.hfIcon('search') +
      '<input id="gs-input" type="search" placeholder="Search pages, guides and questions" autocomplete="off"><button type="button" class="icon-btn" id="gs-close" aria-label="Close search">' + window.hfIcon('x') + '</button></form>' +
      '<p class="gs-status" id="gs-status" role="status" aria-live="polite">Type to search the whole site.</p><div class="gs-body" id="gs-list"></div>';
    document.body.appendChild(dlg);
    input = dlg.querySelector('#gs-input'); list = dlg.querySelector('#gs-list'); status = dlg.querySelector('#gs-status');
    dlg.querySelector('#gs-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.querySelector('form').addEventListener('submit', function (e) { e.preventDefault(); var a = list.querySelector('a'); if (a) a.click(); });
    input.addEventListener('input', run);
    list.addEventListener('click', function (e) { var cb = e.target.closest('.chip'); if (cb) { input.value = cb.getAttribute('data-q'); run(); input.focus(); return; } var a = e.target.closest('a'); if (a) { dlg.close(); if (a.getAttribute('href').indexOf(location.pathname.split('/').pop() + '#') === 0) setTimeout(function () { location.hash = a.getAttribute('href').split('#')[1]; }, 0); } });
  }
  function suggestions() {
    return '<div class="gs-empty"><p>Try one of these:</p><div class="chips">' + SUGGEST.map(function (w) { return '<button type="button" class="chip" data-q="' + w + '">' + w + '</button>'; }).join('') + '</div>' +
      '<p class="gs-links"><a href="guides.html#help">Browse the Help Center</a> <a href="guides.html#faq">Read the FAQs</a></p></div>';
  }
  function run() {
    var q = input.value.trim().toLowerCase();
    if (!q) { list.innerHTML = suggestions(); status.textContent = 'Search pages, guides and questions.'; return; }
    var words = q.split(/\s+/).filter(Boolean);
    var hits = index.map(function (e) {
      var score = 0, ok = words.every(function (w) { var inT = e.title.toLowerCase().indexOf(w) > -1, inX = e.text.indexOf(w) > -1; if (inT) score += 10; if (inX) score += 1; return inT || inX; });
      return ok ? { e: e, s: score } : null;
    }).filter(Boolean).sort(function (a, b) { return b.s - a.s; }).slice(0, 15);
    if (!hits.length) { list.innerHTML = '<div class="gs-empty"><p><b>No results for "' + esc(input.value.trim()) + '".</b></p><p>Check the spelling or try a shorter word.</p>' + suggestions().replace('<div class="gs-empty">', '<div>'); status.textContent = 'No results'; return; }
    status.textContent = hits.length + ' result' + (hits.length === 1 ? '' : 's');
    var groups = {}, order = [];
    hits.forEach(function (h) { var k = h.e.tag; if (!groups[k]) { groups[k] = []; order.push(k); } groups[k].push(h.e); });
    list.innerHTML = order.map(function (k) {
      return '<h3 class="gs-h">' + esc(k) + 's</h3><ul class="gs-list">' + groups[k].map(function (e) {
        return '<li><a href="' + esc(e.href) + '"><b>' + hl(e.title, words) + '</b>' + (e.sum ? '<span class="gs-sum">' + hl(e.sum, words) + '</span>' : '') + '</a></li>';
      }).join('') + '</ul>';
    }).join('');
  }
  window.hfOpenSearch = function () {
    function show() { if (!dlg) make(); if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); input.value = ''; run(); input.focus(); }
    if (index) return show();
    function after() { if (!window.hfFaq) window.hfFaq = []; build(); show(); }
    if (window.HF_GUIDES) after(); else load('assets/js/guides-data.js', after);
  };
})();
