const extensions = [
  {
    logo: "browser-extensions-manager-ui-main/assets/images/logo-devlens.svg",
    name: "DevLens",
    description: "Quickly inspect page layouts and visualize element boundaries.",
    isActive: true,
  },
  {
    logo: "browser-extensions-manager-ui-main/assets/images/logo-style-spy.svg",
    name: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    isActive: true,
  },
  {
    logo: "browser-extensions-manager-ui-main/assets/images/logo-speed-boost.svg",
    name: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    isActive: false,
  },
  {
    logo: "browser-extensions-manager-ui-main/assets/images/logo-json-wizard.svg",
    name: "JSONWizard",
    description: "Formats, validates, and prettifies JSON responses in-browser.",
    isActive: true,
  },
  {
    logo: "browser-extensions-manager-ui-main/assets/images/logo-tab-master-pro.svg",
    name: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    isActive: true,
  },
  {
    logo: "browser-extensions-manager-ui-main/assets/images/logo-viewport-buddy.svg",
    name: "ViewportBuddy",
    description: "Simulates various screen resolutions directly within the browser.",
    isActive: false,
  },
  {
    logo: "browser-extensions-manager-ui-main/assets/images/logo-markup-notes.svg",
    name: "Markup Notes",
    description: "Enables annotation and notes directly onto webpages for collaborative debugging.",
    isActive: true,
  },
  {
    logo: "browser-extensions-manager-ui-main/assets/images/logo-grid-guides.svg",
    name: "GridGuides",
    description: "Overlay customizable grids and alignment guides on any webpage.",
    isActive: false,
  },
  {
    logo: "browser-extensions-manager-ui-main/assets/images/logo-palette-picker.svg",
    name: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    isActive: true,
  },
  {
    logo: "browser-extensions-manager-ui-main/assets/images/logo-link-checker.svg",
    name: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    isActive: true,
  },
  {
    logo: "browser-extensions-manager-ui-main/assets/images/logo-dom-snapshot.svg",
    name: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    isActive: false,
  },
  {
    logo: "browser-extensions-manager-ui-main/assets/images/logo-console-plus.svg",
    name: "ConsolePlus",
    description: "Enhanced developer console with advanced filtering and logging.",
    isActive: true,
  },
];

// Render all extension cards
const grid = document.querySelector(".grid-container");

extensions.forEach(function (ext) {
  const card = document.createElement("div");
  card.classList.add("extension-card");
  card.dataset.active = ext.isActive;

  card.innerHTML = `
    <div class="card-header">
      <img src="${ext.logo}" alt="${ext.name}" class="extension-logo" />
      <div class="card-info">
        <h3 class="extension-title">${ext.name}</h3>
        <p class="extension-desc">${ext.description}</p>
      </div>
    </div>
    <div class="card-footer">
      <button class="remove-btn">Remove</button>
      <label class="switch">
        <input type="checkbox" class="toggle-switch" ${ext.isActive ? "checked" : ""}>
        <span class="slider"></span>
      </label>
    </div>
  `;

  // ✅ Dynamically update data-active when toggled
  const toggle = card.querySelector(".toggle-switch");
  toggle.addEventListener("change", () => {
    card.dataset.active = toggle.checked ? "true" : "false";
  });

  grid.appendChild(card);
});

// ✅ Theme toggle (light/dark mode)
const toggleIcon = document.getElementById("themeToggleBtn");
const body = document.body;

toggleIcon.addEventListener("click", () => {
  const isLightTheme = body.classList.toggle("light-theme");
  document.getElementById("header").classList.toggle("light-theme");
  document.querySelector(".extension-list").classList.toggle("light-theme");
  toggleIcon.classList.toggle("light-theme");

  document.getElementById("themeIcon").src = isLightTheme
    ? "browser-extensions-manager-ui-main/assets/images/icon-moon.svg"
    : "browser-extensions-manager-ui-main/assets/images/icon-sun.svg";

  document.querySelectorAll(".extension-card").forEach(card => {
    card.classList.toggle("light-theme");
  });

  document.querySelectorAll(".remove-btn").forEach(button => {
    button.classList.toggle("light-theme");
  });

  document.querySelectorAll(".extension-title").forEach(title => {
    title.classList.toggle("black-clr");
  });

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("light-theme");
  });
});

// ✅ Remove card when Remove button clicked
grid.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const card = e.target.closest(".extension-card");
    if (card) {
      card.remove();
    }
  }
});

// ✅ Filter buttons: all / active / inactive
const filterButton = document.querySelectorAll(".filter-btn");

filterButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Highlight the active filter
    filterButton.forEach((b) => b.classList.remove("active-red"));
    btn.classList.add("active-red");

    const type = btn.dataset.type;
    const allCard = document.querySelectorAll(".extension-card");

    allCard.forEach((card) => {
      const isActive = card.dataset.active === "true";

      if (type === "all") {
        card.style.display = ""; // let CSS handle it (flex)
      } else if (type === "active" && isActive) {
        card.style.display = "";
      } else if (type === "inactive" && !isActive) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});
