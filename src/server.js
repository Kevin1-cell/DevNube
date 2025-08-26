import express from 'express';
import teamsRouter from './routes/teams.js';
import coachesRouter from './routes/coaches.js';

const app = express();
const port = process.env.PORT || 3001;

// JSON middleware
app.use(express.json());

// Health
app.get('/', (req, res) => res.send('⚽ Soccer Microservice active'));
app.get('/healthz', (req, res) => res.status(200).send('ok'));
app.get('/ready', (req, res) => res.status(200).send('ready'));

// Domain routes
app.use('/teams', teamsRouter);
app.use('/coaches', coachesRouter);

// 404 middleware
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Start server
app.listen(port, () => {
  console.log(`⚽ Soccer Microservice running on port ${port}`);
});
