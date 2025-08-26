import express from 'express';
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => res.send('¡Hola desde Express en Kubernetes!'));
app.get('/healthz', (req, res) => res.status(200).send('ok'));
app.get('/ready', (req, res) => res.status(200).send('ready'));

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
