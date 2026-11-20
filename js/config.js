/**
 * ============================================================================
 * VIP MINI BUS TRANSFERS & TOURS - CENTRAL CONFIGURATION (config.js)
 * ============================================================================
 * ΕΝΙΑΙΑ ΠΗΓΗ ΡΥΘΜΙΣΕΩΝ - ΚΡΗΤΗ (HERAKLION, CHANIA, RETHYMNO, AG. NIKOLAOS)
 * 
 * Όλα τα βασικά στοιχεία επικοινωνίας, τα νομικά στοιχεία (ΑΦΜ, ΜΗΤΕ κ.α.)
 * και οι τιμολογιακές παράμετροι ορίζονται αποκλειστικά εδώ.
 */

const SITE_CONFIG = {
  // Βασικά Στοιχεία Επιχείρησης - Κρήτη
  brand: {
    name: "VIP Mini Bus Transfers & Tours Crete",
    nameShort: "VIP MiniBus Crete",
    taglineEl: "Πολυτελείς Ιδιωτικές Μεταφορές & VIP Tours στην Κρήτη",
    taglineEn: "Luxury Private Transfers & VIP Tours in Crete",
    locationEl: "Κρήτη (Ηράκλειο, Χανιά, Ρέθυμνο, Άγιος Νικόλαος)",
    locationEn: "Crete (Heraklion, Chania, Rethymno, Agios Nikolaos)",
  },

  // Στοιχεία Άμεσης Επικοινωνίας (9999999 placeholders)
  contact: {
    phoneFormatted: "+30 699 999 9999",       // Εμφάνιση στην οθόνη
    phoneRaw: "306999999999",                 // Αριθμός για tel: & WhatsApp
    secondaryPhoneFormatted: "+30 2810 999 999",
    email: "paulostzernias@gmail.com",
    supportEmail: "paulostzernias@gmail.com",
    targetEmail: "paulostzernias@gmail.com",
    operatingHoursEl: "24/7 - Όλο το 24ωρο, 365 ημέρες τον χρόνο στην Κρήτη",
    operatingHoursEn: "24/7 - Around the clock, 365 days a year across Crete",
  },

  // Φόρμες Επικοινωνίας & Κρατήσεων (Cloudflare Pages ready)
  web3forms: {
    accessKey: "YOUR_WEB3FORMS_ACCESS_KEY",
    targetEmail: "paulostzernias@gmail.com",
  },

  // Επίσημα Νομικά & Φορολογικά Στοιχεία - Κρήτη
  legal: {
    companyName: "VIP CRETE TRANSFERS & TOURS ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.",
    distinctiveTitle: "VIP MINI BUS TRANSFERS CRETE",
    headquartersEl: "Ηράκλειο, 712 02, Κρήτη",
    headquartersEn: "Heraklion, 712 02, Crete, Greece",
    vatNumber: "999999999",                   // Α.Φ.Μ.
    taxOfficeEl: "Δ.Ο.Υ. Ηρακλείου",           // Δ.Ο.Υ.
    taxOfficeEn: "Tax Office of Heraklion",
    gemiNumber: "999999999999",                // Αρ. Γ.Ε.ΜΗ.
    mhteNumber: "9999E99999999999",            // Αρ. ΜΗ.Τ.Ε. / ΕΟΤ
    commercialRegisterEl: "Ειδικό Σήμα ΕΟΤ / Άδεια Τουριστικών Οδικών Μεταφορών",
    commercialRegisterEn: "Licensed by Greek Ministry of Tourism (GNTO/EOT)",
  },

  // Παράμετροι Υπολογιστή Τιμών (Approximate Price Calculator)
  pricing: {
    currency: "€",
    baseFee: 35,                              // Βασικό τέλος εκκίνησης διαδρομής
    perKmRate: 1.80,                          // Χρέωση ανά χιλιόμετρο
    minPrice: 45,                             // Ελάχιστη χρέωση διαδρομής
    estimateSpreadPercent: 10,                // Εμφάνιση εύρους ±10% (π.χ. 90€ - 110€)
    roundTripDiscountPercent: 10,             // Έκπτωση 10% στο σκέλος της επιστροφής
    nightSurchargeNoteEl: "Νυχτερινή διαδρομή (00:00 - 06:00) ενδέχεται να έχει μικρή προσαύξηση.",
    nightSurchargeNoteEn: "Night hours (00:00 - 06:00) may carry a slight surcharge.",
  },

  // Κοινωνικά Δίκτυα & Εξωτερικοί Σύνδεσμοι
  social: {
    whatsappUrl: "https://wa.me/306999999999",
    tripAdvisorUrl: "#",
    googleMapsReviewUrl: "#",
  }
};

// Global export for vanilla JS scripts
window.SITE_CONFIG = SITE_CONFIG;
