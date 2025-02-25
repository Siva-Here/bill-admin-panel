import React, { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiAccountCircleFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import axios from "axios";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify"; // Add ToastContainer here
import "react-toastify/dist/ReactToastify.css";
import "./register.css";

const AddUser = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    mobile:"",
    email:"",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    mobile: "",
    email: "",
  });

  const validateMobile = (mobile) => {
    if (!/^\d+$/.test(mobile)) {
      setErrors({ ...errors, mobile: "please enter digits only" });
    } else {
      setErrors({ ...errors, mobile: "" });
    }
  };

 
  

  // Email validation
  // const validateEmail = (email) => {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   if (!emailRegex.test(email)) {
  //     setErrors({ ...errors, email: "Invalid email format" });
  //   } else {
  //     setErrors({ ...errors, email: "" });
  //   }
  // };

  const validateEmail = (email) => {
    // Regex for email validation as per the given criteria
    const emailRegex = /^[nN]\d{6}@rguktn\.ac\.in$/;
    if (!emailRegex.test(email)) {
      setErrors({ ...errors, email: "please enter valid college mail" });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // validateMobile(formData.mobile);

    if(formData.mobile.length < 10){
      setErrors((prevErrors) => ({ ...prevErrors, mobile: "Mobile number must be 10 digits" }));
    setIsLoading(false);
    return; 
    }
    
    validateMobile(formData.mobile);
    

    validateEmail(formData.email);

    // Check for errors before submitting the form
    if (errors.mobile || errors.email) {
      setIsLoading(false);
      return;
    }

    const passwordRegex = /.*/;
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must be 8-10 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character."
      );
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      console.log(token);

      const response = await axios.post(
        "https://bill-server-hiq9.onrender.com/admin/addUser",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Registration successful!");
      setIsRegistered(true);
      setIsLoading(false);
      setFormData({
        username: "",
        mobile:"",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data);

      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="center-container  " >
      <div className="p-3  px-md-4 py-md-5 py-lg-3 rounded-2 sivah h-100 mt-3 mb-3 mt-md-0">
        <h1 className="text-center text-white">
          <RiAccountCircleFill /> Register Normal User
        </h1>
        <br />
        <form onSubmit={handleSubmit}>
          {/* Your form inputs */}
          <div className="mb-3">
            <MdEmail className="text-white" />
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-white"
              style={{marginLeft:'15px'}}
            >
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <div id="emailHelp" className="form-text text-white pt-2 pb-1">
              We'll never share your username with anyone else.
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <MdEmail className="text-white" />
            <label htmlFor="email" className="form-label text-white" style={{marginLeft:'15px'}}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              // onChange={handleChange}
              onChange={(e) => {
                handleChange(e);
                validateEmail(e.target.value); // Validate email on change
              }}
              required
            />
             {errors.email && (
                <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '5px' }}>
                  {errors.email}
                </div>
              )}
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            < FiPhone className="text-white" />
            <label htmlFor="mobile" className="form-label text-white" style={{marginLeft:'15px'}}>
              Mobile Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={(e) => {
                handleChange(e);
                validateMobile(e.target.value);
              }
              }
              maxLength={10}
              inputMode="numeric" // Ensures mobile keyboards show numbers
              pattern="[0-9]*"
              required
            />
             {errors.mobile && (
                <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '5px' }}>
                  {errors.mobile}
                </div>
              )}
          </div>

          <div className="mb-4">
            <RiLockPasswordFill className="text-white" />
            <label
              htmlFor="exampleInputPassword1"
              className="form-label text-white pb-1"
              style={{marginLeft:'15px'}}
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
                  <BsEyeSlash className="text-white" />
                ) : (
                  <BsEye className="text-white" />
                )}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <GiConfirmed className="text-white" />
            <label
              htmlFor="exampleInputConfirmPassword1"
              className="form-label text-white"
              style={{marginLeft:'15px'}}
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputConfirmPassword1"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="justify-content-center d-flex ps-auto pe-auto">
            <button
              type="submit"
              className="btn btn-outline-primary ms-auto me-auto mt-2 "
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default AddUser;
