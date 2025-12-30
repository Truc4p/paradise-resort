# Paradise Resort - Database Setup Guide

## Overview
This project uses **Prisma ORM** with **PostgreSQL** for managing resort bookings, rooms, users, and payments.

## Database Schema
- **Users**: Guest accounts with authentication
- **Rooms**: Room types with pricing and amenities
- **Bookings**: Reservation records with date ranges
- **Payments**: Transaction tracking
- **Amenities**: Resort facilities
- **Reviews**: Guest testimonials
- **Special Offers**: Promotions and discounts
- **Newsletter Subscribers**: Email list management

## Quick Setup

### Option 1: Local PostgreSQL (Development)

1. **Install PostgreSQL**
   ```bash
   # macOS with Homebrew
   brew install postgresql
   brew services start postgresql
   
   # Create database
   createdb resort_db
   ```

2. **Update .env file**
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/resort_db?schema=public"
   ```

3. **Run migrations**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

### Option 2: Supabase (Easiest Cloud Option)

1. **Create account at** https://supabase.com
2. **Create new project**
3. **Get connection string** from Settings → Database
4. **Update .env**
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"
   ```
5. **Run migrations**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

### Option 3: Railway (Free Tier Available)

1. **Visit** https://railway.app
2. **Create PostgreSQL database**
3. **Copy connection string**
4. **Update .env and run migrations**

## Seed Sample Data

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create amenities
  const amenities = await Promise.all([
    prisma.amenity.create({ data: { name: 'Ocean View', icon: 'FaWater', description: 'Stunning ocean views' } }),
    prisma.amenity.create({ data: { name: 'Balcony', icon: 'FaHome', description: 'Private balcony' } }),
    prisma.amenity.create({ data: { name: 'Wi-Fi', icon: 'FaWifi', description: 'High-speed internet' } }),
    prisma.amenity.create({ data: { name: 'Mini Bar', icon: 'FaCocktail', description: 'Complimentary minibar' } }),
  ]);

  // Create rooms
  const rooms = await Promise.all([
    prisma.room.create({
      data: {
        name: 'Deluxe Ocean View',
        slug: 'deluxe-ocean-view',
        description: 'Spacious room with stunning ocean views',
        basePrice: 250,
        maxGuests: 2,
        size: 45,
        bedType: 'King',
        imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
        images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32'],
        inventory: { create: { totalRooms: 10 } },
      },
    }),
    prisma.room.create({
      data: {
        name: 'Premium Suite',
        slug: 'premium-suite',
        description: 'Luxurious suite with living area',
        basePrice: 450,
        maxGuests: 4,
        size: 75,
        bedType: 'King',
        imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427'],
        inventory: { create: { totalRooms: 5 } },
      },
    }),
  ]);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Run seed:
```bash
npx tsx prisma/seed.ts
```

## Prisma Studio (Database GUI)

View and edit your database:
```bash
npx prisma studio
```

Opens at http://localhost:5555

## API Endpoints Created

- `GET /api/rooms` - List all rooms
- `POST /api/rooms` - Create room (admin)
- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/[id]` - Get booking details
- `PATCH /api/bookings/[id]` - Update booking
- `DELETE /api/bookings/[id]` - Cancel booking
- `GET /api/availability` - Check room availability
- `POST /api/users` - Create user

## Next Steps

1. **Set up authentication** (NextAuth.js recommended)
2. **Add payment integration** (Stripe)
3. **Implement admin dashboard**
4. **Add email notifications** (Resend or SendGrid)
5. **Deploy database** (Supabase/Railway + Vercel)

## Troubleshooting

**Migration fails?**
```bash
npx prisma migrate reset
npx prisma migrate dev
```

**Client not updated?**
```bash
npx prisma generate
```

**Connection issues?**
- Check DATABASE_URL format
- Verify PostgreSQL is running
- Check firewall/network settings
