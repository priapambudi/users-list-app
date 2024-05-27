import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("access_token");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");

    setTimeout(() => {
      navigate("/");
    });
  };
  return (
    <div>
      <h1>List User App</h1>
      <Link to="/">
        <h1>Home</h1>
      </Link>

      {token && <h1>Hai, {username}!</h1>}

      {!token && (
        <Link to="/login">
          <h1>Sign In</h1>
        </Link>
      )}

      {!token && (
        <Link to="/register">
          <h1>Sign Up</h1>
        </Link>
      )}

      {token && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default Navbar;
