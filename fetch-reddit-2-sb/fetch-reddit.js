import snoowrap from 'snoowrap';
import dotenv from 'dotenv';
import { retrieveTopics } from './retrieve-topics.js'; // Importar la función desde el archivo correspondiente

dotenv.config(); // Cargar las variables de entorno desde .env

// Configuración de snoowrap con credenciales de Reddit
const reddit = new snoowrap({
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD,
    userAgent: process.env.REDDIT_USER_AGENT,
});

// Función para obtener datos de múltiples subreddits
async function fetchDataReddit(limit = 10) {
    const outputData = []; // Aquí se almacenarán los datos procesados

    try {
        // Obtener los tópicos dinámicamente desde la base de datos
        const topics = await retrieveTopics();
        console.log('Tópicos obtenidos desde la base de datos:', topics);

        // Convertir los tópicos en un arreglo plano de subreddits
        const subreddits = Object.values(topics).flat();
        console.log('Lista de subreddits:', subreddits);

        for (const subreddit of subreddits) {
            console.log(`Obteniendo posts del subreddit: ${subreddit}...`);

            // Determinar el global_label basado en la base de datos
            const globalLabel = Object.keys(topics).find(key =>
                topics[key].includes(subreddit)
            ) || null;

            if (!globalLabel) {
                console.warn(`No se encontró un global_label para el subreddit: ${subreddit}`);
            }

            // Obtiene los posts más populares del subreddit
            const posts = await reddit.getHot(subreddit, { limit });

            // Mapea los datos relevantes de cada post
            const mappedPosts = posts.map(post => ({
                id: post.id,
                source: "reddit",
                channel: subreddit,
                title: post.title,
                global_label: globalLabel, // Etiqueta global según los tópicos de la base de datos
                sectorial_label: null,
                text: post.selftext || '',
                social_score: post.score,
                uni_score: null,
                ramp: null,
                time_created: new Date(post.created_utc * 1000),
                time_edited: null,
                time_added: new Date(),
                url: post.url
            }));

            // Agrega los posts mapeados al array de salida
            outputData.push(...mappedPosts);
        }

        console.log(`fetchDataReddit ejecutado correctamente. Total de posts obtenidos: ${outputData.length}`);
        return outputData; // Devuelve los datos procesados
    } catch (error) {
        console.error('Error en fetchDataReddit:', error);
        throw error; // Propaga el error para que sea manejado en niveles superiores
    }
}

export { fetchDataReddit };
