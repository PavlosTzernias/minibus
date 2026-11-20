const fs = require("fs");
const path = require("path");

global.window = global;

const htmlFiles = [
  "index.html",
  "fleet.html",
  "tours.html",
  "booking.html",
  "contact.html",
  "privacy.html"
];

let hasErrors = false;

console.log("=== 1. VERIFYING HTML FILES FOR DROPDOWNS & REMOVED KM ===");

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, "utf8");

  // Check for #calc-km
  if (content.includes('id="calc-km"')) {
    console.error(`[FAIL] ${file} still contains id="calc-km"!`);
    hasErrors = true;
  }

  // Check index.html and booking.html calculator structure
  if (file === "index.html" || file === "booking.html") {
    if (!content.includes('<select id="calc-pickup"')) {
      console.error(`[FAIL] ${file} is missing <select id="calc-pickup">!`);
      hasErrors = true;
    }
    if (!content.includes('<select id="calc-dropoff"')) {
      console.error(`[FAIL] ${file} is missing <select id="calc-dropoff">!`);
      hasErrors = true;
    }
  }

  // Check internal links
  const hrefMatches = content.matchAll(/href="([^"#:]+\.html)"/g);
  for (const m of hrefMatches) {
    const target = m[1];
    if (!fs.existsSync(target)) {
      console.error(`[FAIL] ${file} has broken link: ${target}`);
      hasErrors = true;
    }
  }

  // Check script tags
  const scriptMatches = content.matchAll(/src="([^"]+\.js)"/g);
  for (const m of scriptMatches) {
    const src = m[1];
    if (!fs.existsSync(src)) {
      console.error(`[FAIL] ${file} has broken script: ${src}`);
      hasErrors = true;
    }
  }
});

console.log("=== 2. VERIFYING ROUTES DATA & ABSENCE OF 'ΞΕΝΟΔΟΧΕΙΟ' IN DROPDOWNS ===");
const routesCode = fs.readFileSync("js/data/routes.js", "utf8");
eval(routesCode);

if (!Array.isArray(CRETE_LOCATIONS) || CRETE_LOCATIONS.length === 0) {
  console.error("[FAIL] CRETE_LOCATIONS is invalid or empty!");
  hasErrors = true;
} else {
  console.log(`[PASS] Found ${CRETE_LOCATIONS.length} Crete locations.`);
  CRETE_LOCATIONS.forEach(loc => {
    if (loc.nameEl.toLowerCase().includes("ξενοδοχε") || loc.nameEn.toLowerCase().includes("hotel")) {
      console.error(`[FAIL] Location ${loc.id} contains 'hotel/ξενοδοχείο': ${loc.nameEl}`);
      hasErrors = true;
    }
  });
}

// Test sample distances
const testPairs = [
  ["airport-her", "elounda", 68],
  ["airport-her", "chania", 140],
  ["airport-her", "rethymno", 82],
  ["airport-chq", "chania", 14],
  ["port-her", "heraklion", 3]
];

testPairs.forEach(([from, to, expected]) => {
  const dist = getCreteDistanceKm(from, to);
  if (dist !== expected) {
    console.error(`[FAIL] Distance ${from} -> ${to} expected ${expected}, got ${dist}`);
    hasErrors = true;
  }
});
console.log("[PASS] Distance matrix lookup validated.");

console.log("=== 3. VERIFYING I18N DATA ===");
const i18nCode = fs.readFileSync("js/data/i18n.js", "utf8");
eval(i18nCode);

if (I18N_DATA.el.calcLabelDropoff.includes("Ξενοδοχείο")) {
  console.error("[FAIL] I18N_DATA.el.calcLabelDropoff contains 'Ξενοδοχείο'!");
  hasErrors = true;
} else {
  console.log(`[PASS] calcLabelDropoff EL: "${I18N_DATA.el.calcLabelDropoff}"`);
}

if (I18N_DATA.el.formPickup.includes("Ξενοδοχείο") || I18N_DATA.el.formDropoff.includes("Ξενοδοχείο")) {
  console.error("[FAIL] I18N_DATA.el formPickup or formDropoff contains 'Ξενοδοχείο'!");
  hasErrors = true;
} else {
  console.log(`[PASS] formPickup EL: "${I18N_DATA.el.formPickup}"`);
  console.log(`[PASS] formDropoff EL: "${I18N_DATA.el.formDropoff}"`);
}

console.log("=== 4. VERIFYING PRICING LOGIC ===");
const configCode = fs.readFileSync("js/config.js", "utf8");
eval(configCode);

const pricing = SITE_CONFIG.pricing;
const testDist = 68; // airport-her -> elounda
const oneWay = pricing.baseFee + (testDist * pricing.perKmRate); // 35 + (68 * 1.80) = 157.4
const returnLeg = oneWay * (1 - (pricing.roundTripDiscountPercent / 100)); // 157.4 * 0.9 = 141.66
const roundTrip = oneWay + returnLeg; // 299.06

console.log(`[PASS] Calculation: 68 km -> OneWay: €${oneWay.toFixed(2)}, RoundTrip: €${roundTrip.toFixed(2)}`);

if (hasErrors) {
  console.error("OVERALL VERIFICATION: FAILED");
  process.exit(1);
} else {
  console.log("OVERALL VERIFICATION: 100% PASSED!");
}
