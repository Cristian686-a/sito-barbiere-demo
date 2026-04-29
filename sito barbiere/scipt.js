document.body.classList.add("js-enabled");

// Menu mobile
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Dark/light mode
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("barber-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-mode");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    localStorage.setItem("barber-theme", isLight ? "light" : "dark");
  });
}

// Reveal on scroll
const animatedSections = document.querySelectorAll(".section-animate");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  animatedSections.forEach((section) => revealObserver.observe(section));
} else {
  // Fallback browser vecchi
  animatedSections.forEach((section) => section.classList.add("is-visible"));
}

// Form demo
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

if (bookingForm && formMessage) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingForm.checkValidity()) {
      formMessage.textContent = "Compila tutti i campi richiesti prima di inviare.";
      return;
    }

    formMessage.textContent = "Richiesta inviata con successo. Ti contatteremo presto.";
    bookingForm.reset();
  });
}