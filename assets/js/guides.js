/* Documentation app: renders the Help Center, role guides, search, sidebar, TOC, prev/next. Routes use plain #hash ids. */
(function () {
  var G = window.HF_GUIDES, C = window.HF_CONFIG, icon = window.hfIcon;
  var roles = ['resident', 'provider', 'admin'];
  var main = document.getElementById('docs-main'), sidebar = document.getElementById('sidebar'),
    tocEl = document.getElementById('toc'), docsEl = document.getElementById('docs'), pdfBtn = document.getElementById('pdf-btn'),
    backdrop = document.getElementById('sb-backdrop'), menuBtn = document.getElementById('menu-btn');

  var topicIndex = {}; // id -> {role, chapter, topic, flatIndex}
  roles.forEach(function (r) {
    var flat = [];
    G[r].chapters.forEach(function (ch) { ch.topics.forEach(function (t) { flat.push(t); topicIndex[t.id] = { role: r, chapter: ch, topic: t }; }); });
    G[r].flat = flat;
    flat.forEach(function (t, i) { topicIndex[t.id].i = i; });
  });

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function fmt(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  }
  function plain(s) { return String(s).replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); }
  function slug(s) { return plain(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  /* ---------- block renderers ---------- */
  function renderBlocks(blocks) {
    var tocItems = [];
    var html = blocks.map(function (b) {
      switch (b.t) {
        case 'p': return '<p>' + fmt(b.x) + '</p>';
        case 'h': var id = 'h-' + slug(b.x); tocItems.push([id, plain(b.x)]); return '<h2 id="' + id + '">' + esc(b.x) + '</h2>';
        case 'steps': return '<ol class="steps">' + b.items.map(function (i) { return '<li>' + fmt(i) + '</li>'; }).join('') + '</ol>';
        case 'ul': return '<ul class="bul">' + b.items.map(function (i) { return '<li>' + fmt(i) + '</li>'; }).join('') + '</ul>';
        case 'flow': return '<ul class="flow" aria-label="Process">' + b.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
        case 'note':
          var ic = b.k === 'tip' ? 'sparkles' : 'info';
          var lab = b.k === 'warn' ? 'Important' : b.k === 'tip' ? 'Tip' : 'Note';
          return '<div class="callout ' + (b.k === 'info' ? '' : b.k) + '" role="note">' + icon(ic) + '<div><strong>' + lab + '.</strong> ' + fmt(b.x) + '</div></div>';
        case 'shots':
          return '<div class="shot-row' + (b.wide ? ' wide' : '') + '">' + b.items.map(function (s) {
            return '<figure class="shot"><img src="' + s.src + '" alt="' + esc(s.alt) + '" loading="lazy"><figcaption>' + esc(s.cap) + '</figcaption></figure>';
          }).join('') + '</div>';
        case 'table':
          return '<div class="table-wrap"><table><thead><tr>' + b.head.map(function (x) { return '<th scope="col">' + esc(x) + '</th>'; }).join('') + '</tr></thead><tbody>' +
            b.rows.map(function (r) { return '<tr>' + r.map(function (c) { var cls = c === 'Available' ? ' class="yes"' : c === 'Restricted' ? ' class="no"' : ''; return '<td' + cls + '>' + fmt(c) + '</td>'; }).join('') + '</tr>'; }).join('') +
            '</tbody></table></div>';
      }
      return '';
    }).join('');
    return { html: html, toc: tocItems };
  }

  /* ---------- search index ---------- */
  var index = [];
  roles.forEach(function (r) {
    G[r].chapters.forEach(function (ch) {
      ch.topics.forEach(function (t) {
        var txt = [t.summary];
        t.blocks.forEach(function (b) {
          if (b.x) txt.push(plain(b.x));
          if (b.items && typeof b.items[0] === 'string') txt = txt.concat(b.items.map(plain));
          if (b.rows) b.rows.forEach(function (row) { txt.push(row.join(' ')); });
        });
        index.push({ id: t.id, role: r, title: t.title, chapter: ch.title, text: txt.join(' ') });
      });
    });
  });
  window.hfFaq.forEach(function (f, i) { index.push({ id: 'faq', role: 'faq', title: f[0], chapter: 'FAQ', text: f[1].replace(/<[^>]+>/g, ' ') }); });

  function search(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(function (t) { return t.length > 1; });
    if (!terms.length) return [];
    return index.map(function (e) {
      var title = e.title.toLowerCase(), text = e.text.toLowerCase(), score = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i], inTitle = title.indexOf(t) > -1, c = text.split(t).length - 1;
        if (!inTitle && !c) return null;
        score += (inTitle ? 12 : 0) + Math.min(c, 6);
      }
      return { e: e, score: score };
    }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).slice(0, 8);
  }
  function snippet(e, terms) {
    var low = e.text.toLowerCase(), pos = -1;
    for (var i = 0; i < terms.length; i++) { pos = low.indexOf(terms[i]); if (pos > -1) break; }
    var start = Math.max(0, pos - 40), s = e.text.slice(start, start + 130);
    return (start ? '…' : '') + s + '…';
  }
  function mark(s, terms) {
    var out = esc(s);
    terms.forEach(function (t) { out = out.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); });
    return out;
  }
  var input = document.getElementById('doc-search'), results = document.getElementById('results');
  function runSearch() {
    var q = input.value.trim(), terms = q.toLowerCase().split(/\s+/).filter(function (t) { return t.length > 1; });
    if (!q) { results.classList.remove('open'); results.innerHTML = ''; return; }
    var r = search(q);
    results.innerHTML = r.length ? r.map(function (x) {
      var lab = x.e.role === 'faq' ? 'FAQ' : G[x.e.role].role + ' · ' + x.e.chapter;
      return '<a href="guides.html#' + x.e.id + '" data-close><small>' + esc(lab) + '</small><b>' + mark(x.e.title, terms) + '</b><span>' + mark(snippet(x.e, terms), terms) + '</span></a>';
    }).join('') : '<div class="none">No results for “' + esc(q) + '”. Try a different word, such as “token”, “booking” or “verify”.</div>';
    results.classList.add('open');
  }
  input.addEventListener('input', runSearch);
  input.addEventListener('focus', runSearch);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { results.classList.remove('open'); input.blur(); }
    if (e.key === 'Enter') { var a = results.querySelector('a'); if (a) { location.hash = a.getAttribute('href').split('#')[1]; results.classList.remove('open'); input.blur(); } }
    if (e.key === 'ArrowDown') { var f = results.querySelector('a'); if (f) { f.focus(); e.preventDefault(); } }
  });
  results.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) { results.classList.remove('open'); input.value = ''; } });
  document.addEventListener('click', function (e) { if (!e.target.closest('.search')) results.classList.remove('open'); });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); }
  });

  /* ---------- sidebar ---------- */
  var openChapters = {};
  function buildSidebar(role, topicId) {
    var h = '<button class="btn btn-ghost btn-sm sb-close" type="button" id="sb-close">' + icon('x') + ' Close menu</button>';
    h += '<nav aria-label="Guides"><div class="role-switch">' + roles.map(function (r) {
      return '<a href="guides.html#' + r + '"' + (r === role ? ' aria-current="true"' : '') + '>' + G[r].role.replace('Local Service Provider', 'Provider') + '</a>';
    }).join('') + '</div>';
    if (role && G[role]) {
      G[role].chapters.forEach(function (ch, ci) {
        var key = role + ci, has = ch.topics.some(function (t) { return t.id === topicId; });
        if (has) openChapters[key] = true;
        if (openChapters[key] === undefined && !topicId && ci === 0) openChapters[key] = true;
        var open = !!openChapters[key];
        h += '<div class="sb-chapter' + (open ? ' open' : '') + (has ? ' current' : '') + '"><button type="button" aria-expanded="' + open + '" data-key="' + key + '"><span>' + esc(ch.title) + '</span>' + icon('chevron-down') + '</button><ul>' +
          ch.topics.map(function (t) { return '<li><a href="guides.html#' + t.id + '"' + (t.id === topicId ? ' aria-current="page"' : '') + '>' + esc(t.title) + '</a></li>'; }).join('') + '</ul></div>';
      });
    }
    h += '<div class="sb-extra"><a href="guides.html#help"' + (!role && topicId === 'help' ? ' aria-current="page"' : '') + '>' + icon('life-buoy') + ' Help Center home</a>' +
      '<a href="guides.html#faq"' + (topicId === 'faq' ? ' aria-current="page"' : '') + '>' + icon('circle-help') + ' Frequently asked questions</a>' +
      '<a href="installation.html">' + icon('smartphone') + ' Installation guide</a>' +
      '<a href="download.html">' + icon('download') + ' Download the app</a></div></nav>';
    sidebar.innerHTML = h;
    var curLink = sidebar.querySelector('a[aria-current="page"]'); if (curLink && curLink.scrollIntoView) { try { curLink.scrollIntoView({ block: 'nearest' }); } catch (e) { /* ignore */ } }
    sidebar.querySelectorAll('.sb-chapter > button').forEach(function (b) {
      b.addEventListener('click', function () {
        var o = b.getAttribute('aria-expanded') !== 'true';
        b.setAttribute('aria-expanded', o); b.parentElement.classList.toggle('open', o); openChapters[b.getAttribute('data-key')] = o;
      });
    });
    var cl = document.getElementById('sb-close'); if (cl) cl.addEventListener('click', closeMenu);
    sidebar.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  }
  function openMenu() { sidebar.classList.add('open'); backdrop.classList.add('open'); menuBtn.setAttribute('aria-expanded', 'true'); }
  function closeMenu() { sidebar.classList.remove('open'); backdrop.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', openMenu); backdrop.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });


  /* recently viewed (per browser) and reading progress */
  function recents() { try { return JSON.parse(localStorage.getItem('hf-recent') || '[]'); } catch (e) { return []; } }
  function remember(id) { try { var a = recents().filter(function (x) { return x !== id; }); a.unshift(id); localStorage.setItem('hf-recent', JSON.stringify(a.slice(0, 5))); } catch (e) { /* storage unavailable */ } }
  var bar = document.createElement('div'); bar.className = 'read-progress'; bar.setAttribute('aria-hidden', 'true'); bar.innerHTML = '<span></span>'; document.body.appendChild(bar);
  function progress() {
    var a = main.querySelector('article.article');
    if (!a) { bar.classList.remove('on'); return; }
    bar.classList.add('on');
    var r = a.getBoundingClientRect(), total = r.height - window.innerHeight * 0.6;
    var p = total > 0 ? Math.min(1, Math.max(0, (-r.top + 120) / total)) : 1;
    bar.firstChild.style.width = (p * 100) + '%';
  }
  window.addEventListener('scroll', progress, { passive: true });


  function bindHelpful(id) {
    var box = main.querySelector('.helpful'); if (!box) return;
    var msg = box.querySelector('.hp-msg'), btns = box.querySelectorAll('button');
    function show(v) {
      btns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-v') === v ? 'true' : 'false'); });
      msg.innerHTML = v === 'yes' ? 'Thanks for letting us know. Your answer is saved on this device only.' :
        'Sorry this did not help. Try the <a href="guides.html#faq">FAQs</a>, ask Fixie in the app, or use the contact details in the page footer. Your answer is saved on this device only.';
    }
    var prev = null; try { prev = localStorage.getItem('hf-fb-' + id); } catch (e) { /* storage unavailable */ }
    if (prev) show(prev);
    btns.forEach(function (b) { b.addEventListener('click', function () { var v = b.getAttribute('data-v'); try { localStorage.setItem('hf-fb-' + id, v); } catch (e) { /* storage unavailable */ } show(v); }); });
  }

  /* ---------- views ---------- */
  function crumbs(parts) {
    var h = '<ol class="crumbs" aria-label="Breadcrumb"><li><a href="index.html">Home</a></li><li><a href="guides.html#help">User Guides</a></li>';
    parts.forEach(function (p, i) { h += '<li>' + (i === parts.length - 1 ? '<span aria-current="page">' + esc(p[0]) + '</span>' : '<a href="' + p[1] + '">' + esc(p[0]) + '</a>') + '</li>'; });
    return h + '</ol>';
  }
  function setPdf(role) {
    if (role && G[role]) { pdfBtn.hidden = false; pdfBtn.href = C.manuals[G[role].pdf]; pdfBtn.setAttribute('aria-label', 'Download the ' + G[role].role + ' manual as PDF'); }
    else pdfBtn.hidden = true;
  }
  function setToc(items) {
    if (!items || items.length < 2) { tocEl.innerHTML = ''; docsEl.classList.add('no-toc'); return; }
    docsEl.classList.remove('no-toc');
    tocEl.innerHTML = '<h4>On this page</h4><ul>' + items.map(function (i) { return '<li><a href="#' + i[0] + '" data-toc="' + i[0] + '">' + esc(i[1]) + '</a></li>'; }).join('') + '</ul>';
    tocEl.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); var t = document.getElementById(a.getAttribute('data-toc')); if (t) { t.scrollIntoView({ behavior: 'smooth' }); } });
    });
  }
  var spy;
  function spyToc() {
    if (spy) window.removeEventListener('scroll', spy);
    var links = [].slice.call(tocEl.querySelectorAll('a'));
    if (!links.length) return;
    spy = function () {
      var cur = links[0];
      links.forEach(function (a) { var el = document.getElementById(a.getAttribute('data-toc')); if (el && el.getBoundingClientRect().top < 160) cur = a; });
      links.forEach(function (a) { a.classList.toggle('on', a === cur); });
    };
    window.addEventListener('scroll', spy, { passive: true }); spy();
  }

  function viewHome() {
    document.title = 'User Guides | HireNFix';
    setPdf(null); buildSidebar(null, 'help'); setToc(null);
    var cards = roles.map(function (r) {
      var g = G[r], n = g.flat.length;
      return '<div class="card hc-card"><span class="ico">' + icon(g.icon) + '</span><h3>' + g.title + '</h3><p>' + g.intro + '</p><span class="count">' + n + ' topics · ' + g.chapters.length + ' chapters</span>' +
        '<div class="btn-row" style="margin-top:14px"><a class="btn btn-primary btn-sm" href="guides.html#' + r + '">View guide</a><a class="btn btn-ghost btn-sm" href="' + C.manuals[g.pdf] + '" target="_blank" rel="noopener">' + icon('file-down') + ' PDF manual</a></div></div>';
    }).join('');
    var quick = [['res-registration', 'Create a Resident account', 'user'], ['res-request', 'Request a job', 'clipboard-check'], ['res-offers', 'Book a service offer', 'calendar'], ['prov-register', 'Register as a provider', 'wrench'],
      ['prov-tokens', 'How tokens work', 'coins'], ['prov-proof', 'Upload proof of service', 'camera'], ['adm-verify', 'Verify a user', 'badge-check'], ['res-recover', 'Reset a password', 'key-round']];
    var rec = recents().filter(function (x) { return topicIndex[x]; });
    var recHtml = rec.length ? '<h2 id="recent">Recently viewed</h2><div class="quick">' + rec.map(function (x) { var tt = topicIndex[x]; return '<a href="guides.html#' + x + '">' + icon('history') + ' ' + esc(tt.topic.title) + '</a>'; }).join('') + '</div>' : '';
    main.innerHTML = '<div class="article"><div class="crumbs-slot">' + crumbs([['Help Center', '#help']]) + '</div>' +
      '<h1>How can we help?</h1><p class="lead">Step-by-step instructions for every role in HireNFix. Search above, or choose a guide.</p>' +
      '<div class="article-body"><div class="hc-grid" style="margin-top:6px">' + cards + '</div>' +
      recHtml + '<h2 id="popular">Popular topics</h2><div class="quick">' + quick.map(function (q) { return '<a href="guides.html#' + q[0] + '">' + icon(q[2]) + ' ' + q[1] + '</a>'; }).join('') + '</div>' +
      '<h2 id="faq-home">Frequently asked questions</h2>' + window.hfAccordion(window.hfFaq.slice(0, 5)) +
      '<p><a class="card-link" href="guides.html#faq">See all questions ' + icon('arrow-right') + '</a></p>' +
      '<h2 id="contact">Contact support</h2>' + window.hfContactSupport() + '</div></div>';
  }

  function viewFaq() {
    document.title = 'Frequently Asked Questions | HireNFix';
    setPdf(null); buildSidebar(null, 'faq'); setToc(null);
    main.innerHTML = '<div class="article">' + crumbs([['FAQ', '#faq']]) + '<h1>Frequently asked questions</h1><p class="lead">Quick answers drawn from the user manuals.</p>' +
      '<div class="article-body">' + window.hfAccordion(window.hfFaq) + '<h2 id="contact">Still need help?</h2>' + window.hfContactSupport() + '</div></div>';
  }

  function viewRole(r) {
    var g = G[r];
    document.title = g.title + ' | HireNFix';
    setPdf(r); buildSidebar(r, null); setToc(null);
    var chapters = g.chapters.map(function (ch) {
      return '<div class="card flat"><h3>' + esc(ch.title) + '</h3><ul class="bul" style="margin:6px 0 0 1.1em;display:grid;gap:6px">' + ch.topics.map(function (t) { return '<li><a href="guides.html#' + t.id + '">' + esc(t.title) + '</a></li>'; }).join('') + '</ul></div>';
    }).join('');
    main.innerHTML = '<div class="article">' + crumbs([[g.role, '#' + r]]) + '<h1>' + g.title + '</h1><p class="lead">' + g.intro + '</p>' +
      '<div class="btn-row" style="margin-top:20px"><a class="btn btn-primary" href="guides.html#' + g.flat[0].id + '">Start reading ' + icon('arrow-right') + '</a><a class="btn btn-ghost" href="' + C.manuals[g.pdf] + '" target="_blank" rel="noopener">' + icon('file-down') + ' Download PDF manual</a></div>' +
      '<div class="article-body"><div class="grid g2">' + chapters + '</div></div></div>';
  }

  function viewTopic(id) {
    var ref = topicIndex[id], g = G[ref.role], t = ref.topic;
    document.title = t.title + ' | ' + g.role + ' Guide | HireNFix';
    setPdf(ref.role); buildSidebar(ref.role, id);
    var body = renderBlocks(t.blocks);
    var prev = g.flat[ref.i - 1], next = g.flat[ref.i + 1];
    var pn = '<nav class="pn" aria-label="Previous and next topic">' +
      (prev ? '<a href="guides.html#' + prev.id + '"><small>' + icon('arrow-left') + ' Previous</small><b>' + esc(prev.title) + '</b></a>' : '<a href="guides.html#' + ref.role + '"><small>' + icon('arrow-left') + ' Back to</small><b>' + g.title + '</b></a>') +
      (next ? '<a class="next" href="guides.html#' + next.id + '"><small>' + icon('arrow-right') + ' Next</small><b>' + esc(next.title) + '</b></a>' : '<a class="next" href="guides.html#faq"><small>' + icon('arrow-right') + ' Next</small><b>Frequently asked questions</b></a>') + '</nav>';
    var rel = ref.chapter.topics.filter(function (x) { return x.id !== id; }).slice(0, 4);
    var relHtml = rel.length ? '<section class="related" aria-labelledby="rel-h"><h2 id="rel-h">Related topics in ' + esc(ref.chapter.title) + '</h2><div class="rel-grid">' +
      rel.map(function (x) { return '<a href="guides.html#' + x.id + '"><b>' + esc(x.title) + '</b><span>' + esc(x.summary) + '</span></a>'; }).join('') + '</div></section>' : '';
    var helpHtml = '<section class="helpful" aria-labelledby="hp-h"><h2 id="hp-h">Was this guide helpful?</h2><div class="hp-btns"><button type="button" class="chip" data-v="yes">' + icon('check') + ' Yes</button><button type="button" class="chip" data-v="no">' + icon('x') + ' No</button></div><p class="hp-msg" role="status" aria-live="polite"></p></section>';
    remember(id);
    main.innerHTML = '<article class="article">' + crumbs([[g.role, '#' + ref.role], [ref.chapter.title, '#' + ref.role], [t.title, '#' + id]]) +
      '<h1>' + esc(t.title) + '</h1><p class="lead">' + esc(t.summary) + '</p>' +
      '<div class="meta"><span>' + icon('users') + ' ' + g.role + ' guide</span><span>' + icon('list') + ' ' + ref.chapter.title + '</span><span>' + icon('file-text') + ' Topic ' + (ref.i + 1) + ' of ' + g.flat.length + '</span></div>' +
      '<div class="article-body">' + body.html + '</div>' + relHtml + pn + '</article>';
    setToc(body.toc);
  }

  function route() {
    var id = decodeURIComponent(location.hash.slice(1));
    closeMenu();
    if (topicIndex[id]) viewTopic(id);
    else if (G[id]) viewRole(id);
    else if (id === 'faq') viewFaq();
    else viewHome();
    window.hfPaintIcons(main);
    bindHelpful(id); spyToc(); progress();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  window.addEventListener('hashchange', route);
  route();
})();
