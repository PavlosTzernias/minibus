const fs = require("fs");

let toursHtml = fs.readFileSync("tours.html", "utf8");
const allToursSnippet = fs.readFileSync("scratch/snippet_all_tours.html", "utf8");

const target = `<div id="all-tours-container" class="grid grid-2" style="margin-bottom: 3.5rem;">\n        <!-- Rendered via renderer.js -->\n      </div>`;
const replacement = `<div id="all-tours-container" class="grid grid-2" style="margin-bottom: 3.5rem;">\n${allToursSnippet}\n      </div>`;

if (toursHtml.includes(target)) {
  toursHtml = toursHtml.replace(target, replacement);
  fs.writeFileSync("tours.html", toursHtml, "utf8");
  console.log("Successfully embedded all tours into tours.html");
} else {
  console.error("Target not found in tours.html");
  process.exit(1);
}
