import React, { useState } from 'react';
import { BiSolidCategory } from "react-icons/bi";
import { IoMdContact } from "react-icons/io";
import { RiBillFill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { TbLogout2 } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import BillsPage from '../bills/bills-page/BillsPage';
import {NavLink} from 'react-router-dom';

import './Sidebar.css';
function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  function handleLogOut(){
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
  }
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`wrapper ${isExpanded ? 'expand' : ''}`}>
      <aside id="sidebar" className={isExpanded ? 'expand' : ''}>
        <div className="d-flex">
          <button className="toggle-btn" type="button" onClick={toggleSidebar}>
            <BiSolidCategory className='fs-1 text-white home-icon icons'/>
            <h5 className='mt-2 text-white'>Menu</h5>
          </button>
          <div className="sidebar-logo text-white fs-2">
            {localStorage.getItem('username')}
          </div>
        </div>
        <ul className={`sidebar-nav ${isExpanded ? 'd-inline' : 'd-none s-sm-inline'}`}>
          <li className="sidebar-item mt-3">
            <NavLink to="/admin" className="sidebar-link">
            <GoHomeFill className='fs-4 text-white'/>
              <span className='ms-3'>Home</span>
            </NavLink>
          </li>
          <li className="sidebar-item mt-3">
            <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
              data-bs-target="#bill" aria-expanded="false" aria-controls="bill">
              <RiBillFill className='fs-4 text-white'/>
              <span className='ms-3'>Bills</span>
            </a>
            <ul id="bill" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
              <li className="sidebar-item mt-3">
                <NavLink to="/upload" className="sidebar-link">Upload Bill</NavLink>
              </li>
              <li className="sidebar-item mt-3">
                <NavLink to="/admin/bills" className="sidebar-link">
                  <span className='fs-6'>All Bills</span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="sidebar-item mt-3">
            <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
              data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
              <IoMdContact className='fs-3 text-white icons'/>
              <span className='ms-3'>Auth</span>
            </a>
            <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
              <li className="sidebar-item mt-3">
                <NavLink to="/admin/addUser" className="sidebar-link">Register User</NavLink>
              </li>
              <li className="sidebar-item mt-3">
                <NavLink to="/admin/addAdmin" className="sidebar-link">Register Admin</NavLink>
              </li>
            </ul>
          </li>
          <li className="sidebar-item mt-3">
            <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
              data-bs-target="#dash" aria-expanded="false" aria-controls="dash">
              <MdDashboard className='fs-3 text-white icons'/>
              <span className='ms-3'>DashBoard</span>
            </a>
            <ul id="dash" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
              <li className="sidebar-item mt-3">
                <NavLink to="/admin/users" className="sidebar-link">User Stats</NavLink>
              </li>
              <li className="sidebar-item mt-3">
                <a href="#" className="sidebar-link">Category Stats</a>
              </li>
            </ul>
          </li>
          <li className="sidebar-item mt-3">
            <a href="#" className="sidebar-link">
              <i className="lni lni-popup"></i>
              <span className='ms-3'>Notification</span>
            </a>
          </li>
          <li className="sidebar-item mt-3">
            <a href="#" className="sidebar-link">
              <i className="lni lni-cog"></i>
              <span className='ms-3'>Setting</span>
            </a>
          </li>
        </ul>
        <div className={`sidebar-footer mb-3 wrapper ${isExpanded ? '' : 'd-none'}`} onClick={handleLogOut}>
          <NavLink to='/login' className='text-white ms-4 mb-3 fs-6'>
              <TbLogout2 className='fs-3 text-white icons'/>
              <span className='text-white ms-4 fs-6'> LogOut</span>
          </NavLink>
        </div>
      </aside>
      {/* <div className="main p-3">
        <div className="text-center">
          <BillsPage />
        </div>
      </div> */}
    </div>
  );
}

export default Sidebar;
