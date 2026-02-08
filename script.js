/* ================= NAVBAR SCROLL SHADOW ================= */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}, { passive: true });

/* ================= HAMBURGER TOGGLE ================= */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("open");

  // Animate hamburger lines
  hamburger.querySelectorAll("span").forEach((line, index) => {
    if (hamburger.classList.contains("open")) {
      if (index === 0) line.style.transform = "rotate(45deg) translate(5px, 5px)";
      if (index === 1) line.style.opacity = "0";
      if (index === 2) line.style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      line.style.transform = "rotate(0) translate(0,0)";
      line.style.opacity = "1";
    }
  });
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("open");
    hamburger.querySelectorAll("span").forEach(line => {
      line.style.transform = "rotate(0) translate(0,0)";
      line.style.opacity = "1";
    });
  });
});

/* ================= SCROLL REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      revealObserver.unobserve(entry.target); // Stop observing once revealed
    }
  });
}, observerOptions);

reveals.forEach((reveal) => revealObserver.observe(reveal));

/* ================= HERO PARALLAX ================= */
const hero = document.querySelector(".hero");
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  if (scroll < window.innerHeight) {
    hero.style.backgroundPositionY = `${scroll * 0.3}px`;
  }
}, { passive: true });

/* ================= MULTI-STEP FORM ================= */
const steps = document.querySelectorAll(".step");
const dots = document.querySelectorAll(".dot");
const stepText = document.querySelector(".step-text");
const summary = document.querySelector(".selection-summary");
let currentStep = 0;
let selectedService = "";

document.querySelectorAll(".option").forEach((button) => {
  button.addEventListener("click", () => {
    if (currentStep === 0) selectedService = button.textContent;
    
    if (currentStep < steps.length - 1) {
      steps[currentStep].classList.remove("active");
      dots[currentStep].classList.remove("active");
      
      currentStep++;
      
      steps[currentStep].classList.add("active");
      dots[currentStep].classList.add("active");
      stepText.textContent = `Step ${currentStep + 1} of ${steps.length}`;
      
      if (currentStep === steps.length - 1) {
        summary.innerHTML = `You’re enquiring about: <strong>${selectedService}</strong>`;
      }
    }
  });
});

/* ================= FORM SUBMISSION ================= */
const submitBtn = document.querySelector(".submit");
if (submitBtn) {
  submitBtn.addEventListener("click", (e) => {
    const lastStep = steps[steps.length - 1];
    const inputs = lastStep.querySelectorAll("input, textarea");
    let valid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = "#ff4d4d";
      } else {
        input.style.borderColor = "#ccc";
      }
    });

    if (!valid) {
      e.preventDefault();
      alert("Please fill in all fields before submitting!");
    } else {
      e.preventDefault(); // Prevent actual submit for demo purposes
      alert(`Thank you! Our team will contact you about ${selectedService} shortly.`);
      // Here you would normally submit to a backend
    }
  });
}

/* ================= SMOOTH SCROLL FOR ALL ANCHORS ================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});