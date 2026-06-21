const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const root = document.documentElement;
const tools = document.querySelector(".accessibility-tools");
const trigger = document.querySelector(".accessibility-trigger");
const panel = document.querySelector("#accessibility-panel");
const closeButton = document.querySelector(".accessibility-close");
const resetButton = document.querySelector(".reset-preferences");
const preferenceInputs = document.querySelectorAll("[data-preference]");
const textSizeButtons = document.querySelectorAll("[data-text-size]");
const storageKey = "portfolio-display-preferences";
const defaults = {
  textSize: "default",
  contrast: false,
  colorSafe: false,
  spacing: false,
  links: false,
  motion: false
};

const loadPreferences = () => {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(storageKey)) };
  } catch {
    return { ...defaults };
  }
};

let preferences = loadPreferences();

const applyPreferences = () => {
  root.dataset.textSize = preferences.textSize;
  root.classList.toggle("prefers-high-contrast", preferences.contrast);
  root.classList.toggle("prefers-color-safe", preferences.colorSafe);
  root.classList.toggle("prefers-text-spacing", preferences.spacing);
  root.classList.toggle("prefers-underlined-links", preferences.links);
  root.classList.toggle("prefers-reduced-motion", preferences.motion);

  preferenceInputs.forEach((input) => {
    input.checked = preferences[input.dataset.preference];
  });

  textSizeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.textSize === preferences.textSize));
  });

  localStorage.setItem(storageKey, JSON.stringify(preferences));
};

const setPanelOpen = (isOpen) => {
  panel.hidden = !isOpen;
  trigger.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    closeButton.focus();
  } else {
    trigger.focus();
  }
};

trigger.addEventListener("click", () => {
  setPanelOpen(trigger.getAttribute("aria-expanded") !== "true");
});

closeButton.addEventListener("click", () => setPanelOpen(false));

tools.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !panel.hidden) {
    setPanelOpen(false);
  }
});

preferenceInputs.forEach((input) => {
  input.addEventListener("change", () => {
    preferences[input.dataset.preference] = input.checked;
    applyPreferences();
  });
});

textSizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    preferences.textSize = button.dataset.textSize;
    applyPreferences();
  });
});

resetButton.addEventListener("click", () => {
  preferences = { ...defaults };
  applyPreferences();
});

applyPreferences();
