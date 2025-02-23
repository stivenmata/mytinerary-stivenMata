const Footer = () => {
    return (
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold">Contact Us</h2>
            <p>123 Street, City</p>
            <p>Email: contact@mytinerary.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="mt-4 md:mt-0">
            <h2 className="text-lg font-bold">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">📘 Facebook</a>
              <a href="#" className="hover:text-gray-400">📷 Instagram</a>
              <a href="#" className="hover:text-gray-400">🐦 Twitter</a>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <h2 className="text-lg font-bold">Navigation</h2>
            <nav className="flex flex-col space-y-2">
              <a href="/" className="hover:text-gray-400">Home</a>
              <a href="/cities" className="hover:text-gray-400">Cities</a>
              <a href="/login" className="hover:text-gray-400">Login</a>
            </nav>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  