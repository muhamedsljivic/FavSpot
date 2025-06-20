export type Location = {
  lat: number;
  lng: number;
};

export default class Place {
  id: string;
  title: string;
  address: string;
  location: Location;
  imageUrl: string;

  constructor(title: string, address: string, location: Location, imageUrl: string) {
    this.id = new Date().toString() + Math.random().toString();
    this.title = title;
    this.address = address;
    this.location = location;
    this.imageUrl = imageUrl;
  }
}
