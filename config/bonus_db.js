// bonus_db.js — Usa el mismo cliente Turso que db.js
// Las tablas bonus_students y bonus_submissions viven en la misma DB de Turso.
// Esto garantiza que los datos bonus tampoco se pierdan nunca.

const db = require('./db');
module.exports = db;
