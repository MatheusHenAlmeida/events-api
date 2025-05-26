export interface Event {
  id: string;
  title: string;
  description: string;
  date: number;
  image: string;
  longitude: number;
  latitude: number;
  price: number;
  people: string[];
}

export interface CheckinRequest {
  eventId: string;
  name: string;
  email: string;
}

export interface Checkin {
  id: string;
  eventId: string;
  name: string;
  email: string;
  checkinDate: Date;
}