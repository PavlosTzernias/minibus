const fs = require('fs');
const path = require('path');

console.log("=== RUNNING VERIFICATION ON LATEST CHANGES ===");

let allPassed = true;
function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    allPassed = false;
  } else {
    console.log(`[PASS] ${message}`);
  }
}

// 1. Verify booking.html
const bookingHtml = fs.readFileSync(path.join(__dirname, '../booking.html'), 'utf8');

assert(!bookingHtml.includes('id="field-estimate"'), 'booking.html must NOT contain id="field-estimate"');
assert(!bookingHtml.includes('formEstimatedPriceField'), 'booking.html must NOT contain formEstimatedPriceField');
assert(bookingHtml.includes('select id="field-pickup"'), 'booking.html contains <select id="field-pickup">');
assert(bookingHtml.includes('select id="field-dropoff"'), 'booking.html contains <select id="field-dropoff">');
assert(!bookingHtml.toLowerCase().includes('ξενοδοχείο'), 'booking.html does not contain "ξενοδοχείο"');
assert(bookingHtml.includes('paulostzernias@gmail.com'), 'booking.html contains paulostzernias@gmail.com');

// Count options in booking.html
const pickupMatches = bookingHtml.match(/<select id="field-pickup"[\s\S]*?<\/select>/);
assert(pickupMatches !== null, 'Found select id="field-pickup" in HTML');
if (pickupMatches) {
  const optionCount = (pickupMatches[0].match(/<option/g) || []).length;
  assert(optionCount === 23, `field-pickup has 23 options (found: ${optionCount})`);
}

const dropoffMatches = bookingHtml.match(/<select id="field-dropoff"[\s\S]*?<\/select>/);
assert(dropoffMatches !== null, 'Found select id="field-dropoff" in HTML');
if (dropoffMatches) {
  const optionCount = (dropoffMatches[0].match(/<option/g) || []).length;
  assert(optionCount === 23, `field-dropoff has 23 options (found: ${optionCount})`);
}

// 2. Verify js/config.js
global.window = global;
require('../js/config.js');
assert(global.SITE_CONFIG.contact.email === 'paulostzernias@gmail.com', 'SITE_CONFIG.contact.email is paulostzernias@gmail.com');
assert(global.SITE_CONFIG.contact.supportEmail === 'paulostzernias@gmail.com', 'SITE_CONFIG.contact.supportEmail is paulostzernias@gmail.com');

// 3. Verify js/data/routes.js
require('../js/data/routes.js');
assert(Array.isArray(global.CRETE_LOCATIONS) && global.CRETE_LOCATIONS.length === 23, 'CRETE_LOCATIONS has 23 items');

// 4. Verify js/app.js logic for selectOptionByValueOrText & populateBookingForm
const appCode = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
assert(appCode.includes('paulostzernias@gmail.com'), 'app.js directs submission to paulostzernias@gmail.com');
assert(appCode.includes('selectOptionByValueOrText'), 'app.js includes selectOptionByValueOrText helper');

// Check that info@vipminibus-crete.gr does not remain in html files
const htmlFiles = ['index.html', 'fleet.html', 'tours.html', 'booking.html', 'contact.html', 'privacy.html'];
htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  assert(!content.includes('info@vipminibus-crete.gr'), `${file} no longer contains old info@vipminibus-crete.gr`);
  assert(content.includes('paulostzernias@gmail.com'), `${file} contains new paulostzernias@gmail.com`);
});

if (allPassed) {
  console.log("\n>>> ALL TESTS PASSED SUCCESSFULLY (100%) <<<");
} else {
  console.error("\n>>> SOME TESTS FAILED <<<");
  process.exit(1);
}
