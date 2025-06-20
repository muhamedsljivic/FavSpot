import { GOOGLE_API_KEY } from '@env';

export function getMapPreview(lat: number, lng: number): string {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=AIzaSyCUwOxq0PCWeV8l0x43wEz6zpFDvJYtnMw`;
}
