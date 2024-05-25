import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      //   console.log(error.response);
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {token && <p>Login Success</p>}

      {error && <p>{error}</p>}
      <div>
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
      </div>
      <div>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
