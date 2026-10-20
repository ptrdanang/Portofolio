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

// 3. Modal Popup Contact Form & Web3Forms AJAX Submission Logic
const contactModal = document.querySelector("#contactModal");
const modalCloseBtn = document.querySelector("#modalClose");
const modalOverlay = document.querySelector("#modalOverlay");
const contactTriggers = document.querySelectorAll(".contact-trigger");
const contactForm = document.querySelector("#contactForm");
const submitBtn = document.querySelector("#submitBtn");

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

// Proses Kirim Form Langsung (Tanpa Membuka Aplikasi Email Lain)
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Mengirim...";
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        alert("Pesan berhasil terkirim langsung ke email Danang!");
        contactForm.reset();
        contactModal.classList.remove("active");
      } else {
        alert("Gagal mengirim pesan: " + data.message);
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi. Silakan coba lagi.");
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
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