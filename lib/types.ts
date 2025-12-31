import { Prisma } from '@prisma/client';

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Room with all relations
export type RoomWithRelations = Prisma.RoomGetPayload<{
  include: {
    amenities: {
      include: {
        amenity: true;
      };
    };
    inventory: true;
  };
}>;

// Room with availability info
export interface RoomWithAvailability extends RoomWithRelations {
  available?: number;
  isAvailable?: boolean;
  inventory: Array<{
    id: string;
    roomId: string;
    totalRooms: number;
    availableRooms?: number;
  }>;
}

// Booking with all relations
export type BookingWithRelations = Prisma.BookingGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
        email: true;
      };
    };
    room: true;
    payment: true;
  };
}>;

// User without password
export type SafeUser = Omit<Prisma.UserGetPayload<{}>, 'password'>;

// Payment with booking
export type PaymentWithBooking = Prisma.PaymentGetPayload<{
  include: {
    booking: {
      include: {
        room: true;
        user: {
          select: {
            id: true;
            name: true;
            email: true;
          };
        };
      };
    };
  };
}>;

// Review with user
export type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

// Session user type for NextAuth
export interface SessionUser {
  id: string;
  email: string;
  name: string;
}

// Error response
export interface ErrorResponse {
  error: string;
  details?: string[];
  statusCode?: number;
}
