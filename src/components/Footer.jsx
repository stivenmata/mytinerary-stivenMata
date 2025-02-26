import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-lg font-bold">Contact Us</h2>
          <p>123 Street, City</p>
          <p>Email: stivensifontesm@gmail.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>

        
        <div className="flex flex-col md:flex-row md:max-w-[60%] w-full md:justify-between space-y-4 md:space-y-0">
          
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-lg font-bold">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-4">
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
            <nav className="flex justify-center md:justify-start space-x-4">
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
