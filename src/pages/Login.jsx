import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SignInImg from "../assets/sign_in.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    // console.log(e.target);
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    // console.log(e.target);
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const payload = {
      email: username,
      password: password,
    };

    try {
      const response = await axios.post("https://reqres.in/api/login", payload);
      //   console.log(response.data.token);
      setToken(response.data.token);
      console.log(response.data);
      localStorage.setItem("access_token", response.data.token);
      localStorage.setItem("username", username);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      //   console.log(error.response);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="">
      <div className="relative flex flex-col items-center justify-center m-6 space-y-8 shadow-2xl rounded-3xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Sign In</span>
          <span className="mb-4 font-light text-gray-400">
            Please enter your details
          </span>
          {token && <p>Login Success</p>}

          {error && <p>{error}</p>}
          <div className="py-3">
            <span className="mb-2 text-md">Username</span>
            <input
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              type="text"
              placeholder="username"
              onChange={handleChangeUsername}
            />
          </div>

          <div className="py-3">
            <span className="mb-2 text-md">Password</span>
            <input
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              type="password"
              placeholder="password"
              onChange={handleChangePassword}
            />
          </div>
          <button
            className="w-full p-2 mb-6 text-white bg-black rounded-lg hover:bg-white hover:text-black hover:border hover:border-gray-300"
            onClick={handleLogin}
          >
            Sign in
          </button>

          <div className="text-center text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-black">
              Sign up for free
            </Link>
          </div>
        </div>
        <div className="relative py-10">
          <img
            src={SignInImg}
            alt="signin"
            className="w-full h-[500px] hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

{
  /* <div>
        <label htmlFor="">Username</label>
        <input
          type="text"
          placeholder="username"
          onChange={handleChangeUsername}
        />

        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="password"
          onChange={handleChangePassword}
        />
        <button onClick={handleLogin}>Login</button>
      </div> */
}
