/**
 * ============================================================================
 * VIP MINI BUS TRANSFERS & TOURS - FLEET DATA (fleet.js)
 * ============================================================================
 * ΣΤΟΛΟΣ ΟΧΗΜΑΤΩΝ - ΚΡΗΤΗ
 */

const FLEET_DATA = [
  {
    id: "sprinter-vip-19",
    nameEl: "Mercedes-Benz Sprinter VIP Edition",
    nameEn: "Mercedes-Benz Sprinter VIP Edition",
    categoryEl: "VIP Executive Mini Bus (19 + 1 Θέσεις)",
    categoryEn: "VIP Executive Mini Bus (19 + 1 Seats)",
    year: "2024",
    passengers: "19 + 1",
    luggage: "18-20",
    luggageTextEl: "18-20 Μεγάλες Βαλίτσες + Χειραποσκευές",
    luggageTextEn: "18-20 Large Suitcases + Handbags",
    
    shortDescEl: "Η ναυαρχίδα των μεταφορών μας στην Κρήτη. Ασύγκριτη άνεση, πολυτέλεια και ασφάλεια για transfers αεροδρομίων, λιμανιών, ξενοδοχείων και εκδρομές.",
    shortDescEn: "The flagship of our transfers in Crete. Unmatched comfort, executive luxury, and safety for airport, port, hotel transfers, and island tours.",
    
    fullDescEl: "Το Mercedes-Benz Sprinter VIP 19+1 θέσεων είναι ειδικά διαμορφωμένο για να προσφέρει εμπειρία πρώτης θέσης (First Class) στις διαδρομές της Κρήτης. Εξοπλισμένο με ανατομικά δερμάτινα ανακλινόμενα καθίσματα, ατομικό φωτισμό ανάγνωσης, ισχυρό διζωνικό κλιματισμό για τις θερμές ημέρες του καλοκαιριού και άπλετο χώρο για τα πόδια. Ιδανικό για απαιτητικούς ταξιδιώτες, γάμους, συνέδρια και ιδιωτικές περιηγήσεις σε όλη την Κρήτη.",
    fullDescEn: "Our 19+1 seat Mercedes-Benz Sprinter VIP is custom-configured to deliver a genuine first-class travel experience across Crete. Featuring ergonomic reclining leather seats, individual reading lights, powerful dual-zone climate A/C, and generous legroom. The premier choice for VIP travelers, wedding parties, corporate delegations, and bespoke Crete excursions.",

    featuresEl: [
      "Ανατομικά Δερμάτινα Καθίσματα",
      "Δωρεάν High-Speed Wi-Fi",
      "Διζωνικός Αυτόματος Κλιματισμός (A/C)",
      "Θύρες Φόρτισης USB & Type-C σε κάθε θέση",
      "Φιμέ Παράθυρα Προστασίας Ήλιου & UV",
      "Ψυγείο με Δροσερό Νερό & Αναψυκτικά",
      "Μικροφωνική Εγκατάσταση Ξεναγήσεων",
      "Παιδικά Καθίσματα (ISOFIX) κατόπιν αιτήματος",
      "Τεράστιος Χώρος Αποσκευών (18-20 Βαλίτσες)",
      "Ηχοσύστημα Hi-Fi & Bluetooth"
    ],
    featuresEn: [
      "Ergonomic Reclining Leather Seats",
      "Complimentary High-Speed Wi-Fi",
      "Dual-Zone Automatic Climate A/C",
      "USB & Type-C Charging Ports at every seat",
      "Privacy Sun-Protection UV Tinted Glass",
      "On-board Refrigerator with Chilled Water",
      "Public Address (PA) Tour Guide Microphone",
      "Child Safety Seats (ISOFIX) upon request",
      "Extra Large Luggage Compartment (18-20 Suitcases)",
      "Premium Hi-Fi Surround Sound & Bluetooth"
    ],

    specs: [
      { labelEl: "Μοντέλο / Κατασκευαστής", labelEn: "Make & Model", value: "Mercedes-Benz Sprinter 519 CDI" },
      { labelEl: "Χωρητικότητα Επιβατών", labelEn: "Passenger Capacity", value: "19 Επιβάτες + 1 Οδηγός" },
      { labelEl: "Χωρητικότητα Αποσκευών", labelEn: "Luggage Capacity", value: "18-20 Μεγάλες Βαλίτσες Check-in" },
      { labelEl: "Περιοχή Εξυπηρέτησης", labelEn: "Service Area", value: "Όλη η Κρήτη (Ηράκλειο, Χανιά, Ρέθυμνο, Λασίθι)" },
      { labelEl: "Συστήματα Ασφαλείας", labelEn: "Active Safety", value: "Active Brake Assist, Lane Keeping, ESP, Crosswind Assist" },
      { labelEl: "Συνδεσιμότητα & Φόρτιση", labelEn: "Connectivity", value: "4G/5G Wi-Fi, Θύρες USB & Type-C σε κάθε κάθισμα" },
      { labelEl: "Πρόσθετες Παροχές", labelEn: "Special Amenities", value: "Mini Ψυγείο, Μικρόφωνο Ξεναγού, Εμφιαλωμένο Νερό" }
    ],

    // Εδώ ορίζονται τα placeholders φωτογραφιών όπου ρητά αναφέρεται ότι είναι φωτογραφία
    images: {
      hero: {
        placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: Hero Mini Bus - 1600x900]",
        altEl: "ΦΩΤΟΓΡΑΦΙΑ: Mercedes-Benz Sprinter VIP Εξωτερική Όψη",
        altEn: "PHOTO: Mercedes-Benz Sprinter VIP Exterior",
        src: ""
      },
      exterior: {
        placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: Εξωτερική Όψη Mini Bus - 800x600]",
        altEl: "ΦΩΤΟΓΡΑΦΙΑ: Mini Bus Εξωτερικό",
        altEn: "PHOTO: Mini Bus Exterior",
        src: ""
      },
      interior: {
        placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: VIP Σαλόνι & Δερμάτινα Καθίσματα - 800x600]",
        altEl: "ΦΩΤΟΓΡΑΦΙΑ: VIP Εσωτερικό Σαλόνι",
        altEn: "PHOTO: VIP Interior Leather Seats",
        src: ""
      },
      luggage: {
        placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: Χώρος Αποσκευών - 800x600]",
        altEl: "ΦΩΤΟΓΡΑΦΙΑ: Χώρος Αποσκευών",
        altEn: "PHOTO: High-Capacity Luggage Compartment",
        src: ""
      }
    }
  }
];

window.FLEET_DATA = FLEET_DATA;
