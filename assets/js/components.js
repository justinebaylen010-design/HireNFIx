/* Shared components: header, footer, breadcrumbs, accordion, tabs, back-to-top, icons, contact support. */
(function () {
  var C = window.HF_CONFIG || {};
  var ICONS = window.HF_ICONS || {};
  var page = window.HF_PAGE || '';

  function icon(name, cls) {
    return '<svg class="i ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (ICONS[name] || '') + '</svg>';
  }
  window.hfIcon = icon;
  function paintIcons(root) {
    (root || document).querySelectorAll('i[data-i]').forEach(function (el) {
      var t = document.createElement('span');
      t.innerHTML = icon(el.getAttribute('data-i'), el.className);
      el.replaceWith(t.firstChild);
    });
  }
  window.hfPaintIcons = paintIcons;

  var NAV = [
    ['index.html', 'Home', 'home'],
    ['system-information.html', 'System Information', 'system'],
    ['features.html', 'System Features', 'features'],
    ['guides.html', 'User Guides', 'guides'],
    ['installation.html', 'Installation Guide', 'install'],
    ['about.html', 'About Us', 'about']
  ];

  function downloadHref() { return 'download.html'; }

  function buildHeader() {
    var h = document.getElementById('site-header');
    if (!h) return;
    var links = NAV.map(function (n) {
      var cur = n[2] === page ? ' aria-current="page"' : '';
      return '<li><a href="' + n[0] + '"' + cur + '>' + n[1] + '</a></li>';
    }).join('');
    h.className = 'site-header';
    h.innerHTML =
      '<div class="wrap nav">' +
      '<a class="brand" href="index.html" aria-label="HireNFix home"><img src="assets/img/logo.webp" width="38" height="38" alt=""><span><span class="w-h">Hire</span><b>N</b><span class="w-f">Fix</span></span></a>' +
      '<button class="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu">' + icon('menu') + '</button>' +
      '<ul class="nav-links" id="nav-links">' + links +
      '<li class="cta"><a class="btn btn-primary btn-sm" href="' + downloadHref() + '"' + (page === 'download' ? ' aria-current="page"' : '') + '>' + icon('download') + ' Download App</a></li></ul>' +
      '<div class="nav-tools"><button type="button" class="icon-btn" id="hf-search" aria-label="Search the site" title="Search (press /)">' + icon('search') + '</button>' +
      '<button type="button" class="icon-btn" id="hf-theme" aria-label="Switch color theme" title="Switch color theme">' + icon('moon') + '</button></div>' +
      '</div>';
    var tg = h.querySelector('.nav-toggle'), ul = h.querySelector('.nav-links');
    h.querySelector('#hf-search').addEventListener('click', function () { window.hfOpenSearch ? window.hfOpenSearch() : loadSearch(true); });
    var tb = h.querySelector('#hf-theme');
    function current() { return document.documentElement.getAttribute('data-theme') || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
    function paintTheme() { var d = current() === 'dark'; tb.innerHTML = icon(d ? 'sun' : 'moon'); tb.setAttribute('aria-label', d ? 'Switch to light theme' : 'Switch to dark theme'); }
    tb.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('hf-theme', next); } catch (e) { /* storage unavailable */ }
      paintTheme();
    });
    paintTheme();
    document.addEventListener('keydown', function (e) {
      var t = e.target, typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
      if ((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) { e.preventDefault(); h.querySelector('#hf-search').click(); }
    });
    tg.addEventListener('click', function () {
      var o = ul.classList.toggle('open');
      tg.setAttribute('aria-expanded', o);
      tg.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
      tg.innerHTML = icon(o ? 'x' : 'menu');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && ul.classList.contains('open')) { tg.click(); tg.focus(); }
    });
  }

  function loadSearch(thenOpen) {
    var sc = document.createElement('script'); sc.src = 'assets/js/search.js';
    sc.onload = function () { if (thenOpen && window.hfOpenSearch) window.hfOpenSearch(); };
    document.head.appendChild(sc);
  }
  function buildHelp() {
    if (page === 'guides') return;
    var a = document.createElement('a'); a.className = 'help-fab'; a.href = 'guides.html#faq';
    a.innerHTML = icon('life-buoy') + '<span>Help</span>'; a.setAttribute('aria-label', 'Help and frequently asked questions');
    document.body.appendChild(a);
  }
  function applyTheme() { try { var t = localStorage.getItem('hf-theme'); if (t === 'dark' || t === 'light') document.documentElement.setAttribute('data-theme', t); } catch (e) { /* storage unavailable */ } }

  function todo(v, label) {
    return v ? v : '<span class="todo-inline">' + label + '</span>';
  }

  function buildFooter() {
    var f = document.getElementById('site-footer');
    if (!f) return;
    f.className = 'site-footer';
    f.innerHTML =
      '<div class="wrap"><div class="f-grid">' +
      '<div><a class="brand" href="index.html"><img src="assets/img/logo.webp" width="38" height="38" alt=""><span><span class="w-h">Hire</span><b>N</b><span class="w-f">Fix</span></span></a>' +
      '<p>An AI-integrated mobile application for efficient local service provider booking in ' + C.city + '.</p></div>' +
      '<div><h4>Quick navigation</h4><ul>' + NAV.map(function (n) { return '<li><a href="' + n[0] + '">' + n[1] + '</a></li>'; }).join('') + '<li><a href="download.html">Download App</a></li></ul></div>' +
      '<div><h4>User guides</h4><ul>' +
      '<li><a href="guides.html#resident">Resident User Guide</a></li>' +
      '<li><a href="guides.html#provider">Service Provider User Guide</a></li>' +
      '<li><a href="guides.html#admin">Administrator User Guide</a></li>' +
      '<li><a href="guides.html#faq">Frequently asked questions</a></li></ul></div>' +
      '<div><h4>Contact</h4><ul class="f-contact">' +
      '<li>' + icon('map-pin') + '<span>' + C.city + ', Metro Manila</span></li>' +
      '<li>' + icon('mail') + '<span>' + (C.supportEmail ? '<a href="mailto:' + C.supportEmail + '">' + C.supportEmail + '</a>' : todo(C.supportEmail, 'Support email to be added')) + '</span></li>' +
      (C.supportPhone ? '<li>' + icon('phone') + '<span>' + C.supportPhone + '</span></li>' : '') + '</ul></div>' +
      '</div>' +
      '<div class="f-bottom"><span>&copy; ' + C.year + ' HireNFix. All rights reserved.</span>' +
      '<nav aria-label="Legal"><a href="about.html#privacy">Privacy Policy</a><a href="about.html#terms">Terms and Conditions</a><a href="about.html#responsibilities">User Responsibilities</a></nav></div></div>';
  }

  function buildBackToTop() {
    var b = document.createElement('button');
    b.className = 'to-top';
    b.setAttribute('aria-label', 'Back to top');
    b.innerHTML = icon('arrow-up');
    b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    document.body.appendChild(b);
    function on() { b.classList.toggle('show', window.scrollY > 600); }
    window.addEventListener('scroll', on, { passive: true }); on();
  }

  function buildBreadcrumbs() {
    document.querySelectorAll('[data-crumbs]').forEach(function (el) {
      var parts = el.getAttribute('data-crumbs').split('|');
      el.classList.add('crumbs');
      el.setAttribute('aria-label', 'Breadcrumb');
      var html = '<li><a href="index.html">Home</a></li>';
      parts.forEach(function (p, i) {
        var s = p.split('>');
        html += i === parts.length - 1 ? '<li><span aria-current="page">' + s[0] + '</span></li>' : '<li><a href="' + s[1] + '">' + s[0] + '</a></li>';
      });
      el.innerHTML = html;
    });
  }

  function accordion() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.acc-item > button[aria-expanded]');
      if (!btn) return;
      var item = btn.parentElement, open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', open);
      item.classList.toggle('open', open);
    });
  }
  window.hfAccordion = function (items) {
    return '<div class="acc">' + items.map(function (it, i) {
      var id = 'acc' + Math.random().toString(36).slice(2, 8) + i;
      return '<div class="acc-item"><button type="button" aria-expanded="false" aria-controls="' + id + '"><span>' + it[0] + '</span>' + icon('chevron-down') + '</button>' +
        '<div class="acc-panel" id="' + id + '">' + it[1] + '</div></div>';
    }).join('') + '</div>';
  };

  window.hfTrouble = [
    ['The app will not install or open',
      '<p>Check that your phone runs <b>Android 8.0 or later</b> and has at least <b>2 GB of RAM</b> and <b>300 MB of free storage</b>. If Android asks permission to install from this source, continue only when you reached the download through the official HireNFix page or QR code. See <a href="installation.html#s2">Checking device compatibility</a>.</p>'],
    ['I cannot log in',
      '<p>Check the email address or username and the password, then try again. If you forgot the password, tap <b>Forgot Password?</b> on the Login screen. The steps are in <a href="guides.html#res-recover">Reset a forgotten password</a>.</p>'],
    ['I did not receive a confirmation email',
      '<p>After you register, the app sends a verification email. Selecting the link in it opens the app automatically so you can finish your account information. If it does not arrive, the Login screen has a <b>Resend Confirmation Email</b> option. Look in your spam or junk folder as well, and make sure the email address you registered with is correct.</p>'],
    ['My account is pending and I cannot book yet',
      '<p>After you submit your ID and proof of billing, an Administrator reviews them. Some actions stay limited until you are verified. The differences are explained in <a href="guides.html#res-account-types">Account types and verification</a>.</p>'],
    ['The app is slow or content will not load',
      '<p>HireNFix needs an internet connection. Move to a place with a stronger Wi-Fi or mobile signal, close other apps to free memory, and reopen HireNFix.</p>'],
    ['Where can I get more help?',
      '<p>Ask <b>Fixie</b>, the in-app assistant, read the <a href="guides.html#faq">frequently asked questions</a>, or use the contact details at the bottom of this page.</p>']
  ];

  window.hfFaq = [
    ['What is the difference between a Basic User, a pending Resident and a Verified Resident?',
      '<p>A <b>Basic User</b> has not submitted verification yet and can only browse. A <b>Resident (Pending)</b> has submitted a valid ID and proof of billing, and is waiting for an Administrator to review them. A <b>Verified Resident</b> has been approved and can create requests, book providers and message them.</p>'],
    ['What do I need to register as a Resident?',
      '<p>A username, your barangay, an email address and a password, then a photo of a valid government ID and a photo of a recent proof of billing that shows your address. Providers also upload a Barangay Clearance and take two short assessments.</p>'],
    ['How long does a provider have to answer a booking request?',
      '<p>Providers have up to <b>24 hours</b> to accept or decline a direct booking. You get an in-app notification when they respond.</p>'],
    ['Can I cancel a service on the day it is scheduled?',
      '<p>No. Cancellation is disabled once the service day begins at 12:00 AM. Schedule changes can be requested before the service day.</p>'],
    ['How is payment handled?',
      '<p>Job requests and bookings currently use cash payment. HireNFix records the agreed amount in the service contract and generates a digital receipt after the job is completed.</p>'],
    ['What are transaction tokens?',
      '<p>Tokens limit how many jobs a provider can have open at once. Each provider starts with 2. A token is used when a job is accepted and returns 24 hours after the job is marked complete. At zero tokens a provider cannot apply to new jobs or accept new bookings.</p>'],
    ['How often can a provider retake the Situational Judgment Test?',
      '<p>Once a month. A 1-month waiting period applies after each attempt, and the Profile screen shows the time remaining under Retake Assessment.</p>'],
    ['I forgot my password. What should I do?',
      '<p>On the Login screen choose <b>Forgot Password?</b>, enter your registered email, select <b>Send Reset Link</b>, then follow the link in your email to create a new password (at least 6 characters with one uppercase letter, one lowercase letter and one number).</p>'],
    ['How do I report a problem with a provider?',
      '<p>Open <b>Manage Requests</b>, select the job, tap <b>Report</b>, choose a report type, describe what happened and tap <b>Submit Report</b>. Administrators review every report.</p>'],
    ['Which phones are supported?',
      '<p>The manuals list Android 8.0 or later with at least 2 GB of RAM and 300 MB of free storage. Support for other platforms is not stated in the manuals.</p>'],
    ['Who can use the Administrator system?',
      '<p>Only authorized Administrators. It is a web system opened in a desktop browser, and it is separate from the mobile app.</p>']
  ];

  window.hfContactSupport = function () {
    return '<div class="support"><div><span class="kicker">' + icon('life-buoy') + ' Contact support</span>' +
      '<h2 style="font-size:clamp(1.6rem,3vw,2.2rem);font-weight:800">Need help that is not in the guides?</h2>' +
      '<p style="margin-top:12px;color:var(--muted)">Ask Fixie, the in-app help assistant, or reach the HireNFix team using the details below.</p></div>' +
      '<div class="opts">' +
      '<div class="opt"><span class="ico">' + icon('bot') + '</span><div><b>Fixie Assistant</b><span>In the app, tap the round headset icon above the bottom bar, or open Profile and choose Fixie Assistant.</span></div></div>' +
      '<div class="opt"><span class="ico">' + icon('mail') + '</span><div><b>Email</b><span>' +
      (C.supportEmail ? '<a id="sup-email" href="mailto:' + C.supportEmail + '">' + C.supportEmail + '</a>' : '<span class="todo">Support email to be added by the team</span>') + '</span></div></div>' +
      (C.supportPhone ? '<div class="opt"><span class="ico">' + icon('phone') + '</span><div><b>Phone</b><span>' + C.supportPhone + '<button class="copy-btn" data-copy="' + C.supportPhone + '">Copy</button></span></div></div>' : '') +
      '</div></div>';
  };
  function fillContact() {
    document.querySelectorAll('[data-contact]').forEach(function (el) { el.innerHTML = window.hfContactSupport(); });
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-copy]'); if (!b) return;
      var v = b.getAttribute('data-copy');
      var done = function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1600); };
      try { navigator.clipboard.writeText(v).then(done, done); } catch (er) { done(); }
    });
  }

  function fillQr() {
    document.querySelectorAll('[data-qr]').forEach(function (el) {
      if (C.qrImage) { el.outerHTML = '<img src="' + C.qrImage + '" alt="QR code to open HireNFix" width="440" height="440">'; }
      else { el.className = 'qr-ph'; el.innerHTML = '<b>QR code</b><small>to be provided</small>'; el.setAttribute('role', 'img'); el.setAttribute('aria-label', 'QR code not yet available'); }
    });
  }
  function fillDownloadLinks() {
    document.querySelectorAll('[data-dl]').forEach(function (a) {
      if (C.downloadUrl) { a.href = C.downloadUrl; a.target = '_blank'; a.rel = 'noopener'; }
      else { a.setAttribute('aria-disabled', 'true'); a.removeAttribute('href'); }
    });
    document.querySelectorAll('[data-pdf]').forEach(function (a) {
      var k = a.getAttribute('data-pdf');
      a.href = C.manuals[k]; a.target = '_blank'; a.rel = 'noopener';
    });
  }

  function tabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (wrap) {
      var btns = wrap.querySelectorAll('[role="tab"]');
      var panels = wrap.querySelectorAll('[role="tabpanel"]');
      function show(id, focus) {
        btns.forEach(function (b) { var on = b.getAttribute('aria-controls') === id; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
        panels.forEach(function (p) { p.hidden = p.id !== id; });
      }
      btns.forEach(function (b, i) {
        b.addEventListener('click', function () { var id = b.getAttribute('aria-controls'); show(id); if (wrap.hasAttribute('data-tabs-hash')) history.replaceState(null, '', '#' + id.replace('panel-', '')); });
        b.addEventListener('keydown', function (e) {
          var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
          if (n === null) return; n = (n + btns.length) % btns.length; show(btns[n].getAttribute('aria-controls'), true); e.preventDefault();
        });
      });
      function fromHash() {
        var h = location.hash.slice(1);
        if (h && document.getElementById('panel-' + h) && wrap.hasAttribute('data-tabs-hash')) show('panel-' + h);
      }
      window.addEventListener('hashchange', fromHash); fromHash();
    });
  }

  function onHash() {
    // smooth scroll for plain in-page hash anchors that point to sections
    if (!location.hash) return;
    var el = document.getElementById(location.hash.slice(1));
    if (el && !el.hasAttribute('role')) setTimeout(function () { el.scrollIntoView(); }, 50);
  }

  function init() {
    applyTheme(); buildHeader(); buildHelp(); buildFooter(); buildBreadcrumbs(); fillContact();
    paintIcons(); accordion(); tabs(); fillQr(); fillDownloadLinks(); buildBackToTop(); onHash();
    document.querySelectorAll('[data-faq]').forEach(function (el) { var n = parseInt(el.getAttribute('data-faq'), 10); el.innerHTML = window.hfAccordion(n ? window.hfFaq.slice(0, n) : window.hfFaq); });
    document.querySelectorAll('[data-trouble]').forEach(function (el) { el.innerHTML = window.hfAccordion(window.hfTrouble); });
    var y = document.getElementById('year'); if (y) y.textContent = C.year;
  }
  window.hfInit = init;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

/* Brand link: on the home page, reload from the top */
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a.brand'); if (!a) return;
  var p = location.pathname;
  if (/(^|\/)(index\.html)?$/.test(p)) {
    e.preventDefault();
    try { history.replaceState(null, '', p + location.search); } catch (x) {}
    window.scrollTo(0, 0);
    location.reload();
  }
});
