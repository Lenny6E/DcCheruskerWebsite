
// ========================================
// GRUNDLAGEN
// ========================================

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

document.getElementById("year").textContent =
  new Date().getFullYear();

// ========================================
// HEADER SCROLL
// ========================================

function updateHeader() {
  header.classList.toggle(
    "scrolled",
    window.scrollY > 40
  );
}

window.addEventListener("scroll", updateHeader, {
  passive: true
});

updateHeader();

// ========================================
// MOBILE MENU
// ========================================

function closeMenu() {
  menuToggle.classList.remove("open");
  navLinks.classList.remove("open");
  document.body.classList.remove("menu-open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Menü öffnen");
}

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");

  menuToggle.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Menü schließen" : "Menü öffnen"
  );
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1000) {
    closeMenu();
  }
});

// ========================================
// SCROLL REVEAL
// ========================================

const reveals = document.querySelectorAll(".reveal");

if (!reducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  reveals.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  reveals.forEach(element => {
    element.classList.add("visible");
  });
}


// ========================================
// CURSOR GLOW
// ========================================

const glow = document.getElementById("cursorGlow");

if (
  glow &&
  !reducedMotion &&
  window.matchMedia("(pointer: fine)").matches
) {
  window.addEventListener("pointermove", event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, {
    passive: true
  });
}

// ========================================
// TYPEWRITER EFFECT
// ========================================

const typewriter = document.getElementById("typewriter");

// Diese Texte werden durchgewechselt.
const typewriterTexts = [
  "CHERUSKER.",
  "VERRÜCKT.",
  "EIN TEAM.",
  "AUS DETMOLD."
];

// Geschwindigkeit in Millisekunden
const typingSpeed = 90;
const deletingSpeed = 45;
const pauseAfterTyping = 1800;
const pauseBeforeTyping = 350;

if (typewriter) {

  if (reducedMotion) {
    typewriter.textContent = typewriterTexts[0];

  } else {

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeNext() {
      const current = typewriterTexts[textIndex];

      // Schreiben oder löschen
      charIndex += deleting ? -1 : 1;

      typewriter.textContent =
        current.slice(0, charIndex);

      let delay = deleting
        ? deletingSpeed
        : typingSpeed;

      // Text ist vollständig geschrieben.
      if (!deleting && charIndex >= current.length) {
        deleting = true;
        delay = pauseAfterTyping;
      }

      // Text ist vollständig gelöscht.
      else if (deleting && charIndex <= 0) {
        deleting = false;

        textIndex =
          (textIndex + 1) % typewriterTexts.length;

        delay = pauseBeforeTyping;
      }

      setTimeout(typeNext, delay);
    }

    typewriter.textContent = "";
    typeNext();
  }
}
