import React from 'react';
import logo from '../assets/movielogo.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

function Navbar() { 

  const location = useLocation()
  console.log(location)
  return (
    <nav className="flex space-x-8 items-center pl-3 py-4">
      <img height="70px" width="70px" src={logo} alt="Movie Logo" />
      <Link to="/" className="text-blue-500 text-2xl font-bold" style={{color:(location.pathname==="/") ? 'skyblue' : ''}}> Movies</Link>
      <Link to="/watchlist" className="text-blue-500 text-2xl font-bold" style={{color:(location.pathname==="/watchlist") ? 'skyblue' : ''}}> WatchList</Link>
      {/* <Link to="/recommend" className="text-blue-500 text-2xl font-bold" style={{color:(location.pathname==="/recommend") ? 'skyblue' : ''}}>Movies Recommendations</Link> */}
    </nav>
  );
}

export default Navbar