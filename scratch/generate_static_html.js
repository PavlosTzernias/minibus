const fs = require("fs");

global.window = global;
global.currentLang = "el";

// Load data files
eval(fs.readFileSync("js/config.js", "utf8"));
eval(fs.readFileSync("js/data/fleet.js", "utf8"));
eval(fs.readFileSync("js/data/routes.js", "utf8"));
eval(fs.readFileSync("js/renderer.js", "utf8"));

console.log("Generating static HTML snippets for Greek (EL)...");

// Mock document
class MockElement {
  constructor(tag) {
    this.tagName = tag;
    this.children = [];
    this.innerHTML = "";
    this.className = "";
    this.id = "";
    this.style = {};
  }
  appendChild(child) {
    this.children.push(child);
  }
}

global.document = {
  createElement: (tag) => new MockElement(tag),
  getElementById: (id) => new MockElement("div")
};

// Generate Fleet Preview HTML
const fleetPreviewParent = new MockElement("div");
global.document.getElementById = () => fleetPreviewParent;
SiteRenderer.renderFleetPreview("fleet-preview-container", true);

const fleetPreviewHTML = fleetPreviewParent.children.map(c => `
        <div class="${c.className}">
          ${c.innerHTML}
        </div>
`).join("\n");

fs.writeFileSync("scratch/snippet_fleet_preview.html", fleetPreviewHTML);
console.log("Saved scratch/snippet_fleet_preview.html");

// Generate Fleet Page HTML
const fleetPageParent = new MockElement("div");
global.document.getElementById = () => fleetPageParent;
SiteRenderer.renderFleetPage("fleet-detail-container", true);

const fleetPageHTML = fleetPageParent.children.map(c => `
        <div class="${c.className}" id="${c.id}">
          ${c.innerHTML}
        </div>
`).join("\n");

fs.writeFileSync("scratch/snippet_fleet_detail.html", fleetPageHTML);
console.log("Saved scratch/snippet_fleet_detail.html");

// Generate Home Tours HTML (2 tours)
const homeToursParent = new MockElement("div");
global.document.getElementById = () => homeToursParent;
SiteRenderer.renderTours("home-tours-preview", 2, true);

const homeToursHTML = homeToursParent.children.map(c => `
        <div class="${c.className}">
          ${c.innerHTML}
        </div>
`).join("\n");

fs.writeFileSync("scratch/snippet_home_tours.html", homeToursHTML);
console.log("Saved scratch/snippet_home_tours.html");

// Generate All Tours HTML
const allToursParent = new MockElement("div");
global.document.getElementById = () => allToursParent;
SiteRenderer.renderTours("all-tours-container", null, true);

const allToursHTML = allToursParent.children.map(c => `
        <div class="${c.className}">
          ${c.innerHTML}
        </div>
`).join("\n");

fs.writeFileSync("scratch/snippet_all_tours.html", allToursHTML);
console.log("Saved scratch/snippet_all_tours.html");
