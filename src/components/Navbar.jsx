
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());  
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");  
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-purple-900 text-white py-3 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4">
        <NavLink to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
          <svg width="35" height="35" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="url(#gradient)" />
            <text x="50%" y="55%" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">M</text>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#FFD700" />
                <stop offset="1" stopColor="#FF8C00" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-lg font-semibold hidden md:block">MyTinerary</span>
        </NavLink>

        <button
          className="md:hidden text-white focus:outline-none z-50 transition-transform hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <div className="hidden md:flex gap-5 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md text-md transition-all duration-300 ${
                isActive ? "bg-white text-black shadow-md" : "hover:bg-white/20"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/cities"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md text-md transition-all duration-300 ${
                isActive ? "bg-white text-black shadow-md" : "hover:bg-white/20"
              }`
            }
          >
            Cities
          </NavLink>

          {!isAuthenticated ? (
            <button
              className="bg-yellow-400 text-black font-semibold px-4 py-1 rounded-md hover:bg-yellow-500 transition-transform transform hover:scale-105"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <button
              className="bg-red-400 text-black font-semibold px-4 py-1 rounded-md hover:bg-red-500 transition-transform transform hover:scale-105"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-14 left-0 right-0 bg-black/90 text-white rounded-b-lg shadow-lg z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        } origin-top`}
      >
        <div className="flex flex-col items-center py-3 space-y-2">
          <NavLink
            to="/"
            className="text-md py-2 w-full text-center hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/cities"
            className="text-md py-2 w-full text-center hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Cities
          </NavLink>

          {!isAuthenticated ? (
            <>
              <button
                className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded-md hover:bg-yellow-500 w-3/4"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/login");
                }}
              >
                Login
              </button>
              
            </>
          ) : (
            <button
              className="bg-red-400 text-black font-semibold px-5 py-2 rounded-md hover:bg-red-500 w-3/4"
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
