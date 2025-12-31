# Quick Setup Guide

## 🚀 Getting Started with the Improved Resort App

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Git

### Step 1: Environment Setup

1. **Copy the environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Update `.env` with your actual values:**
   ```env
   # Your PostgreSQL connection string
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
   
   # Generate a secure secret (run this command):
   # openssl rand -base64 32
   NEXTAUTH_SECRET="your-generated-secret-here"
   
   NEXTAUTH_URL="http://localhost:3002"
   
   # Set admin credentials
   ADMIN_EMAIL="admin@resort.com"
   ADMIN_PASSWORD="your-secure-password"
   ```

### Step 2: Database Setup

1. **Install Prisma and generate client:**
   ```bash
   npm install
   npx prisma generate
   ```

2. **Run migrations:**
   ```bash
   npx prisma migrate dev
   ```

3. **Seed the database:**
   ```bash
   npm run seed
   ```

### Step 3: Run the Application

**Development mode:**
```bash
npm run dev
```

Visit [http://localhost:3002](http://localhost:3002)

**Production build:**
```bash
npm run build
npm start
```

## 🔐 Authentication

### For Users:
- Register at `/api/users` (POST request)
- Login using NextAuth credentials provider

### For Admin:
- Navigate to `/admin/login`
- Use the credentials from your `.env` file

## 📚 API Endpoints

### Public Endpoints:
- `GET /api/rooms` - List all rooms with availability
- `POST /api/users` - User registration

### Protected Endpoints (require authentication):
- `GET /api/users` - Get current user profile
- `GET /api/bookings` - List user's bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/[id]` - Get specific booking
- `PATCH /api/bookings/[id]` - Update booking status
- `DELETE /api/bookings/[id]` - Cancel booking

### Admin Routes:
- `/admin` - Dashboard
- `/admin/rooms` - Manage rooms
- `/admin/bookings` - View all bookings

## 🧪 Testing the API

### Register a user:
```bash
curl -X POST http://localhost:3002/api/users \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123",
    "phone": "1234567890"
  }'
```

### Check room availability:
```bash
curl "http://localhost:3002/api/rooms?checkIn=2025-01-15&checkOut=2025-01-20"
```

### Create a booking (requires authentication):
```bash
curl -X POST http://localhost:3002/api/bookings \\
  -H "Content-Type: application/json" \\
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \\
  -d '{
    "userId": "USER_ID",
    "roomId": "ROOM_ID",
    "checkIn": "2025-01-15T14:00:00.000Z",
    "checkOut": "2025-01-20T11:00:00.000Z",
    "numberOfGuests": 2,
    "paymentMethod": "CREDIT_CARD"
  }'
```

## 🐛 Troubleshooting

### Database Connection Issues:
```bash
# Test connection
npx prisma db pull

# Reset database (⚠️ CAUTION: This deletes all data)
npx prisma migrate reset
```

### NextAuth Errors:
- Make sure `NEXTAUTH_SECRET` is set in `.env`
- Check that `NEXTAUTH_URL` matches your development URL
- Clear browser cookies and try again

### Build Errors:
```bash
# Clean build
rm -rf .next
npm run build
```

## 📖 What's New

See [IMPROVEMENTS.md](IMPROVEMENTS.md) for a complete list of all security and infrastructure improvements.

## 🔜 Next Steps

1. Integrate a payment gateway (Stripe recommended)
2. Set up email service for booking confirmations
3. Add comprehensive unit and integration tests
4. Implement rate limiting
5. Add user dashboard for managing bookings

## 🆘 Need Help?

Check the documentation:
- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/docs)
- [Zod](https://zod.dev/)

---

Happy coding! 🎉
