import * as SQLite from 'expo-sqlite';
import Place from '../models/place'; // default export (not destructured)

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

export async function insertPlace(place: Place): Promise<number> {
  try {
    const res = await db.runAsync(
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

    if (res.changes === 1) {
      console.log('Place inserted. ID:', res.lastInsertRowId);
      return res.lastInsertRowId;        
    }

    console.warn('Insert returned 0 changes.');
    throw new Error('Insert failed');
  } catch (err) {
    console.error('Insert error:', err);
    throw err;
  }
}



export async function fetchPlaces(): Promise<Place[]> {
  try {
    const result = await db.getAllAsync<{
      id: number;
      title: string;
      imageUri: string;
      address: string;
      lat: number;
      lng: number;
    }>('SELECT * FROM place_entries');

    return result.map(
      (row) =>
        new Place(
          row.title,
          row.imageUri,
          {
            address: row.address,
            lat: row.lat,
            lng: row.lng,
          },
          row.id 
        )
    );
  } catch (error) {
    console.error('Failed to fetch places:', error);
    throw error;
  }
}

export async function fetchPlaceById(id: number): Promise<Place | null> {
  try {
    const result = await db.getFirstAsync<{
      id: number;
      title: string;
      imageUri: string;
      address: string;
      lat: number;
      lng: number;
    }>(
      `SELECT * FROM place_entries WHERE id = ?`,
      [id]
    );

    if (!result) return null;

    return new Place(result.title, result.imageUri, {
      address: result.address,
      lat: result.lat,
      lng: result.lng,
    });
  } catch (err) {
    console.error('Failed to fetch place by ID:', err);
    return null;
  }
}

export async function clearPlaces(): Promise<void> {
  try {
    await db.runAsync(`DELETE FROM place_entries`);
    console.log('All places deleted from the database.');
  } catch (error) {
    console.error('Failed to clear database:', error);
    throw error;
  }
}
