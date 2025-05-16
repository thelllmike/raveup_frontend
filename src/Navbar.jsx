import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  
  const login = () => {
    navigate('/login');
  };
  
  // Determine if we're on the home page to set the background
  const isHomePage = location.pathname === '/';
  
  // Determine which username to show based on the route
  const isProfilePage = location.pathname === '/profile';
  const username = isProfilePage ? "AYESH" : "ADMIN";
  
  // Should we show the username instead of login button?
  const showUsername = isProfilePage || (location.pathname !== '/' && location.pathname !== '/login');
  
  // Set the background style based on route
  const navbarBgClass = isHomePage 
    ? "bg-blue/40" // Home page - white with 20% opacity
    : "bg-blue/80"; // Other pages - solid blue   
  
  return (
    <nav className={`${navbarBgClass} text-white flex justify-between items-center p-4`}>
      <div className="flex items-center">
        <Link className="text-2xl font-bold" to="/">
          <img src="./logo.png" alt="RevUp Logo" className='w-auto h-12'/>
        </Link>
      </div>
      
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-[#E21518]">HOME</Link>
        <Link to="/schedule" className="hover:text-[#E21518]">SCHEDULE</Link>
        <Link to="/tracking" className="hover:text-[#E21518]">LIVE TRACKING</Link>
        <Link to="/leaderboard" className="hover:text-[#E21518]">LEADERBOARD</Link>
      </div>
      
      {showUsername ? (
        <div className="border border-white px-4 py-2 rounded-full">
          {username}
        </div>
      ) : (
        <button
          onClick={login}
          className="border border-white px-4 py-2 rounded-full hover:bg-[#E21518] transition"
        >
          LOGIN
        </button>
      )}
    </nav>
  );
};

export default Navbar;