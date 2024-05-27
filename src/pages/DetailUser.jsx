import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailUser = () => {
  const param = useParams();
  // console.log(param.id);

  const [user, setUser] = useState({});

  const getDetailUser = async () => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users/${param.id}`
      );
      // console.log(response.data.data);
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailUser();
  }, []);

  return (
    <div>
      <h1>Detail User Page</h1>

      <div>
        <img src={user.avatar} alt="" />
        <h1>{`${user.first_name} ${user.last_name}`}</h1>
        <h1>{user.email}</h1>
      </div>
    </div>
  );
};

export default DetailUser;
