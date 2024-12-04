import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    user: 'postgres.wfkjjwlbnevwqxurtabu',
    password: 'nowlygrid123',
    database: 'postgres',
    port: 6543,
    ssl: { rejectUnauthorized: false },
});

export async function retrieveTopics() {
    try {
        const client = await pool.connect();
        const query = 'SELECT sector AS global_label, channel AS subreddit FROM topics';
        const result = await client.query(query);
        client.release();

        // Agrupar los resultados por global_label (sector)
        const topics = result.rows.reduce((acc, row) => {
            if (!acc[row.global_label]) acc[row.global_label] = [];
            acc[row.global_label].push(row.subreddit);
            return acc;
        }, {});

        console.log('Topics obtenidos de la base de datos:', topics);
        return topics;
    } catch (error) {
        console.error('Error al obtener los topics desde la base de datos:', error);
        throw error;
    }
}
