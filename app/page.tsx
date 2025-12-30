import Hero from "@/components/Hero";
import BookingBar from "@/components/BookingBar";
import Features from "@/components/Features";
import Rooms from "@/components/Rooms";
import Offers from "@/components/Offers";
import Dining from "@/components/Dining";
import Activities from "@/components/Activities";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Booking from "@/components/Booking";

export default function Home() {
  return (
    <>
      <Hero />
      <BookingBar />
      <Features />
      <Rooms />
      <Offers />
      <Dining />
      <Activities />
      <Gallery />
      <Testimonials />
      <Newsletter />
      <Booking />
    </>
  );
}
