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

    images: {
      hero: {
        placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: Hero Mini Bus 19+1 - 1600x900]",
        altEl: "ΦΩΤΟΓΡΑΦΙΑ: Mercedes-Benz Sprinter VIP 19+1 Εξωτερική Όψη",
        altEn: "PHOTO: Mercedes-Benz Sprinter VIP 19+1 Exterior",
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
  },
  {
    id: "sprinter-vip-16",
    nameEl: "Mercedes-Benz Sprinter Executive Line",
    nameEn: "Mercedes-Benz Sprinter Executive Line",
    categoryEl: "VIP Executive Mini Bus (16 + 1 Θέσεις)",
    categoryEn: "VIP Executive Mini Bus (16 + 1 Seats)",
    year: "2024",
    passengers: "16 + 1",
    luggage: "16",
    luggageTextEl: "16 Μεγάλες Βαλίτσες + Χειραποσκευές",
    luggageTextEn: "16 Large Suitcases + Handbags",
    
    shortDescEl: "Ιδανική επιλογή για μεσαία γκρουπ και επιχειρηματικές αποστολές με εξαιρετική ευελιξία και VIP άνεση.",
    shortDescEn: "Ideal choice for medium groups and corporate travel with outstanding agility and executive VIP comfort.",
    
    fullDescEl: "Το Mercedes-Benz Sprinter Executive Line 16+1 θέσεων προσφέρει άνεση κορυφαίου επιπέδου με ευρύχωρα δερμάτινα καθίσματα, ατομικό κλιματισμό και άφθονο χώρο αποσκευών για κάθε διαδρομή στην Κρήτη.",
    fullDescEn: "The 16+1 seat Mercedes-Benz Sprinter Executive Line delivers top-tier comfort with spacious leather seats, individual A/C vents, and generous luggage capacity across Crete.",

    featuresEl: [
      "Δερμάτινα Ανακλινόμενα Καθίσματα",
      "Δωρεάν Wi-Fi υψηλής ταχύτητας",
      "Αυτόματος Κλιματισμός A/C",
      "Θύρες Φόρτισης σε κάθε θέση",
      "Φιμέ Τζάμια Προστασίας",
      "Εμφιαλωμένο Νερό για όλους τους επιβάτες"
    ],
    featuresEn: [
      "Reclining Leather Seats",
      "Complimentary High-Speed Wi-Fi",
      "Automatic Climate Control A/C",
      "USB Ports at each seat",
      "Privacy Tinted Windows",
      "Complimentary Bottled Water"
    ],

    specs: [
      { labelEl: "Μοντέλο / Κατασκευαστής", labelEn: "Make & Model", value: "Mercedes-Benz Sprinter 319 CDI" },
      { labelEl: "Χωρητικότητα Επιβατών", labelEn: "Passenger Capacity", value: "16 Επιβάτες + 1 Οδηγός" },
      { labelEl: "Χωρητικότητα Αποσκευών", labelEn: "Luggage Capacity", value: "16 Μεγάλες Βαλίτσες Check-in" },
      { labelEl: "Περιοχή Εξυπηρέτησης", labelEn: "Service Area", value: "Όλη η Κρήτη" },
      { labelEl: "Συστήματα Ασφαλείας", labelEn: "Active Safety", value: "Active Brake Assist, ESP, Crosswind Assist" }
    ],

    images: {
      hero: {
        placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: Mini Bus 16+1 - 1600x900]",
        altEl: "ΦΩΤΟΓΡΑΦΙΑ: Mercedes-Benz Sprinter Executive 16+1",
        altEn: "PHOTO: Mercedes-Benz Sprinter Executive 16+1",
        src: ""
      },
      exterior: {
        placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: Sprinter 16+1 Εξωτερικό - 800x600]",
        altEl: "ΦΩΤΟΓΡΑΦΙΑ: Sprinter 16+1 Εξωτερικό",
        altEn: "PHOTO: Sprinter 16+1 Exterior",
        src: ""
      },
      interior: {
        placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: Sprinter 16+1 Σαλόνι - 800x600]",
        altEl: "ΦΩΤΟΓΡΑΦΙΑ: Sprinter 16+1 Σαλόνι",
        altEn: "PHOTO: Sprinter 16+1 Interior",
        src: ""
      },
      luggage: {
        placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: Sprinter 16+1 Αποσκευές - 800x600]",
        altEl: "ΦΩΤΟΓΡΑΦΙΑ: Sprinter 16+1 Αποσκευές",
        altEn: "PHOTO: Sprinter 16+1 Luggage",
        src: ""
      }
    }
  },
  {
    id: "v-class-vip-7",
    nameEl: "Mercedes-Benz V-Class Extra VIP",
    nameEn: "Mercedes-Benz V-Class Extra VIP",
    categoryEl: "Ultra VIP Minivan (7 + 1 Θέσεις)",
    categoryEn: "Ultra VIP Minivan (7 + 1 Seats)",
    year: "2024",
    passengers: "7 + 1",
    luggage: "8",
    luggageTextEl: "8 Μεγάλες Βαλίτσες + Χειραποσκευές",
    luggageTextEn: "8 Large Suitcases + Handbags",
    
    shortDescEl: "Η απόλυτη ιδιωτικότητα και πολυτέλεια για οικογένειες, VIP πρόσωπα και private executive tours.",
    shortDescEn: "The pinnacle of privacy and prestige for families, VIP dignitaries, and bespoke private tours.",
    
    fullDescEl: "Το Mercedes-Benz V-Class Extra VIP προσφέρει συνεδριακή διάταξη σαλονιού (Face-to-Face), πολυτελή δερμάτινα καθίσματα με υποπόδια, ατμοσφαιρικό φωτισμό και κορυφαία ηχομόνωση για ασυναγώνιστη ταξιδιωτική εμπειρία στην Κρήτη.",
    fullDescEn: "The Mercedes-Benz V-Class Extra VIP features conference club seating, executive leather captains chairs, ambient lighting, and acoustic comfort across Crete.",

    featuresEl: [
      "Σαλόνι Club / Face-to-Face Διάταξη",
      "Δερμάτινα Καθίσματα VIP Captain Chairs",
      "Δωρεάν Wi-Fi & Θύρες USB σε κάθε κάθισμα",
      "Αυτόματος Κλιματισμός Thermotronic",
      "Φιμέ Τζάμια Ιδιωτικότητας",
      "Mini Bar με Δροσερά Αναψυκτικά & Νερό"
    ],
    featuresEn: [
      "Club Seating / Face-to-Face Layout",
      "VIP Leather Captain Chairs",
      "Complimentary Wi-Fi & USB Charging",
      "Thermotronic Automatic Climate A/C",
      "Full Privacy Glass",
      "Mini Bar with Chilled Beverages & Water"
    ],

    specs: [
      { labelEl: "Μοντέλο / Κατασκευαστής", labelEn: "Make & Model", value: "Mercedes-Benz V-Class 300d Extra Long" },
      { labelEl: "Χωρητικότητα Επιβατών", labelEn: "Passenger Capacity", value: "7 Επιβάτες + 1 Οδηγός" },
      { labelEl: "Χωρητικότητα Αποσκευών", labelEn: "Luggage Capacity", value: "8 Μεγάλες Βαλίτσες Check-in" },
      { labelEl: "Περιοχή Εξυπηρέτησης", labelEn: "Service Area", value: "Όλη η Κρήτη" },
      { labelEl: "Συστήματα Ασφαλείας", labelEn: "Active Safety", value: "360° Camera, Distronic, Lane Assist, Pre-Safe" }
    ],

    images: {
      hero: {
        placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: V-Class VIP 7+1 - 1600x900]",
        altEl: "ΦΩΤΟΓΡΑΦΙΑ: Mercedes-Benz V-Class Extra VIP",
        altEn: "PHOTO: Mercedes-Benz V-Class Extra VIP",
        src: ""
      },
      exterior: {
        placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: V-Class Εξωτερικό - 800x600]",
        altEl: "ΦΩΤΟΓΡΑΦΙΑ: V-Class Εξωτερικό",
        altEn: "PHOTO: V-Class Exterior",
        src: ""
      },
      interior: {
        placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: V-Class VIP Σαλόνι - 800x600]",
        altEl: "ΦΩΤΟΓΡΑΦΙΑ: V-Class VIP Σαλόνι",
        altEn: "PHOTO: V-Class VIP Interior",
        src: ""
      },
      luggage: {
        placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: V-Class Χώρος Αποσκευών - 800x600]",
        altEl: "ΦΩΤΟΓΡΑΦΙΑ: V-Class Χώρος Αποσκευών",
        altEn: "PHOTO: V-Class Luggage Space",
        src: ""
      }
    }
  }
];

window.FLEET_DATA = FLEET_DATA;
