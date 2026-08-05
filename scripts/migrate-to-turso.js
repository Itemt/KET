#!/usr/bin/env node
/**
 * Script de Migración: SQLite local → Turso
 * 
 * Uso:
 *   TURSO_DATABASE_URL=libsql://... TURSO_AUTH_TOKEN=... node scripts/migrate-to-turso.js
 * 
 * Este script migra los estudiantes y submissions del SQLite local a la DB de Turso.
 */

const path = require('path');
require('dotenv').config();

async function migrate() {
  // Verificar variables de entorno
  if (!process.env.TURSO_DATABASE_URL) {
    console.error('❌ ERROR: TURSO_DATABASE_URL no está configurado.');
    console.error('   Ejecuta: export TURSO_DATABASE_URL=libsql://tu-db-url');
    process.exit(1);
  }

  console.log('🚀 Iniciando migración SQLite → Turso...\n');

  // Conectar al SQLite local
  let localStudents = [];
  let localSubmissions = [];

  try {
    const Database = require('better-sqlite3');
    const dbPath = path.join(__dirname, '../ket_exam.db');
    const localDb = new Database(dbPath, { readonly: true });

    localStudents = localDb.prepare('SELECT * FROM students ORDER BY id').all();
    localSubmissions = localDb.prepare('SELECT * FROM submissions ORDER BY id').all();
    localDb.close();

    console.log(`📊 SQLite local: ${localStudents.length} estudiantes, ${localSubmissions.length} submissions`);
  } catch (err) {
    console.error('❌ No se pudo leer el SQLite local:', err.message);
    process.exit(1);
  }

  // Conectar a Turso
  const { createClient } = require('@libsql/client');
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN || undefined
  });

  // Crear tablas en Turso
  console.log('\n📦 Creando tablas en Turso...');
  await client.execute(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      grade TEXT NOT NULL,
      username TEXT,
      last_login_at TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
  await client.execute(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      attempt_time TEXT,
      score_reading_writing INTEGER DEFAULT 0,
      score_listening INTEGER DEFAULT 0,
      total_auto_score INTEGER DEFAULT 0,
      max_auto_score INTEGER DEFAULT 0,
      writing_part6 TEXT,
      writing_part7 TEXT,
      speaking_audio_url TEXT,
      raw_answers_json TEXT NOT NULL DEFAULT '{}',
      submitted_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    )
  `);

  // Verificar si ya hay datos
  const existing = await client.execute('SELECT COUNT(*) as count FROM students');
  const existingCount = Number(existing.rows[0].count);
  if (existingCount > 0) {
    console.log(`\n⚠️  La DB de Turso ya tiene ${existingCount} estudiantes.`);
    console.log('   Limpiando para re-migrar...');
    await client.execute('DELETE FROM submissions');
    await client.execute('DELETE FROM students');
    // Resetear autoincrement
    await client.execute(`DELETE FROM sqlite_sequence WHERE name IN ('students', 'submissions')`);
  }

  // Migrar estudiantes
  console.log('\n👥 Migrando estudiantes...');
  for (const s of localStudents) {
    await client.execute({
      sql: `INSERT INTO students (id, first_name, last_name, grade, username, last_login_at, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [s.id, s.first_name, s.last_name, s.grade, s.username || null, s.last_login_at || null, s.created_at || new Date().toISOString()]
    });
    console.log(`  ✅ [${s.id}] ${s.first_name} ${s.last_name}`);
  }

  // Migrar submissions
  console.log('\n📝 Migrando submissions...');
  for (const sub of localSubmissions) {
    await client.execute({
      sql: `INSERT INTO submissions (id, student_id, attempt_time, score_reading_writing, score_listening, total_auto_score, max_auto_score, writing_part6, writing_part7, speaking_audio_url, raw_answers_json, submitted_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        sub.id,
        sub.student_id,
        sub.attempt_time || null,
        sub.score_reading_writing || 0,
        sub.score_listening || 0,
        sub.total_auto_score || 0,
        sub.max_auto_score || 0,
        sub.writing_part6 || '',
        sub.writing_part7 || '',
        sub.speaking_audio_url || '',
        sub.raw_answers_json || '{}',
        sub.submitted_at || new Date().toISOString()
      ]
    });
    console.log(`  ✅ Submission #${sub.id} (student_id: ${sub.student_id})`);
  }

  // Verificación final
  const finalStudents = await client.execute('SELECT COUNT(*) as count FROM students');
  const finalSubmissions = await client.execute('SELECT COUNT(*) as count FROM submissions');
  console.log(`\n✅ MIGRACIÓN COMPLETADA:`);
  console.log(`   Estudiantes: ${finalStudents.rows[0].count}`);
  console.log(`   Submissions: ${finalSubmissions.rows[0].count}`);
  console.log('\n🎉 ¡Listo! La DB de Turso ya tiene todos los datos.');

  process.exit(0);
}

migrate().catch(err => {
  console.error('❌ Error en la migración:', err);
  process.exit(1);
});
