import { Router } from 'express';
import { db, ids } from '../data/store.js';

const router = Router();

/**
 * Expected model:
 * {
 *   name: "Barcelona"
 * }
 */

// Create team
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'name is required (string)' });
  }
  const team = { id: ids.nextTeam(), name };
  db.teams.push(team);
  res.status(201).json(team);
});

// List teams
router.get('/', (_req, res) => {
  res.json(db.teams);
});

// Get team by id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const team = db.teams.find(t => t.id === id);
  if (!team) return res.status(404).json({ error: 'Team not found' });
  res.json(team);
});

// Update team
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const team = db.teams.find(t => t.id === id);
  if (!team) return res.status(404).json({ error: 'Team not found' });
  if (name && typeof name === 'string') team.name = name;
  res.json(team);
});

// Delete team
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = db.teams.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Team not found' });
  const [deleted] = db.teams.splice(idx, 1);
  res.json(deleted);
});

export default router;
