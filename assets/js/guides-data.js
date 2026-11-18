/* Documentation content for the three HireNFix user manuals.
   Block helpers keep the content readable. **bold** is supported in text. */
(function () {
  var IMG = 'assets/img/';
  var p = function (x) { return { t: 'p', x: x }; };
  var h = function (x) { return { t: 'h', x: x }; };
  var steps = function () { return { t: 'steps', items: [].slice.call(arguments) }; };
  var ul = function () { return { t: 'ul', items: [].slice.call(arguments) }; };
  var note = function (x) { return { t: 'note', k: 'info', x: x }; };
  var tip = function (x) { return { t: 'note', k: 'tip', x: x }; };
  var warn = function (x) { return { t: 'note', k: 'info', x: x }; };
  var shots = function () { return { t: 'shots', items: [].slice.call(arguments).map(function (a) { return { src: IMG + a[0] + '.webp', cap: a[1], alt: a[1] }; }) }; };
  var wide = function () { var s = shots.apply(null, arguments); s.wide = true; return s; };
  var table = function (head, rows) { return { t: 'table', head: head, rows: rows }; };
  var flow = function () { return { t: 'flow', items: [].slice.call(arguments) }; };

  var RES = {
    id: 'resident', short: 'res', title: 'Resident User Guide', role: 'Resident',
    intro: 'For people in Valenzuela City who want to find, book and review local service providers.',
    pdf: 'resident', icon: 'house',
    chapters: [
      { title: 'Getting started', topics: [
        { id: 'res-install', title: 'Install the app', summary: 'How to open HireNFix on your phone and what your device needs.', blocks: [
          h('Open the app'),
          steps('Scan the official HireNFix QR code with your phone camera or a QR scanner app, or open the access link in a browser.', 'Your phone goes to the HireNFix application page.', 'Choose **Install** for the app.', 'Wait for the installation to complete.', 'Launch HireNFix.'),
          note('Make sure your phone has a stable internet connection before you scan the QR code, open the link or use the app.'),
          shots(['qr', 'Official HireNFix QR code from the user manual']),
          h('Minimum requirements'),
          table(['Requirement', 'Minimum'], [['Mobile OS', 'Android 8.0'], ['RAM', 'At least 2 GB'], ['Storage', 'At least 300 MB available'], ['Internet', 'Stable connection']]),
          p('For a fuller walkthrough with every step, see the [Installation Guide](installation.html).')
        ] },
        { id: 'res-registration', title: 'Create a Resident account', summary: 'Register in three steps: account information, valid ID and proof of billing.', blocks: [
          p('To keep the platform safe, every Resident submits identity and address documents. Registration has sequential steps, and the account is then sent to a System Administrator for verification.'),
          flow('Register', 'Account information', 'Valid ID', 'Proof of billing', 'Complete registration', 'Pending verification', 'Admin review'),
          h('Step 1 – Account information'),
          steps('Open HireNFix and tap **Register**.', 'Enter a **Username**, select your **Barangay**, enter your **Email Address**, then create a **Password** and re-enter it under **Confirm Password**.', 'Tick the consent boxes to accept the **Terms & Conditions** and **Privacy Policy**. Both are required.', 'Tap **Register as Resident** to continue to document verification.'),
          shots(['reg-account', 'Register as Resident screen']),
          h('Step 2 – Valid ID verification'),
          steps('Select the **Type of Valid ID**.', 'Upload a photo of the ID.', 'Review the uploaded photo.', 'Tap **Remove** if you need to replace the image.', 'Tap **Continue**.'),
          h('Step 3 – Proof of billing'),
          steps('Select the **Type of Billing Statement**.', 'Upload a photo of the proof of billing for your residence.', 'Review the uploaded document and tap **Remove** to replace it if needed.', 'If you also want to offer services, tick **Register as Worker?**.', 'Tap **Complete Registration** to submit.'),
          shots(['reg-id', 'Step 2: Valid ID'], ['reg-billing', 'Step 3: Proof of billing'])
        ] },
        { id: 'res-account-types', title: 'Account types and verification', summary: 'What a Basic User, a Pending Resident and a Verified Resident can do.', blocks: [
          p('If you sign up without finishing verification, your account starts as a **Basic User** with read-only access. A **Verify Now** button on the dashboard and profile lets you submit your documents at any time.'),
          ul('**Basic User:** unverified, can explore the app.', '**Resident (Pending Verification):** documents submitted and under Administrator review. Core features stay locked.', '**Verified Resident:** approved, with full access to booking and requests.'),
          table(['Function', 'Basic User', 'Resident (Pending)', 'Verified Resident'], [
            ['Login', 'Available', 'Available', 'Available'], ['Basic dashboard', 'Available', 'Available', 'Available'],
            ['View / update basic profile', 'Available', 'Available', 'Available'], ['In-app notifications', 'Available', 'Available', 'Available'],
            ['Chatbot / help assistant', 'Available', 'Available', 'Available'], ['“Verify Now” action', 'Available', 'In review', 'Completed'],
            ['Create service requests', 'Restricted', 'Restricted', 'Available'], ['Booking and scheduling', 'Restricted', 'Restricted', 'Available'],
            ['Messaging providers', 'Restricted', 'Restricted', 'Available']]),
          h('Verification outcomes'),
          p('The Administrator reviews your submission and decides one of three outcomes: **Approved** (you become a Verified Resident), **Pending** (you stay a Basic User while under review) or **Rejected** (the account cannot access restricted features).'),
          shots(['status-resident', 'The three verification outcomes'], ['profile-basic', 'Verify Now button on a Basic User profile']),
          h('The Verify Now workflow'),
          ul('**Account information:** full legal name, permanent address and your Valenzuela City barangay.', '**Valid ID:** a clear photo of an accepted government ID, such as PhilID, Driver’s License, UMID or Postal ID, plus the ID number.', '**Proof of billing:** a recent utility or internet bill showing your address, for example Meralco or Maynilad.')
        ] },
        { id: 'res-login', title: 'Log in', summary: 'Sign in with your email or username.', blocks: [
          steps('Open HireNFix.', 'Enter your registered email address or username.', 'Enter your password.', 'Tap **Login**.', 'The system checks your details. Pending accounts enter as Basic Users and approved accounts enter as Verified Residents.'),
          shots(['login', 'Login screen']),
          note('After you register, the app sends a verification email. Select the link in it and you return to the app automatically to finish your account information. If you did not get the email, use **Resend Confirmation Email** on the Login screen.')
        ] },
        { id: 'res-recover', title: 'Forgot password', summary: 'Reset your password by email.', blocks: [
          steps('On the Login screen, tap **Forgot Password?**.', 'Enter the email address linked to your account.', 'Tap **Send Reset Link**.', 'Open your email and click the reset link.', 'On **Create New Password**, enter a new password with at least 6 characters, one uppercase letter, one lowercase letter and one number.', 'Re-enter it under **Confirm Password** and tap **Reset Password**.', 'Tap **Back to Login** and sign in with your new password.'),
          shots(['forgot-password', 'Forgot Password'], ['reset-password', 'Create New Password'])
        ] }
      ] },
      { title: 'Finding and hiring', topics: [
        { id: 'res-dashboard', title: 'Dashboard', summary: 'Your starting point after login.', blocks: [
          p('The dashboard shows the functions available for your current account status. For a Verified Resident it includes:'),
          ul('A **profile summary** with your name and account type in the top banner.', 'Your **current location**, with an option to change it.', '**Quick actions:** Post Request and Manage Requests.', '**Service categories** for browsing available services.', '**Bottom navigation:** Home, Hire Hub, Chatbot, Calendar and Profile.'),
          shots(['dash-resident', 'Verified Resident dashboard'])
        ] },
        { id: 'res-hirehub', title: 'Hire Hub', summary: 'The marketplace where residents and providers meet.', blocks: [
          p('The Hire Hub has two tabs, **Job Request** and **Service Offers**, plus a search and filter bar.'),
          h('Job Request tab'),
          p('Check here to see who wants to take the jobs you posted. When providers apply, their offers appear under **Pending Applications** so you can compare and choose. If you see “No pending applications”, nobody has applied yet or you have no open request.'),
          h('Service Offers tab'),
          p('Browse services that providers have listed. Each card shows:'),
          ul('The provider’s name, photo or initial, area of expertise and years of experience.', 'Star ratings and skill level, such as Intermediate.', 'The exact service offered and a short summary.', 'The fixed starting price in Philippine Peso (₱).'),
          shots(['hub-requests', 'Job Request tab'], ['hub-offers', 'Service Offers tab'])
        ] },
        { id: 'res-offers', title: 'Book a service offer', summary: 'Use Book Now to hire a provider directly.', blocks: [
          p('Tap **Book Now** on any listing to open the **Book Service** screen.'),
          ul('**Service details and fee:** job title, scope and the fixed price, for example ₱500.00.', '**Service address:** filled in with your registered address.', '**Preferred date and time:** your target date and arrival time.', '**Additional notes (optional):** special instructions or landmarks.'),
          steps('Review the service fee and confirm or change the address.', 'Pick your preferred date and time.', 'Add notes if you need to.', 'Tap **Send Booking Request**.'),
          note('The provider has up to 24 hours to accept or decline. You receive an in-app notification when they respond. Payment method is cash.'),
          shots(['book-service', 'Book Service screen'])
        ] },
        { id: 'res-viewprofile', title: 'View a provider profile', summary: 'Check credentials and past work before you book.', blocks: [
          p('Tap **View Profile** on any service card.'),
          ul('**Profile overview:** photo, name, trade, years of experience, rating and online or offline status.', '**Knowledge Assessment:** the provider’s result on the official HireNFix skills test.', '**Message Provider:** ask questions before you hire.', '**About:** personal introduction, primary service area and expertise level.', '**Services:** every service and package the provider offers.', '**Portfolio:** photos of completed projects.', '**Reviews:** ratings and feedback from other clients.'),
          shots(['provider-profile', 'Provider profile'])
        ] },
        { id: 'res-request', title: 'Request a job', summary: 'Post a job request or book a listed service.', blocks: [
          p('A Verified Resident has two options: **create a Job Request** and receive applications from providers, or **book a Service Offering** directly in the Hire Hub.'),
          h('Create a job request'),
          steps('Select **Post Request** on the dashboard, or **Create Request** in the Hire Hub.', 'Enter a **Title**.', 'Select the **Service Category** and **Service Type**.', 'Describe the problem.', 'Optionally upload photos of the issue.', 'Enter the service address or select **Use current location**.', 'Enter your preferred date and time.', 'Choose the payment method (cash only).', 'Leave **Notify nearby service providers** ticked if you want nearby providers alerted.', 'Select **Create Request**, then wait for providers to apply.'),
          shots(['create-request', 'Create Request form']),
          h('Search services'),
          steps('Open **Services** and use the search bar, or pick a category.', 'Browse the services listed in that category.', 'In the Hire Hub, switch to **Service Offers** to see provider listings.', 'Open a listing to see the provider’s name, experience, rating and description.'),
          note('If nothing matches, the app shows **No Results Found**.'),
          shots(['services', 'Service categories'], ['service-list', 'Providers in a category'])
        ] },
        { id: 'res-manage', title: 'Manage service requests', summary: 'Track requests, review applications and open contracts.', blocks: [
          p('Select **Manage Requests** on the dashboard to open **My Requests**. Filter with these tabs:'),
          ul('**All:** every request you submitted.', '**Open:** open for providers to apply.', '**Assigned:** given to a provider.', '**Active Deals:** requests with an active arrangement.', '**Completed:** finished jobs.', '**Cancelled:** ended by you or the provider before the work was done.'),
          h('Request actions'),
          ul('**View Details:** category, location, schedule and provider profile.', '**View Contract:** the agreement with terms, scope and final cost.', '**Review:** rate a completed job. Afterwards the button becomes a static “Your Review” banner.', '**Report:** file a complaint about a completed service.'),
          h('Manage applications'),
          p('You can review applications from providers, compare proposed prices and estimated completion times, then accept or reject each one.'),
          shots(['my-requests-list', 'My Requests list'], ['my-requests', 'Completed request with actions'])
        ] },
        { id: 'res-contract', title: 'Booking agreement', summary: 'The service contract generated for every booking.', blocks: [
          p('When a booking is finalized, HireNFix generates a service contract. Open it from **My Requests** by tapping **View Contract** on the request card.'),
          ul('Under **Section 7 (Agreement and Signatures)** both parties confirm they have reviewed the details and terms.', 'The app records platform acceptance with the booking reference.', 'Signature fields are created for the Resident, the Worker and a Witness.', 'Tap **Download / Share PDF** at the bottom to keep a copy.'),
          shots(['contract', 'Service contract'])
        ] }
      ] },
      { title: 'After you book', topics: [
        { id: 'res-schedule', title: 'Schedule a service', summary: 'Coordinate the date once both sides accept.', blocks: [
          ul('Messaging becomes available after both sides accept.', 'You can request schedule changes before the service day.', 'Cancellation is disabled once the service day begins at 12:00 AM.'),
          shots(['calendar-resident', 'Calendar'])
        ] },
        { id: 'res-receipt', title: 'Digital receipt', summary: 'The official record of a completed job.', blocks: [
          p('On a completed request card in **My Requests**, tap **View Details** to open **Deal Details**, which shows the full service breakdown, schedule and provider contact options.'),
          p('The digital receipt contains:'),
          ul('**Deal ID:** a unique identifier for tracking.', '**Service and category.**', '**Party details:** names of the Resident and the Service Provider.', '**Amount:** the final total for the work.', '**Timestamps:** when the service was completed and when the receipt was generated.', '**Completion signature:** confirmation that both sides validated completion in HireNFix.', '**Proof of service:** final job evidence or system records.'),
          shots(['deal-resident', 'Deal Details'], ['receipt-resident', 'Digital receipt'])
        ] },
        { id: 'res-reviews', title: 'Ratings and reviews', summary: 'Rate a provider after a job is finished.', blocks: [
          steps('Open **Manage Requests** and select the **Completed** tab.', 'Tap the blue **Review** button on the request.', 'Tap 1 to 5 stars on **Rate Your Experience**.', 'Optionally write what you liked or how the provider can improve.', 'Tap **Submit Review**, or **Maybe Later** to review another time.'),
          shots(['rate', 'Rate Your Experience'])
        ] },
        { id: 'res-report', title: 'Submit a report or complaint', summary: 'Send an issue to the Administrator for review.', blocks: [
          steps('Go to **My Requests** and select your completed or ongoing job.', 'Tap **Report** to open **Report Issue**.', 'Choose a report type: Inappropriate Behavior, Suspected Scam, No Show, Poor Quality Work, Payment Issue, Safety Concern or Other.', 'Describe what happened with specific facts.', 'Tap **Submit Report**.'),
          shots(['report-issue', 'Report Issue window'])
        ] }
      ] },
      { title: 'Your account', topics: [
        { id: 'res-health', title: 'Account health', summary: 'See your standing on the platform.', blocks: [
          p('Open **Profile → Account Health** for a private view of your compliance with HireNFix Trust & Safety guidelines.'),
          ul('**Account status gauge:** a green-to-red indicator, calculated from metrics such as your average rating.', '**Completed-job rating:** your overall rating.', '**Verification:** your identity and document status.', '**Profile completeness:** whether required fields are filled.', '**Booking activity:** bookings created versus jobs completed.'),
          shots(['account-health', 'Account Health'])
        ] },
        { id: 'res-notifs', title: 'Notifications', summary: 'Real-time alerts about hiring and bookings.', blocks: [
          steps('Tap the **Message** icon in the top-right corner of the top bar.', 'The Messages center opens on the **Chats** tab.', 'Switch to the **Notifications** tab.'),
          note('Unread alerts show a blue dot. Tapping a notification takes you to the related booking or application.'),
          shots(['notifications', 'Notifications tab'])
        ] },
        { id: 'res-messages', title: 'Messages', summary: 'Chat with providers inside the app.', blocks: [
          p('Direct messages let you agree on arrival details, tools and materials. Open chats in two ways:'),
          ul('Tap the **Message** icon in the top-right corner of a main screen and make sure **Chats** is selected.', 'Open a provider’s profile and tap **Message Provider**.'),
          shots(['chat', 'Conversation'], ['messages', 'Chats list'])
        ] },
        { id: 'res-chatbot', title: 'Chatbot (Fixie)', summary: 'Ask the help assistant about app functions.', blocks: [
          p('The HireNFix chatbot answers questions about supported app functions and common questions. Open it from:'),
          ul('The round **headset icon** above the bottom navigation bar on primary screens.', '**Profile → Fixie Assistant**.'),
          shots(['chatbot', 'Fixie Assistant'])
        ] },
        { id: 'res-profile', title: 'Profile and settings', summary: 'Update details and manage preferences.', blocks: [
          ul('**Edit Profile Information:** contact numbers, legal name and address.', '**Notification toggle:** push alerts for jobs, messages and bookings.', '**Fixie Assistant:** the AI help assistant.', '**Client Report:** feedback, complaints and disputes you filed.', '**Account Health:** your compliance standing.', '**Settings:** preferences such as dark mode, Help Center, Privacy Policy and Terms of Service.', '**Logout.**'),
          shots(['profile-resident', 'Profile menu'])
        ] },
        { id: 'res-logout', title: 'Log out', summary: 'End your session safely.', blocks: [
          steps('Tap the **Profile** icon in the bottom navigation bar.', 'Scroll to the bottom and tap **Logout**.', 'The app ends your session and returns to the Login screen.'),
          note('To use your bookings, messages and account again, sign back in with your registered email and password.')
        ] }
      ] }
    ]
  };

  var PRO = {
    id: 'provider', short: 'prov', title: 'Service Provider User Guide', role: 'Local Service Provider',
    intro: 'For local workers who offer services, apply to jobs and manage bookings.',
    pdf: 'provider', icon: 'wrench',
    chapters: [
      { title: 'Getting started', topics: [
        { id: 'prov-install', title: 'Install the app', summary: 'Open HireNFix and check your device.', blocks: [
          steps('Scan the official HireNFix QR code with your phone camera or a QR scanner app, or open the access link in a browser.', 'Choose **Install** for the app.', 'Wait for the installation to finish.', 'Launch HireNFix.'),
          table(['Requirement', 'Minimum'], [['Mobile OS', 'Android 8.0'], ['RAM', 'At least 2 GB'], ['Storage', 'At least 300 MB available'], ['Internet', 'Stable connection']]),
          note('Use a stable internet connection before scanning the QR code or opening the link. The full steps are in the [Installation Guide](installation.html).')
        ] },
        { id: 'prov-register', title: 'Register as a provider', summary: 'Five steps from account to clearance.', blocks: [
          p('Providers first create a Resident account (account information, valid ID, proof of billing), then register as a Worker.'),
          flow('Account information', 'Valid ID', 'Proof of billing', 'Register as Worker', 'Clearance and consent', 'Assessments'),
          h('Steps 1 to 3 – Account, ID and billing'),
          p('These match the Resident registration. On the proof of billing screen, tick **Register as Worker** and then tap **Continue**. See [Create a Resident account](guides.html#res-registration).'),
          h('Step 4 – Register as Worker'),
          p('Define the trade profile that appears on your public listings and service offerings.'),
          ul('Enter a **Business / Professional Name**.', 'Select a **Service Category**, for example Painting, Plumbing, Electrical or Carpentry.', 'Enter **Years of Experience** and a **Service Description**.', 'Pick **Services**. Selected tags appear under Selected Services and can be removed with the × icon.', 'Optionally add **Portfolio Images** of past work.', 'Tap **Next**.'),
          h('Step 5 – Professional clearance and legal consent'),
          ul('**Barangay Clearance:** upload a clear photo or scan. This upload is required.', '**Legal consent:** tick both boxes to accept the Terms & Conditions and confirm you read the Privacy Policy.', 'Tap **Continue to Assessment**.'),
          shots(['reg-worker', 'Register as Worker'], ['reg-clearance', 'Professional clearance'])
        ] },
        { id: 'prov-assess', title: 'Skill and integrity assessments', summary: 'Two required tests finish your onboarding.', blocks: [
          p('Answer every question. The system does not accept incomplete submissions.'),
          h('Situational Judgment Test (SJT)'),
          p('A multiple-choice test of real-world scenarios for your trade. Each answer earns 1 to 4 points. When you submit, the system adds your score and puts a skill-level tag on your public profile, which Residents see in the Hire Hub.'),
          table(['Score range', 'Skill-level tag'], [['0 – 9 points', 'Beginner'], ['10 – 19 points', 'Intermediate'], ['20 – 30 points', 'Advance']]),
          ul('Questions and answers are randomized every session.', 'You can retake the SJT to improve your score, with a mandatory **1-month wait** between attempts. Check the time left under **Retake Assessment** on your Profile.'),
          shots(['sjt', 'Situational Judgment Test']),
          h('Work Integrity Assessment (WIA)'),
          p('A mandatory 15-question assessment of three traits: **Integrity, Responsibility and Reliability**. Each trait is scored out of 20 points and converted to a percentage. Your classification depends on meeting minimum scores in all three.'),
          note('WIA results are strictly internal. Residents never see them. If an account is flagged for review, approval pauses until an Administrator reviews it.'),
          shots(['wia', 'Work Integrity Assessment']),
          h('After you submit'),
          shots(['status-provider', 'Provider verification outcomes: Verified, Under Admin Review, Rejected'])
        ] },
        { id: 'prov-login', title: 'Log in and recover your account', summary: 'Sign in, or reset your password.', blocks: [
          steps('Open HireNFix.', 'Enter your registered email or username and your password.', 'Tap **Login**. Pending accounts enter as Basic Users and approved accounts enter with full access.'),
          h('Forgot password'),
          steps('On the Login screen, tap **Forgot Password?**.', 'Enter your registered email and tap **Send Reset Link**.', 'Open the link in your email.', 'Create a new password with at least 6 characters, one uppercase letter, one lowercase letter and one number, and confirm it.', 'Tap **Reset Password**, then **Back to Login** and sign in.'),
          shots(['login', 'Login'], ['forgot-password', 'Forgot Password'])
        ] },
        { id: 'prov-switch', title: 'Switch between Provider and Resident', summary: 'Use one account in either mode.', blocks: [
          p('A single account can work as a Provider or a Resident. Switch from the Profile screen without logging out.'),
          steps('Go to **Profile**.', 'Find the **Switch Mode** control labeled **Resident ↔ Provider**.', 'Tap the toggle. The dashboard, bottom navigation and available functions refresh for the new mode.'),
          note('Switching modes does not create a new account. It changes which dashboard and permissions are active. Your online status and current mode appear at the top of Profile.'),
          shots(['profile-provider', 'Profile with Switch Mode'])
        ] }
      ] },
      { title: 'Finding work', topics: [
        { id: 'prov-dashboard', title: 'Dashboard', summary: 'Workload, tokens and quick actions.', blocks: [
          ul('**Profile summary** with your name and account type.', '**Workload and tokens:** Total Bookings, Pending and Available Tokens.', '**Quick actions:** Create Service Offer and View Bookings.', '**Recent Bookings** and their status.', '**Bottom navigation:** Home, Hire Hub, Chatbot, Calendar and Profile.'),
          note('A **pending provider** dashboard shows the verification status and limits service functions while the Administrator reviews you. A **verified provider** dashboard unlocks tokens, bookings and applications.'),
          shots(['dash-provider', 'Verified provider dashboard'], ['dash-pending', 'Pending provider dashboard'])
        ] },
        { id: 'prov-tokens', title: 'Transaction token system', summary: 'Tokens set how many jobs you can hold at once.', blocks: [
          p('Tokens represent your workload capacity. Every accepted job, from an application or a direct booking, uses one token. A completed job frees it again after a short cooldown.'),
          h('How tokens work'),
          ul('**Starting balance:** new, approved providers receive **2 tokens**.', '**Deductions:** 1 token is used when a Resident accepts your application, or when you accept a direct booking.', '**Zero tokens:** you cannot submit new applications or accept new bookings. Finish an active job to free a token.', '**24-hour replenishment:** after a job is marked complete, the token returns 24 hours later. A live countdown, for example 23:59:28, appears next to Available Tokens.', 'You get a **Token Restored** notification when it is available again.'),
          note('With 0 tokens your listing shows as **Unavailable** in the Hire Hub. When tokens are restored it becomes bookable again.')
        ] },
        { id: 'prov-offer', title: 'Create a service offer', summary: 'Publish a bookable service for Residents.', blocks: [
          p('Service offerings are standard, directly bookable services that you publish, separate from applying to a Resident’s job request.'),
          steps('On the dashboard, select **Create Service Offer**.', 'Enter a **Service Title**.', 'Select a **Service Category**.', 'Describe the exact scope of work.', 'Enter a **Service Rate (₱)**, the fixed starting price Residents see.', 'Optionally add portfolio images of related work.', 'Select **Post Service Offer**.'),
          shots(['create-offer', 'Create Service Offer'])
        ] },
        { id: 'prov-hirehub', title: 'Hire Hub', summary: 'Browse job requests and booking requests.', blocks: [
          h('Service Request tab'),
          ul('Scroll through jobs posted by Residents: title, trade category, resident name, address and due date.', 'Read the description and tap **View Details** for photos and instructions.', 'Tap **Apply for this Job** to send your proposal with an estimated price and timeline. If the Resident accepts, one token is used.'),
          h('Booking Request tab'),
          ul('Direct bookings appear here when a Resident taps **Book Now** on your offer.', 'Review the schedule and accept or reject within **24 hours**.', 'An empty screen means no pending inquiries.'),
          shots(['hub-service-requests', 'Service Request tab'], ['hub-bookings-empty', 'Booking Request tab'])
        ] },
        { id: 'prov-apply', title: 'Apply for a job', summary: 'Review job details and submit your bid.', blocks: [
          h('View job details'),
          p('Tap **View Details** on a job card to see the status banner, the Resident’s name and account type, the full description, location and preferred schedule. **Message Homeowner** lets you ask questions first.'),
          shots(['job-details', 'Job details']),
          h('Submit your application'),
          ul('**Job Summary:** title, category, description, location, schedule and the Resident’s payment method.', '**Submit Service Fee:** your initial price estimate.', '**Message to Resident:** optional, up to 1000 characters.', '**Submit Application:** sends your bid.'),
          note('A token is deducted only when the Resident accepts your application, not when you submit it.'),
          shots(['apply-job', 'Apply for Job'])
        ] },
        { id: 'prov-direct', title: 'Respond to direct bookings', summary: 'Accept or decline within 24 hours.', blocks: [
          steps('Open the Hire Hub and switch to **Booking Request**.', 'Tap **View Details** on a pending request.', 'Review the service details and fee, the schedule and the address.', 'Use **Call** or **Message** to clarify anything with the Resident.', 'Tap **Accept Booking** or **Decline**.'),
          ul('**Accept Booking** confirms the job, uses 1 token and adds it to your calendar.', '**Decline** rejects the request. No token is used.'),
          shots(['booking-pending', 'Booking request'])
        ] }
      ] },
      { title: 'Doing the job', topics: [
        { id: 'prov-bookings', title: 'View bookings and offers', summary: 'My Jobs and request actions.', blocks: [
          p('Open **View Bookings** to manage your workload. Filter with these tabs:'),
          ul('**All:** every job on your account.', '**Active Offers:** your published service offerings.', '**Pending Requests:** applications waiting for a Resident’s decision.', '**Confirmed:** accepted jobs that are scheduled or in progress.', '**Completed:** finished jobs with a receipt.', '**Cancelled:** bookings ended before the service day.'),
          h('Request actions'),
          ul('**View Details**, **View Contract**, **Review Resident** (rate a completed job) and **Report**.'),
          shots(['my-jobs', 'My Jobs'], ['my-jobs-done', 'Completed jobs']),
          h('Booking agreement'),
          p('A service contract is generated when a booking is finalized. Open it with **View Contract** and use **Download / Share PDF** to keep a copy. It includes signature fields for the Resident, the Worker and a Witness.'),
          shots(['contract', 'Service contract'])
        ] },
        { id: 'prov-calendar', title: 'Calendar', summary: 'See your month and today’s appointments.', blocks: [
          ul('Browse months with the arrows or the month/year selector.', 'Day markers show Today, Has bookings and Completed.', 'Select a date to filter the **Appointments** list.', 'Each card shows the service, client username, time and location, plus a status pill: Assigned, Confirmed or Completed.', '**Message** opens a chat with the client. **View Details** opens the deal.'),
          shots(['calendar-provider', 'Calendar'], ['appointments', 'Appointments list'])
        ] },
        { id: 'prov-deal', title: 'Deal details', summary: 'The single record for a confirmed job.', blocks: [
          p('When a job is confirmed it becomes an active deal. **Deal Details** shows:'),
          ul('A **status banner** and unique Deal ID.', '**Service details:** title, category, description and total amount.', '**Schedule:** date, time and location.', '**Contact Resident:** a Message button.', '**Complete Deal:** where you submit proof and close the job.'),
          shots(['deal-confirmed', 'Deal Details'])
        ] },
        { id: 'prov-proof', title: 'Upload proof of service', summary: 'Required before you can mark a job complete.', blocks: [
          warn('You cannot mark a job complete until you upload a photo of the finished work.'),
          steps('On **Deal Details**, find **Complete Deal** and tap **Select Proof Photo**.', 'Choose a clear photo of the finished repair or work from your gallery or camera.', 'Review it. Tap **Change Photo** if you need a different one.', 'Tap **Mark Complete** to submit the proof and notify the Resident.')
        ] },
        { id: 'prov-complete', title: 'Mark a job complete', summary: 'What happens after you upload proof.', blocks: [
          ul('A **48-hour timer** starts when you upload proof. If the Resident does not confirm in that time, the system marks the job **Completed** automatically.', 'Once Completed, a **24-hour countdown** begins. After 24 hours your token is restored so you can apply for new jobs.')
        ] },
        { id: 'prov-receipt', title: 'Digital receipt', summary: 'The record of a finished deal.', blocks: [
          p('Select **View Details** on a completed job to open **Deal Details**, then view the digital receipt. It shows the Deal ID, service and category, both parties, amount, completion and receipt timestamps, a completion signature and proof of service.'),
          shots(['deal-done', 'Completed deal'], ['receipt-provider', 'Digital receipt'])
        ] }
      ] },
      { title: 'Your profile and account', topics: [
        { id: 'prov-profile', title: 'Profile and portfolio', summary: 'What Residents see, and how to keep it current.', blocks: [
          h('Profile menu'),
          ul('**Edit Profile Information** and **Edit Worker Profile.**', '**View Worker Profile:** preview your public profile.', '**Retake Assessment:** retake the SJT after the cooldown.', '**Notification toggle, Fixie Assistant, Client Report, Account Health, Settings** and **Logout.**'),
          h('Provider profile and credibility'),
          ul('Photo, name, trade and years of experience.', 'Public skill-level tag from the SJT.', 'Online or offline status.', 'Star rating from completed jobs, with a **New Provider** badge until you have reviews.', 'About, Services, Portfolio and Reviews tabs.'),
          h('Portfolio management'),
          steps('Go to **Profile → Edit Provider Information**.', 'Update your business name, category, experience and description.', 'Pick services to add or refine your tags.', 'Tap **+ Add Portfolio Image** to upload project photos or certifications. Remove one with the × icon.', 'Tap **Save Changes**.'),
          shots(['edit-worker', 'Edit Worker Information'])
        ] },
        { id: 'prov-retake', title: 'Retake assessment and reviews', summary: 'Cooldown rules and your ratings.', blocks: [
          ul('Your SJT result also appears as a **Knowledge Assessment** score on your profile.', 'The score and tag update when you complete the SJT.', 'Retake is locked for **1 month** after each attempt.'),
          h('Client reviews and ratings'),
          ul('After a job is Completed, the Resident can leave a 1 to 5 star rating and written feedback.', 'Your average rating recalculates with every review.', 'Ratings can only be submitted after a job is Completed.', 'Reviews appear on your public profile and feed into Account Health.')
        ] },
        { id: 'prov-complaints', title: 'Complaints and disputes', summary: 'Report a client, and track reports about you.', blocks: [
          p('Open **Profile → Client Report**. The **Service Provider** tab lists recent deals with each client.'),
          ul('**Report Feedback:** for spam, fake or disruptive messages.', '**Report Client:** for serious issues such as threats, fraud or harassment.'),
          p('Each report references the deal and amount involved. The **Report** tab tracks complaints filed against you. Each entry shows the type, for example Suspected Scam or No Show, the date, and a status such as Resolved once the Administrator decides.'),
          shots(['client-report-worker', 'Report a client'], ['client-report', 'Reports about you'])
        ] },
        { id: 'prov-health', title: 'Account health', summary: 'A live indicator of your standing.', blocks: [
          p('Found in **Profile → Account Health**, based on your average rating and activity.'),
          ul('**Account status gauge** from green to red.', '**Completed-job rating.**', '**Verification** status.', '**Profile completeness.**', '**Booking activity:** bookings created versus completed.'),
          shots(['account-health-provider', 'Account Health'])
        ] },
        { id: 'prov-comms', title: 'Notifications, messages and chatbot', summary: 'Stay in touch inside the app.', blocks: [
          ul('**Notifications:** tap the Message icon, then the **Notifications** tab. Unread alerts show a blue dot.', '**Messages:** use the **Chats** tab, or tap **Message** on a booking.', '**Fixie Assistant:** tap the headset icon above the bottom bar, or use Profile → Fixie Assistant.'),
          shots(['notifications', 'Notifications'], ['chatbot-p', 'Fixie Assistant'])
        ] },
        { id: 'prov-logout', title: 'Log out', summary: 'End your session.', blocks: [
          steps('Tap the **Profile** icon.', 'Scroll down and tap **Logout**.', 'You return to the Login screen.')
        ] }
      ] }
    ]
  };

  var ADM = {
    id: 'admin', short: 'adm', title: 'Administrator User Guide', role: 'Administrator',
    intro: 'For authorized staff who verify accounts, review reports and maintain the platform.',
    pdf: 'admin', icon: 'user-cog',
    chapters: [
      { title: 'Getting started', topics: [
        { id: 'adm-overview', title: 'System overview', summary: 'What the Admin Web System is for.', blocks: [
          p('The **HireNFix Admin Web System** is the web platform used to manage, monitor, verify and oversee HireNFix. It gives the Administrator a central dashboard and modules to review activity, verify accounts, monitor transactions, maintain the provider assessment question bank, review complaints, manage legal documents, maintain the chatbot knowledge base and review security information.'),
          p('The Administrator is the only role covered here. After signing in, the Admin can use every module in the left sidebar: Dashboard, Manage Users, Reports, Assessment, Legal & Privacy, Transactions, AI Knowledge and System Settings.'),
          note('The Admin Web System shows the same data the mobile app creates: accounts, bookings, service offers and transactions. The Admin does not use the Resident or Provider mobile apps.')
        ] },
        { id: 'adm-access', title: 'Requirements and access', summary: 'No installation. Use a desktop browser.', blocks: [
          h('Hardware'),
          table(['Requirement', 'Minimum', 'Recommended'], [['Processor', 'Dual-core 1.6 GHz', 'Quad-core 2.0 GHz or higher'], ['RAM', '4 GB', '8 GB or higher'], ['Storage', '1 GB free', '5 GB free'], ['Display', '1280 × 720', '1920 × 1080 or higher'], ['Internet', 'Stable broadband', 'High-speed broadband']]),
          h('Software'),
          table(['Requirement', 'Details'], [['Operating system', 'Windows 10 / 11, macOS 11, or a modern Linux distribution'], ['Web browser', 'Google Chrome, Mozilla Firefox, Microsoft Edge or Apple Safari (latest versions, JavaScript enabled)']]),
          h('Open the system'),
          steps('Open a supported web browser.', 'Go to the Admin Web System address provided by the HireNFix team.', 'The browser loads the Admin Login page.', 'Enter valid Admin credentials and select **Login**.'),
          note('The Administrator manual lists the address as https://hirenfix.vercel.app/. No installation is required.')
        ] },
        { id: 'adm-login', title: 'Log in, recover and sign out', summary: 'Admin account access.', blocks: [
          h('Admin login'),
          steps('Open the Admin Login page.', 'Enter the Admin email address.', 'Enter the password. Use the eye icon to show or hide it.', 'Select **Login**.'),
          wide(['admin-login', 'Admin Login']),
          h('Forgot password'),
          steps('On the login page, select **Forgot Password?**.', 'Enter the registered Admin email.', 'Select **Send Reset Link**.', 'Select **Back to Login** to return.'),
          wide(['admin-forgot', 'Forgot Password']),
          h('Sign out'),
          steps('From any page, find **Sign Out** at the bottom of the left sidebar.', 'Select **Sign Out**.')
        ] },
        { id: 'adm-nav', title: 'Navigation', summary: 'The sidebar and what each item does.', blocks: [
          p('The left sidebar appears on every page. It has the HireNFix logo, a collapse arrow (<) that narrows it, the items below and a red **Sign Out** link.'),
          table(['Item', 'Purpose', 'Main actions'], [
            ['Dashboard', 'Landing page with a system snapshot', 'View statistics'],
            ['Manage Users', 'Resident and Worker accounts. A red badge shows accounts awaiting verification.', 'Search, filter, export, view, approve or reject, edit, delete'],
            ['Reports', 'Issues reported on the platform', 'Search, switch tabs, view report and deal, freeze, export'],
            ['Assessment', 'SJT and WIA question banks', 'Add, edit, delete, search, filter'],
            ['Legal & Privacy', 'Terms, Privacy Policy and Service Contract', 'Edit, preview, version history'],
            ['Transactions', 'Deals in the Activity Ledger', 'Search, filter, export, open details'],
            ['AI Knowledge', 'Chatbot intents and responses', 'Search, add, edit, delete'],
            ['System Settings', 'Security, data protection and audit trail', 'View and export audit trail'],
            ['Sign Out', 'End the session', 'Select']])
        ] },
        { id: 'adm-dashboard', title: 'Dashboard', summary: 'Five summary cards at a glance.', blocks: [
          p('The Dashboard Overview is the first page after login. It shows a welcome banner and five summary cards.'),
          table(['Card', 'Purpose', 'Admin action'], [
            ['Total Users', 'Size of the user base', 'Read-only'], ['Pending Verifications', 'Accounts awaiting verification, split into Residents and Workers', 'Review in Manage Users'],
            ['Active Reports', 'Open complaint or feedback reports', 'Review in Reports'], ['Total Transactions', 'Overall transaction volume', 'Details in Transactions'], ['Active Service Offers', 'Service offers currently active', 'Read-only']]),
          wide(['admin-dashboard', 'Dashboard Overview'])
        ] }
      ] },
      { title: 'Managing the platform', topics: [
        { id: 'adm-users', title: 'Manage users', summary: 'The users list, search and export.', blocks: [
          p('Residents and Workers are managed together in **Manage Users**. The **Role** column tells them apart.'),
          h('Summary cards'),
          p('Total Users, Active, Suspended, Verified Residents and Verified Workers.'),
          h('Search, filter and export'),
          p('Use the search bar or **Filter** to narrow the list. The **CSV**, **XLSX** and **PDF** buttons at the top right export the list.'),
          table(['Column', 'Description'], [['User', 'Display name with avatar initials. Workers also show their service category.'], ['Role', 'Resident or Worker'], ['Account', 'Online or offline, based on real-time presence'], ['Verification', 'Verification status. A user registered as both shows two statuses.'], ['Email / Phone', 'Registered contact details']]),
          steps('Open **Manage Users**.', 'Review the summary cards.', 'Search or filter to find a user.', 'Select a row to open the user’s detail page.'),
          wide(['admin-users', 'Users list'])
        ] },
        { id: 'adm-verify', title: 'User details and verification', summary: 'Approve or reject Residents and Workers.', blocks: [
          p('The detail page shows the user’s name, role and verification status. **Delete user** and **Edit** are at the top right, and **Back** returns to the list. **Export user CSV** and **Print transactions PDF** export that user’s data. Tabs: **User Details** and **Transactions**.'),
          table(['Section', 'Fields'], [['Identity', 'Email, username, phone, barangay, business, category, created date'], ['Account', 'Role, resident verification, user ID, account status, worker verification'], ['Verification', 'Statuses, valid ID and proof of billing submission, portfolio images']]),
          wide(['admin-user-details', 'User Details page']),
          h('Verify a Resident'),
          p('Prerequisite: the user submitted a Valid ID and Proof of Billing and the status is Pending.'),
          steps('Open **Manage Users** and select a user with a Pending Resident status.', 'Review the Identity and Account sections.', 'Select **View Valid ID** and **View Proof of Billing**.', 'Select **Approve Resident** or **Reject Resident**.', 'Confirm if prompted.'),
          wide(['admin-verify', 'Approve Resident and Reject Resident']),
          h('Verify a Local Service Provider'),
          p('Worker verification uses the same page. The Worker Verification status is shown separately from the Resident status.'),
          h('User transactions tab'),
          p('Lists the user’s transactions: ID, deal, Resident, Worker, status, payment, scheduled date and created date. If none exist, the tab says no correlated transactions were found.'),
          wide(['admin-user-tx', 'Transactions tab'])
        ] },
        { id: 'adm-reports', title: 'Reports and incidents', summary: 'Review complaints and apply actions.', blocks: [
          p('**Review Reports** lists issues reported on the platform, with a search bar and CSV, XLSX and PDF export.'),
          table(['Tab', 'Contents'], [['Pending', 'Reports awaiting Admin action'], ['Resolved', 'Reports the Admin has resolved'], ['User Reports', 'Formal complaints a Resident files about a completed service'], ['Feedback Reports', 'Written feedback about a completed service']]),
          wide(['admin-reports', 'Review Reports']),
          h('The report card'),
          ul('Report type, number and date filed.', '**Report Details** entered by the reporter.', '**View Report & Deal** opens the report with its deal.', '**Reported By** and **Reported User**, each with View or Profile buttons.', 'A **token status badge**, such as Tokens Active or Tokens Frozen.', 'Action buttons: **Unfreeze** (green), **Suspend** (orange) and **Ban** (red).', '**Mark as Resolved** closes the ticket.'),
          note('After an Admin review, the reported Worker’s remaining tokens are stopped until the initial review is complete. Ratings, feedback and reports are enabled only after a job is Completed.'),
          wide(['admin-report-card', 'Resolved report card']),
          h('Review a report'),
          steps('Open **Reports**.', 'Search or switch between tabs.', 'Select **View Report & Deal**.', 'Use **View** or **Profile** to check the reporter and the reported user.', 'Apply sanctions if needed. **Suspend** or **Ban** must be supported by proper justification and platform compliance rules.', 'If the user is cleared, select **Unfreeze** to restore their tokens.', 'Select **Mark as Resolved** to close and archive the ticket.')
        ] },
        { id: 'adm-assess', title: 'Assessment management', summary: 'Maintain the SJT and WIA question banks.', blocks: [
          p('Two tabs: **SJT Assessment** and **WIA Assessment**. Each has a search bar, a Filter button and an add button. Every question card shows the number, text, category and four answer options worth 1 to 4 points, with pencil (edit) and trash (delete) icons.'),
          wide(['admin-sjt', 'SJT Assessment tab'], ['admin-wia', 'WIA Assessment tab']),
          h('SJT rules'),
          table(['Rule', 'Detail'], [['Source', 'Scenario-based questions for the provider’s trade'], ['Order', 'Randomized each time'], ['Completion', 'Every question must be answered'], ['Scoring', '1 to 4 points per option, total calculated automatically'], ['Tags', '0–9 Beginner, 10–19 Intermediate, 20–30 Advance'], ['Retake', 'Mandatory 1-month wait']]),
          h('Add an SJT question'),
          p('SJT question and answer text is locked and cannot be typed by the Admin. The text is generated with AI.'),
          steps('Open **Assessment** and stay on **SJT Assessment**.', 'Select **Add SJT Question**. The Question Preview opens on the right.', 'Select the **Service Category**, for example Plumbing.', 'Use **Generate with AI**.', 'Check the answers and points (4, 3, 2, 1). Select **Regenerate** for a new version.', 'Select **Add to SJT** to save, or **Done** to close.'),
          wide(['admin-add-sjt', 'Add New Question (SJT)']),
          h('Work Integrity Assessment'),
          p('A mandatory internal evaluation during provider registration that measures Integrity, Responsibility and Reliability. Points per dimension convert to a percentage, out of 20.'),
          table(['Classification', 'Rule'], [['High Fit', 'All dimensions 80% or higher'], ['Moderate Fit', 'All dimensions 60% or higher'], ['Flagged for Review', 'Any dimension below 60%. Approval halts and the account is flagged for Admin review.']]),
          note('Results are internal to the Admin dashboard and never shown to Residents or on the public profile.'),
          h('Add a WIA question'),
          steps('Open **Assessment** and select **WIA Assessment**.', 'Select **Add WIA Question**.', 'Enter the question (up to 1000 characters).', 'Select the category, for example Integrity.', 'Enter Answer 1 to 4 and set a point value for each (4, 3, 2 or 1).', 'Check the Question Preview.', 'Select **Add to WIA**, or **Done** to close.'),
          wide(['admin-add-wia', 'Add New Question (WIA)']),
          h('Edit or delete'),
          p('Select the pencil icon to edit a question, or the trash icon to delete it.')
        ] },
        { id: 'adm-legal', title: 'Legal and privacy', summary: 'Edit and publish the platform’s legal documents.', blocks: [
          p('**Legal & Privacy** (page title Legal & Policies) edits the Terms & Conditions, the Privacy Policy and the Service Contract template (titled Booking Agreement). Changes go live only when published. A green badge shows the live version, for example Published v6.'),
          table(['Element', 'Description'], [['Tabs', 'Terms & Conditions, Privacy Policy, Service Contract'], ['Edit / Preview', 'Edit shows editable text. Preview shows how users will see it.'], ['Formatting', 'Simple markup: # Heading, ## Subheading, - list item'], ['Contract placeholders', '[Deal ID], [Service Title], [Service Type], [Address], [Scheduled Date], [Agreed Amount], [Scope of Work], [Resident Name], [Worker Name], [Witness]'], ['Published versions', 'The current version is marked Live and earlier ones Archived, each with a date and a View this version link']]),
          wide(['admin-legal', 'Legal & Policies, Edit view'], ['admin-legal-preview', 'Preview view']),
          wide(['admin-privacy', 'Privacy Policy tab'], ['admin-contract', 'Service Contract tab']),
          h('Review a policy'),
          steps('Open **Legal & Privacy** and select a tab.', 'Select **Preview** to read it as users see it.', 'Select **View this version** on a listed version to read an older one.'),
          h('Edit a policy'),
          steps('Select the tab and choose **Edit**.', 'Change the text, keeping the formatting marks and contract placeholders.', 'Select **Preview** to check.', 'Publish the change.')
        ] },
        { id: 'adm-transactions', title: 'Transactions', summary: 'The Activity Ledger of every deal.', blocks: [
          p('The ledger has three summary cards (Pending, Completed, Cancelled), export buttons, a search bar and a Filter button. Columns: Transaction ID, Deal ID with job title, Resident, Worker, Deal Status, Payment, Scheduled and Created At.'),
          steps('Open **Transactions**.', 'Review the summary cards.', 'Search or filter.', 'Select a row to open its details.'),
          wide(['admin-ledger', 'Activity Ledger']),
          h('Transaction details'),
          p('The detail page shows the job title, deal ID and both names. **Export transaction CSV** and **Print PDF** export it. Tabs: **Transaction Details** and **Booking**.'),
          table(['Section', 'Fields'], [['Deal', 'Transaction, Deal, Application, Post, Booking and Service Offer IDs, job title, category, status, payment status, schedule'], ['Resident', 'Identity and contact information'], ['Worker', 'Identity, business and knowledge-assessment information']]),
          wide(['admin-tx-details', 'Transaction Details tab'], ['admin-tx-booking', 'Booking tab'])
        ] },
        { id: 'adm-ai', title: 'AI knowledge management', summary: 'Maintain chatbot intents and responses.', blocks: [
          p('This module manages the intents and responses used by the chatbot in the mobile app. The **Intent library** has a search bar and an **Add New Intent** button. Each card shows the intent tag with an Enabled or Disabled badge, patterns, response, target screen and last update. Use the pencil to edit and the trash to delete.'),
          table(['Field', 'Description'], [['Intent Tag (required)', 'Short identifier'], ['Patterns (required)', 'Comma-separated phrases that trigger the intent'], ['Response (required)', 'The chatbot’s reply'], ['Target Screen (optional)', 'In-app screen the response can open, for example /home'], ['Enabled toggle', 'Turns the intent on or off']]),
          wide(['admin-ai', 'Intent library']),
          h('Add an intent'),
          steps('Open **AI Knowledge** and select **Add New Intent**.', 'Enter the **Intent Tag**.', 'Enter one or more comma-separated **Patterns**.', 'Enter the **Response**.', 'Optionally enter a **Target Screen**.', 'Set the **Enabled** toggle.', 'Select **Save Intent**.'),
          wide(['admin-intent-new', 'Create New Intent']),
          h('Edit an intent'),
          steps('Select the pencil icon on an intent card.', 'Change the fields.', 'Save the intent.'),
          note('Patterns and responses may mix Filipino or Taglish and English, reflecting the platform’s users.'),
          wide(['admin-intent-edit', 'Edit Intent'])
        ] },
        { id: 'adm-system', title: 'System settings and audit trail', summary: 'Security information and admin activity log.', blocks: [
          ul('**Security:** a notice that admin audit logging is enabled. Exports and administrative actions are recorded.', '**Data Protection:** backup and restore use the database provider’s managed tools. Raw database credentials are never exposed in the browser.', '**Admin Audit Trail:** a list of admin actions and system events with timestamps, exportable as CSV, XLSX or PDF.'),
          steps('Open **System Settings**.', 'Scroll to **Admin Audit Trail**.', 'Review the actions and events.', 'Select **CSV**, **XLSX** or **PDF** to export.'),
          wide(['admin-settings', 'System Settings'])
        ] },
        { id: 'adm-workflow', title: 'Workflow summary', summary: 'Common tasks in one table.', blocks: [
          table(['Task', 'Workflow'], [
            ['General access', 'Admin Login → Dashboard Overview → select a module'],
            ['User verification', 'Manage Users → Pending user → User Details → review documents → Approve or Reject'],
            ['Assessment maintenance', 'Assessment → SJT or WIA tab → add, edit or delete → save'],
            ['Legal documents', 'Legal & Privacy → tab → Edit and Preview → publish → new version Live, old one Archived'],
            ['Transaction monitoring', 'Transactions → cards → search or filter → open a transaction'],
            ['Report handling', 'Reports → tab → View Report & Deal → review users → act'],
            ['Chatbot maintenance', 'AI Knowledge → search, add or edit an intent → save'],
            ['Audit review', 'System Settings → Admin Audit Trail → review or export'],
            ['Session end', 'Any page → Sign Out → Admin Login']])
        ] }
      ] }
    ]
  };

  window.HF_GUIDES = { resident: RES, provider: PRO, admin: ADM };
})();
