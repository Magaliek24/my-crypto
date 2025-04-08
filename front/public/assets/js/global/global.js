// We listen to the resize event

function calc_viewport_height() {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function calc_body_padding() {
  const reseaux_mobile = document.querySelector("#reseaux-mobile");
  const header = document.querySelector("header");
  const main = document.querySelector("main:not(#accueil)");
  if (main) main.style.paddingTop = `${header.offsetHeight + 10}px`;
  if (window.matchMedia("(max-width: 576px)").matches) {
    document.body.style.paddingBottom = `${reseaux_mobile.offsetHeight + 10}px`;
  } else {
    document.body.style.paddingBottom = "10px";
  }
  setTimeout(() => {
    if (window.location.hash && window.location.hash.startsWith("#")) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        // Si vous avez une en-tête fixe, ajustez yOffset (exemple : -100px)
        const y =
          target.getBoundingClientRect().top +
          window.pageYOffset +
          header.offsetHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, 1000);
}

window.addEventListener("DOMContentLoaded", () => {
  calc_viewport_height();
  calc_body_padding();
});
window.addEventListener("resize", () => {
  calc_viewport_height();
  calc_body_padding();
});
