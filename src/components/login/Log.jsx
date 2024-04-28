import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiAccountCircleFill } from "react-icons/ri";
import { BsEye} from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import './log.css';

const Log = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State variable to track password visibility

  const sanitizeInput = (input) => {
    let sanitizedInput = input.trim();
    sanitizedInput = sanitizedInput
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
    return sanitizedInput;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sanitizedFormData = {
      username: sanitizeInput(formData.username),
      password: sanitizeInput(formData.password),
    };


    const isSafeInput = Object.values(formData).every(
      (value) => typeof value === "string"
    );

    if (!isSafeInput) {
      console.error("Input validation failed: Non-string values detected.");
      window.alert("Input validation failed: Non-string values detected.");
      return;
    }

    fetch("https://bill-server-hiq9.onrender.com/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sanitizedFormData),
    })
    .then((response) => {
      if (!response.ok) {
        alert("Invalid Username or Password");
      }
      console.log(response); // Log the JWT cookie
      return response.json();
    })
      .then((data) => {
        console.log(data);
        if (data === "Invalid username And Password") {
          window.alert("Invalid username And Password");
          console.log("Invalid username And Password");
          return;
        } else {
          if (data.username) {
            // Assuming the username is returned in the response
            window.alert("Login successful! Welcome, " + data.username);
            setIsLogin(true);
            window.location.href = '/admin';
            localStorage.setItem('jwtToken',data.jwtToken);
            localStorage.setItem('username',data.username);
            // console.log(localStorage.getItem('jwtToken'));
          } else {
            console.error("Invalid username And Password");
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <h1 className="display-4 text-white text-center fw-bold fst-italic">Bill Management System</h1>
      {isLogin ? (
        window.location.href = '/admin'
      ) : null}

      {!isLogin && (
        <div className=" justify-content-center d-flex flex-column p-5 rounded-2 siva">
          <h1 className="text-center signup">
            <RiAccountCircleFill className="icon" /> Sign In
          </h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <MdEmail className="me-2 username" />
              <label
                htmlFor="exampleInputEmail1"
                className="p-3 pt-3 pb-3 form-label username"
              >
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                name="username"
                aria-describedby="emailHelp"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div id="emailHelp" className="pt-2 form-text text-white">
                We'll never share your username with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <RiLockPasswordFill className="me-2 text-white" />
              <label
                htmlFor="exampleInputPassword1"
                className="p-3 pb-3 pt-3 text-white form-label"
              >
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaRegEye className="text-white" />
                  ) : (
                    <BsEye className="text-white" />
                  )}
                </button>
              </div>
            </div>
            <div className="justify-content-between d-flex">
              <button type="submit" className="btn btn-outline-primary ms-auto me-auto mt-5">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Log;
