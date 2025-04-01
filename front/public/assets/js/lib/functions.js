// A_CONSERVER - A REUTILISER = la route API [ex: http://localhost:8000]

const api_url = "https://api.rawg.io/api";

// fonction asynchrone
// quand il y a async qq part, il faut mettre un await
// route ex : /blog
// options ex : {Accept: 'application/json'}
/**
 * @param {string} route
 * @param {object} options
 * @returns {Promise}
 */
export async function fetch_data({ route, options = {} }) {
  // Préparation de l'entête 'headers' avec les clés - valeurs nécessaires pour l'appel [Authorization: 'Bearer lkjhsdiqdfuih<fdu10']
  const headers = { Accept: "application/json", ...options.headers };
  // appel methode native fetch [appels API]
  const result = await fetch(`${api_url}${route}`, { ...options, headers });

  if (result.ok) {
    return result.json();
  }
  throw new Error("Erreur serveur", { cause: result });
}
