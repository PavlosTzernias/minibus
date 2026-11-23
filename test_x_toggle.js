const fs = require('fs');
const path = require('path');

function testXToggle() {
  console.log('--- TESTING X TOGGLE SYMMETRY & DESIGN ---');
  let failures = 0;

  const check = (condition, msg) => {
    if (condition) {
      console.log(`  [PASS] ${msg}`);
    } else {
      console.error(`  [FAIL] ${msg}`);
      failures++;
    }
  };

  const css = fs.readFileSync(path.join(__dirname, 'css/components.css'), 'utf8');

  check(css.includes('.mobile-toggle {') && css.includes('width: 44px;') && css.includes('height: 44px;'), 'mobile-toggle is 44x44px');
  check(css.includes('.mobile-toggle span {') && css.includes('width: 24px;') && css.includes('left: 10px;'), 'spans are 24px wide and centered at left: 10px');
  check(css.includes('transform-origin: center center;'), 'spans have transform-origin: center center');
  check(css.includes('.mobile-toggle.active span:nth-child(1) {') && css.includes('top: 21px;') && css.includes('rotate(45deg);'), 'line 1 meets at top: 21px and rotates 45deg');
  check(css.includes('.mobile-toggle.active span:nth-child(3) {') && css.includes('top: 21px;') && css.includes('rotate(-45deg);'), 'line 3 meets at top: 21px and rotates -45deg');
  check(css.includes('.mobile-toggle.active span:nth-child(2) {') && css.includes('opacity: 0;'), 'line 2 disappears cleanly in active state');
  check(css.includes('.mobile-toggle.active {') && css.includes('rgba(212, 175, 55'), 'mobile-toggle.active has luxury gold circular highlight');

  console.log(`\nTEST RESULTS: ${failures === 0 ? 'ALL PASSED!' : `${failures} FAILURES`}`);
  if (failures > 0) process.exit(1);
}

testXToggle();
