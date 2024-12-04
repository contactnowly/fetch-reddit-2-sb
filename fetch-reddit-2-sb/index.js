import { fetchDataReddit } from './fetch-reddit.js';
import { persistJSONtoSB } from './persistJSONtoSB.js';

export async function submitReddit(req, res) {
    try {
        console.log('Iniciando submitReddit...');

        // Obtener los posts de Reddit
        const redditPosts = await fetchDataReddit();
        console.log(`Datos obtenidos de Reddit: ${redditPosts.length} posts.`);

        // Persistir los datos en la base de datos
        await persistJSONtoSB(redditPosts);
        console.log('Datos insertados/actualizados en la base de datos correctamente.');

        // Responder al cliente con éxito
        return res.status(200).send('Datos de Reddit procesados correctamente.');
    } catch (error) {
        console.error('Error en submitReddit:', error);

        // Responder al cliente con un error
        return res.status(500).send('Ocurrió un error al procesar los datos de Reddit.');
    }
}

