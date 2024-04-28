import React from "react";
import AddUser from "./AddUser";
import './register.css';
import Sidebar from "../navbar/Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainAddUser = () => {
  const isLoggedIn = localStorage.getItem('jwtToken') !==null;
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/');
      return;
    }
  },[]);
  return (
    <>
      {localStorage.getItem('jwtToken') && (
        <div>
          <Sidebar />
          <div className="container-lg">
            <div className="row justify-content-center align-content-center align-items-center ">
              <div className="col-lg-6 col-md-6 col-sm-12 mt-1">
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
