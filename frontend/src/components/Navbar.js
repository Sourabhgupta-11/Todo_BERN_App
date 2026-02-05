import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h3>Todo DApp</h3>

      <div className="nav-links">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/create">Create Task</NavLink>
        <NavLink to="/view">View Tasks</NavLink>
        <NavLink to="/update">Update Task</NavLink>
        <NavLink to="/delete">Delete Task</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
