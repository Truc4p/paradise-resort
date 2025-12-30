# Paradise Resort Website

A modern, luxury resort website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🏖️ Beautiful hero section with animations
- 🏨 Room listings with pricing and features
- 🍽️ Restaurant and dining information
- 🖼️ Interactive image gallery
- 📝 Booking form
- 📱 Fully responsive design
- ⚡ Fast performance with Next.js
- 🎨 Modern UI with Tailwind CSS

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
resort/
├── app/
│   ├── layout.tsx       # Root layout with header/footer
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Footer with contact info
│   ├── Hero.tsx         # Hero banner section
│   ├── Features.tsx     # Amenities section
│   ├── Rooms.tsx        # Room listings
│   ├── Dining.tsx       # Restaurant section
│   ├── Gallery.tsx      # Image gallery
│   └── Booking.tsx      # Booking form
└── public/              # Static assets
```

## Customization

- Update resort name in `components/Header.tsx`
- Change colors in `tailwind.config.ts`
- Replace images with your own in components
- Add more pages in the `app/` directory

## Next Steps

- Add a backend API for bookings
- Integrate with a payment system
- Connect to a CMS for content management
- Add multi-language support
- Implement room availability calendar
- Add Google Maps integration

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons

## License

MIT
