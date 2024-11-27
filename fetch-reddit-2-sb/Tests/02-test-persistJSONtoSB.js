// Este script prueba el script "persistJSONtoSB", e inyecta dos filas en la base de datos.

import { persistJSONtoSB } from '../persistJSONtoSB.js';

const testData = [
    {
        id: 'abc1234',
        source: 'reddit',
        channel: 'RenovablesChile',
        title: 'Post de prueba',
        global_label: "energia",
        sectorial_label: "pv",
        text: 'Este es un post de prueba.',
        social_score: 1800,
        uni_score: null,
        ramp: null,
        time_created: new Date('2024-11-22T10:00:00Z'),
        time_edited: null,
        time_added: new Date(),
        url: "url de prueba1"
    },
    {
        id: 'def4567',
        source: 'twitter',
        channel: 'RenovablesChile',
        title: 'Otro post de prueba',
        global_label: "energia",
        sectorial_label: "litio",
        text: 'Otro ejemplo de post.',
        social_score: 5000,
        uni_score: null,
        ramp: null,
        time_created: new Date('2024-11-22T11:00:00Z'),
        time_edited: null,
        time_added: new Date(),
        url: "url de prueba1"
    },
];

(async () => {
    console.log('Iniciando prueba de persistJSONtoSB...');
    try {
        await persistJSONtoSB(testData);
        console.log('Prueba completada con éxito.');
    } catch (error) {
        console.error('Error durante la prueba:', error);
    }
})();