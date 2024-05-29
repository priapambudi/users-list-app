import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SignUpImg from "../assets/sign_up.svg";
import Logo from "../assets/logo.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async () => {
    const payload = {
      email: username,
      password: password,
    };
    try {
      const response = await axios.post(
        "https://reqres.in/api/register",
        payload
      );
      //   console.log(response.data.token);
      setToken(response.data.token);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      //   console.log(error);
      setError(error.response.data.error);
    }
  };
  return (
    <div>
      <div className="relative flex flex-col items-center justify-center m-6 space-y-8 shadow-2xl rounded-3xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <Link to={"/"}>
            <img src={Logo} alt="" />
          </Link>
          <span className="mb-3 text-4xl font-bold">Sign Up</span>
          <span className="mb-4 font-light text-gray-400">
            Welcome, let's get started
          </span>

          {token && (
            <p className="p-2 font-semibold bg-green-400 rounded-lg">
              Registered Successfully
            </p>
          )}
          {error && (
            <p className="p-2 font-semibold bg-red-400 rounded-lg">{error}</p>
          )}
          <div className="py-3">
            <span className="mb-2 text-base">Username</span>
            <input
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              type="text"
              placeholder="username"
              id="username"
              value={username}
              onChange={handleChangeUsername}
            />
          </div>

          <div className="py-3">
            <span className="mb-2 text-base">Password</span>
            <input
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              type="password"
              placeholder="password"
              id="password"
              value={password}
              onChange={handleChangePassword}
            />
          </div>

          <button
            className="w-full p-2 mb-6 text-white bg-black rounded-lg hover:bg-white hover:border hover:text-black hover:border-gray-300"
            onClick={handleRegister}
          >
            Register
          </button>

          <div className="text-center text-gray-400">
            Already have an account?{" "}
            <Link to={"/login"} className="font-semibold text-black">
              Sign In
            </Link>
          </div>
        </div>
        <div className="relative py-10">
          <img
            src={SignUpImg}
            alt="signup"
            className="w-[500px] h-[500px] hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
