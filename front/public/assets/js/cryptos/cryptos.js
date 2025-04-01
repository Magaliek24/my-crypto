import { fetch_data } from "../lib/functions.js";

window.addEventListener("DOMContentLoaded", () => {
  let loading = true;
  let tab_games = [];
  fetch_data({
    route:
      "/games?key=e289967bc8a44418ac368bc713a34f16&dates=2019-09-01,2019-09-30&platforms=18,1,7",
  })
    .then((data) => {
      return data.results;
    })
    .then((data) => {
      loading = !loading;
      tab_games = [...tab_games, data];
      create(loading, tab_games[0]);
    });
});

function create(loading, tab_games) {
  if (!loading) {
    console.log(tab_games);
    const cryptos = document.querySelector("#cryptos");
    const container = document.createElement("div");
    container.setAttribute("id", "content-games");
    cryptos.appendChild(container);
    tab_games.map((game) => {
      // for (let i = 0; i < tabGames.length; i += 2) {
      // let pair = tabGames.slice(i, i + 2);
      const div_area = document.createElement("div");
      container.appendChild(div_area);
      // pair.map((game) => {
      const card = document.createElement("div");
      card.setAttribute("class", "game-card");
      const img_game = document.createElement("img");
      img_game.setAttribute("src", game.background_image);
      img_game.setAttribute("alt", `Image du jeu ${game.name}`);
      const avatar_game = document.createElement("img");
      avatar_game.setAttribute("src", game.short_screenshots[1].image);
      avatar_game.setAttribute("alt", `Image du jeu ${game.name}`);
      const header_card = document.createElement("div");
      const name_game = document.createElement("h3");
      name_game.textContent = `${
        game.name.length >= 20 ? game.name.substring(0, 20) + `...` : game.name
      }`;
      const date_game = document.createElement("span");
      date_game.textContent = `${game.released}`;
      header_card.append(name_game, date_game);
      card.append(header_card, img_game, avatar_game);
      div_area.append(card);
      // });
      // console.log(pair);
    });
  } else {
    console.log("loading ...");
  }
}
