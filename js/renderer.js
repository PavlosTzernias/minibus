/**
 * ============================================================================
 * VIP MINI BUS TRANSFERS & TOURS - DYNAMIC RENDERER (renderer.js)
 * ============================================================================
 * ΑΠΟΔΟΣΗ ΣΤΟΙΧΕΙΩΝ & ΣΤΟΛΟΥ ΣΤΟ DOM (ΚΡΗΤΗ)
 */

const SiteRenderer = {
  // Helper για τη δημιουργία καθαρών λευκών placeholder frames με ρητή ένδειξη «ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ»
  createImageFrame(imgSpec, aspectClass = "aspect-16-9") {
    const hasRealSrc = imgSpec && imgSpec.src && imgSpec.src.trim() !== "";
    const placeholderText = imgSpec?.placeholderText || "[ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ: 800x600]";
    const altText = (window.currentLang === "el" ? imgSpec?.altEl : imgSpec?.altEn) || "ΦΩΤΟΓΡΑΦΙΑ: VIP Mini Bus";

    if (hasRealSrc) {
      return `
        <div class="image-frame ${aspectClass}">
          <img src="${imgSpec.src}" alt="${altText}" loading="lazy">
        </div>
      `;
    }

    return `
      <div class="image-frame ${aspectClass}">
        <div class="image-frame-placeholder">
          <div class="badge badge-gold" style="margin-bottom: 0.6rem; font-size: 0.725rem;">
            📸 ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ
          </div>
          <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <circle cx="8" cy="19" r="2"></circle>
            <circle cx="16" cy="19" r="2"></circle>
            <path d="M16 8h2l3 4v3h-5V8z"></path>
          </svg>
          <span class="placeholder-label">${altText}</span>
          <span class="placeholder-dimensions">${placeholderText}</span>
        </div>
      </div>
    `;
  },

  // Helper για δημιουργία minimal κάρτας οχήματος (Όνομα + Φωτογραφία, άνοιγμα πληροφοριών με κλικ)
  createFleetCard(vehicle, lang = "el") {
    const title = lang === "el" ? vehicle.nameEl : vehicle.nameEn;
    const shortDesc = lang === "el" ? vehicle.shortDescEl : vehicle.shortDescEn;
    const luggageText = lang === "el" ? vehicle.luggageTextEl : vehicle.luggageTextEn;
    const features = (lang === "el" ? vehicle.featuresEl : vehicle.featuresEn).slice(0, 4);
    const featuresHtml = features.map(f => `<span class="feature-tag">✓ ${f}</span>`).join("");

    return `
      <div class="fleet-card card" data-vehicle-id="${vehicle.id}">
        ${this.createImageFrame(vehicle.images.hero, "aspect-16-9")}
        <div class="fleet-card-body">
          <div class="fleet-card-header-minimal">
            <h3 class="fleet-card-title">${title}</h3>
            <span class="badge badge-gold" style="font-size: 0.8rem; align-self: flex-start;">${vehicle.passengers} ${lang === "el" ? "Θέσεις" : "Seats"}</span>
          </div>

          <button type="button" class="btn-fleet-toggle" aria-expanded="false">
            <span class="toggle-text-more">${lang === "el" ? "Περισσότερες Πληροφορίες ↓" : "More Information ↓"}</span>
            <span class="toggle-text-less" style="display: none;">${lang === "el" ? "Λιγότερα ↑" : "Show Less ↑"}</span>
          </button>

          <div class="fleet-extra-info" style="display: none;">
            <p class="text-muted fleet-desc" style="font-size: 0.925rem; margin: 0.8rem 0 1rem 0; line-height: 1.5;">${shortDesc}</p>
            
            <div class="fleet-meta" style="margin-bottom: 0.85rem;">
              <div class="fleet-meta-item">
                <svg class="fleet-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <span>${vehicle.passengers} ${lang === "el" ? "Επιβάτες" : "Passengers"}</span>
              </div>
              <div class="fleet-meta-item">
                <svg class="fleet-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                <span>${luggageText}</span>
              </div>
            </div>

            <div class="features-list" style="margin-bottom: 1rem;">
              ${featuresHtml}
            </div>

            <div class="fleet-card-actions" style="margin-top: 1rem;">
              <a href="booking.html" class="btn btn-primary btn-sm btn-block">
                ${lang === "el" ? "Κράτηση Οχήματος" : "Book This Vehicle"}
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Απόδοση καρτών Στόλου στην Αρχική (Preview Carousel)
  renderFleetPreview(targetContainerId = "fleet-preview-container", force = false) {
    const container = document.getElementById(targetContainerId);
    if (!container || !window.FLEET_DATA) return;
    if (!force && container.children.length > 0 && (window.currentLang || "el") === "el") return;

    const lang = window.currentLang || "el";
    container.innerHTML = "";

    window.FLEET_DATA.forEach(vehicle => {
      container.insertAdjacentHTML("beforeend", this.createFleetCard(vehicle, lang));
    });
  },

  // Απόδοση Στόλου στη Σελίδα Στόλου (fleet.html Carousel)
  renderFleetPage(targetContainerId = "fleet-detail-container", force = false) {
    const container = document.getElementById(targetContainerId);
    if (!container || !window.FLEET_DATA) return;
    if (!force && container.children.length > 0 && (window.currentLang || "el") === "el") return;

    const lang = window.currentLang || "el";
    container.innerHTML = "";

    window.FLEET_DATA.forEach(vehicle => {
      container.insertAdjacentHTML("beforeend", this.createFleetCard(vehicle, lang));
    });
  },

  // Απόδοση Εκδρομών Κρήτης (tours.html & index.html preview)
  renderTours(targetContainerId = "tours-container", limit = null, force = false) {
    const container = document.getElementById(targetContainerId);
    if (!container || !window.TOURS_DATA) return;
    if (!force && container.children.length > 0 && (window.currentLang || "el") === "el") return;

    const lang = window.currentLang || "el";
    container.innerHTML = "";

    const toursToRender = limit ? window.TOURS_DATA.slice(0, limit) : window.TOURS_DATA;

    toursToRender.forEach(tour => {
      const card = document.createElement("div");
      card.className = "tour-card card"; // Stable

      const title = lang === "el" ? tour.titleEl : tour.titleEn;
      const category = lang === "el" ? tour.categoryEl : tour.categoryEn;
      const duration = lang === "el" ? tour.durationEl : tour.durationEn;
      const shortDesc = lang === "el" ? tour.shortDescEl : tour.shortDescEn;
      const highlights = lang === "el" ? tour.highlightsEl : tour.highlightsEn;

      const highlightsHtml = highlights.map(h => `
        <li class="tour-highlight-item">
          <svg class="tour-highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${h}</span>
        </li>
      `).join("");

      card.innerHTML = `
        <div class="image-frame aspect-16-9">
          <div class="image-frame-placeholder">
            <div class="badge badge-gold" style="margin-bottom: 0.6rem; font-size: 0.725rem;">
              📸 ΕΔΩ ΜΠΑΙΝΕΙ ΦΩΤΟΓΡΑΦΙΑ
            </div>
            <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span class="placeholder-label">ΦΩΤΟΓΡΑΦΙΑ: ${title}</span>
            <span class="placeholder-dimensions">${tour.placeholderText}</span>
          </div>
        </div>

        <div class="tour-card-body">
          <div class="tour-meta">
            <span class="badge badge-gold">${category}</span>
            <span>🕒 ${duration}</span>
            <span>📍 ~${tour.distanceKm} km</span>
          </div>

          <h3 class="tour-title">${title}</h3>
          <p class="tour-desc">${shortDesc}</p>

          <ul class="tour-highlights">
            ${highlightsHtml}
          </ul>

          <div class="tour-footer">
            <div>
              <div class="tour-price-from">${lang === "el" ? "Από" : "From"}</div>
              <div class="tour-price-val">${tour.priceFrom}€</div>
            </div>
            <a href="booking.html?tour=${encodeURIComponent(tour.id)}&title=${encodeURIComponent(title)}" class="btn btn-primary btn-sm">
              ${lang === "el" ? "Κράτηση Εκδρομής" : "Book This Tour"}
            </a>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  },

  // Εισαγωγή κεντρικών στοιχείων (Config / Contact / Legal)
  injectCentralData() {
    if (!window.SITE_CONFIG) return;
    const config = window.SITE_CONFIG;
    const lang = window.currentLang || "el";

    document.querySelectorAll(".dyn-phone").forEach(el => {
      el.textContent = config.contact.phoneFormatted;
    });

    document.querySelectorAll(".dyn-phone-link").forEach(el => {
      el.href = `tel:${config.contact.phoneRaw}`;
    });

    document.querySelectorAll(".dyn-whatsapp-link").forEach(el => {
      el.href = `https://wa.me/${config.contact.phoneRaw}?text=${encodeURIComponent(
        lang === "el" 
          ? "Γεια σας! Ενδιαφέρομαι για VIP transfer ή εκδρομή στην Κρήτη με το Mini Bus σας." 
          : "Hello! I am interested in booking a VIP Mini Bus transfer or tour in Crete."
      )}`;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });

    document.querySelectorAll(".dyn-email").forEach(el => {
      el.textContent = config.contact.email;
    });

    document.querySelectorAll(".dyn-email-link").forEach(el => {
      el.href = `mailto:${config.contact.email}`;
    });

    document.querySelectorAll(".dyn-legal-company").forEach(el => {
      el.textContent = config.legal.companyName;
    });

    document.querySelectorAll(".dyn-legal-title").forEach(el => {
      el.textContent = config.legal.distinctiveTitle;
    });

    document.querySelectorAll(".dyn-legal-vat").forEach(el => {
      el.textContent = config.legal.vatNumber;
    });

    document.querySelectorAll(".dyn-legal-doy").forEach(el => {
      el.textContent = lang === "el" ? config.legal.taxOfficeEl : config.legal.taxOfficeEn;
    });

    document.querySelectorAll(".dyn-legal-gemi").forEach(el => {
      el.textContent = config.legal.gemiNumber;
    });

    document.querySelectorAll(".dyn-legal-mhte").forEach(el => {
      el.textContent = config.legal.mhteNumber;
    });

    document.querySelectorAll(".dyn-legal-address").forEach(el => {
      el.textContent = lang === "el" ? config.legal.headquartersEl : config.legal.headquartersEn;
    });
  }
};

window.SiteRenderer = SiteRenderer;
