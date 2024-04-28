
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./upload.css";
import { app, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Sidebar from '../navbar/Sidebar';
import { BrowserRouter as Router ,useNavigate } from "react-router-dom";

function Upload() {

  const isLoggedIn = localStorage.getItem('jwtToken') !==null;
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/');
      return;
    }
  },[])

  const [billFile, setBillFile] = useState(null);
  const [billName, setBillName] = useState("");
  const [billCategory, setBillCategory] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imgPerc, setImgPerc] = useState(0);
  const [imgLink, setImgLink] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [showSpinner, setShowSpinner] = useState(false);
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const uploadFile = (file) => {
    const fileName = `${year}-${month}-${date}-${hours}-${minutes}-${seconds}`;
    const storageRef = ref(storage, "images/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
        console.log("An error occurred:", error.code);
        setErrorMessage("Failed to upload file. Please try again later.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("DownloadURL:", downloadURL);
          setImgLink(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    billFile && uploadFile(billFile);
  }, [billFile]);

  const billCategories = ["hospitality", "infra", "food"];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBillFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!billName || !billCategory || !billAmount) {
      setErrorMessage("All fields are required");
      return;
    }

    if (!billCategories.includes(billCategory)) {
      setErrorMessage("Invalid bill category");
      return;
    }

    if (!imgLink) {
      setErrorMessage("Please upload a bill image");
      return;
    }

    try {
      setShowSpinner(true); 
      setIsSubmitting(true); 
      let formData = new FormData();
      formData.append("file", billFile);
      formData.append("name", billName.trim());
      formData.append("category", billCategory);
      formData.append("amount", parseFloat(billAmount));
      formData.append("username", localStorage.getItem("username"));
      formData.append("imgLink", imgLink);

      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        "https://bill-server-hiq9.onrender.com/user/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBillName("");
      setBillCategory("");
      setBillAmount("");
      setErrorMessage("");
      toast.success("Bill submitted successfully!");
      setTimeout(()=>{
        window.location.reload();
      },5000)
    } catch (error) {
      console.error(
        "Error uploading file:",
        error.response ? error.response.data.error : error.message
      );
      setErrorMessage("Failed to upload file. Please try again later.");
    } finally {
      setShowSpinner(false); 
      setIsSubmitting(false);
    }
  };

  return (
    <>
    {
      localStorage.getItem('jwtToken') && (<>
        <Sidebar />
        <div className="container">
          <div>
              <div className='container-lg'>
                <div className="upload-outer-div container-sm accordion w-auto">
                  <h1 id="upload-heading" className="mt-2 mb-5 fw-bold">
                    Upload Bill
                  </h1>
                  {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                  <form className="fs-4" onSubmit={handleSubmit}>
                    <div className="row mb-4 fs-4">
                      <label className="m-2 col-11 col-sm-6 col-md-6">Bill Name:</label>
                      <input
                        className="ms-3 d-inline col-11 col-sm-6 col-md-6"
                        type="text"
                        value={billName}
                        onChange={(e) => setBillName(e.target.value)}
                      />
                    </div>
                    <div className="row mb-4 fs-4">
                      <label className="m-2 col-11 col-sm-6 col-md-6">
                        Bill Category:
                      </label>
                      <select
                        className="ms-3 col-11 col-sm-6 col-md-6"
                        value={billCategory}
                        onChange={(e) => setBillCategory(e.target.value)}
                      >
                        <option value="">Select Bill Category</option>
                        {billCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="row mb-4 fs-4">
                      <label className="m-2 col-11 col-sm-6 col-md-6">Bill Amount:</label>
                      <input
                        className="ms-3 col-11 col-sm-6 col-md-6"
                        type="text"
                        value={billAmount}
                        onChange={(e) => setBillAmount(e.target.value)}
                      />
                    </div>
                    <div className="">
                      <label className="m-2">Upload Bill:</label>
                      {imgPerc && "Uploading: " + imgPerc + "%"}
                      <input
                        className="m-4 me-0 w-75"
                        type="file"
                        accept="image/*, image/jpg, image/png"
                        onChange={handleFileChange}
                        capture="environment" // Add capture attribute to open camera on mobile
                      />
                    </div>
                    <button className="buttn px-3" type="submit" disabled={isSubmitting}>
                      {showSpinner ? ( // Show spinner when submitting
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        isSubmitting ? "Submitting..." : "Submit"
                      )}
                    </button>
                  </form>
                </div>
                <ToastContainer />
              </div>
          </div>
        </div>
      </>)
    }
    </>
  );
}
export default Upload;