import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false },
});

export async function retrieveTopics() {
    try {
        const client = await pool.connect();
        const query = 'SELECT sector AS global_label, channel AS subreddit FROM topics';
        const result = await client.query(query);
        client.release();

        // Formatear el resultado en el formato deseado
        const topics = result.rows.reduce((acc, row) => {
            const { global_label, subreddit } = row;

            if (!acc[global_label]) acc[global_label] = []; // Si no existe el sector, inicialízalo
            acc[global_label].push(subreddit); // Agrega el subreddit al sector correspondiente

            return acc;
        }, {});

        console.log('Topics obtenidos de la base de datos:', topics);
        return topics; // Devuelve el objeto en el formato deseado
    } catch (error) {
        console.error('Error al obtener los topics desde la base de datos:', error);
        throw error;
    }
}