/**
 * ============================================================================
 * VIP MINI BUS TRANSFERS & TOURS - CALCULATOR LOGIC (calculator.js)
 * ============================================================================
 * ΕΚΤΙΜΗΤΗΣ ΚΟΣΤΟΥΣ ΔΙΑΔΡΟΜΗΣ - ΚΡΗΤΗ (2 DROPDOWNS: ΠΑΡΑΛΑΒΗ & ΠΡΟΟΡΙΣΜΟΣ)
 * 
 * Αυτόματος υπολογισμός βάσει του πίνακα αποστάσεων Κρήτης.
 * Χωρίς πεδίο πληκτρολόγησης χιλιομέτρων.
 */

class MiniBusCalculator {
  constructor(containerId = "price-calculator") {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.pickupSelect = this.container.querySelector("#calc-pickup");
    this.dropoffSelect = this.container.querySelector("#calc-dropoff");
    this.tripTypeSelect = this.container.querySelector("#calc-trip-type");
    this.passengersSelect = this.container.querySelector("#calc-passengers");
    this.priceOutput = this.container.querySelector("#calc-price-output");
    this.btnBookTrip = this.container.querySelector("#calc-btn-book");

    this.init();
  }

  init() {
    this.populateDropdowns();
    this.bindEvents();
    this.calculate();
  }

  populateDropdowns() {
    const currentLang = window.currentLang || "el";
    const locations = window.CRETE_LOCATIONS || [];

    // 1. Populate Pickups
    if (this.pickupSelect) {
      const selectedPickup = this.pickupSelect.value || "airport-her";
      this.pickupSelect.innerHTML = "";
      locations.forEach(loc => {
        const option = document.createElement("option");
        option.value = loc.id;
        option.textContent = currentLang === "el" ? loc.nameEl : loc.nameEn;
        if (loc.id === selectedPickup) option.selected = true;
        this.pickupSelect.appendChild(option);
      });
    }

    // 2. Populate Dropoffs (Standard Dropdown)
    if (this.dropoffSelect) {
      const selectedDropoff = this.dropoffSelect.value || "elounda";
      this.dropoffSelect.innerHTML = "";
      locations.forEach(loc => {
        const option = document.createElement("option");
        option.value = loc.id;
        option.textContent = currentLang === "el" ? loc.nameEl : loc.nameEn;
        if (loc.id === selectedDropoff) option.selected = true;
        this.dropoffSelect.appendChild(option);
      });
    }
  }

  bindEvents() {
    if (this.pickupSelect) {
      this.pickupSelect.addEventListener("change", () => this.calculate());
    }

    if (this.dropoffSelect) {
      this.dropoffSelect.addEventListener("change", () => this.calculate());
    }

    if (this.tripTypeSelect) {
      this.tripTypeSelect.addEventListener("change", () => this.calculate());
    }

    if (this.passengersSelect) {
      this.passengersSelect.addEventListener("change", () => this.calculate());
    }

    if (this.btnBookTrip) {
      this.btnBookTrip.addEventListener("click", (e) => {
        e.preventDefault();
        this.proceedToBooking();
      });
    }
  }

  calculate() {
    if (!window.SITE_CONFIG || !window.SITE_CONFIG.pricing) return;

    const pricing = window.SITE_CONFIG.pricing;
    const isRoundTrip = this.tripTypeSelect ? this.tripTypeSelect.value === "roundtrip" : false;
    
    const pickupId = this.pickupSelect ? this.pickupSelect.value : "airport-her";
    const dropoffId = this.dropoffSelect ? this.dropoffSelect.value : "elounda";
    const disclaimerEl = this.container.querySelector(".calc-price-disclaimer");
    const lang = window.currentLang || "el";

    // Αν κάποιο από τα δύο dropdowns έχει επιλογή "custom" (Άλλη Τοποθεσία στην Κρήτη)
    if (pickupId === "custom" || dropoffId === "custom") {
      const priceText = "—";
      this.lastEstimate = priceText;
      this.currentKm = 0;

      if (this.priceOutput) {
        this.priceOutput.textContent = priceText;
      }

      if (disclaimerEl) {
        disclaimerEl.textContent = lang === "el"
          ? "Για ειδικές διαδρομές στην Κρήτη, η τελική προσφορά διαμορφώνεται κατόπιν συνεννόησης."
          : "For custom locations in Crete, an official quote is provided promptly upon request.";
      }

      return {
        lowEstimate: 0,
        highEstimate: 0,
        priceText,
        distanceKm: 0,
        isRoundTrip,
        isCustom: true
      };
    }

    // Επαναφορά κανονικού disclaimer όταν δεν είναι custom
    if (disclaimerEl && window.I18N_DATA && window.I18N_DATA[lang]) {
      disclaimerEl.textContent = window.I18N_DATA[lang].calcDisclaimer;
    }

    // Αυτόματος υπολογισμός απόστασης (km) από τον πίνακα αποστάσεων Κρήτης
    const distanceKm = typeof window.getCreteDistanceKm === "function"
      ? window.getCreteDistanceKm(pickupId, dropoffId)
      : 30;

    // Τύπος: baseFee + (km * perKmRate)
    let oneWayPrice = pricing.baseFee + (distanceKm * pricing.perKmRate);
    if (oneWayPrice < pricing.minPrice) {
      oneWayPrice = pricing.minPrice;
    }

    let totalPrice = oneWayPrice;
    if (isRoundTrip) {
      const returnLeg = oneWayPrice * (1 - (pricing.roundTripDiscountPercent / 100));
      totalPrice = oneWayPrice + returnLeg;
    }

    // Εύρος τιμής (±10%) στρογγυλοποιημένο στα 5€
    const spread = pricing.estimateSpreadPercent / 100;
    const lowEstimate = Math.max(pricing.minPrice, Math.round((totalPrice * (1 - spread)) / 5) * 5);
    const highEstimate = Math.max(lowEstimate + 10, Math.round((totalPrice * (1 + spread)) / 5) * 5);

    const priceText = `${lowEstimate}€ – ${highEstimate}€`;
    this.lastEstimate = priceText;
    this.currentKm = distanceKm;

    if (this.priceOutput) {
      this.priceOutput.textContent = priceText;
    }

    return {
      lowEstimate,
      highEstimate,
      priceText,
      distanceKm,
      isRoundTrip,
      isCustom: false
    };
  }

  proceedToBooking() {
    const calcData = this.calculate();
    const pickupId = this.pickupSelect ? this.pickupSelect.value : "airport-her";
    const dropoffId = this.dropoffSelect ? this.dropoffSelect.value : "elounda";
    const pickupText = this.pickupSelect ? this.pickupSelect.options[this.pickupSelect.selectedIndex]?.text : "";
    const dropoffText = this.dropoffSelect ? this.dropoffSelect.options[this.dropoffSelect.selectedIndex]?.text : "";
    const tripType = this.tripTypeSelect ? this.tripTypeSelect.value : "oneway";
    const passengers = this.passengersSelect ? this.passengersSelect.value : "1";
    const lang = window.currentLang || "el";

    const estimatedDisplay = calcData?.isCustom
      ? (lang === "el" ? "Κατόπιν Συνεννόησης" : "Upon Request")
      : (calcData ? calcData.priceText : "");

    const bookingPayload = {
      pickup: pickupText,
      dropoff: dropoffText,
      pickupId: pickupId,
      dropoffId: dropoffId,
      tripType: tripType,
      passengers: passengers,
      estimatedPrice: estimatedDisplay
    };

    try {
      sessionStorage.setItem("vip_calc_payload", JSON.stringify(bookingPayload));
    } catch (e) {
      console.warn("Storage not available", e);
    }

    if (window.location.pathname.includes("booking.html")) {
      if (typeof window.populateBookingFormFromStorage === "function") {
        window.populateBookingFormFromStorage(bookingPayload);
      }
      const formElement = document.getElementById("booking-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const params = new URLSearchParams({
        pickup: pickupId,
        dropoff: dropoffId,
        pickupText: pickupText,
        dropoffText: dropoffText,
        type: tripType,
        pax: passengers
      });
      window.location.href = `booking.html?${params.toString()}`;
    }
  }

  refreshLanguage() {
    this.populateDropdowns();
    this.calculate();
  }
}

window.MiniBusCalculator = MiniBusCalculator;

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("price-calculator")) {
    window.siteCalculator = new MiniBusCalculator("price-calculator");
  }
});
