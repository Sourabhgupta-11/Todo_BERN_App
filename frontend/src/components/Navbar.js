import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("walletAddress");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h3>Todo 3.0</h3>
      </div>

      <div className="nav-right">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/create">Create</NavLink>
        <NavLink to="/view">View</NavLink>
        <NavLink to="/update">Update</NavLink>
        <NavLink to="/delete">Delete</NavLink>

        <span className="nav-divider" />

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
