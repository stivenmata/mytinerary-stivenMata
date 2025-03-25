import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 space-y-6 md:space-y-0">
        
        
        <div className="text-center md:text-left w-full md:w-1/3">
          <h2 className="text-lg font-bold">Contact Us</h2>
          <p>123 Street, City</p>
          <p>Email: stivensifontesm@gmail.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>

        
        <div className="w-full md:w-2/3 flex flex-col md:flex-row md:justify-between items-center md:items-start space-y-6 md:space-y-0">
          
          
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-lg font-bold">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-6">
              <a
                href="https://web.facebook.com/?_rdc=1&_rdr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                📘 Facebook
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                📷 Instagram
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                🐦 Twitter
              </a>
            </div>
          </div>

          
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-lg font-bold">Navigation</h2>
            <nav className="flex flex-col md:flex-row justify-center md:justify-start md:space-x-6 space-y-3 md:space-y-0">
              <NavLink to="/" className="hover:text-gray-400">Home</NavLink>
              <NavLink to="/cities" className="hover:text-gray-400">Cities</NavLink>
              <NavLink to="/login" className="hover:text-gray-400">Login</NavLink>
            </nav>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
