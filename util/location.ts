import { GOOGLE_API_KEY } from '@env';

export function getMapPreview(lat: number, lng: number): string {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=AIzaSyCUwOxq0PCWeV8l0x43wEz6zpFDvJYtnMw`;
}

export async function getAddress(lat: number, lng: number) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCUwOxq0PCWeV8l0x43wEz6zpFDvJYtnMw`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch address.');
  }

  const data = await response.json();
  console.log('Geocoding API response:', data); // <= dodaj za test

  if (!data.results || data.results.length === 0) {
    return 'Address not found';
  }

  return data.results[0].formatted_address;
}