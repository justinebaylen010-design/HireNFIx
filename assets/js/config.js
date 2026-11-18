/* HireNFix – single place to edit official details.
   Anything set to null is shown as a clearly labeled placeholder on the site. */
window.HF_CONFIG = {
  // Official installer link and QR code. Keep both pointing to the SAME verified destination.
  // If either is null the site shows a clear placeholder.
  downloadUrl: "https://drive.google.com/file/d/1Lvfa0ZmnRp83HiM6uBAWDeL8lFTxgwaU/view",
  qrImage: "assets/img/qr.webp",   // branded QR supplied by the team; it opens the same Drive file as downloadUrl
  appVersion: "1.9.2",
  fileSize: "254 MB",        // confirmed by the team
  minAndroid: "Android 8.0 or later",   // from the manuals
  minRam: "At least 2 GB",
  minStorage: "At least 300 MB free",
  adminUrl: "https://hirenfix.vercel.app/",  // from the Administrator manual
  supportEmail: "hirenfix@gmail.com",
  supportPhone: null,        // intentionally not shown
  supportHours: null,
  city: "Valenzuela City",
  year: new Date().getFullYear(),
  manuals: {
    resident: "assets/manuals/HireNFix-Resident-User-Manual.pdf",
    provider: "assets/manuals/HireNFix-Service-Provider-User-Manual.pdf",
    admin: "assets/manuals/HireNFix-Administrator-User-Manual.pdf"
  }
};
