/* ==========================================================================
   UZAIR KHAN — PORTFOLIO SCRIPT
   Beginner-friendly comments explain what every block does.
   ========================================================================== */

// Wait until the whole page has loaded before running any code
document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------------------------------------------
     1. DARK / LIGHT MODE TOGGLE
     We store the user's choice in a variable (and localStorage) so it
     stays the same style on every visit.
  ------------------------------------------------------------------ */
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const body = document.body;

  // Check if the user already picked a theme before (saved in browser storage)
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    // Toggle the "light-mode" class on the <body>
    body.classList.toggle("light-mode");
    const isLight = body.classList.contains("light-mode");

    // Swap the moon/sun icon to match the current mode
    themeIcon.classList.toggle("fa-moon", !isLight);
    themeIcon.classList.toggle("fa-sun", isLight);

    // Save the choice so it persists after refreshing the page
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  });


  /* ------------------------------------------------------------------
     2. MOBILE HAMBURGER MENU
  ------------------------------------------------------------------ */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
    const isOpen = navLinks.classList.contains("open");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close the mobile menu automatically whenever a nav link is clicked
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
    });
  });


  /* ------------------------------------------------------------------
     3. HIGHLIGHT ACTIVE NAV LINK BASED ON SCROLL POSITION
  ------------------------------------------------------------------ */
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  function highlightActiveLink() {
    let currentSectionId = "";
    const scrollPos = window.scrollY + 120; // small offset for navbar height

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.toggle(
        "active-link",
        link.getAttribute("href") === `#${currentSectionId}`
      );
    });
  }

  window.addEventListener("scroll", highlightActiveLink);


  /* ------------------------------------------------------------------
     4. TYPING EFFECT FOR THE HERO ROLE TEXT
     Cycles through a list of roles, typing and deleting each one.
  ------------------------------------------------------------------ */
  const roles = [
    "Front-End Web Developer",
    "SEO Learner",
    "UI Enthusiast",
    "Problem Solver"
  ];
  const typedRoleEl = document.getElementById("typedRole");
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typedRoleEl.textContent = currentRole.substring(0, charIndex);

    let typingSpeed = isDeleting ? 40 : 90;

    // When a word is fully typed, pause, then start deleting
    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1500;
      isDeleting = true;
    }
    // When a word is fully deleted, move to the next word
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Start the loop after the initial pause so the first role holds briefly
  setTimeout(typeEffect, 1500);


  /* ------------------------------------------------------------------
     5. SCROLL-REVEAL ANIMATIONS (IntersectionObserver)
     Adds the "visible" class to elements once they scroll into view,
     which triggers the fade/slide-in CSS transition.
  ------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));


  /* ------------------------------------------------------------------
     6. ANIMATED SKILL PROGRESS BARS
     Bars fill to their target width only once they're visible,
     so the animation actually gets noticed by the user.
  ------------------------------------------------------------------ */
  const skillFills = document.querySelectorAll(".skill-fill");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.getAttribute("data-level");
          bar.style.width = level + "%";
          skillObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillFills.forEach((bar) => skillObserver.observe(bar));


  /* ------------------------------------------------------------------
     7. ANIMATED STAT COUNTERS (About section)
  ------------------------------------------------------------------ */
  const statNumbers = document.querySelectorAll(".stat-number");

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-count"), 10);
          let current = 0;
          const increment = Math.max(1, Math.ceil(target / 60)); // ~60 steps

          const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(counter);
            }
            el.textContent = current;
          }, 30);

          countObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => countObserver.observe(el));


  /* ------------------------------------------------------------------
     8. CONTACT FORM (front-end only — no backend/server)
     We simply validate the fields and show a success message.
  ------------------------------------------------------------------ */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stop the page from reloading

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Please fill in all fields before sending.";
      formStatus.style.color = "#f87171"; // red for error
      return;
    }

    // In a real project this is where you'd send data to a server or API.
    // Since this is front-end only, we just confirm it to the user.
    formStatus.textContent = `Thanks ${name}! Your message has been noted — I'll get back to you soon.`;
    formStatus.style.color = "var(--accent-cyan)";

    contactForm.reset();
  });


  /* ------------------------------------------------------------------
     9. SCROLL-TO-TOP BUTTON
  ------------------------------------------------------------------ */
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("show", window.scrollY > 400);
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  /* ------------------------------------------------------------------
     10. AUTO-UPDATE FOOTER YEAR
  ------------------------------------------------------------------ */
  document.getElementById("year").textContent = new Date().getFullYear();


  /* ------------------------------------------------------------------
     11. DOWNLOAD CV BUTTON (placeholder behaviour)
     Since no real CV file is attached, we let the user know how to
     wire it up rather than breaking the link.
  ------------------------------------------------------------------ */
  const downloadCv = document.getElementById("downloadCv");
  downloadCv.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Add your CV file (e.g. 'uzair-khan-cv.pdf') and update the href/download attributes on this button to enable downloading.");
  });

});