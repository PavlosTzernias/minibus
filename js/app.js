/**
 * ============================================================================
 * VIP MINI BUS TRANSFERS & TOURS - MAIN APPLICATION CONTROLLER (app.js)
 * ============================================================================
 * ΒΑΣΙΚΗ ΛΟΓΙΚΗ ΕΦΑΡΜΟΓΗΣ - ΚΡΗΤΗ (ΣΤΑΘΕΡΟ, ΧΩΡΙΣ ΤΡΕΜΟΠΑΙΓΜΑ)
 */

(function () {
  "use strict";

  // 1. Ρύθμιση Γλώσσας (Default: 'el')
  const savedLang = localStorage.getItem("vip_minibus_lang");
  window.currentLang = savedLang === "en" ? "en" : "el";

  function setLanguage(lang, isInitial = false) {
    window.currentLang = lang;
    try {
      localStorage.setItem("vip_minibus_lang", lang);
    } catch (e) {
      console.warn("localStorage not accessible", e);
    }

    // Update active state in switcher buttons
    document.querySelectorAll(".lang-btn").forEach(btn => {
      if (btn.dataset.lang === lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    document.documentElement.lang = lang;

    // Αν είναι η αρχική φόρτωση και η γλώσσα είναι Ελληνικά (η HTML είναι ήδη γραμμένη στα Ελληνικά),
    // δεν πειράζουμε τα text nodes για να αποφύγουμε οποιοδήποτε στιγμιαίο reflow / τρεμόπαιγμα γραμματοσειράς.
    if (isInitial && lang === "el") {
      if (window.SiteRenderer) {
        SiteRenderer.injectCentralData();
      }
      return;
    }

    // Update data-i18n elements
    const dictionary = window.I18N_DATA ? window.I18N_DATA[lang] : null;
    if (dictionary) {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dictionary[key]) {
          el.textContent = dictionary[key];
        }
      });

      document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (dictionary[key]) {
          el.setAttribute("placeholder", dictionary[key]);
        }
      });
    }

    // Trigger Dynamic Renders only when language changes
    if (window.SiteRenderer) {
      if (document.getElementById("fleet-preview-container")) SiteRenderer.renderFleetPreview("fleet-preview-container", true);
      if (document.getElementById("fleet-detail-container")) SiteRenderer.renderFleetPage("fleet-detail-container", true);
      if (document.getElementById("all-tours-container")) SiteRenderer.renderTours("all-tours-container", null, true);
      if (document.getElementById("home-tours-preview")) SiteRenderer.renderTours("home-tours-preview", null, true);
      SiteRenderer.injectCentralData();
    }

    updateBookingDropdownLanguage(lang);

    if (window.siteCalculator && typeof window.siteCalculator.refreshLanguage === "function") {
      window.siteCalculator.refreshLanguage();
    }
  }

  // Helper για ανανέωση των dropdowns στην Κράτηση κατά την αλλαγή γλώσσας
  function updateBookingDropdownLanguage(lang) {
    const locations = window.CRETE_LOCATIONS || [];
    if (!locations.length) return;

    ["field-pickup", "field-dropoff"].forEach(id => {
      const select = document.getElementById(id);
      if (!select) return;
      const currentVal = select.value;
      select.innerHTML = "";
      locations.forEach(loc => {
        const option = document.createElement("option");
        option.value = loc.id;
        option.textContent = lang === "el" ? loc.nameEl : loc.nameEn;
        if (loc.id === currentVal) option.selected = true;
        select.appendChild(option);
      });
    });
  }

  // 2. Mobile Menu & Navigation Drawer
  function initMobileMenu() {
    const toggle = document.querySelector(".mobile-toggle");
    const navMenu = document.querySelector(".nav-menu");
    if (!toggle || !navMenu) return;

    // Overlay backdrop
    let overlay = document.querySelector(".nav-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "nav-overlay";
      document.body.appendChild(overlay);
    }

    const openMenu = () => {
      toggle.classList.add("active");
      navMenu.classList.add("open");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      toggle.classList.remove("active");
      navMenu.classList.remove("open");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (navMenu.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener("click", () => {
      closeMenu();
    });

    // Close when clicking nav links & prevent jitter/reload on current page link
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", (e) => {
        const linkHref = link.getAttribute("href");
        const isCurrent = linkHref === currentPath || 
          ((currentPath === "index.html" || currentPath === "" || currentPath === "/") && 
           (linkHref === "index.html" || linkHref === "./" || linkHref === "/"));

        if (isCurrent) {
          e.preventDefault();
          if (window.scrollY > 0) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
        closeMenu();
      });
    });

    // Close if clicking outside
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  // 3. Language Switcher Buttons
  function initLangSwitchers() {
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = btn.dataset.lang;
        if (lang !== window.currentLang) {
          setLanguage(lang);
        }
      });
    });
  }

  // 4. FAQ Accordion Logic
  function initFaqAccordion() {
    document.querySelectorAll(".faq-item").forEach(item => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!question || !answer) return;

      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        // Close others
        document.querySelectorAll(".faq-item").forEach(other => {
          if (other !== item) {
            other.classList.remove("active");
            const otherAns = other.querySelector(".faq-answer");
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        // Toggle current
        if (!isOpen) {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
          item.classList.remove("active");
          answer.style.maxHeight = null;
        }
      });
    });
  }

  // Helper για επιλογή dropdown βάσει value ή ονόματος τοποθεσίας
  function selectOptionByValueOrText(selectEl, textOrValue) {
    if (!selectEl || !textOrValue) return;
    const target = String(textOrValue).trim().toLowerCase();

    // 1. Έλεγχος βάσει value
    for (let i = 0; i < selectEl.options.length; i++) {
      if (selectEl.options[i].value.toLowerCase() === target) {
        selectEl.selectedIndex = i;
        return;
      }
    }
    // 2. Έλεγχος βάσει κειμένου option
    for (let i = 0; i < selectEl.options.length; i++) {
      if (selectEl.options[i].text.toLowerCase() === target) {
        selectEl.selectedIndex = i;
        return;
      }
    }
    // 3. Substring match
    for (let i = 0; i < selectEl.options.length; i++) {
      const optText = selectEl.options[i].text.toLowerCase();
      if (optText.includes(target) || target.includes(optText)) {
        selectEl.selectedIndex = i;
        return;
      }
    }
    // 4. Default σε custom για ειδικές εκδρομές
    if (target.includes("εκδρομή") || target.includes("tour") || target.includes("άλλο") || target.includes("custom")) {
      selectEl.value = "custom";
    }
  }

  // 5. Booking Form Autofill & Sync
  function initBookingFormAutofill() {
    const form = document.getElementById("booking-form");
    if (!form) return;

    const urlParams = new URLSearchParams(window.location.search);
    const pickupParam = urlParams.get("pickup");
    const dropoffParam = urlParams.get("dropoff");
    const pickupTextParam = urlParams.get("pickupText");
    const dropoffTextParam = urlParams.get("dropoffText");
    const paxParam = urlParams.get("pax");
    const tourTitleParam = urlParams.get("title");
    const tourIdParam = urlParams.get("tour");

    let payload = null;
    if (pickupParam || dropoffParam || tourTitleParam || tourIdParam) {
      payload = {
        pickupId: pickupParam || "",
        pickup: pickupTextParam || (pickupParam ? decodeURIComponent(pickupParam) : ""),
        dropoffId: dropoffParam || "",
        dropoff: dropoffTextParam || (dropoffParam ? decodeURIComponent(dropoffParam) : (tourTitleParam ? `Εκδρομή: ${decodeURIComponent(tourTitleParam)}` : "")),
        passengers: paxParam || "1"
      };
    } else {
      try {
        const stored = sessionStorage.getItem("vip_calc_payload");
        if (stored) {
          payload = JSON.parse(stored);
          sessionStorage.removeItem("vip_calc_payload");
        }
      } catch (e) {
        console.warn("Storage error", e);
      }
    }

    if (payload) {
      populateBookingForm(payload);
    }
  }

  function populateBookingForm(data) {
    if (!data) return;
    const pickupSelect = document.getElementById("field-pickup");
    const dropoffSelect = document.getElementById("field-dropoff");
    const paxInput = document.getElementById("field-passengers");
    const notesInput = document.getElementById("field-notes");

    if (pickupSelect && (data.pickupId || data.pickup)) {
      selectOptionByValueOrText(pickupSelect, data.pickupId || data.pickup);
    }
    if (dropoffSelect && (data.dropoffId || data.dropoff)) {
      selectOptionByValueOrText(dropoffSelect, data.dropoffId || data.dropoff);
    }
    if (paxInput && data.passengers) {
      paxInput.value = data.passengers;
    }

    if (notesInput) {
      const notesParts = [];
      if (data.dropoff && (data.dropoff.startsWith("Εκδρομή:") || data.dropoff.startsWith("Tour:"))) {
        notesParts.push(data.dropoff);
      }
      if (data.tripType) {
        notesParts.push(data.tripType === "roundtrip" ? "Τύπος: Μετ' Επιστροφής (Round-Trip)" : "Τύπος: Απλή Μετάβαση (One-Way)");
      }
      if (notesParts.length > 0) {
        const addedNotes = notesParts.join(" | ");
        if (!notesInput.value.includes(addedNotes)) {
          notesInput.value = notesInput.value ? `${notesInput.value}\n${addedNotes}` : addedNotes;
        }
      }
    }
  }

  window.populateBookingFormFromStorage = populateBookingForm;

  // 6. WhatsApp Pre-filled Direct Button
  function initWhatsAppTrigger() {
    const btn = document.getElementById("btn-form-whatsapp");
    if (!btn || !window.SITE_CONFIG) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const rawPhone = window.SITE_CONFIG.contact.phoneRaw;
      const lang = window.currentLang || "el";

      const name = document.getElementById("field-name")?.value.trim() || "";
      const pickupEl = document.getElementById("field-pickup");
      const dropoffEl = document.getElementById("field-dropoff");
      const pickup = (pickupEl && pickupEl.options && pickupEl.options[pickupEl.selectedIndex]?.text) || pickupEl?.value?.trim() || "";
      const dropoff = (dropoffEl && dropoffEl.options && dropoffEl.options[dropoffEl.selectedIndex]?.text) || dropoffEl?.value?.trim() || "";
      const datetime = document.getElementById("field-datetime")?.value || "";
      const passengers = document.getElementById("field-passengers")?.value || "";
      const luggage = document.getElementById("field-luggage")?.value || "";
      const childSeat = document.getElementById("field-child-seat")?.checked ? "Ναι / Yes" : "Όχι / No";
      const notes = document.getElementById("field-notes")?.value.trim() || "";

      let msg = "";
      if (lang === "el") {
        msg = `*ΑΙΤΗΜΑ ΠΡΟΣΦΟΡΑΣ VIP MINI BUS - ΚΡΗΤΗ*\n` +
          `------------------------------\n` +
          `👤 *Όνομα:* ${name || "Δεν ορίστηκε"}\n` +
          `📍 *Παραλαβή:* ${pickup || "Δεν ορίστηκε"}\n` +
          `🏁 *Προορισμός:* ${dropoff || "Δεν ορίστηκε"}\n` +
          `📅 *Ημερομηνία/Ώρα:* ${datetime || "Κατόπιν συνεννόησης"}\n` +
          `👥 *Επιβάτες:* ${passengers || "1"}\n` +
          `🧳 *Αποσκευές:* ${luggage || "-"}\n` +
          `👶 *Παιδικό Κάθισμα:* ${childSeat}\n` +
          (notes ? `📝 *Σημειώσεις:* ${notes}\n` : "") +
          `------------------------------\n` +
          `Παρακαλώ ενημερώστε με για τη διαθεσιμότητα και την τελική προσφορά στην Κρήτη. Ευχαριστώ!`;
      } else {
        msg = `*VIP MINI BUS TRANSFER INQUIRY - CRETE*\n` +
          `------------------------------\n` +
          `👤 *Name:* ${name || "Not specified"}\n` +
          `📍 *Pickup:* ${pickup || "Not specified"}\n` +
          `🏁 *Drop-off:* ${dropoff || "Not specified"}\n` +
          `📅 *Date & Time:* ${datetime || "To be arranged"}\n` +
          `👥 *Passengers:* ${passengers || "1"}\n` +
          `🧳 *Luggage:* ${luggage || "-"}\n` +
          `👶 *Child Seat:* ${childSeat}\n` +
          (notes ? `📝 *Notes:* ${notes}\n` : "") +
          `------------------------------\n` +
          `Please confirm availability and final quote for Crete. Thank you!`;
      }

      const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, "_blank");
    });
  }

  // 7. Form Submission (Αποστολή στο paulostzernias@gmail.com)
  function initFormSubmit(formId, statusId) {
    const form = document.getElementById(formId);
    const statusBox = document.getElementById(statusId);
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>⏳</span> ${window.currentLang === "el" ? "Αποστολή..." : "Sending..."}`;
      }

      if (statusBox) {
        statusBox.className = "form-status";
        statusBox.style.display = "none";
      }

      const formData = new FormData(form);
      const rawObject = Object.fromEntries(formData.entries());

      // Ανάκτηση ευανάγνωστων κειμένων από τα dropdowns τοποθεσιών
      const pickupSelect = form.querySelector("#field-pickup");
      const dropoffSelect = form.querySelector("#field-dropoff");
      const pickupText = (pickupSelect && pickupSelect.options[pickupSelect.selectedIndex]?.text) || rawObject.pickup || "";
      const dropoffText = (dropoffSelect && dropoffSelect.options[dropoffSelect.selectedIndex]?.text) || rawObject.dropoff || "";

      const targetEmail = "paulostzernias@gmail.com";
      const configKey = window.SITE_CONFIG?.web3forms?.accessKey;
      const hasCustomWeb3Key = configKey && configKey !== "YOUR_WEB3FORMS_ACCESS_KEY";

      let endpoint = `https://formsubmit.co/ajax/${targetEmail}`;
      let payload = {};

      if (hasCustomWeb3Key) {
        endpoint = "https://api.web3forms.com/submit";
        payload = {
          ...rawObject,
          access_key: configKey,
          from_name: "VIP MiniBus Transfers Crete",
          to: targetEmail,
          pickup: pickupText,
          dropoff: dropoffText,
          subject: `Νέο Αίτημα VIP Transfer Κρήτης (${rawObject.name || "Client"})`
        };
      } else {
        // Άμεση αποστολή στο paulostzernias@gmail.com μέσω FormSubmit AJAX
        payload = {
          _subject: `Νέο Αίτημα VIP Transfer Κρήτης (${rawObject.name || "Πελάτης"})`,
          _template: "table",
          _captcha: "false",
          _replyto: rawObject.email || "",
          "Ονοματεπώνυμο": rawObject.name || "-",
          "Email": rawObject.email || "-",
          "Τηλέφωνο": rawObject.phone || "-",
          "Σημείο Παραλαβής (Κρήτη)": pickupText || "-",
          "Προορισμός (Κρήτη)": dropoffText || "-",
          "Ημερομηνία & Ώρα": rawObject.datetime || "Κατόπιν συνεννόησης",
          "Επιβάτες": rawObject.passengers || "1",
          "Αποσκευές": rawObject.luggage || "0",
          "Παιδικό Κάθισμα": rawObject.child_seat ? "Ναι" : "Όχι",
          "Σημειώσεις / Μήνυμα": rawObject.notes || rawObject.message || "-"
        };
      }

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        const isSuccess = response.ok && (result.success === true || result.success === "true");

        if (isSuccess) {
          if (statusBox) {
            statusBox.className = "form-status success";
            statusBox.innerHTML = window.currentLang === "el"
              ? "✓ <strong>Ευχαριστούμε!</strong> Το αίτημά σας εστάλη επιτυχώς. Θα επικοινωνήσουμε άμεσα μαζί σας με την επίσημη προσφορά."
              : "✓ <strong>Thank you!</strong> Your quote request was submitted successfully. We will contact you promptly with your official quote.";
            statusBox.style.display = "block";
          }
          form.reset();
        } else {
          throw new Error(result.message || "Submission failed");
        }
      } catch (err) {
        console.warn("Form submission note:", err);
        if (statusBox) {
          statusBox.className = "form-status error";
          statusBox.innerHTML = window.currentLang === "el"
            ? "⚠️ Για άμεση επιβεβαίωση, παρακαλούμε πατήστε το κουμπί <strong>«Συνομιλία στο WhatsApp»</strong> παρακάτω ή καλέστε μας στο τηλέφωνο."
            : "⚠️ For instant confirmation, please click the <strong>'Chat on WhatsApp'</strong> button below or call us directly.";
          statusBox.style.display = "block";
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }

  // 8. Prevent empty hash jumps
  function initPreventHashJumps() {
    document.querySelectorAll('a[href="#"]').forEach(link => {
      if (link.classList.contains("dyn-whatsapp-link") || link.classList.contains("dyn-phone-link") || link.classList.contains("dyn-email-link")) {
        return;
      }
      link.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });
  }

  // 9. Instant Solid Reveal (Zero Opacity Jumps)
  function initScrollReveal() {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("active"));
  }

  // 10. Universal Horizontal Swipe Carousel (Middle Arrows, Touch Swipe, Mouse Drag)
  function setupCarousel(trackId, prevBtnId, nextBtnId) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    if (!track) return;

    const getScrollStep = () => {
      const card = track.querySelector(".tour-card, .fleet-card, .card");
      return card ? (card.offsetWidth + 24) : 340;
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        track.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        track.scrollBy({ left: getScrollStep(), behavior: "smooth" });
      });
    }

    const updateArrows = () => {
      if (prevBtn) {
        prevBtn.style.opacity = track.scrollLeft <= 10 ? "0.35" : "1";
        prevBtn.style.pointerEvents = track.scrollLeft <= 10 ? "none" : "auto";
      }
      if (nextBtn) {
        const maxScroll = track.scrollWidth - track.clientWidth - 10;
        nextBtn.style.opacity = track.scrollLeft >= maxScroll ? "0.35" : "1";
        nextBtn.style.pointerEvents = track.scrollLeft >= maxScroll ? "none" : "auto";
      }
    };

    track.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    setTimeout(updateArrows, 200);

    // Desktop Mouse Drag to Swipe
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasDragged = false;

    track.addEventListener("mousedown", (e) => {
      if (e.target.closest("a, button, select, input")) return;
      isDown = true;
      hasDragged = false;
      track.classList.add("dragging");
      startX = e.pageX - track.offsetLeft;
      scrollStart = track.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove("dragging");
    });

    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.4;
      if (Math.abs(walk) > 5) {
        hasDragged = true;
      }
      track.scrollLeft = scrollStart - walk;
    });

    // Prevent accidental link / toggle click if user was dragging
    track.addEventListener("click", (e) => {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  }

  // 11. Minimal Fleet Card Accordion (Click on card / button expands extra details)
  function initFleetCardExpansion() {
    document.addEventListener("click", (e) => {
      const toggleBtn = e.target.closest(".btn-fleet-toggle");
      const cardHeader = e.target.closest(".fleet-card-header-minimal");

      let card = null;
      if (toggleBtn) {
        card = toggleBtn.closest(".fleet-card");
      } else if (cardHeader && !e.target.closest("a, button")) {
        card = cardHeader.closest(".fleet-card");
      }

      if (!card) return;

      const isExpanded = card.classList.toggle("expanded");
      const btn = card.querySelector(".btn-fleet-toggle");
      if (btn) {
        btn.setAttribute("aria-expanded", isExpanded ? "true" : "false");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initLangSwitchers();
    initFaqAccordion();
    initBookingFormAutofill();
    initWhatsAppTrigger();
    initPreventHashJumps();
    initFormSubmit("booking-form", "booking-form-status");
    initFormSubmit("contact-form", "contact-form-status");
    
    // Initialize Carousels (Home Tours, Home Fleet, Dedicated Tours, Dedicated Fleet)
    setupCarousel("home-tours-preview", "home-tours-prev-btn", "home-tours-next-btn");
    setupCarousel("home-tours-preview", "tours-prev-btn", "tours-next-btn"); // fallback ID
    setupCarousel("fleet-preview-container", "home-fleet-prev-btn", "home-fleet-next-btn");
    setupCarousel("all-tours-container", "all-tours-prev-btn", "all-tours-next-btn");
    setupCarousel("fleet-detail-container", "fleet-prev-btn", "fleet-next-btn");

    initFleetCardExpansion();

    setLanguage(window.currentLang, true);
    initScrollReveal();
  });

})();
