import { Router } from 'express';
import { db, ids } from '../data/store.js';

const router = Router();

/**
 * Expected model:
 * {
 *   name: "Pep Guardiola",
 *   teamId: 1   // optional, if assigned to a team
 * }
 */

// Create coach
router.post('/', (req, res) => {
  const { name, teamId } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'name is required (string)' });
  }

  let assignedTeam = null;
  if (teamId !== undefined) {
    const team = db.teams.find(t => t.id === Number(teamId));
    if (!team) return res.status(400).json({ error: 'teamId does not exist' });
    assignedTeam = team.id;
  }

  const coach = { id: ids.nextCoach(), name, teamId: assignedTeam };
  db.coaches.push(coach);
  res.status(201).json(coach);
});

// List coaches
router.get('/', (_req, res) => res.json(db.coaches));

// Get coach by id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const coach = db.coaches.find(c => c.id === id);
  if (!coach) return res.status(404).json({ error: 'Coach not found' });
  res.json(coach);
});

// Update coach
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const coach = db.coaches.find(c => c.id === id);
  if (!coach) return res.status(404).json({ error: 'Coach not found' });

  const { name, teamId } = req.body;
  if (name && typeof name === 'string') coach.name = name;

  if (teamId !== undefined) {
    const team = db.teams.find(t => t.id === Number(teamId));
    if (!team) return res.status(400).json({ error: 'teamId does not exist' });
    coach.teamId = team.id;
  }

  res.json(coach);
});

// Delete coach
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = db.coaches.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Coach not found' });
  const [deleted] = db.coaches.splice(idx, 1);
  res.json(deleted);
});

export default router;
