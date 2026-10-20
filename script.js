// 1. Menu Mobile Toggle
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
  });

  navLinks.querySelectorAll("a, button").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// 2. Dark Mode / Light Mode Toggle
const themeToggleBtn = document.querySelector("#themeToggle");
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme) {
  htmlElement.setAttribute("data-theme", savedTheme);
} else if (systemPrefersDark) {
  htmlElement.setAttribute("data-theme", "dark");
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// 3. Modal Popup Contact Form Logic
const contactModal = document.querySelector("#contactModal");
const modalCloseBtn = document.querySelector("#modalClose");
const modalOverlay = document.querySelector("#modalOverlay");
const contactTriggers = document.querySelectorAll(".contact-trigger");
const contactForm = document.querySelector("#contactForm");

// Buka Modal saat tombol Hubungi Saya diklik
contactTriggers.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (contactModal) {
      contactModal.classList.add("active");
    }
  });
});

// Tutup Modal lewat tombol X
if (modalCloseBtn && contactModal) {
  modalCloseBtn.addEventListener("click", () => {
    contactModal.classList.remove("active");
  });
}

// Tutup Modal jika area gelap di luar form diklik
if (modalOverlay && contactModal) {
  modalOverlay.addEventListener("click", () => {
    contactModal.classList.remove("active");
  });
}

// Proses Kirim Form via Mailto
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#senderName").value;
    const senderEmail = document.querySelector("#senderEmail").value;
    const recipientEmail = document.querySelector("#recipientEmail").value;
    const subject = document.querySelector("#messageSubject").value;
    const message = document.querySelector("#messageBody").value;

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Nama Pengirim: ${name}\nEmail Pengirim: ${senderEmail}\n\nPesan:\n${message}`
    )}`;

    window.location.href = mailtoLink;

    contactModal.classList.remove("active");
    contactForm.reset();
  });
}

// 4. Tahun Otomatis pada Footer
const yearElement = document.querySelector("#year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// 5. Highlight Menu Navigasi Saat Scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute("id");
    const navItem = document.querySelector(`.nav-links a[href*=${sectionId}]`);

    if (navItem) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItem.style.color = "var(--green)";
      } else {
        navItem.style.color = "";
      }
    }
  });
});