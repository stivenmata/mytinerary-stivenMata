// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  
  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false);
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  
  const ProfilePicture = ({ onClick }) => {
    
    const hasValidPhoto = user && user.photo && user.photo.startsWith('http');
    
    return (
      <>
        {hasValidPhoto ? (
          <img
            src={user.photo}
            alt={`${user.name}'s profile`}
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:ring-2 hover:ring-yellow-400 object-cover"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          />
        ) : (
          <div 
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:ring-2 hover:ring-yellow-400 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <User size={20} color="white" />
          </div>
        )}
      </>
    );
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
          <NavLink to="/" className={({ isActive }) =>
            `px-3 py-1 rounded-md text-md transition-all duration-300 ${
              isActive ? "bg-white text-black shadow-md" : "hover:bg-white/20"
            }`}>
            Home
          </NavLink>
          <NavLink to="/cities" className={({ isActive }) =>
            `px-3 py-1 rounded-md text-md transition-all duration-300 ${
              isActive ? "bg-white text-black shadow-md" : "hover:bg-white/20"
            }`}>
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
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <ProfilePicture onClick={() => setDropdownOpen(!dropdownOpen)} />
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="font-semibold">{user?.name} {user?.lastName}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-500"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-14 left-0 right-0 bg-black/90 text-white rounded-b-lg shadow-lg z-40 transition-all duration-300 ${
        isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
      } origin-top`}>
        <div className="flex flex-col items-center py-3 space-y-2">
          <NavLink to="/" className="text-md py-2 w-full text-center hover:bg-gray-700" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/cities" className="text-md py-2 w-full text-center hover:bg-gray-700" onClick={() => setIsOpen(false)}>
            Cities
          </NavLink>

          {!isAuthenticated ? (
            <button
              className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded-md hover:bg-yellow-500 w-3/4"
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
            >
              Login
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2 py-3">
              {user?.photo && user.photo.startsWith('http') ? (
                <img
                  src={user.photo}
                  alt={`${user?.name}'s profile`}
                  className="w-16 h-16 rounded-full border-2 border-white object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full border-2 border-white bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <User size={28} color="white" />
                </div>
              )}
              <p className="text-white font-medium">{user?.name} {user?.lastName}</p>
              <button
                className="bg-red-500 text-white font-semibold px-5 py-2 rounded-md hover:bg-red-600 w-3/4 flex items-center justify-center gap-2"
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;