const fs = require('fs');
const path = require('path');

console.log("=== VERIFYING TOURS SWIPE CAROUSEL & MOBILE MENU FIX ===");

let allPassed = true;
function assert(condition, msg) {
  if (!condition) {
    console.error(`[FAIL] ${msg}`);
    allPassed = false;
  } else {
    console.log(`[PASS] ${msg}`);
  }
}

// 1. Verify index.html
const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

assert(indexHtml.includes('data-i18n="toursBadge"'), 'index.html has toursBadge');
assert(indexHtml.includes('data-i18n="toursHomeTitle"'), 'index.html has toursHomeTitle');
assert(indexHtml.includes('Δημοφιλή Tours στην Κρήτη'), 'index.html contains title "Δημοφιλή Tours στην Κρήτη"');
assert(indexHtml.includes('class="tours-carousel-track"'), 'index.html has tours-carousel-track');
assert(indexHtml.includes('id="tours-prev-btn"'), 'index.html has tours-prev-btn');
assert(indexHtml.includes('id="tours-next-btn"'), 'index.html has tours-next-btn');

// Check all 5 tours in index.html
assert(indexHtml.includes('tour-knossos-heraklion'), 'index.html contains tour-knossos-heraklion');
assert(indexHtml.includes('tour-elounda-spinalonga'), 'index.html contains tour-elounda-spinalonga');
assert(indexHtml.includes('tour-chania-venetian'), 'index.html contains tour-chania-venetian');
assert(indexHtml.includes('tour-rethymno-arkadi'), 'index.html contains tour-rethymno-arkadi');
assert(indexHtml.includes('tour-south-crete-matala'), 'index.html contains tour-south-crete-matala');

const tourCardsInHome = (indexHtml.match(/<div class="tour-card card">/g) || []).length;
assert(tourCardsInHome === 5, `index.html pre-renders all 5 tours in the carousel track (found: ${tourCardsInHome})`);

// 2. Verify css/components.css
const css = fs.readFileSync(path.join(__dirname, '../css/components.css'), 'utf8');

assert(!css.includes('contain: layout paint;'), 'css/components.css does NOT contain "contain: layout paint;" on header');
assert(css.includes('.nav-overlay'), 'css/components.css contains .nav-overlay');
assert(css.includes('tours-carousel-track'), 'css/components.css contains .tours-carousel-track');
assert(css.includes('scroll-snap-type: x mandatory'), 'css/components.css has scroll-snap-type: x mandatory');
assert(css.includes('overflow-x: auto'), 'css/components.css has overflow-x: auto');

// 3. Verify js/data/i18n.js
global.window = global;
require('../js/data/i18n.js');
assert(global.I18N_DATA.el.toursBadge === 'Δημοφιλή Tours', 'i18n EL toursBadge is correct');
assert(global.I18N_DATA.el.toursHomeTitle.includes('Δημοφιλή Tours'), 'i18n EL toursHomeTitle contains Δημοφιλή Tours');
assert(global.I18N_DATA.en.toursBadge === 'Popular Tours', 'i18n EN toursBadge is correct');
assert(global.I18N_DATA.en.toursHomeTitle.includes('Popular Tours'), 'i18n EN toursHomeTitle contains Popular Tours');

// 4. Verify js/app.js
const appJs = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
assert(appJs.includes('initToursCarousel'), 'js/app.js contains initToursCarousel');
assert(appJs.includes('nav-overlay'), 'js/app.js handles nav-overlay');
assert(!appJs.includes('SiteRenderer.renderTours("home-tours-preview", 2'), 'js/app.js no longer restricts home tours to 2');

if (allPassed) {
  console.log("\n>>> ALL TESTS PASSED (100%) <<<");
} else {
  console.error("\n>>> SOME TESTS FAILED <<<");
  process.exit(1);
}
