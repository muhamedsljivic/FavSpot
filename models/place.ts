export type Location = {
  lat: number;
  lng: number;
  address: string;
};

export default class Place {
  id: number; 
  title: string;
  imageUri: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor(title: string, imageUri: string, location: Location, id?: number) {
    this.id = id ?? Date.now();
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = {
      lat: location.lat,
      lng: location.lng,
    };
  }
}
