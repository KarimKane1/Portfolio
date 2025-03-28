// script.js
document.addEventListener("DOMContentLoaded", () => {
    // Theme Toggle
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");
        // (Optional) Save preference in localStorage
        localStorage.setItem(
          "theme",
          document.body.classList.contains("light") ? "light" : "dark"
        );
      });
    }
  
    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light");
    }
  });
  