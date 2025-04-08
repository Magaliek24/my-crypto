import { fetch_data } from "../lib/functions.js";

window.addEventListener("DOMContentLoaded", () => {
  fetch_data({
    route: "/games",
    options: {
      params: {
        key: "e289967bc8a44418ac368bc713a34f16",
        dates: "2019-09-01,2019-09-30",
        platforms: "18,1,7",
      },
    },
  })
    .then((data) => data.results)
    .then((games) => {
      if (games && games.length > 0) {
        create_carrousel(games);
      } else {
        console.error("Aucun jeu trouvé");
      }
    });
});

function create_carrousel(games) {
  const carrousel = document.querySelector(".carrousel");

  // Créer un slide par jeu
  games.forEach((game) => {
    const slide = document.createElement("div");
    slide.className = "carrousel-slide";
    const img_game = document.createElement("img");
    img_game.src = game.background_image;
    img_game.alt = game.name;
    img_game.addEventListener("click", () =>
      open_lightbox(img_game.src, game.name)
    );
    slide.appendChild(img_game);
    const caption = document.createElement("div");
    caption.className = "carrousel-caption";
    caption.textContent = game.name;
    slide.appendChild(caption);
    carrousel?.appendChild(slide);
  });

  // Cloner la dernière slide et l'insérer au début
  const slides = carrousel.children; // HTMLCollection dynamique
  const last_slide_clone = slides[games.length - 1].cloneNode(true);
  carrousel.insertBefore(last_slide_clone, slides[0]);

  // Cloner la première slide et l'ajouter à la fin
  const first_slide_clone = slides[1].cloneNode(true);
  carrousel.appendChild(first_slide_clone);

  // On démarre à l'index 1, qui correspond à la première slide réelle
  let current_index = 1;
  const total_slides = games.length; // nombre de slides réelles

  // Position initiale (sans transition pour le réglage)
  carrousel.style.transition = "none";
  show_slide(current_index);
  setTimeout(() => {
    carrousel.style.transition = "transform 0.5s ease-in-out";
  }, 50);

  function show_slide(index) {
    carrousel.style.transform = `translateX(-${index * 100}%)`;
  }

  const prev_button = document.querySelector(".prev");
  prev_button.addEventListener("click", () => {
    current_index--;
    show_slide(current_index);
    // Si on arrive sur la slide clone du dernier, on repositionne instantanément sur la vraie dernière slide
    if (current_index === 0) {
      carrousel.addEventListener("transitionend", function handler() {
        carrousel.style.transition = "none";
        current_index = total_slides;
        show_slide(current_index);
        setTimeout(() => {
          carrousel.style.transition = "transform 0.5s ease-in-out";
        }, 50);
        carrousel.removeEventListener("transitionend", handler);
      });
    }
  });

  const next_button = document.querySelector(".next");
  next_button.addEventListener("click", () => {
    current_index++;
    show_slide(current_index);
    // Si on arrive sur la slide clone de la première, repositionnement sur la vraie première slide
    if (current_index === total_slides + 1) {
      carrousel.addEventListener("transitionend", function handler() {
        carrousel.style.transition = "none";
        current_index = 1;
        show_slide(current_index);
        setTimeout(() => {
          carrousel.style.transition = "transform 0.5s ease-in-out";
        }, 50);
        carrousel.removeEventListener("transitionend", handler);
      });
    }
  });

  // Mise à jour du setInterval avec la même logique que pour le bouton next
  function calc_slide() {
    current_index++;
    show_slide(current_index);
    if (current_index === total_slides + 1) {
      carrousel.addEventListener("transitionend", function handler() {
        carrousel.style.transition = "none";
        current_index = 1;
        show_slide(current_index);
        setTimeout(() => {
          carrousel.style.transition = "transform 0.5s ease-in-out";
        }, 50);
        carrousel.removeEventListener("transitionend", handler);
      });
    }
  }

  let inter;
  let lightbox_is_open = false;
  setTimeout(() => {
    inter = setInterval(calc_slide, 3000);
    const carrousel_container = document.querySelector("#carrousel-container");
    carrousel_container.addEventListener("mouseenter", () =>
      clearInterval(inter)
    );
    carrousel_container.addEventListener("mouseleave", () => {
      clearInterval(inter);
      if (!lightbox_is_open) inter = setInterval(calc_slide, 3000);
    });
  }, 2000);

  // Lightbox et gestion des évènements clavier restent inchangés
  function open_lightbox(src, alt) {
    lightbox_is_open = true;
    const lightbox = document.querySelector("#lightbox");
    const lightbox_img = document.querySelector("#lightbox-img");
    lightbox.style.display = "flex";
    lightbox_img.src = src;
    lightbox_img.alt = alt;
  }

  const close_button = document.querySelector(".close");
  close_button.addEventListener("click", () => {
    const lightbox = document.querySelector("#lightbox");
    lightbox.style.display = "none";
    lightbox_is_open = false;
    inter = setInterval(calc_slide, 3000);
  });

  const lightbox = document.querySelector("#lightbox");
  lightbox.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      lightbox.style.display = "none";
      lightbox_is_open = false;
      inter = setInterval(calc_slide, 3000);
    }
  });

  window.addEventListener("keydown", (e) => prev_or_next(e));
  function prev_or_next(e) {
    if (e.key === "ArrowLeft" || e.code === "ArrowLeft" || e.keyCode === 37) {
      prev_button.click();
    } else if (
      e.key === "ArrowRight" ||
      e.code === "ArrowRight" ||
      e.keyCode === 39
    ) {
      next_button.click();
    } else if (e.key === "Escape" || e.code === "Escape" || e.keyCode === 27) {
      lightbox.style.display = "none";
      lightbox_is_open = false;
      inter = setInterval(calc_slide, 3000);
    }
  }
}
