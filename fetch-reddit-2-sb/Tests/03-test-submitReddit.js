import express from 'express';
import { submitReddit } from '../index.js'; // Subir un nivel desde Tests para acceder al archivo principal

const app = express();
const PORT = 3000;

app.use(express.json());

// Ruta para procesar datos de Reddit
app.post('/submit-reddit', submitReddit);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
