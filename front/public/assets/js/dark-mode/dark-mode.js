(function () {
  const root = document.documentElement;
  const toggler_themes = document.querySelectorAll("i[data-theme-toggler]");

  function init() {
    const stored_theme = localStorage.getItem("theme"); // récupère l'item avec la clé 'theme'
    const system_prefers_dark = window.matchMedia(
      "(prefers-color-scheme: dark"
    ).matches; // true || false
    const theme = stored_theme || (system_prefers_dark ? "dark" : "light");
    root.setAttribute("data-theme", theme);
    toggler_themes.forEach((toggler) => {
      update_toggle_button(toggler, theme);
    });
  }

  function update_toggle_button(toggler, current_theme) {
    toggler.setAttribute(
      "class",
      current_theme === "dark" ? "fas fa-sun" : "fas fa-moon"
    );
  }

  function toggle_dark_mode(toggler) {
    const current_theme = root.getAttribute("data-theme"); // récupère le thème dark ou light stocké dans l'html
    const new_theme = current_theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", new_theme); // on stocke le choix de l'utilisateur (cf console/appli/key value) qui sera récup par la fonction init au prochain passage
    root.setAttribute("data-theme", new_theme);
    update_toggle_button(toggler, new_theme);
  }

  document.addEventListener("DOMContentLoaded", () => {
    init();
    toggler_themes.forEach((toggler) => {
      toggler.style.cursor = "pointer";
      // moon => sun
      toggler.addEventListener("click", () => toggle_dark_mode(toggler));
    });
  });
})();
