import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import HeroSection from "../components/HeroSection";

const Layout1 = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      {location.pathname === "/" && (
        <div className="overflow-hidden">
          <HeroSection />
        </div>
      )}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout1;
