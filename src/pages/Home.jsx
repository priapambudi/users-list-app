import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import DetailUser from "./DetailUser";
import ProtectedRoute from "../routes/ProtectedRoute";

Modal.setAppElement("#root");

const Home = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
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

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  return (
    <div className="h-full bg-slate-300">
      <Navbar />

      <div className="flex items-center justify-center mx-auto my-7 ">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 ">
          {data.map((item) => (
            <div className="bg-white shadow-lg rounded-xl" key={item.id}>
              <div className="flex flex-col p-5">
                <div className="overflow-hidden">
                  <img
                    className="w-52 h-52 rounded-xl"
                    src={item.avatar}
                    alt=""
                  />
                  <h3 className="mt-2 text-xl font-bold text-center">{`${item.first_name}`}</h3>

                  {/* <Link to={`user/${item.id}`}> */}
                  <button
                    onClick={() => openModal(item.id)}
                    className="w-full px-3 py-2 mt-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                  >
                    View Details
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-5 pb-7">
        <button
          className="px-3 py-2 bg-white rounded"
          onClick={handlePrev}
          disabled={pagination.currentPage === 1}
        >
          Prev
        </button>
        <p className="flex items-center">{`Page ${pagination.currentPage} of ${pagination.totalPage}`}</p>
        <button
          className="px-3 py-2 bg-white rounded"
          onClick={handleNext}
          disabled={pagination.currentPage === pagination.totalPage}
        >
          Next
        </button>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="User Details"
        className="absolute w-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg md:w-1/2 lg:w-1/3 top-1/2 left-1/2 h-1/2"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
      >
        {selectedUserId && (
          <ProtectedRoute>
            <DetailUser userId={selectedUserId} closeModal={closeModal} />
          </ProtectedRoute>
        )}
      </Modal>
    </div>
  );
};

export default Home;
