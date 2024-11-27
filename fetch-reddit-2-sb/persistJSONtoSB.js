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

async function persistJSONtoSB(data) {
    console.log('Inicio de persistJSONtoSB: preparando para insertar datos en la base de datos.');

    const query = `
    INSERT INTO "sp-reddit" (
        id, source, channel, title, global_label, sectorial_label, text,
        social_score, uni_score, ramp, time_created, time_edited, time_added, url
    )
    VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
    )
    ON CONFLICT (id)
    DO UPDATE SET
        social_score = EXCLUDED.social_score,
        time_edited = NOW(),
        url = EXCLUDED.url;
    `;

    try {
        const client = await pool.connect();
        console.log('Conectado a la base de datos.');

        for (const item of data) {
            console.log(`Insertando registro con ID: ${item.id}`);
            await client.query(query, [
                item.id,
                item.source,
                item.channel,
                item.title,
                item.global_label,
                item.sectorial_label,
                item.text,
                item.social_score,
                item.uni_score,
                item.ramp,
                item.time_created,
                item.time_edited,
                item.time_added,
                item.url,
            ]);
        }

        client.release();
        console.log(`persistJSONtoSB ejecutado correctamente. ${data.length} registros insertados.`);
    } catch (error) {
        console.error('Error en persistJSONtoSB:', error);
        throw error;
    }
}

export { persistJSONtoSB };