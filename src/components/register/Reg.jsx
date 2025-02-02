import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiAccountCircleFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import axios from "axios";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";

const AddUser = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
        "https://bill-server-hiq9.onrender.com/admin/register",
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
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while registering.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="px-4 py-3 rounded-2 siva h-100">
        <h1 className="text-center text-white">
          <RiAccountCircleFill /> Register New Admin
        </h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <MdEmail className="text-white" />
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-white"
              style={{marginLeft:'12px'}}
            >
              Admin Name
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
            <div id="emailHelp" className="form-text text-white pt-1 pb-1">
              We'll never share your username with anyone else.
            </div>
          </div>
          <div className="mb-4">
            <RiLockPasswordFill className="text-white" />
            <label
              htmlFor="exampleInputPassword1"
              className="form-label text-white pt-1 pb-1"
              style={{marginLeft:'12px'}}
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
          <div className="mb-3">
            <GiConfirmed className="text-white" />
            <label
              htmlFor="exampleInputConfirmPassword1"
              className="form-label text-white "
              style={{marginLeft:'12px'}}
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
          <div className="justify-content-center d-flex ps-auto pe-auto mb-2 pt-3">
            <button
              type="submit"
              className="btn btn-outline-primary ms-auto me-auto"
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
    </>
  );
};

export default AddUser;
