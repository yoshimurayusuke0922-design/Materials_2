(function () {
  const SLOT_ATTR = "data-screenshot-slot";
  const IMG_CLASS = "screenshot-image";

  function normalizeShot(value) {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value.src || value.url || value.dataUrl || "";
  }

  function labelFor(value, fallback) {
    if (value && typeof value === "object" && value.alt) return value.alt;
    return fallback;
  }

  function applyScreenshots(map) {
    const shots = map || {};
    document.querySelectorAll("[" + SLOT_ATTR + "]").forEach((slot) => {
      const name = slot.getAttribute(SLOT_ATTR);
      const value = shots[name];
      const src = normalizeShot(value);
      let img = slot.querySelector(":scope > ." + IMG_CLASS);

      if (!src) {
        slot.classList.remove("has-screenshot");
        if (img) img.remove();
        return;
      }

      if (!img) {
        img = document.createElement("img");
        img.className = IMG_CLASS;
        slot.appendChild(img);
      }

      img.src = src;
      img.alt = labelFor(value, name + " screenshot");
      slot.classList.add("has-screenshot");
    });
  }

  function shotsFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const shots = {};
    params.forEach((value, key) => {
      if (key.indexOf("shot_") === 0) {
        shots[key.slice(5)] = value;
      }
    });
    return shots;
  }

  window.applySankoScreenshots = applyScreenshots;

  document.addEventListener("DOMContentLoaded", () => {
    applyScreenshots(Object.assign({}, window.SANKO_SCREENSHOTS || {}, shotsFromQuery()));
  });
})();
