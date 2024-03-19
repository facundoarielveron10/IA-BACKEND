const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

// CONFIGURACION - IA API
const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

// CONFIGURACION DEL SERVIDOR
const app = express();
app.use(bodyParser.json());
app.use(cors());

// ENDPOINT PARA CHATGPT
app.post('/chat', async (req, res) => {
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: req.body }],
        model: 'gpt-3.5-turbo',
    });

    res.send(completion.choices[0]);
});

// PUERTO Y INICIALIZAR SERVIDOR
const port = 8080;
app.listen(port, () => {
    console.log('Server listo y corriendo en el puerto: ', port);
});
