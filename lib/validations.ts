import { z } from 'zod';

// User validation schemas
export const userRegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const userLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Booking validation schemas
export const createBookingSchema = z.object({
  userId: z.string().cuid('Invalid user ID'),
  roomId: z.string().cuid('Invalid room ID'),
  checkIn: z.string().datetime('Invalid check-in date'),
  checkOut: z.string().datetime('Invalid check-out date'),
  numberOfGuests: z.number().int().positive('Number of guests must be positive'),
  specialRequests: z.string().optional(),
  paymentMethod: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'BANK_TRANSFER']),
}).refine(
  (data) => new Date(data.checkOut) > new Date(data.checkIn),
  {
    message: 'Check-out date must be after check-in date',
    path: ['checkOut'],
  }
);

export const updateBookingSchema = z.object({
  checkIn: z.string().datetime().optional(),
  checkOut: z.string().datetime().optional(),
  numberOfGuests: z.number().int().positive().optional(),
  specialRequests: z.string().optional(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW']).optional(),
});

// Room validation schemas
export const createRoomSchema = z.object({
  name: z.string().min(1, 'Room name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  basePrice: z.number().positive('Price must be positive'),
  maxGuests: z.number().int().positive('Max guests must be positive'),
  size: z.number().positive('Size must be positive'),
  bedType: z.string().min(1, 'Bed type is required'),
  imageUrl: z.string().url('Invalid image URL'),
  images: z.array(z.string().url()).optional(),
});

export const updateRoomSchema = createRoomSchema.partial();

// Availability check schema
export const availabilityCheckSchema = z.object({
  roomId: z.string().cuid().optional(),
  checkIn: z.string().datetime('Invalid check-in date'),
  checkOut: z.string().datetime('Invalid check-out date'),
  guests: z.string().optional(),
}).refine(
  (data) => new Date(data.checkOut) > new Date(data.checkIn),
  {
    message: 'Check-out date must be after check-in date',
    path: ['checkOut'],
  }
);

// Review validation schemas
export const createReviewSchema = z.object({
  userId: z.string().cuid('Invalid user ID'),
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
  title: z.string().optional(),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
});

// Contact message schema
export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Newsletter subscription schema
export const newsletterSubscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Admin schemas
export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Type exports for use in components and API routes
export type UserRegisterInput = z.infer<typeof userRegisterSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;
export type AvailabilityCheckInput = z.infer<typeof availabilityCheckSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
export type NewsletterSubscribeInput = z.infer<typeof newsletterSubscribeSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
