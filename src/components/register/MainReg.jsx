import React from "react";
import Reg from "./Reg";
import "./register.css";
import Sidebar from "../navbar/Sidebar";

const MainReg = () => {
  return (
    <div>
      <Sidebar />
      <div className="container-lg">
        <div className="row d-flex align-items-center justify-content-center vh-100">
          <div className="col-lg-6 col-md-10 col-sm-12 mt-5 pt-2 md-mt-0 md-pt-0">
            <Reg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainReg;
