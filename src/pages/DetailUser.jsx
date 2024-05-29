import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";

const DetailUser = ({ userId, closeModal }) => {
  // const param = useParams();
  // console.log(param.id);

  const [user, setUser] = useState({});

  const getDetailUser = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${userId}`);
      // console.log(response.data.data);
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getDetailUser();
  // }, []);

  useEffect(() => {
    if (userId) {
      getDetailUser();
    }
  }, [userId]);

  return (
    <div className="">
      <div className="p-4 bg-white rounded-lg">
        <button onClick={closeModal} className="absolute top-2 right-2">
          <X />
        </button>
        <div>
          <h1 className="mb-5 text-2xl text-center">Detail User</h1>

          <div className="flex flex-col justify-center gap-5 md:flex-row md:items-start">
            <img src={user.avatar} alt="" />
            <div className="flex flex-col justify-center gap-2">
              <h1>{`Name: ${user.first_name} ${user.last_name}`}</h1>
              <h1>{`Email: ${user.email}`}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
