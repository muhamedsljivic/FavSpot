export type Location = {
  lat: number;
  lng: number;
  address: string;
};

export class Place {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor(title: string, imageUri: string, location: Location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = {
      lat: location.lat,
      lng: location.lng,
    };
    this.id = new Date().toISOString() + Math.random().toString();
  }
}
