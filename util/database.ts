import * as SQLite from 'expo-sqlite';
import {Place} from '../models/place'; 

const db = SQLite.openDatabaseSync('places.db');

export async function initializeDatabase(): Promise<void> {
  try {
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS place_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      );
    `);
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

export function insertPlace(place: Place): Promise<SQLite.SQLiteRunResult> {
  return db.runAsync(
    `
      INSERT INTO place_entries (title, imageUri, address, lat, lng)
      VALUES (?, ?, ?, ?, ?)
    `,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ]
  );
}
