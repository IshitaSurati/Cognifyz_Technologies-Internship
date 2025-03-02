import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Internship Portal</Link>
        <div>
          <Link className="btn btn-light mx-2" to="/add-internship">Add Internship</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
