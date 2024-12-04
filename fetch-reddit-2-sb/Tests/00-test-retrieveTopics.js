import { retrieveTopics } from '../retrieve-topics.js';

(async () => {
    try {
        const topics = await retrieveTopics();
        console.log('Tópicos recuperados:', topics);
    } catch (error) {
        console.error('Error al recuperar los tópicos:', error);
    }
})();
