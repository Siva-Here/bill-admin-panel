import React from "react";
import Reg from "./Reg";
import "./register.css";
import Sidebar from "../navbar/Sidebar";

const MainReg = () => {
  return (
    <div>
      <Sidebar />
      <div className="container-lg">
        <div className="row justify-content-center align-content-center align-items-center ">
          <div className="col-lg-6 col-md-6 col-sm-12 mt-5 mt-sm-2 pt-5 mt-md-2">
            <Reg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainReg;
