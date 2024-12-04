// Este script prueba el script "fetch-reddit", en que para cierta combinación de subreddits, trae los posts y entrega un JSON

import { fetchDataReddit } from '../fetch-reddit.js'; // Nota: Incluye la extensión .js
import { retrieveTopics } from '../retrieve-topics.js'; // Importa la función para obtener los tópicos dinámicamente

(async () => {
    try {
        // Obtener tópicos desde la base de datos
        const topics = await retrieveTopics();
        console.log('Topics obtenidos desde la base de datos:', topics);

        // Seleccionar subreddits del tópico "Chile" (ejemplo dinámico)
        const subreddits = topics.Chile || [];
        console.log('Subreddits seleccionados:', subreddits);

        // Llamar a la función fetchDataReddit con los subreddits seleccionados
        const posts = await fetchDataReddit(subreddits, 5); // Obtiene 5 posts por subreddit
        console.log('Posts obtenidos:', posts);
    } catch (error) {
        console.error('Error en la prueba:', error);
    }
})();