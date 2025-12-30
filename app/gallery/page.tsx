import Gallery from "@/components/Gallery";

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Gallery</h1>
          <p className="text-xl md:text-2xl">Visual journey through paradise</p>
        </div>
      </section>

      <Gallery />

      {/* Virtual Tour CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience a Virtual Tour</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our resort from the comfort of your home with our interactive 360° virtual tour
          </p>
          <button className="bg-white text-primary-600 font-bold px-10 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl">
            Start Virtual Tour
          </button>
        </div>
      </section>
    </div>
  );
}
