document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-menu a[data-target]");
  const sections = document.querySelectorAll(".right-box section");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const darkToggle = document.querySelector(".dark-toggle");

  // Show section
  function showSection(id, updateHash = true) {
    sections.forEach(section => section.classList.remove("active"));
    navLinks.forEach(link => link.classList.remove("active"));

    const targetSection = document.getElementById(id);
    const activeLink = document.querySelector(`.nav-menu a[data-target="${id}"]`);

    if (targetSection) targetSection.classList.add("active");
    if (activeLink) activeLink.classList.add("active");

    if (updateHash) history.pushState(null, "", `#${id}`);
  }

  // Menu toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Close menu when click link
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.dataset.target;
      showSection(target);
      navMenu.classList.remove("open");
    });

    link.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showSection(link.dataset.target);
        navMenu.classList.remove("open");
      }
    });
  });

  // Dark mode
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
  });

  // Load dark mode from localStorage
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }

  // Load from hash
  const initialHash = window.location.hash.replace("#", "");
  if (initialHash && document.getElementById(initialHash)) {
    showSection(initialHash, false);
  } else {
    showSection("aboutme", false);
  }

  // Back/forward support
  window.addEventListener("popstate", () => {
    const hash = window.location.hash.replace("#", "");
    if (hash) showSection(hash, false);
  });
});
