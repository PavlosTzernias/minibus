const fs = require('fs');
const path = require('path');

function testMobileMenuFix() {
  console.log('--- RUNNING MOBILE MENU & OVERLAY FIX VERIFICATION ---');
  let failures = 0;

  const check = (condition, msg) => {
    if (condition) {
      console.log(`  [PASS] ${msg}`);
    } else {
      console.error(`  [FAIL] ${msg}`);
      failures++;
    }
  };

  const componentsCss = fs.readFileSync(path.join(__dirname, 'css/components.css'), 'utf8');
  const appJs = fs.readFileSync(path.join(__dirname, 'js/app.js'), 'utf8');

  // 1. Stacking Context Fix: overlay must NOT sit above header and menu
  check(componentsCss.includes('.nav-overlay {') && componentsCss.includes('z-index: 995;'), '.nav-overlay is set to z-index: 995 (behind header & drawer)');
  check(componentsCss.includes('.site-header.menu-open {') && componentsCss.includes('z-index: 10000;'), '.site-header.menu-open elevates header to z-index: 10000');
  check(componentsCss.includes('.mobile-toggle {') && componentsCss.includes('z-index: 10002;'), '.mobile-toggle has z-index: 10002');
  check(componentsCss.includes('.nav-menu {') && componentsCss.includes('z-index: 10001;'), '.nav-menu has z-index: 10001');

  // 2. Large Touch Target for Toggle
  check(componentsCss.includes('width: 44px;') && componentsCss.includes('height: 44px;'), '.mobile-toggle has 44x44px touch area');

  // 3. JS Menu Open/Close adds and removes menu-open class on header
  check(appJs.includes('header.classList.add("menu-open")'), 'app.js adds menu-open class to header on openMenu()');
  check(appJs.includes('header.classList.remove("menu-open")'), 'app.js removes menu-open class from header on closeMenu()');

  // 4. All 6 HTML files have mobile-menu-extras inside nav-menu
  const htmlFiles = ['index.html', 'fleet.html', 'tours.html', 'booking.html', 'contact.html', 'privacy.html'];
  htmlFiles.forEach(file => {
    const html = fs.readFileSync(path.join(__dirname, file), 'utf8');
    check(html.includes('class="mobile-menu-extras"'), `${file} contains mobile-menu-extras`);
    check(html.includes('btn-quote-mobile'), `${file} contains mobile quote button in drawer`);
  });

  console.log(`\nTEST RESULTS: ${failures === 0 ? 'ALL PASSED!' : `${failures} FAILURES`}`);
  if (failures > 0) process.exit(1);
}

testMobileMenuFix();
