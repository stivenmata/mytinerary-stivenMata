import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 
import { Outlet, useLocation } from "react-router-dom";
import HeroSection from "../components/HeroSection";

const Layout1 = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {location.pathname === "/" && <HeroSection />}
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout1;
