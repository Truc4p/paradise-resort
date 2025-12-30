import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      
      {/* Quick Links to Main Sections */}
      <section className="py-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="text-primary-600 font-semibold tracking-widest uppercase text-sm">Discover</span>
            </div>
            <h2 className="section-title">Explore Paradise Resort</h2>
            <p className="section-subtitle mt-6">
              Discover everything we have to offer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                title: 'Rooms & Suites', 
                image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070',
                description: 'Luxurious accommodations with ocean views',
                link: '/rooms'
              },
              { 
                title: 'Dining', 
                image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070',
                description: 'World-class restaurants and bars',
                link: '/dining'
              },
              { 
                title: 'Special Offers', 
                image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080',
                description: 'Exclusive packages and deals',
                link: '/offers'
              },
              { 
                title: 'Activities', 
                image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070',
                description: 'Recreation and entertainment',
                link: '/activities'
              },
              { 
                title: 'Gallery', 
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070',
                description: 'Visual tour of our paradise',
                link: '/gallery'
              },
              { 
                title: 'Contact', 
                image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=2070',
                description: 'Get in touch with us',
                link: '/contact'
              },
            ].map((section, index) => (
              <Link 
                key={index}
                href={section.link}
                className="group relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-10">
                  <h3 className="text-4xl font-bold text-white mb-3 tracking-tight">{section.title}</h3>
                  <p className="text-white/95 mb-6 text-lg font-light">{section.description}</p>
                  <span className="inline-flex items-center gap-3 text-white font-semibold group-hover:gap-5 transition-all text-lg tracking-wide">
                    Explore <span className="text-2xl">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </>
  );
}
