import React from "react";
import AddUser from "./AddUser";
import "./register.css";
import Sidebar from "../navbar/Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainAddUser = () => {
  const isLoggedIn = localStorage.getItem("jwtToken") !== null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);
  return (
    <>
      {localStorage.getItem("jwtToken") && (
        <div>
          <Sidebar />
          <div className="container-lg">
            <div className="row d-flex align-items-center justify-content-center vh-100 px-sm-2">
              <div className="col-lg-5 col-md-8 col-sm-12 mt-5">
                <AddUser />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainAddUser;
