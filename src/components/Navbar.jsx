import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../image/logo1.webp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-black text-white p-4 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} alt="MyTinerary Logo" className="h-14 md:h-16 w-auto" />
        </NavLink>

        {/* Botón del menú en móviles */}
        <button
          className="md:hidden text-white focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menú para pantallas grandes */}
        <div className="hidden md:flex gap-4 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded transition-colors duration-200 ${
                isActive ? "bg-gray-700" : "hover:bg-gray-600"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/cities"
            className={({ isActive }) =>
              `px-3 py-2 rounded transition-colors duration-200 ${
                isActive ? "bg-gray-700" : "hover:bg-gray-600"
              }`
            }
          >
            Cities
          </NavLink>
          <button
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-200"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="absolute top-14 left-0 right-0 bg-black/90 text-white rounded-b-lg shadow-lg z-40 transition-all duration-300">
          <div className="flex flex-col items-center py-4 space-y-3">
            <NavLink
              to="/"
              className="text-lg py-2 w-full text-center hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/cities"
              className="text-lg py-2 w-full text-center hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Cities
            </NavLink>
            <button
              className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-500 mt-2"
              onClick={() => {
                setIsOpen(false);
                navigate("*");
              }}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
