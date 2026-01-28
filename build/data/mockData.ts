
import { Turf, SportType, Booking, ScoreRecord } from '../types';

export const TURFS: Turf[] = [
  {
    id: '1',
    name: 'Champions Arena',
    location: 'Downtown Sports Complex',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    sports: [SportType.FOOTBALL, SportType.CRICKET],
    basePrice: 1200,
    description: 'A premium 7-a-side artificial turf with international standards lighting and FIFA-approved grass.',
    amenities: ['Parking', 'Showers', 'Cafe', 'Drinking Water']
  },
  {
    id: '2',
    name: 'The Box Cricket Hub',
    location: 'Westside Mall Roof',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
    sports: [SportType.CRICKET],
    basePrice: 800,
    description: 'Perfect for box cricket enthusiasts. High-quality nets and bowling machines available.',
    amenities: ['Dugouts', 'CCTV', 'Equipment Rental']
  },
  {
    id: '3',
    name: 'Smash Hit Courts',
    location: 'Garden City',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
    sports: [SportType.BADMINTON, SportType.TENNIS],
    basePrice: 500,
    description: 'Indoor air-conditioned courts with non-marking professional flooring.',
    amenities: ['AC', 'Locker Room', 'Professional Coaching']
  },
  {
    id: '4',
    name: 'Velocity Arena',
    location: 'North Bypass Road',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80',
    sports: [SportType.FOOTBALL, SportType.PICKLEBALL],
    basePrice: 1000,
    description: 'Spacious turf with great bounce. Popular for high-intensity night matches.',
    amenities: ['Spectator Stand', 'Changing Room']
  },
  {
    id: '5',
    name: 'Elite Smash Point',
    location: 'Riverside Walkway',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=1200&q=80',
    sports: [SportType.FOOTBALL],
    basePrice: 1500,
    description: 'Large 11-a-side field which can be split into smaller sections.',
    amenities: ['Floodlights', 'Medical Kit', 'Ample Parking']
  },
  {
    id: '6',
    name: 'Grand Slam Academy',
    location: 'Highland Estates',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a45e30?auto=format&fit=crop&w=1200&q=80',
    sports: [SportType.TENNIS],
    basePrice: 700,
    description: 'Clay and synthetic hard courts available. Home to regional tournaments.',
    amenities: ['Pro Shop', 'Ball Machines', 'Refreshment Bar']
  },
  {
    id: '7',
    name: 'Pitch Perfect Indoor',
    location: 'Industrial Area',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1200&q=80',
    sports: [SportType.CRICKET, SportType.FOOTBALL],
    basePrice: 1100,
    description: 'Fully covered arena with high ceilings. Play even when it rains.',
    amenities: ['Power Backup', 'Canteen', 'Electronic Scoreboard']
  },
  {
    id: '8',
    name: 'Shuttle Pro Center',
    location: 'Central District',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80',
    sports: [SportType.BADMINTON],
    basePrice: 450,
    description: 'Professional grade mats and lighting. Recommended for serious enthusiasts.',
    amenities: ['Locker Facility', 'Drinking Water', 'Parking']
  },
  {
    id: '9',
    name: 'Dinking Zone',
    location: 'Sunset Blvd',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1629235483015-685b3b782928?auto=format&fit=crop&w=1200&q=80',
    sports: [SportType.PICKLEBALL],
    basePrice: 600,
    description: 'Newest pickleball courts in town. Great social vibe and weekly leagues.',
    amenities: ['Music System', 'Benches', 'Water Dispenser']
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'B-1001',
    turfId: '1',
    userId: 'u1',
    date: '2023-10-24',
    slot: 19,
    totalPrice: 1560,
    status: 'confirmed'
  },
  {
    id: 'B-1002',
    turfId: '3',
    userId: 'u1',
    date: '2023-10-22',
    slot: 10,
    totalPrice: 500,
    status: 'confirmed'
  }
];

export const MOCK_SCORES: ScoreRecord[] = [
  {
    id: 'S-1',
    turfName: 'Champions Arena',
    date: '2023-10-24',
    sport: SportType.FOOTBALL,
    teamA: 'Street Kings',
    teamB: 'Downtown FC',
    scoreA: 5,
    scoreB: 3,
    notes: 'Intense match under the lights.'
  }
];
