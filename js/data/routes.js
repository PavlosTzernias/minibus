/**
 * ============================================================================
 * VIP MINI BUS TRANSFERS & TOURS - ROUTES & TOURS DATA (routes.js)
 * ============================================================================
 * ΚΡΗΤΗ: ΣΗΜΕΙΑ ΠΑΡΑΛΑΒΗΣ & ΠΡΟΟΡΙΣΜΟΙ (ΧΩΡΙΣ ΤΗ ΛΕΞΗ «ΞΕΝΟΔΟΧΕΙΟ»)
 * Πίνακας αποστάσεων για αυτόματο υπολογισμό κόστους μεταξύ των dropdowns.
 */

// Σημεία Παραλαβής & Προορισμοί Κρήτης
const CRETE_LOCATIONS = [
  { id: "airport-her", nameEl: "Αεροδρόμιο Ηρακλείου (HER)", nameEn: "Heraklion Airport (HER)" },
  { id: "airport-chq", nameEl: "Αεροδρόμιο Χανίων (CHQ)", nameEn: "Chania Airport (CHQ)" },
  { id: "port-her", nameEl: "Λιμάνι Ηρακλείου", nameEn: "Heraklion Port" },
  { id: "port-souda", nameEl: "Λιμάνι Σούδας (Χανιά)", nameEn: "Souda Port (Chania)" },
  { id: "heraklion", nameEl: "Ηράκλειο", nameEn: "Heraklion City" },
  { id: "chania", nameEl: "Χανιά", nameEn: "Chania City" },
  { id: "rethymno", nameEl: "Ρέθυμνο", nameEn: "Rethymno" },
  { id: "agios-nikolaos", nameEl: "Άγιος Νικόλαος", nameEn: "Agios Nikolaos" },
  { id: "elounda", nameEl: "Ελούντα", nameEn: "Elounda" },
  { id: "hersonissos", nameEl: "Χερσόνησος", nameEn: "Hersonissos" },
  { id: "malia", nameEl: "Μάλια / Σταλίδα", nameEn: "Malia / Stalis" },
  { id: "gouves", nameEl: "Γούβες / Ανισσαράς", nameEn: "Gouves / Anissaras" },
  { id: "agia-pelagia", nameEl: "Αγία Πελαγία", nameEn: "Agia Pelagia" },
  { id: "sissi", nameEl: "Σίσι", nameEn: "Sissi" },
  { id: "bali", nameEl: "Μπαλί", nameEn: "Bali" },
  { id: "georgioupolis", nameEl: "Γεωργιούπολη", nameEn: "Georgioupolis" },
  { id: "platanias", nameEl: "Πλατανιάς / Αγία Μαρίνα", nameEn: "Platanias / Agia Marina" },
  { id: "kolymbari", nameEl: "Κολυμβάρι", nameEn: "Kolymbari" },
  { id: "kissamos", nameEl: "Καστέλι Κισσάμου", nameEn: "Kissamos" },
  { id: "matala", nameEl: "Μάταλα / Φαιστός", nameEn: "Matala / Phaistos" },
  { id: "ierapetra", nameEl: "Ιεράπετρα", nameEn: "Ierapetra" },
  { id: "sitia", nameEl: "Σητεία", nameEn: "Sitia" },
  { id: "custom", nameEl: "Άλλη Τοποθεσία στην Κρήτη", nameEn: "Other Location in Crete" }
];

// Πίνακας Αποστάσεων (km) μεταξύ βασικών σημείων Κρήτης
const CRETE_DISTANCES = {
  // Αεροδρόμιο Ηρακλείου (HER)
  "airport-her_heraklion": 8,
  "airport-her_port-her": 6,
  "airport-her_gouves": 18,
  "airport-her_hersonissos": 25,
  "airport-her_malia": 32,
  "airport-her_sissi": 42,
  "airport-her_elounda": 68,
  "airport-her_agios-nikolaos": 62,
  "airport-her_agia-pelagia": 26,
  "airport-her_bali": 52,
  "airport-her_rethymno": 82,
  "airport-her_georgioupolis": 105,
  "airport-her_chania": 140,
  "airport-her_platanias": 155,
  "airport-her_kolymbari": 165,
  "airport-her_kissamos": 180,
  "airport-her_matala": 68,
  "airport-her_ierapetra": 94,
  "airport-her_sitia": 126,
  "airport-her_port-souda": 132,
  "airport-her_airport-chq": 148,

  // Λιμάνι Ηρακλείου
  "port-her_heraklion": 3,
  "port-her_hersonissos": 26,
  "port-her_elounda": 70,
  "port-her_agios-nikolaos": 65,
  "port-her_rethymno": 80,
  "port-her_chania": 138,

  // Αεροδρόμιο Χανίων (CHQ)
  "airport-chq_chania": 14,
  "airport-chq_port-souda": 15,
  "airport-chq_platanias": 26,
  "airport-chq_kolymbari": 40,
  "airport-chq_kissamos": 56,
  "airport-chq_georgioupolis": 46,
  "airport-chq_rethymno": 68,
  "airport-chq_bali": 98,
  "airport-chq_heraklion": 142,
  "airport-chq_hersonissos": 168,
  "airport-chq_elounda": 205,

  // Λιμάνι Σούδας
  "port-souda_chania": 7,
  "port-souda_platanias": 20,
  "port-souda_rethymno": 58,
  "port-souda_georgioupolis": 36,

  // Πόλεις & Περιοχές
  "heraklion_hersonissos": 26,
  "heraklion_elounda": 69,
  "heraklion_agios-nikolaos": 64,
  "heraklion_rethymno": 79,
  "heraklion_chania": 139,
  "heraklion_matala": 66,
  "rethymno_chania": 60,
  "agios-nikolaos_elounda": 10,
  "agios-nikolaos_ierapetra": 35
};

// Συνάρτηση υπολογισμού απόστασης μεταξύ οποιουδήποτε ζεύγους
function getCreteDistanceKm(fromId, toId) {
  if (fromId === toId) return 10;
  
  const key1 = `${fromId}_${toId}`;
  const key2 = `${toId}_${fromId}`;

  if (CRETE_DISTANCES[key1]) return CRETE_DISTANCES[key1];
  if (CRETE_DISTANCES[key2]) return CRETE_DISTANCES[key2];

  return 35;
}

// Ιδιωτικές Περιηγήσεις & Εκδρομές στην Κρήτη (Crete Private Tours)
const TOURS_DATA = [
  {
    id: "tour-knossos-heraklion",
    titleEl: "Ανάκτορο Κνωσού, Αρχαιολογικό Μουσείο & Ιστορικό Ηράκλειο",
    titleEn: "Knossos Palace, Museum & Historic Heraklion Highlights",
    categoryEl: "Μισή Ημέρα (Half-Day)",
    categoryEn: "Half-Day Tour",
    durationEl: "4 - 5 Ώρες",
    durationEn: "4 - 5 Hours",
    distanceKm: 40,
    priceFrom: 180,
    shortDescEl: "Γνωρίστε την καρδιά του Μινωικού Πολιτισμού στο θρυλικό Ανάκτορο της Κνωσού, το παγκοσμίου φήμης Μουσείο και το Ενετικό Κάστρο Κούλες.",
    shortDescEn: "Explore the cradle of Minoan civilization at mythical Knossos Palace, the world-renowned Archaeological Museum, and the Venetian fortress of Koules.",
    highlightsEl: [
      "Επίσκεψη στο Ανάκτορο της Κνωσού & Αίθουσα του Θρόνου",
      "Αρχαιολογικό Μουσείο Ηρακλείου με τα μινωικά αριστουργήματα",
      "Ενετικό Λιμάνι, Φρούριο Κούλες & Κρήνη Μοροζίνι (Λιοντάρια)",
      "Ελεύθερος χρόνος για καφέ και κρητική γαστρονομία στο κέντρο"
    ],
    highlightsEn: [
      "Guided stop at the Palace of Knossos & Throne Room",
      "Heraklion Archaeological Museum with iconic Minoan frescoes",
      "Venetian Old Port, Koules Fortress & Morosini Lions Fountain",
      "Free time for authentic Cretan coffee and dining in old town"
    ],
    placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: Εκδρομή Κνωσός & Ηράκλειο - 800x600]"
  },
  {
    id: "tour-elounda-spinalonga",
    titleEl: "Ελούντα, Νήσος Σπιναλόγκα & Άγιος Νικόλαος",
    titleEn: "Elounda, Spinalonga Island & Cosmopolitan Agios Nikolaos",
    categoryEl: "Ημερήσια (Full-Day)",
    categoryEn: "Full-Day Tour",
    durationEl: "6 - 7 Ώρες",
    durationEn: "6 - 7 Hours",
    distanceKm: 140,
    priceFrom: 290,
    shortDescEl: "Μαγευτική εκδρομή στον κόλπο του Μιραμπέλλου: το ιστορικό ενετικό νησί-φρούριο της Σπιναλόγκας, η πολυτελής Ελούντα και η γραφική λίμνη του Αγίου Νικολάου.",
    shortDescEn: "A captivating journey along Mirabello Bay: the historic Venetian island fortress of Spinalonga, luxury Elounda, and picturesque Lake Voulismeni.",
    highlightsEl: [
      "Πανοραμική θέα του κόλπου Μιραμπέλλου",
      "Επίσκεψη στην Ελούντα & μετάβαση με καραβάκι στη Σπιναλόγκα",
      "Ξενάγηση στο ιστορικό ενετικό οχυρό",
      "Βόλτα και γεύμα δίπλα στη μυθική λίμνη του Αγίου Νικολάου"
    ],
    highlightsEn: [
      "Panoramic views overlooking Mirabello Bay",
      "Visit to elite Elounda & short boat trip to Spinalonga",
      "Exploration of the UNESCO-nominated Venetian fortress",
      "Stroll and seaside lunch by famous Lake Voulismeni"
    ],
    placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: Εκδρομή Ελούντα & Σπιναλόγκα - 800x600]"
  },
  {
    id: "tour-chania-venetian",
    titleEl: "Χανιά: Παλιά Πόλη, Ενετικό Λιμάνι & Χερσόνησος Ακρωτηρίου",
    titleEn: "Chania Old Venetian Harbor, Lighthouse & Akrotiri Monasteries",
    categoryEl: "Ημερήσια (Full-Day)",
    categoryEn: "Full-Day Tour",
    durationEl: "7 - 8 Ώρες",
    durationEn: "7 - 8 Hours",
    distanceKm: 280,
    priceFrom: 340,
    shortDescEl: "Η πιο γραφική πόλη της Κρήτης: πλακόστρωτα σοκάκια, ενετικός φάρος, ιστορικές συνοικίες και η επιβλητική Μονή Αγίας Τριάδας των Τζαγκαρόλων.",
    shortDescEn: "Crete's most romantic town: cobbled alleys, the 16th-century Venetian Lighthouse, Turkish mosques, and the historic Agia Triada Monastery.",
    highlightsEl: [
      "Περίπατος στο Παλιό Ενετικό Λιμάνι των Χανίων & Φάρος",
      "Σοκάκια της παλιάς πόλης (Τοπανάς, Σπλάντζια, Εβραϊκή συνοικία)",
      "Ιστορικοί Τάφοι των Βενιζέλων με πανοραμική θέα",
      "Επίσκεψη στην εντυπωσιακή Μονή Αγίας Τριάδας των Τζαγκαρόλων"
    ],
    highlightsEn: [
      "Stroll around Chania Venetian Harbor & Ottoman Mosque",
      "Picturesque alleys of Topanas, Splantzia and Jewish quarter",
      "Panoramic vistas of Chania gulf from Venizelos Graves",
      "Visit to Renaissance-style Agia Triada Tzagaroli Monastery"
    ],
    placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: Εκδρομή Χανιά & Ενετικό Λιμάνι - 800x600]"
  },
  {
    id: "tour-rethymno-arkadi",
    titleEl: "Ρέθυμνο: Παλιά Πόλη, Φορτέτζα & Ιστορική Μονή Αρκαδίου",
    titleEn: "Rethymno Old Town, Fortezza & Historic Arkadi Monastery",
    categoryEl: "Μισή / Ολοήμερη",
    categoryEn: "Half / Full-Day Tour",
    durationEl: "5 - 6 Ώρες",
    durationEn: "5 - 6 Hours",
    distanceKm: 160,
    priceFrom: 260,
    shortDescEl: "Αναγεννησιακή γοητεία στο Ρέθυμνο, το μεγαλύτερο σωζόμενο ενετικό φρούριο της Κρήτης (Φορτέτζα) και το ιερό σύμβολο ελευθερίας, η Μονή Αρκαδίου.",
    shortDescEn: "Renaissance charm in Rethymno, Crete's grandest Venetian fortress (Fortezza), and the sacred European monument of freedom, Arkadi Monastery.",
    highlightsEl: [
      "Επίσκεψη στην ιστορική και μαρτυρική Μονή Αρκαδίου",
      "Περιήγηση στην Ενετική Φορτέτζα του Ρεθύμνου",
      "Γραφικά ενετικά & οθωμανικά σοκάκια, Κρήνη Ριμόντι",
      "Χαλαρωτικός καφές στο ενετικό λιμανάκι του Ρεθύμνου"
    ],
    highlightsEn: [
      "Visit to the heroic Arkadi Monastery and museum",
      "Exploration of the imposing Fortezza fortress atop hill",
      "Neoclassical and Ottoman architecture & Rimondi Fountain",
      "Relaxing seafront dining at the scenic Venetian harbor"
    ],
    placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: Εκδρομή Ρέθυμνο & Μονή Αρκαδίου - 800x600]"
  },
  {
    id: "tour-south-crete-matala",
    titleEl: "Νότια Κρήτη: Φαιστός, Γόρτυνα & Παραλία Μάταλα",
    titleEn: "South Crete Discovery: Phaistos Palace, Gortyna & Matala Caves",
    categoryEl: "Ημερήσια (Full-Day)",
    categoryEn: "Full-Day Tour",
    durationEl: "7 - 8 Ώρες",
    durationEn: "7 - 8 Hours",
    distanceKm: 150,
    priceFrom: 280,
    shortDescEl: "Διασχίστε την πεδιάδα της Μεσαράς προς το αυθεντικό νότιο κρητικό πέλαγος: Μινωική Φαιστός, ρωμαϊκή Γόρτυνα και οι θρυλικές σπηλιές των χίπις στα Μάταλα.",
    shortDescEn: "Cross the Messara valley to the Libyan Sea: Minoan Phaistos Palace (Disk of Phaistos), Roman Gortyn, and the famous hippie caves of Matala.",
    highlightsEl: [
      "Αρχαιολογικός Χώρος Φαιστού με θέα στον Ψηλορείτη",
      "Ρωμαϊκή Πρωτεύουσα Γόρτυνα & η Αρχαιότερη Νομοθεσία της Ευρώπης",
      "Μπάνιο στα κρυστάλλινα νερά του Λιβυκού Πελάγους στα Μάταλα",
      "Επίσκεψη στις λαξευτές προϊστορικές σπηλιές των Ματάλων"
    ],
    highlightsEn: [
      "Minoan Palace of Phaistos overlooking Mount Ida",
      "Roman ruins of Gortyna and the Law Code inscription",
      "Swimming in the crystal Libyan Sea at Matala beach",
      "Exploring the famous sandstone hippie caves"
    ],
    placeholderText: "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: Εκδρομή Νότια Κρήτη & Μάταλα - 800x600]"
  }
];

window.CRETE_LOCATIONS = CRETE_LOCATIONS;
window.PICKUP_HUBS = CRETE_LOCATIONS;
window.getCreteDistanceKm = getCreteDistanceKm;
window.TOURS_DATA = TOURS_DATA;
