const fs = require("fs");

global.window = global;
global.currentLang = "el";

eval(fs.readFileSync("js/config.js", "utf8"));
eval(fs.readFileSync("js/data/routes.js", "utf8"));
eval(fs.readFileSync("js/data/i18n.js", "utf8"));

// Mock a DOM environment for calculator
class MockNode {
  constructor(tag = "div") {
    this.tagName = tag;
    this.value = "";
    this.textContent = "";
    this.innerHTML = "";
    this.children = [];
    this.options = [];
    this.selectedIndex = 0;
  }
  addEventListener() {}
  querySelector(selector) {
    if (selector === "#calc-pickup") return this.pickup;
    if (selector === "#calc-dropoff") return this.dropoff;
    if (selector === "#calc-trip-type") return this.tripType;
    if (selector === "#calc-passengers") return this.passengers;
    if (selector === "#calc-price-output") return this.priceOutput;
    if (selector === ".calc-price-disclaimer") return this.disclaimer;
    if (selector === "#calc-btn-book") return this.btnBook;
    return null;
  }
  appendChild(child) {
    this.children.push(child);
    this.options.push(child);
  }
}

global.document = {
  getElementById: (id) => {
    const root = new MockNode("div");
    root.id = id;
    root.pickup = new MockNode("select");
    root.dropoff = new MockNode("select");
    root.tripType = new MockNode("select");
    root.passengers = new MockNode("select");
    root.priceOutput = new MockNode("div");
    root.disclaimer = new MockNode("p");
    root.btnBook = new MockNode("button");
    return root;
  },
  createElement: (tag) => new MockNode(tag),
  addEventListener: () => {}
};

eval(fs.readFileSync("js/calculator.js", "utf8"));

const calc = new MiniBusCalculator("price-calculator");

let failed = false;

console.log("=== TEST 1: Standard Route (Airport HER -> Elounda) ===");
calc.pickupSelect.value = "airport-her";
calc.dropoffSelect.value = "elounda";
let res1 = calc.calculate();
console.log(`Standard result: ${res1.priceText}, isCustom: ${res1.isCustom}`);
if (res1.priceText.includes("—") || res1.isCustom) {
  console.error("[FAIL] Standard route should not be custom!");
  failed = true;
} else {
  console.log("[PASS] Standard route computed price range.");
}

console.log("\n=== TEST 2: Pickup = 'custom' (Άλλη Τοποθεσία στην Κρήτη) ===");
calc.pickupSelect.value = "custom";
calc.dropoffSelect.value = "elounda";
let res2 = calc.calculate();
console.log(`Custom Pickup result: '${res2.priceText}', isCustom: ${res2.isCustom}`);
if (res2.priceText !== "—" || !res2.isCustom) {
  console.error("[FAIL] Custom pickup must result in '—' and isCustom=true!");
  failed = true;
} else {
  console.log("[PASS] Custom pickup shows '—'");
}

console.log("\n=== TEST 3: Dropoff = 'custom' (Άλλη Τοποθεσία στην Κρήτη) ===");
calc.pickupSelect.value = "airport-her";
calc.dropoffSelect.value = "custom";
let res3 = calc.calculate();
console.log(`Custom Dropoff result: '${res3.priceText}', isCustom: ${res3.isCustom}`);
if (res3.priceText !== "—" || !res3.isCustom) {
  console.error("[FAIL] Custom dropoff must result in '—' and isCustom=true!");
  failed = true;
} else {
  console.log("[PASS] Custom dropoff shows '—'");
}

console.log("\n=== TEST 4: Both = 'custom' ===");
calc.pickupSelect.value = "custom";
calc.dropoffSelect.value = "custom";
let res4 = calc.calculate();
console.log(`Both Custom result: '${res4.priceText}', isCustom: ${res4.isCustom}`);
if (res4.priceText !== "—" || !res4.isCustom) {
  console.error("[FAIL] Both custom must result in '—' and isCustom=true!");
  failed = true;
} else {
  console.log("[PASS] Both custom shows '—'");
}

if (failed) {
  console.error("\nTEST SUITE FAILED");
  process.exit(1);
} else {
  console.log("\nALL CUSTOM LOCATION TESTS PASSED 100%!");
}
