/* Feature cards + detail dialog. img: screenshot name in assets/img (null = labeled placeholder). */
(function () {
  var F = {
    resident: [
      ['Account Registration and Login', 'Register with a username, barangay and email, then upload a valid ID and proof of billing. Log in with your email or username.', 'Keeps the marketplace limited to verified Valenzuela City residents.', 'reg-account', 'res-registration'],
      ['Browse Local Service Providers', 'Search categories and the Service Offers tab. Each listing shows rating, skill level, experience and a fixed starting price.', 'Helps you compare providers before you commit.', 'hub-offers', 'res-hirehub'],
      ['Manage Service Requests', 'Track every request under Open, Assigned, Active Deals, Completed and Cancelled, and open contracts or details.', 'Gives one place to follow each job from posting to completion.', 'my-requests-list', 'res-manage'],
      ['Review Applications', 'When providers apply to your job, compare their prices and estimated completion times, then accept or reject.', 'Lets you choose the best fit for the work.', 'hub-requests', 'res-hirehub'],
      ['Direct Booking', 'Tap Book Now on a service offer, confirm the address, pick a date and time, and send the request.', 'Skips the waiting for applications when you already know who you want.', 'book-service', 'res-offers'],
      ['Messaging and Notifications', 'Chat with providers and see real-time alerts for applications, bookings and status changes.', 'Keeps coordination inside the app.', 'notifications', 'res-notifs'],
      ['Payment Management', 'Payment is cash. The agreed amount is recorded in the contract, and a digital receipt is generated for completed deals.', 'Creates a clear record of what was agreed and done.', 'receipt-resident', 'res-receipt'],
      ['Feedback and Reviews', 'Rate completed jobs from 1 to 5 stars and write an optional review.', 'Helps other residents find reliable providers.', 'rate', 'res-reviews'],
      ['Dispute Reporting', 'Report a completed or ongoing job as a scam, no show, poor quality, payment issue, safety concern and more.', 'Sends serious problems to an Administrator for review.', 'report-issue', 'res-report']
    ],
    provider: [
      ['Account Registration and Verification', 'Register as a Worker with your trade, experience and portfolio, then upload a Barangay Clearance for review.', 'Makes sure only verified providers can work on the platform.', 'reg-worker', 'prov-register'],
      ['Situational Judgement Test (SJT)', 'A multiple-choice test of real scenarios for your trade. Your score becomes a Beginner, Intermediate or Advance tag.', 'Shows residents your skill level at a glance.', 'sjt', 'prov-assess'],
      ['Work Integrity Assessment (WIA)', 'A 15-question assessment of Integrity, Responsibility and Reliability. Results are internal to Administrators.', 'Supports safe approval of new providers.', 'wia', 'prov-assess'],
      ['Manage Service Offerings', 'Publish a bookable service with a title, scope and fixed starting rate, and add portfolio photos.', 'Lets residents book you directly.', 'create-offer', 'prov-offer'],
      ['Manage Applications and Bookings', 'Follow active offers, pending requests, confirmed and completed jobs, and answer direct bookings within 24 hours.', 'Keeps your workload organized.', 'my-jobs', 'prov-bookings'],
      ['Token Management', 'Start with 2 tokens. Each accepted job uses one, and it returns 24 hours after completion.', 'Prevents overbooking and keeps service quality steady.', 'dash-provider', 'prov-tokens'],
      ['Messaging and Notifications', 'Chat with clients and receive alerts such as new applications, new bookings and Token Restored.', 'Keeps you updated on every request.', 'notifications', 'prov-comms'],
      ['Portfolio Management', 'Add or remove project photos and update your trade details from Edit Worker Information.', 'Builds trust with examples of your work.', 'edit-worker', 'prov-profile'],
      ['Account Health Monitoring', 'See a status gauge, rating, verification, profile completeness and booking activity.', 'Shows how you are doing against Trust and Safety guidelines.', 'account-health-provider', 'prov-health']
    ],
    admin: [
      ['Manage User Accounts', 'Search, filter and export Residents and Workers, open details, edit or delete accounts.', 'Gives Administrators one list of everyone on the platform.', 'admin-users', 'adm-users'],
      ['Verify Service Providers', 'Review a Worker’s ID, billing and portfolio, then approve or reject the verification.', 'Controls who can offer services.', 'admin-verify', 'adm-verify'],
      ['Monitor Transactions and Payments', 'The Activity Ledger lists every deal with status and payment, with search, filter and export.', 'Provides oversight of platform activity.', 'admin-ledger', 'adm-transactions'],
      ['Manage Disputes and Reports', 'Review reports with their deals, freeze or unfreeze tokens, suspend or ban users, and mark reports resolved.', 'Resolves problems fairly and consistently.', 'admin-reports', 'adm-reports'],
      ['Monitor Account Health', 'Token status badges on report cards show whether a reported user’s tokens are active or frozen.', 'Shows the operating capacity of reported users.', 'admin-report-card', 'adm-reports'],
      ['Manage Assessments', 'Add, edit and delete SJT and WIA questions. SJT questions are generated with AI and scored 4, 3, 2, 1.', 'Keeps the skills and integrity tests current.', 'admin-sjt', 'adm-assess'],
      ['Configure Chatbot', 'Maintain intents, patterns, responses and target screens for the Fixie assistant.', 'Improves the help users receive in the app.', 'admin-ai', 'adm-ai'],
      ['Monitor System Records', 'Review the Admin Audit Trail and security notes in System Settings, and export the list.', 'Creates accountability for administrative actions.', 'admin-settings', 'adm-system']
    ]
  };
  var labels = { resident: 'Resident feature', provider: 'Provider feature', admin: 'Administrator feature' };

  var AREA = {
    account: ['Account Registration and Login', 'Account Registration and Verification', 'Manage User Accounts', 'Portfolio Management', 'Monitor System Records'],
    booking: ['Browse Local Service Providers', 'Manage Service Requests', 'Review Applications', 'Direct Booking', 'Manage Service Offerings', 'Manage Applications and Bookings', 'Token Management'],
    messaging: ['Messaging and Notifications', 'Configure Chatbot'],
    payment: ['Payment Management', 'Monitor Transactions and Payments'],
    assessment: ['Situational Judgement Test (SJT)', 'Work Integrity Assessment (WIA)', 'Manage Assessments', 'Verify Service Providers'],
    feedback: ['Feedback and Reviews', 'Dispute Reporting', 'Account Health Monitoring', 'Manage Disputes and Reports', 'Monitor Account Health']
  };
  function areaOf(name) { for (var k in AREA) { if (AREA[k].indexOf(name) > -1) return k; } return 'account'; }
  var icon = window.hfIcon;
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  document.querySelectorAll('[data-features]').forEach(function (box) {
    var role = box.getAttribute('data-features');
    box.innerHTML = F[role].map(function (f, i) {
      var thumb = f[3] ? '<img src="assets/img/' + f[3] + '.webp" alt="' + esc(f[0]) + ' screenshot" loading="lazy">'
        : '<div class="ph">' + icon('image') + 'Screenshot placeholder<small>Add a ' + esc(f[0]) + ' screen here</small></div>';
      return '<article class="card feat-card feature-card" data-area="' + areaOf(f[0]) + '" data-text="' + esc((f[0] + ' ' + f[1] + ' ' + f[2]).toLowerCase()).replace(/"/g, '&quot;') + '"><div class="thumb">' + thumb + '</div><div class="body"><h3>' + esc(f[0]) + (f[5] ? ' <span class="pill warn" style="vertical-align:2px">To confirm</span>' : '') + '</h3><p>' + esc(f[1]) + '</p>' +
        '<p class="purpose"><b>Purpose:</b> ' + esc(f[2]) + '</p><button type="button" class="btn btn-ghost btn-sm" data-role="' + role + '" data-i="' + i + '">View details ' + icon('arrow-right') + '</button></div></article>';
    }).join('');
  });


  /* search + area filter */
  var q = document.getElementById('feat-search'), chips = document.getElementById('feat-chips'), count = document.getElementById('feat-count');
  var area = 'all';
  function applyFilter() {
    var term = (q ? q.value : '').trim().toLowerCase(), words = term ? term.split(/\s+/) : [];
    var perRole = {}, total = 0;
    document.querySelectorAll('[data-features]').forEach(function (box) {
      var role = box.getAttribute('data-features'), shown = 0;
      box.querySelectorAll('.feature-card').forEach(function (c) {
        var ok = (area === 'all' || c.getAttribute('data-area') === area) && words.every(function (w) { return c.getAttribute('data-text').indexOf(w) > -1; });
        c.hidden = !ok; if (ok) shown++;
      });
      var empty = box.querySelector('.feat-empty');
      if (!shown) {
        if (!empty) { empty = document.createElement('p'); empty.className = 'feat-empty'; box.appendChild(empty); }
        empty.textContent = 'No ' + labels[role].toLowerCase().replace(' feature', '') + ' features match. Try another tab, a different word, or All areas.';
      } else if (empty) empty.remove();
      perRole[role] = shown; total += shown;
    });
    ['resident', 'provider', 'admin'].forEach(function (r) {
      var t = document.getElementById('tab-' + r); if (!t) return;
      var b = t.querySelector('.tab-count'); if (!b) { b = document.createElement('span'); b.className = 'tab-count'; t.appendChild(b); }
      b.textContent = perRole[r];
    });
    if (count) count.textContent = (term || area !== 'all') ? total + ' feature' + (total === 1 ? '' : 's') + ' found across all three roles' : '';
  }
  if (q) q.addEventListener('input', applyFilter);
  if (chips) chips.addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    area = b.getAttribute('data-area');
    chips.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c === b ? 'true' : 'false'); });
    applyFilter();
  });
  applyFilter();

  var dlg = document.getElementById('feat-modal');
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-role][data-i]');
    if (b && b.tagName === 'BUTTON') {
      var f = F[b.getAttribute('data-role')][+b.getAttribute('data-i')], role = b.getAttribute('data-role');
      document.getElementById('m-title').textContent = f[0];
      document.getElementById('m-role').textContent = labels[role];
      document.getElementById('m-desc').textContent = f[1];
      document.getElementById('m-purpose').textContent = f[2];
      document.getElementById('m-img').innerHTML = f[3] ? '<img src="assets/img/' + f[3] + '.webp" alt="' + esc(f[0]) + ' screenshot">' : '<div class="ph" style="width:100%">' + icon('image') + 'Screenshot placeholder<small>Not covered in the current manual</small></div>';
      document.getElementById('m-link').href = 'guides.html#' + f[4];
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
      return;
    }
    if (e.target.closest('#m-close') || e.target === dlg) dlg.close();
    if (e.target.closest('#m-link')) dlg.close();
  });
  window.hfPaintIcons(document);
  if (location.hash === '' || location.hash === '#') return;
})();
