
export enum SportType {
  FOOTBALL = 'Football',
  CRICKET = 'Cricket',
  BADMINTON = 'Badminton',
  TENNIS = 'Tennis',
  PICKLEBALL = 'Pickleball'
}

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface TimeSlot {
  hour: number; // 0-23
  isBooked: boolean;
  price: number;
}

export interface Turf {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  sports: SportType[];
  basePrice: number;
  description: string;
  amenities: string[];
}

export interface Booking {
  id: string;
  turfId: string;
  userId: string;
  date: string;
  slot: number;
  totalPrice: number;
  status: 'confirmed' | 'pending';
}

export interface ScoreRecord {
  id: string;
  bookingId?: string;
  turfName: string;
  date: string;
  sport: SportType;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  // Cricket specific live stats
  wicketsA?: number;
  wicketsB?: number;
  ballsA?: number;
  ballsB?: number;
  notes?: string;
}
