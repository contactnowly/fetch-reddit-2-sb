// Este script prueba el script "fetch-reddit", en que para cierta combinación de subreddits, trae los posts y entrega un JSON

import { fetchDataReddit } from '../fetch-reddit.js'; // Nota: Incluye la extensión .js
import topicsReddit from '../topicsReddit.js';       // Nota: Incluye la extensión .js

(async () => {
    try {
        const subreddits = topicsReddit.chile; // Selecciona los subreddits del tópico "chile"
        console.log('Subreddits seleccionados:', subreddits);

        const posts = await fetchDataReddit(subreddits, 5); // Obtiene 5 posts por subreddit
        console.log('Posts obtenidos:', posts);
    } catch (error) {
        console.error('Error en la prueba:', error);
    }
})();
