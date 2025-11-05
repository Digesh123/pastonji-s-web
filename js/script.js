// Inject navbar component, then wire up interactions
document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("navbar-placeholder");
  if (!mount) return;

  fetch("components/navbar.html")
    .then(res => res.text())
    .then(html => {
      mount.innerHTML = html;
      initNavbarInteractions();   // bind events after injection
    })
    .catch(err => console.error("Navbar load error:", err));
});

function initNavbarInteractions() {
  const toggle = document.getElementById("menu-toggle");
  const panel  = document.getElementById("mobile-menu");
  if (!toggle || !panel) return;

  const open = () => {
    panel.classList.add("active");
    toggle.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
  };
  const close = () => {
    panel.classList.remove("active");
    toggle.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
  };

  // toggle click
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    panel.classList.contains("active") ? close() : open();
  });

  // close on outside click
  document.addEventListener("click", (e) => {
    if (!panel.classList.contains("active")) return;
    const within = e.target.closest(".nav-links") || e.target.closest("#menu-toggle");
    if (!within) close();
  });

  // close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // close when a link is clicked (for single-page smooth navigation)
  panel.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", close);
  });
}


const heroScroll = document.querySelector('.hero-scroll');
const wrapper = document.querySelector('.hero-wrapper');

window.addEventListener('scroll', () => {
  const rect = heroScroll.getBoundingClientRect();
  const start = rect.top;
  const end = rect.bottom - window.innerHeight;

  if (start <= 0 && end >= 0) {
    const progress = Math.abs(start) / (rect.height - window.innerHeight);
    wrapper.style.transform = `translateX(-${progress * 200}vw)`; // move from 0 to -200vw
  }
});

// script.js

document.addEventListener("DOMContentLoaded", () => {
  const heroWrapper = document.querySelector(".hero-wrapper");
  const slides = document.querySelectorAll(".hero-slide");

  if (window.innerWidth > 768) {
    // ----- Desktop Scroll Logic -----
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const section = document.querySelector(".hero-scroll");
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollProgress = Math.min(
        Math.max((scrollTop - sectionTop) / (sectionHeight - window.innerHeight), 0),
        1
      );

      heroWrapper.style.transform = `translateX(-${scrollProgress * (slides.length - 1) * 100}vw)`;
    });
  } else {
    // ----- Mobile Auto-Slider -----
    let index = 0;
    function showNextSlide() {
      index = (index + 1) % slides.length;
      heroWrapper.style.transform = `translateX(-${index * 100}vw)`;
    }

    // initial styles for slider animation
    heroWrapper.style.transition = "transform 0.8s ease-in-out";

    // auto change every 3.5s
    setInterval(showNextSlide, 3500);
  }
});

// Inject Footer component
document.addEventListener("DOMContentLoaded", () => {
  const mountFooter = document.getElementById("footer-placeholder");
  if (!mountFooter) return;

  fetch("components/footer.html")
    .then(res => res.text())
    .then(html => {
      mountFooter.innerHTML = html;
    })
    .catch(err => console.error("Footer load error:", err));
});

// ✅ Navbar background change when scrolling
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 2000) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
document.querySelector('a[href="index.html#products"]').addEventListener("click", (e) => {
  if (location.pathname.includes("index.html")) {
    e.preventDefault();
    document.querySelector("#products").scrollIntoView({ behavior: "smooth" });
  }
});


