// In-memory storage (simple)
export const db = {
  teams: [],
  coaches: [],
  players: [],
  referees: [],
  matches: []
};

// ID counters
let teamId = 1;
let coachId = 1;
let playerId = 1;
let refereeId = 1;
let matchId = 1;

export const ids = {
  nextTeam: () => teamId++,
  nextCoach: () => coachId++,
  nextPlayer: () => playerId++,
  nextReferee: () => refereeId++,
  nextMatch: () => matchId++
};
