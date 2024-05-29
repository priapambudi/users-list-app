import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const token = localStorage.getItem("access_token");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");

    setTimeout(() => {
      navigate("/");
    });
  };
  return (
    <div className="bg-white">
      <div className="flex justify-around py-4 px-auto">
        <div className="flex gap-3">
          <Link>
            <img width={30} height={30} src={Logo} alt="" />
          </Link>
          <span className="text-2xl ">List User App</span>
        </div>

        <div className="flex gap-4">
          <Link className="px-2 py-1" to="/">
            <h1>Home</h1>
          </Link>

          {token && (
            <h1 className="px-2 py-1">
              Welcome, <span className="font-bold">{username}</span>
            </h1>
          )}

          {!token && (
            <Link className="px-2 py-1 hover:text-zinc-400" to="/login">
              <h1>Sign In</h1>
            </Link>
          )}

          {!token && (
            <Link
              className="px-2 py-1 border border-black rounded-md hover:border-slate-300 hover:text-zinc-400"
              to="/register"
            >
              <h1>Sign Up</h1>
            </Link>
          )}

          {token && <button onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
