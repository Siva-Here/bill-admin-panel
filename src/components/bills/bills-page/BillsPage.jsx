import React, { useState, useEffect, useContext } from "react";
import "./BillsPage.css";
import { BillContext } from "../../../App";
import Sidebar from "../../navbar/Sidebar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserTable() {
  let { data, setData } = useContext(BillContext);
  let [users, setUsers] = useState([]);
  let [sorted, setSorted] = useState(true);
  let [user, setUser] = useState("");
  const [reversedData, setReversedData] = useState([]);

  async function handleStatus(e, billId) {
    if (e.target.value == "pending") {
      return;
    }
    const acceptance = window.confirm(
      "The bill will be " +
        e.target.value.toUpperCase() +
        ". \nDo you want to continue?"
    );
    if (e.target.value === "deleted") {
      if (acceptance) {
        try {
          const token = localStorage.getItem("jwtToken");
          const response = await axios.delete(
            "https://bill-server-hiq9.onrender.com/admin/deleteBill",
            {
              data: { billId: billId },
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          let tempData = data.filter((data1) => data1._id !== billId);
          setData(tempData);
          toast.success("Bill deleted successfully!");
        } catch (error) {
          console.error("Error:", error);
        }
        return;
      }
    }

    if (acceptance) {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.post(
          "https://bill-server-hiq9.onrender.com/admin/changeStatus",
          { billId: billId, status: e.target.value },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Bill status changed successfully!");
        let tempData = [...data];
        for (let i = 0; i < tempData.length; i++) {
          if (tempData[i]._id == billId) {
            tempData[i].status = e.target.value;
            setData(tempData);
            return;
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      e.target.value = "pending";
    }
  }

  useEffect(() => {
    setReversedData([...data].reverse());
  }, [data]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          "https://bill-server-hiq9.onrender.com/admin/users",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let responseData = response.data;
        let arr = [];
        responseData.forEach((user) => {
          console.log(user.username);
          arr.push(user.username);
        });
        setUsers(arr);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          "https://bill-server-hiq9.onrender.com/admin/fetchAllBills",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.bills);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const [text, setText] = useState("");
  const [status, setStatus] = useState("All Bills");
  const [selectedImage, setSelectedImage] = useState(null);
  let pending = 0;
  let accepted = 0;
  let rejected = 0;
  let pendingBill = 0;
  let acceptedBill = 0;
  let rejectedBill = 0;

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function calculateBills() {
    reversedData.forEach((data1) => {
      if (data1.status == "pending") {
        pending += 1;
        pendingBill += data1.amount;
      } else if (data1.status == "accepted") {
        accepted += 1;
        acceptedBill += data1.amount;
      } else if (data1.status == "rejected") {
        rejected += 1;
        rejectedBill += data1.amount;
      }
    });
  }
  calculateBills();

  const handleImageClick = (image) => {
    console.log("Image clicked:", image);
    setSelectedImage(image);
  };
  return (
    <div className="mt-5">
      <Sidebar />
      <div>
        <h1 className="text-white ms-auto text-center flex-1">All Bills</h1>
        <br />
        <hr />
        <div className="container-sm ms-auto me-auto row d-flex justify-content-evenly">
          <div
            class=" ms-auto col-10 col-sm-10 col-md-3 me-auto mb-4"
            role="search"
          >
            <input
              onChange={(e) => {
                handleTextChange(e);
                if (e.target.value.trim() == "") {
                  setSorted(true);
                } else {
                  setSorted(false);
                }
              }}
              className="p-2 fw-bold form-control me-2"
              type="search"
              placeholder="Search Bills"
              aria-label="Search"
              style={{
                border: "2px solid blue",
                backgroundColor: "black",
                color: "white",
              }}
            />
          </div>
          <select
            className="custom-select p-2 rounded-2 ms-auto col-10 col-sm-10 col-md-3 me-auto mb-4"
            onChange={(e) => {
              setStatus(e.target.value);
              if (e.target.value == "All Bills") {
                setSorted(true);
              } else {
                setSorted(false);
              }
            }}
          >
            <option value="All Bills" selected>
              Sort By Status
            </option>
            <option value="pending">pending</option>
            <option value="accepted">accepted</option>
            <option value="rejected">rejected</option>
          </select>
          <select
            className="custom-select p-2 rounded-2 ms-auto col-10 col-sm-10 col-md-3 me-auto mb-4"
            onChange={(e) => {
              setUser(e.target.value);
              if (e.target.value == "") {
                setSorted(true);
              } else {
                setSorted(false);
              }
            }}
          >
            <option value="" selected>
              Sort by User
            </option>
            {users.map((user, index) => {
              return (
                <option value={user} key={index}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {sorted && (
        <div className="ms-auto me-auto container-md d-flex justify-content-evenly row">
          <div className="flex-1 ms-auto me-auto upload-outer-div col-10 col-sm-10 mt-5 justify-content-center align-items-center">
            <p className="fs-4 fw-bold" style={{ color: "rgb(12,0,218)" }}>
              Total Bills:{" "}
              <span className="text-white fw-bold fs-4">
                {pending + accepted + rejected}
              </span>
            </p>
            <p className="fs-4 fw-bold" style={{ color: "rgb(12,0,218)" }}>
              Total Amount:{" "}
              <span className="text-white fw-bold fs-4">
                &#8377; {acceptedBill + pendingBill + rejectedBill}
              </span>
            </p>
          </div>
          <div className="upload-outer-div col-10 col-md-4">
            <p
              className="fs-5 fst-italic"
              style={{ color: "rgb(237, 221, 74)" }}
            >
              Pending Bills:{" "}
              <span className="text-white fw-bold fs-4">{pending}</span>
            </p>
            <p
              className="fs-5 fst-italic"
              style={{ color: "rgb(96, 237, 74)" }}
            >
              Accepted Bills:{" "}
              <span className="text-white fw-bold fs-4">{accepted}</span>
            </p>
            <p className="fs-5 fst-italic" style={{ color: "red" }}>
              Rejected Bills:{" "}
              <span className="text-white fw-bold fs-4">{rejected}</span>
            </p>
          </div>
          <div className="upload-outer-div col-md-4 col-10">
            <div className="flex-1 ms-atuo">
              <p
                className="fs-5 fst-italic"
                style={{ color: "rgb(237, 221, 74)" }}
              >
                Pending Amount:{" "}
                <span className="text-white fw-bold fs-4">
                  &#8377; {pendingBill}
                </span>
              </p>
              <p
                className="fs-5 fst-italic"
                style={{ color: "rgb(96, 237, 74)" }}
              >
                Accepted Amount:{" "}
                <span className="text-white fw-bold fs-4">
                  &#8377; {acceptedBill}
                </span>
              </p>
              <p className="fs-5 fst-italic" style={{ color: "red" }}>
                Rejected Amount:{" "}
                <span className="text-white fw-bold fs-4">
                  &#8377; {rejectedBill}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      <table className="table-striped table-hover w-75 container mb-5">
        <tr className="row heading py-5 d-none d-sm-flex">
          <th
            data-cell="SNO"
            className="col-1 text-center heading d-none d-sm-inline fs-5"
          >
            SN0
          </th>
          <th
            data-cell="Name"
            className="fs-5 col-2 text-center heading d-none d-sm-inline"
          >
            NAME
          </th>
          <th
            data-cell="UserName"
            className="fs-5 col-2 text-center heading d-none d-sm-inline"
          >
            UPLOADED BY
          </th>
          <th
            data-cell="Amount"
            className="fs-5 col-2 text-center heading d-none d-sm-inline"
          >
            AMOUNT
          </th>
          <th
            data-cell="Type"
            className="fs-5 col-2 text-center heading d-none d-sm-inline"
          >
            TYPE
          </th>
          <th
            data-cell="status"
            className="fs-5 col-3 text-center heading d-none d-sm-inline"
          >
            STATUS
          </th>
        </tr>
        <hr id="hr1" />
        <tbody>
          {reversedData.map((data1, index) => {
            return (
              <>
                {(data1.status === status || status === "All Bills") &&
                (data1.name.toLowerCase().includes(text.toLowerCase()) ||
                  data1.type.toLowerCase().includes(text.toLowerCase())) &&
                data1.uploadedBy.includes(user) ? (
                  <>
                    <tr className="row" key={index}>
                      <td
                        data-cell="SNo"
                        className="col-1 text-center d-none d-md-inline d-sm-none"
                      >
                        {index + 1}
                      </td>
                      <td
                        data-cell="Name"
                        className="col-xs-8 col-sm-4 col-md-2 text-center"
                      >
                        {data1.name}
                      </td>
                      <td
                        data-cell="Name"
                        className="col-xs-8 col-sm-4 col-md-2 text-center"
                      >
                        {data1.uploadedBy}
                      </td>
                      <td
                        data-cell="Amount"
                        className="col-xs-8 col-sm-4 col-md-2 text-center"
                      >
                        {data1.amount}
                      </td>
                      <td
                        data-cell="Type"
                        className="col-xs-8 col-sm-4 col-md-2 text-center"
                      >
                        {data1.type}
                      </td>
                      {data1.status != "pending" && (
                        <td
                          data-cell="Status"
                          className={`col-xs-8 col-sm-4 col-md-3 text-center d-sm-inline ${data1.status}`}
                        >
                          {data1.status}
                        </td>
                      )}
                      {data1.status == "pending" && (
                        <td
                          data-cell="Status"
                          className={`col-xs-8 col-sm-4 col-md-3 text-center d-sm-inline ${data1.status}`}
                        >
                          <select
                            name="status"
                            id="status"
                            className="custom-select w-50 ms-auto me-auto"
                            onClick={(e) => {
                              handleStatus(e, data1._id);
                            }}
                          >
                            <option
                              value="pending"
                              className="pending fs-6 p-0"
                              selected
                            >
                              pending
                            </option>
                            <option
                              value="accepted"
                              className="accepted fs-6 p-0"
                            >
                              Accept
                            </option>
                            <option
                              value="rejected"
                              className="rejected fs-6 p-0"
                            >
                              Reject
                            </option>
                            <option
                              value="deleted"
                              className="rejected fs-6 p-0"
                            >
                              Delete Bill
                            </option>
                          </select>
                        </td>
                      )}

                      <td
                        data-cell="image"
                        className="col-12 text-center d-sm-inline"
                      >
                        <img
                          className="ms-auto me-auto"
                          src={data1.image}
                          alt=""
                          width="300vw"
                          onClick={() => handleImageClick(data1.image)}
                        />
                      </td>
                    </tr>
                    <hr id="hr" />
                  </>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </tbody>
      </table>
      {/* Popup for displaying the selected image */}
      {selectedImage && (
        <div className="popup">
          <div className="popup-content">
            <img src={selectedImage} alt="Popup" />
            <button onClick={() => setSelectedImage(null)}>Close</button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default UserTable;
