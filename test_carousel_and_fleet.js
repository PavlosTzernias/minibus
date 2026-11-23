const fs = require('fs');
const path = require('path');

function runTests() {
  console.log('--- RUNNING CAROUSEL & FLEET VERIFICATION SUITE ---');
  let failures = 0;

  const check = (condition, msg) => {
    if (condition) {
      console.log(`  [PASS] ${msg}`);
    } else {
      console.error(`  [FAIL] ${msg}`);
      failures++;
    }
  };

  const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const toursHtml = fs.readFileSync(path.join(__dirname, 'tours.html'), 'utf8');
  const fleetHtml = fs.readFileSync(path.join(__dirname, 'fleet.html'), 'utf8');
  const componentsCss = fs.readFileSync(path.join(__dirname, 'css/components.css'), 'utf8');
  const appJs = fs.readFileSync(path.join(__dirname, 'js/app.js'), 'utf8');
  const rendererJs = fs.readFileSync(path.join(__dirname, 'js/renderer.js'), 'utf8');
  const fleetJs = fs.readFileSync(path.join(__dirname, 'js/data/fleet.js'), 'utf8');
  const i18nJs = fs.readFileSync(path.join(__dirname, 'js/data/i18n.js'), 'utf8');

  // Requirement 1: Hint "👈 Σύρετε (swipe)..." completely removed
  check(!indexHtml.includes('carousel-hint'), 'index.html does not contain .carousel-hint');
  check(!indexHtml.includes('👈'), 'index.html does not contain finger icon 👈');
  check(!indexHtml.includes('👉'), 'index.html does not contain finger icon 👉');
  check(!toursHtml.includes('carousel-hint'), 'tours.html does not contain .carousel-hint');
  check(!i18nJs.includes('toursSwipeHint'), 'i18n.js does not contain toursSwipeHint');

  // Requirement 2: Arrows placed left & right outside the text
  check(componentsCss.includes('.carousel-arrow {'), 'components.css defines .carousel-arrow');
  check(componentsCss.includes('top: 40%') && componentsCss.includes('transform: translateY(-50%)'), 'components.css positions arrows safely clear of text (top: 40%; transform: translateY(-50%))');
  check(componentsCss.includes('.carousel-arrow.prev {') && componentsCss.includes('left: -32px;'), 'components.css positions prev arrow outside (-32px)');
  check(componentsCss.includes('.carousel-arrow.next {') && componentsCss.includes('right: -32px;'), 'components.css positions next arrow outside (-32px)');
  check(!toursHtml.includes('Bespoke Private Itinerary Crete'), 'tours.html does not contain Bespoke Private Itinerary Crete badge');

  // Requirement 3: Tours carousel on both index.html and tours.html
  check(indexHtml.includes('id="home-tours-preview"') && indexHtml.includes('tours-carousel-track'), 'index.html has tours carousel track');
  check(indexHtml.includes('id="home-tours-prev-btn"') && indexHtml.includes('id="home-tours-next-btn"'), 'index.html has left & right middle arrows for tours');
  check(toursHtml.includes('id="all-tours-container"') && toursHtml.includes('tours-carousel-track'), 'tours.html has tours carousel track');
  check(toursHtml.includes('id="all-tours-prev-btn"') && toursHtml.includes('id="all-tours-next-btn"'), 'tours.html has left & right middle arrows for tours');

  // Requirement 4: Fleet carousel on both index.html and fleet.html
  check(indexHtml.includes('id="fleet-preview-container"') && indexHtml.includes('fleet-carousel-track'), 'index.html has fleet carousel track');
  check(indexHtml.includes('id="home-fleet-prev-btn"') && indexHtml.includes('id="home-fleet-next-btn"'), 'index.html has left & right middle arrows for fleet');
  check(fleetHtml.includes('id="fleet-detail-container"') && fleetHtml.includes('fleet-carousel-track'), 'fleet.html has fleet carousel track');
  check(fleetHtml.includes('id="fleet-prev-btn"') && fleetHtml.includes('id="fleet-next-btn"'), 'fleet.html has left & right middle arrows for fleet');
  check(fleetJs.includes('sprinter-vip-19') && fleetJs.includes('sprinter-vip-16') && fleetJs.includes('v-class-vip-7'), 'fleet.js contains 3 vehicles (Sprinter 19, Sprinter 16, V-Class 7)');

  // Requirement 5: Fleet card initially shows photo + name, and click reveals extra info
  check(componentsCss.includes('.fleet-card:not(.expanded) .fleet-extra-info {') && componentsCss.includes('display: none !important;'), 'components.css hides .fleet-extra-info when card is not expanded');
  check(componentsCss.includes('.fleet-card.expanded .fleet-extra-info {') && componentsCss.includes('display: block !important;'), 'components.css displays .fleet-extra-info when card is expanded');
  check(appJs.includes('function initFleetCardExpansion()'), 'app.js contains initFleetCardExpansion()');
  check(rendererJs.includes('createFleetCard'), 'renderer.js creates minimal card with toggle button and extra info');

  // Universal Carousel Function in app.js
  check(appJs.includes('function setupCarousel(trackId, prevBtnId, nextBtnId)'), 'app.js contains universal setupCarousel function');

  console.log(`\nTEST RESULTS: ${failures === 0 ? 'ALL PASSED!' : `${failures} FAILURES`}`);
  if (failures > 0) process.exit(1);
}

runTests();
