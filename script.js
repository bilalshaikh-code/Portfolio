document.addEventListener("DOMContentLoaded", () => {

  const navLinks = document.querySelectorAll(".nav-menu a[data-target]");
  const sections = document.querySelectorAll("section");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const closeMenu = document.querySelector(".close-menu");
  const darkToggle = document.querySelector(".dark-toggle");

  // Function to show a section
  function showSection(id) {
    sections.forEach(sec => sec.classList.remove("active"));
    navLinks.forEach(link => link.classList.remove("active"));

    const targetSection = document.getElementById(id);
    if (targetSection) targetSection.classList.add("active");

    const targetLink = document.querySelector(`[data-target="${id}"]`);
    if (targetLink) targetLink.classList.add("active");
  }

  // Navigation link click
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      showSection(link.dataset.target);
      navMenu.classList.remove("open");
    });
  });

  // Hamburger menu toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.add("open");
  });

  // Close menu button
  closeMenu.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });

  // Dark mode toggle with animation
  darkToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");

    // Save preference in localStorage
    localStorage.setItem("darkMode", isDark);

    // Optional: add a small animation class
    darkToggle.classList.add("toggle-animate");
    setTimeout(() => darkToggle.classList.remove("toggle-animate"), 400);
  });

  // Apply dark mode from previous session
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }

  // Show default section
  showSection("aboutme");

});
