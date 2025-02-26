import React, { useState, useEffect, useContext } from "react";
import "./BillsPage.css";
import { BillContext } from "../../../App";
import Sidebar from "../../navbar/Sidebar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './BillsPage.module.css';
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import PreviewImage from "../../PreviewImage";

function UserTable() {
  let { data, setData } = useContext(BillContext);
  let [users, setUsers] = useState([]);
  let [sorted, setSorted] = useState(true);
  let [user, setUser] = useState("");
  let [Loading,setLoading] = useState(false)

  const [text, setText] = useState("");
  const [status, setStatus] = useState("All Bills");
  const [gstType,setGstType] = useState("All Bills")
  const [money, setMoney] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
 
  const [openPreview, setOpenPreview] = useState(false);
  const [reversedData, setReversedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of items to show per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reversedData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < data.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (indexOfFirstItem > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  

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
    if (!text && !status && !user && !gstType) {
      setReversedData([...data].reverse()); // If all filters are empty, show full reversed list
      return;
    }

    let filteredData = data;

    // Apply filters dynamically
    if (text !== "") {
      console.log("text is changed")
      filteredData = filteredData.filter(
        (item) =>
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.uploadedBy.toLowerCase().includes(text.toLowerCase())
      );
      console.log("filterdata from text:",filteredData)
    }

    if (user !== "") {
      console.log("user is changed")
      
      filteredData = filteredData.filter((item) => item.uploadedBy === user);
      console.log("filterdata from user:",filteredData)
    }

    if (status !== "All Bills") {
      console.log("status is changed")
      filteredData = filteredData.filter((item) => item.status === status);
      console.log("filterdata from status:",filteredData)
    }

    if (gstType !== "All Bills") {
      console.log("gst is changed")
      filteredData = filteredData.filter((item) => item.billType === gstType);
      console.log("filterdata from gstType:",filteredData)
    }

    setReversedData([...filteredData].reverse()); // Reverse the final filtered list
}, [text, status, user, gstType]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
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
      setLoading(false)
    };
    fetchUsers();
    const fetchData = async () => {
      try {
        setLoading(true)
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
      setLoading(false)
    };
    fetchData();
  }, []);

  console.log("data is ",data);



  let pending = 0;
  let accepted = 0;
  let rejected = 0;
  let pendingBill = 0;
  let acceptedBill = 0;
  let rejectedBill = 0;

  function handleTextChange(e) {
    setText(e.target.value);
  }



  const handleMoneySearch = async (e) => {
    const amount = e.target.value;
    if(amount !== ""){
      setMoney(amount);
    }
    else{
      setMoney("")
    }
    
    if (!amount.trim()) {
      setLoading(true)
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
      setLoading(false)
      return;  // Exit the function if input is empty
    }
  
    // Existing functionality for when amount is provided
    setLoading(true)
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        `https://bill-server-hiq9.onrender.com/admin/search`,
        { amount: Number(amount) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setData(response.data.selectedBills);
    } catch (err) {
      console.error("Error fetching bills by amount:", err);
    }
    setLoading(false)
  };
  
  console.log(text,user,status,gstType)

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
    setOpenPreview(true);
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
              className="p-2 fw-bold form-control"
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

          <div className="ms-auto col-10 col-sm-10 col-md-3 me-auto mb-4">
            <input
              onChange={handleMoneySearch}
              value={money}
              className="p-2 fw-bold form-control"
              type="number"
              placeholder="search by Amount"
              aria-label="Search by Amount"
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

          <select
            className="custom-select p-2 rounded-2 ms-auto col-10 col-sm-10 col-md-3 me-auto mb-4"
            onChange={(e) => {
              setGstType(e.target.value);
              if (e.target.value == "All Bills") {
                setSorted(true);
              } else {
                setSorted(false);
              }
            }}
          >
            <option value="All Bills" selected>
              Sort By Bill Type
            </option>
            <option value="GST">GST</option>
            <option value="Non GST">Non GST</option>
          </select>
          
        </div>
      </div>


        (
          <div className="ms-auto me-auto container-md d-flex flex-wrap row mt-4 text-nowrap mb-5">
            {[
              { title: 'Total Bills', value: pending + accepted + rejected, color: 'blue' },
              { title: 'Total Amount', value: `₹${acceptedBill + pendingBill + rejectedBill}`, color: 'blue' },
              { title: 'Pending Bills', value: pending, color: 'rgb(237, 221, 74)' },
              { title: 'Pending Amount', value: `₹${pendingBill}`, color: 'rgb(237, 221, 74)' },
              { title: 'Accepted Bills', value: accepted, color: 'rgb(96, 237, 74)' },
              { title: 'Accepted Amount', value: `₹${acceptedBill}`, color: 'rgb(96, 237, 74)' },
              { title: 'Rejected Bills', value: rejected, color: 'red' },
              { title: 'Rejected Amount', value: `₹${rejectedBill}`, color: 'red' },
            ].map((card, index) => (
              <div
                key={index}
                className="col-6 col-md-6 mb-3 "
              >
                <div
                  className="px-1 py-3 w-full text-center"
                  style={{
                    borderRadius: '4px',
                    boxShadow: '0 4px 8px black',
                    backgroundColor: 'white',
                    color: card.color,
                  }}
                >
                  <div className={`fw-bold ${styles.cardTitle}`}>{card.title}</div>
                  <div className={`text-black  ${styles.cardValue}`} style={{fontWeight:700}}>{Loading ? "Loading..." : card.value}</div>
                  {/* <div className={`text-black ${styles.cardValue}`} >{loading ? "Loading..." : card.value}</div> */}
                </div>
              </div>
            ))}
          </div>
        )

      
            <div className={`${styles.tableContainer} w-100 container mb-5 p-2`}>
              {Loading ? <p className="text-responsive text-white text-center">Loading...</p> :
              <table className={styles.table}>
                <thead className={styles.tableHeader}>
                  <tr>
                    <th className={`${styles.tableHeaderCell} text-nowrap`}>Sno</th>
                    <th className={`${styles.tableHeaderCell} text-nowrap`}>Name</th>
                    <th className={`${styles.tableHeaderCell} text-nowrap`}>Bill Type</th>
                    <th className={`${styles.tableHeaderCell} text-nowrap`}>Gst Number</th>
                    <th className={`${styles.tableHeaderCell} text-nowrap`}>Bill Number</th>
                    <th className={`${styles.tableHeaderCell} text-nowrap`}>Category</th>
                    <th className={`${styles.tableHeaderCell} text-nowrap`}>Firmname</th>
                    <th className={`${styles.tableHeaderCell} text-nowrap`}>Date of purchase</th>
                    <th className={`${styles.tableHeaderCell} text-nowrap`}>Amount</th>
                    <th className={`${styles.tableHeaderCell} text-nowrap`}>Uploaded By</th>
                    <th className={`${styles.tableHeaderCell} text-nowrap`}>Image</th>
                    <th className={`${styles.tableHeaderCell} text-nowrap`}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((data1, index) => {
                    const statusColor =
                      data1.status === 'pending'
                        ? 'rgb(237, 221, 74)'
                        : data1.status === 'accepted'
                        ? 'rgb(96, 237, 74)'
                        : 'rgb(255,0,0)';
      
                    return (
                      // (data1.status === status || status === 'All Bills') &&
                      // (data1.billType === gstType || gstType === 'All Bills') &&
                      // data1.name.toLowerCase().includes(text.toLowerCase()) &&
                        // data1?.name?.toLowerCase().includes(user.toLowerCase())
                        //  && (
                        <tr key={index}>
                          <td className={styles.tableDataCell}>{indexOfFirstItem + index + 1}</td>
                          <td className={styles.tableDataCell}>{data1.name}</td>
                          <td className={styles.tableDataCell}>{data1.billType || 'none'}</td>
                          <td className={styles.tableDataCell}>{data1.GstNumber || 'none'}</td>
                          <td className={styles.tableDataCell}>{data1.billNumber || 'none'}</td>
                          <td className={styles.tableDataCell}>{data1.category || 'none'}</td>
                          <td className={styles.tableDataCell}>{data1.firmName || 'none'}</td>
                          <td className={styles.tableDataCell}>{
                            data1.date
                              ? new Intl.DateTimeFormat('en-GB', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric',
                                }).format(new Date(data1.date))
                              : 'none'
                          }</td>
                          <td className={styles.tableDataCell}>{data1.amount || 'none'}</td>
                          <td className={styles.tableDataCell}>{data1.uploadedBy || 'none'}</td>
                          <td className={styles.tableDataCell}>
                            <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                              <img
                                src={data1.image}
                                alt=""
                                className={styles.image}
                                style={{ cursor: 'pointer', borderRadius: '2px' }}
                                onClick={() => handleImageClick(data1.image)}
                              />
                               <button className={styles.buttonOverlay} style={{ width: '100px', height: '20px', fontSize: '9px' }} onClick={() => handleImageClick(data1.image)}>Click For Preview</button>
                            </div>
                          </td>
                          {data1.status != "pending" && (
                        <td
                          data-cell="Status"
                          className={`${data1.status} ${styles.Statustxt}`}
                          style={{color:statusColor}}
                        >
                          {data1.status}
                        </td>
                      )}
                      {data1.status == "pending" && (
                        <td
                          data-cell="Status"
                          className={`${data1.status} ${styles.Statustxt}`}
                          style={{color:statusColor}}
                        >
                          <select
                            name="status"
                            id="status"
                            className="custom-select w-full ms-auto me-auto"
                            onClick={(e) => {
                              handleStatus(e, data1._id);
                            }}
                          >
                            <option
                              value="pending"
                              className="pending fs-6 p-0"
                              style={{color:'white'}}
                              selected
                            >
                              pending
                            </option>
                            <option
                              value="accepted"
                              className="accepted fs-6 p-0"
                              style={{color:'white'}}
                            >
                              Accept
                            </option>
                            <option
                              value="rejected"
                              className="rejected fs-6 p-0"
                              style={{color:'white'}}
                            >
                              Reject
                            </option>
                            <option
                              value="deleted"
                              className="rejected fs-6 p-0"
                              style={{color:'white'}}
                            >
                              Delete Bill
                            </option>
                          </select>
                        </td>
                      )}
                          
                        </tr>
                      // )
                    );
                  })}
                </tbody>
              </table>
}
            </div>

            {openPreview && <PreviewImage image={selectedImage} onClose={() => setOpenPreview(false)} />}

            <div className="ms-auto me-auto container-md d-flex flex-wrap row mb-3">
        <div className='col-6'>
        <button
          className="btn btn-primary"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
         <span  style={{fontSize:'15px',fontWeight:'bolder'}}><GrLinkPrevious/></span> Previous
        </button>
        </div>

       <div className='col-6 d-flex justify-content-end'>
         
       <button
          className="btn btn-primary"
          onClick={nextPage}
          // disabled={indexOfLastItem >= data.length}
          disabled={reversedData.length <= 15 || currentItems.length < 15}
        >
           Next <span  style={{fontSize:'15px',fontWeight:'bolder'}}><GrLinkNext/></span>
        </button>
       </div>

      </div>

     
      <ToastContainer />
    </div>
  );
}

export default UserTable;
