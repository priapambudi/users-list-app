import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      <h1>Register</h1>
      {token && <p>Registered Successfully</p>}
      {error && <p>{error}</p>}
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleChangeUsername}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handleChangePassword}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;
