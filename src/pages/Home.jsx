import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
  });
  const getData = async () => {
    try {
      const res = await axios.get(
        `https://reqres.in/api/users?page=${pagination.currentPage}`
      );
      // console.log(res.data.data);
      setData(res.data.data);

      const pageInfo = {
        totalPage: res.data.total_pages,
        currentPage: res.data.page,
        perPage: res.data.per_page,
      };

      setPagination(pageInfo);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [pagination.currentPage]);

  const handleNext = () => {
    setPagination({
      ...pagination,
      currentPage: pagination.currentPage + 1,
    });
  };

  const handlePrev = () => {
    setPagination({
      ...pagination,
      currentPage: pagination.currentPage - 1,
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        {data.map((item) => (
          <Link to={`user/${item.id}`} className="card" key={item.id}>
            <div className="image">
              <img src={item.avatar} alt="" />
            </div>
            <div className="info">
              <h3>{`Name : ${item.first_name} ${item.last_name}`}</h3>
              <p>{`Email : ${item.email}`}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrev} disabled={pagination.currentPage === 1}>
          Prev
        </button>
        <p>{`Page ${pagination.currentPage} of ${pagination.totalPage}`}</p>
        <button
          onClick={handleNext}
          disabled={pagination.currentPage === pagination.totalPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
