document.addEventListener("DOMContentLoaded", () => {

  const navLinks = document.querySelectorAll(".nav-menu a[data-target]");
  const contactLink = document.querySelectorAll(".about-container a[data-target]");
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

  contactLink.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      showSection(link.dataset.target);
      navMenu.classList.remove("open");
    });
  })

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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const statusMsg = document.getElementById("formStatus");

  // Helper: Validate email
  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Helper: Sanitize input to prevent XSS
  const sanitize = str => /[<>\/'"]/g.test(str);

  // Helper: Only letters and spaces for name
  const isValidName = name => /^[a-zA-Z\s]+$/.test(name);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let valid = true;

    // Sanitize and trim values
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const messageVal = messageInput.value.trim();

    // Name validation
    if (!nameVal || nameVal.length < 3 || !isValidName(nameVal) || nameVal.length > 50) {
      nameInput.nextElementSibling.textContent = "Enter a valid name (letters only, max 50 chars)";
      nameInput.nextElementSibling.style.display = "block";
      valid = false;
    } else {
      nameInput.nextElementSibling.style.display = "none";
    }

    // Email validation
    if (!emailVal || !isValidEmail(emailVal) || emailVal.length > 200) {
      emailInput.nextElementSibling.textContent = "Enter a valid email (max 200 chars)";
      emailInput.nextElementSibling.style.display = "block";
      valid = false;
    } else {
      emailInput.nextElementSibling.style.display = "none";
    }

    // Message validation
    if (!messageVal || sanitize(messageVal) || messageVal.length > 500) {
      messageInput.nextElementSibling.textContent = "Enter a valid message (max 500 chars)";
      messageInput.nextElementSibling.style.display = "block";
      valid = false;
    } else {
      messageInput.nextElementSibling.style.display = "none";
    }

    if (!valid) return;

    // Show sending message
    statusMsg.style.color = "blue";
    statusMsg.textContent = "Sending...";

    try {
      const formData = new FormData();
      formData.append("name", nameVal);
      formData.append("_replyto", emailVal);
      formData.append("message", messageVal);

      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        statusMsg.style.color = "";
        statusMsg.classList.add("success")
        statusMsg.textContent = "Message sent successfully!";
        form.reset();
      } else {
        const data = await response.json();
        throw new Error(data.error || "⚠️ Something went wrong. Try again!");
      }
    } catch (err) {
      statusMsg.style.color = "";
      statusMsg.classList.add("error")
      statusMsg.textContent = `⚠️ The form API is ongoing to building!`;
    }
  });
});
