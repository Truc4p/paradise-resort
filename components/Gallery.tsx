'use client';

import { useState } from 'react';
import Image from 'next/image';

const images = [
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070',
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070',
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Explore Our Paradise</h2>
          <p className="section-subtitle">
            A glimpse into the beauty that awaits you
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative h-64 cursor-pointer overflow-hidden rounded-lg group"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full max-w-5xl h-[80vh]">
              <Image
                src={selectedImage}
                alt="Selected image"
                fill
                className="object-contain"
              />
            </div>
            <button 
              className="absolute top-4 right-4 text-white text-4xl hover:text-primary-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
