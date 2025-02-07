import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import PieChart from "../piechart/PieChart";
import BarPlot from "../barplot/BarPlot";
import axios from "axios";
import Log from "../login/Log";
import { BillContext } from "../../App";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { MdDownloadForOffline } from "react-icons/md";
import BillsLineChart from "../LineChart/BillsLineChart";


const Home = () => {
  const { data, setData } = useContext(BillContext);
  let [users, setUsers] = useState([]);

  let [sorted, setSorted] = useState(true);
  let [user, setUser] = useState("");
  const [floading, setFloading] = useState(false);

  const [pending, setPending] = useState(0);
  const [accepted, setAccepted] = useState(0);

  const [rejected, setRejected] = useState(0);

  const [pendingBill, setPendingBill] = useState(0);
  const [acceptedBill, setAcceptedBill] = useState(0);
  const [rejectedBill, setRejectedBill] = useState(0);
  const [totalBills,setTotalBills] = useState(0);

  const [gstPendingBill, setGstPendingBill] = useState(0);
  const [gstAcceptedBill, setGstAcceptedBill] = useState(0);
  const [gstRejectedBill, setGstRejectedBill] = useState(0);
  const [totalGstBills,setTotalGstBills] = useState(0);

  const [NonGstPendingBill, setNonGstPendingBill] = useState(0);
  const [NonGstAcceptedBill, setNonGstAcceptedBill] = useState(0);
  const [NonGstRejectedBill, setNonGstRejectedBill] = useState(0);
  const [totalNonGstBills,setTotalNonGstBills] = useState(0);

  const [dataByType, setDataByType] = useState({});
  const [dataByTypeAmount, setDataByTypeAmount] = useState({});
  const categories = ["printing", "marketing", "travelling", "outside promotions", "stage photography"];

  


  const renderPieChart1 = () => {
    if (pending !== 0 || accepted !== 0 || rejected !== 0) {
      return (
        <PieChart
          labels={["pending", "accepted", "rejected"]}
          data={[pending, accepted, rejected]}
          className="ms-auto"
        />
      );
    } else {
      return (
        <PieChart
          labels={["pending", "accepted", "rejected"]}
          data={[pending, accepted, rejected]}
          className="ms-auto"
        />
      );
    }
  };

  const renderPieChart2 = () => {
    if (Object.keys(dataByType).length > 0) {
      return (
        <PieChart
          labels={categories}
          data={Object.values(dataByType)}
          className="ms-auto"
        />
      );
    } else {
      return null;
    }
  };

  console.log("dataByType",dataByType)

  


    const generateExcelAndZip = async () => {
      setFloading(true)
      const zip = new JSZip();
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([]);
  
      // Define column headers
      XLSX.utils.sheet_add_aoa(ws, [
        ["Name", "Bill Type", "Bill Number", "Category", "Firm Name", "Date", "Amount", "Uploaded By", "Status", "Image URL"],
      ]);
  
      for (let i = 0; i < data.length; i++) {
        const bill = data[i];
  
        // Fetch image and add to ZIP
        try {
          const response = await axios.get(bill.image, { responseType: "arraybuffer" });
          zip.file(`images/${bill.name}-${i}.png`, response.data);
        } catch (error) {
          console.error(`Error fetching image for ${bill.name}:`, error);
        }
  
        // Add row data with image URL
        XLSX.utils.sheet_add_aoa(
          ws,
          [
            [
              bill.name,
              bill.billType,
              bill.billNumber || "N/A",
              bill.category,
              bill.firmName,
              bill.date,
              bill.amount,
              bill.uploadedBy,
              bill.status,
              { t: "s", v: "Click Here", l: { Target: bill.image } },
            ],
          ],
          { origin: -1 }
        );
      }
  
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, "Bills");
  
      // Write the Excel file
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  
      // Add Excel file to ZIP
      zip.file("Bills.xlsx", wbout);
  
      // Generate and download ZIP
      zip.generateAsync({ type: "blob" }).then((zipFile) => {
        saveAs(zipFile, "Bills_with_Images.zip");
        setFloading(false)
      });
    };
  

    // console.log("data is:",data);

  const handleUserChange = (e) => {
    console.log("User changed:",e.target.value)
    let pendingCount = 0;
    let acceptedCount = 0;
    let rejectedCount = 0;

    let pendingAmount = 0;
    let acceptedAmount = 0;
    let rejectedAmount = 0;

    let dataByType = {};
    let dataByTypeAmount = {};

    categories.forEach((label) => {
      dataByType[label] = 0;
      dataByTypeAmount[label] =0 ;
    });

    data?.forEach((data1) => {
      
      if (data1.uploadedBy == e.target.value || e.target.value == "") {
        console.log("data is:",data1.type)

        dataByType[data1.category] += 1;
        dataByTypeAmount[data1.category] += data1.amount;
        if (data1.status === "pending") {
          pendingCount++;
          pendingAmount += data1.amount;
        } else if (data1.status === "accepted") {
          acceptedCount++;
          acceptedAmount += data1.amount;
        } else if (data1.status === "rejected") {
          rejectedCount++;
          rejectedAmount += data1.amount;
        }
        
      }
    });

    setPending(0);
    setAccepted(0);
    setRejected(0);
    setDataByType({});
    setDataByTypeAmount({});
    setPendingBill(0);
    setAcceptedBill(0);
    setRejectedBill(0);

    setTimeout(() => {
      setPending(pendingCount);
      setAccepted(acceptedCount);
      setRejected(rejectedCount);
      setDataByType(dataByType);
      setDataByTypeAmount(dataByTypeAmount);
      setPendingBill(pendingAmount);
      setAcceptedBill(acceptedAmount);
      setRejectedBill(rejectedAmount);
    }, 10);
  };

  

  console.log("gststs",gstAcceptedBill)

  useEffect(() => {
    // handleUserChange1()
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
        // console.log(response.data);

        let pendingCount = 0;
        let acceptedCount = 0;
        let rejectedCount = 0;

        let pendingAmount = 0;
        let acceptedAmount = 0;
        let rejectedAmount = 0;

        let gpendingCount = 0;
    let gacceptedCount = 0;
    let grejectedCount = 0;

    let ngpendingCount = 0;
    let ngacceptedCount = 0;
    let ngrejectedCount = 0;

        let dataByType = {};
        let dataByTypeAmount = {};

        categories.forEach((label) => {
          dataByType[label] = 0;
          dataByTypeAmount[label] = 0;
        });

        response.data.bills.forEach((data1) => {
          dataByType[data1.category] += 1;
          dataByTypeAmount[data1.category] += data1.amount;
          if (data1.status === "pending") {
            pendingCount++;
            pendingAmount += data1.amount;
          } else if (data1.status === "accepted") {
            acceptedCount++;
            acceptedAmount += data1.amount;
          } else if (data1.status === "rejected") {
            rejectedCount++;
            rejectedAmount += data1.amount;
          }
          
          if (data1.billType === "GST" && data1.status === "pending") {
            gpendingCount++;
          } else if (data1.billType === "GST" && data1.status === "accepted") {
            gacceptedCount++;
          } else if (data1.billType === "GST" && data1.status === "rejected") {
            grejectedCount++;
          }
          
          if (data1.billType === "Non GST" && data1.status === "pending") {
            ngpendingCount++;
          } 
          else if (data1.billType === "Non GST" && data1.status === "accepted") {
            ngacceptedCount++;
          } else if (data1.billType === "Non GST" && data1.status === "rejected") {
            ngrejectedCount++;
          }
          
        });

        console.log("pen",gacceptedCount)
        setGstPendingBill(gpendingCount);
        setGstAcceptedBill(gacceptedCount);
        setGstRejectedBill(grejectedCount);
        setTotalGstBills(gpendingCount+gacceptedCount+grejectedCount)

        setNonGstPendingBill(ngpendingCount);
        setNonGstAcceptedBill(ngacceptedCount);
        setNonGstRejectedBill(ngrejectedCount);
        setTotalNonGstBills(ngpendingCount+ngacceptedCount+ngrejectedCount)

        setPending(pendingCount);
        setAccepted(acceptedCount);
        setRejected(rejectedCount);

        setPendingBill(pendingAmount);
        setAcceptedBill(acceptedAmount);
        setRejectedBill(rejectedAmount);

        setDataByType(dataByType);
        setDataByTypeAmount(dataByTypeAmount);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();

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
  }, []);

  return (
    <BillContext.Provider value={{ data }}>
      <div className="row mt-5">
        <h1
          className="display-3 text-white text-center mb-5"
          style={{ marginTop: "50px" }}
        >
          Welcome To Admin Dashboard
        </h1>
        {/* <button onClick={generateExcel}>Download Excel</button> */}

        <div className="row d-flex justify-content-between justify-content-md-center align-items-center" >
        {/* Select User Stats */}
        <div className="col-md-6 col-6">
        <select
          className="custom-dropdown p-md-2 px-2 py-2 rounded-2 col-6 ms-auto me-auto w-auto custom-dropdown-scroll"
          onChange={(e) => handleUserChange(e)}
          // size={6}
        >
          <option value="" selected>
            Select User Stats
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

        {/* Download Button */}
        <div className="col-md-6 col-6 text-md-end text-center  w-auto">
          {/* <button className="download-btn px-3" onClick={generateExcelAndZip}>
            Bills <MdDownloadForOffline className="ms-2" style={{fontSize:"23px",cursor:'pointer'}}/>
          </button> */}

<button className="download-btn px-3" onClick={generateExcelAndZip} disabled={floading}>
        {floading ? (
          <span className="spinner-border spinner-border-sm me-2 text-center"></span>
        ) : (
          "Bills"
        )}
        {!floading && 
        <MdDownloadForOffline className="ms-2" style={{ fontSize: "23px", cursor: "pointer" }} />
        }
        </button>
        </div>
      </div>


  <div className="mt-5">
  <h1
          className="text-white text-center mb-3"
          style={{ fontSize: "23px" }}
          
        >
          Bills By Date
        </h1>
  <BillsLineChart bills = {data}/>
  </div>
        

        <div className="d-flex justify-content-evenly col-gap-5 row-gap-5 align-items-center row mt-5 ms-2 ms-md-0">
          <div className="card-outer-div text-white mb-3 col-10 col-lg-5">
            <div className="row g-0">
              <div className="col-md-5">
                <div className="card-body">
                  <h5 className="card-title">
                    Total Bills: {pending + accepted + rejected}
                  </h5>
                  <p className="card-text ms-2">
                    <li className="pending">Pending: {pending}</li>
                    <li className="accepted">Accepted: {accepted}</li>
                    <li className="rejected">Rejected: {rejected}</li>
                  </p>
                </div>
              </div>
              <div className="col-md-7 ">
                {pending + rejected + accepted != 0 && renderPieChart1()}
                {pending + rejected + accepted == 0 && renderPieChart1()}
              </div>
            </div>
            <h6 className="text-center text-info mt-4 mt-lg-4">
              fig. Total number of bills
            </h6>
          </div>

          <div
            className="card-outer-div text-white mb-3 col-10 col-lg-5"
            style={{ padding: "20px 3px" }}
          >
            <div className="row g-0">
              <h6 className="card-title mb-4 mb-lg-3 text-center">
                Amount spent :&#8377; <span className="fs-md-4 fs-6">{pendingBill + rejectedBill + acceptedBill}</span>
              </h6>
              <div className="col-12">
                {pendingBill + acceptedBill + rejectedBill != 0 && (
                  <BarPlot
                    label={"Amount spend by status"}
                    labels={["totalBills","pending", "accepted", "rejected"]}
                    data={[(pendingBill+acceptedBill+rejectedBill),pendingBill, acceptedBill, rejectedBill]}
                    className="ms-auto"
                  />
                )}
                {pendingBill + acceptedBill + rejectedBill == 0 && (
                  <BarPlot
                    label={"Amount spend by status"}
                    labels={["pending", "accepted", "rejected"]}
                    data={[0, 0, 0]}
                    className="ms-auto"
                  />
                )}
              </div>
            </div>
            <h6 className="text-center text-info mt-5">
              fig. Amount spent by status
            </h6>
          </div>

          <div className="card-outer-div text-white mb-3 col-10 col-lg-5">
            <div className="row g-0">
              <div className="col-md-5">
                <div className="card-body">
                  <h5 className="card-title">
                    Total Bills by category: {accepted + rejected + pending}
                  </h5>
                  <p className="ms-2 mt-4">
                  
                    {categories.map((label, index) => {
                      return (
                        <li key={index} className="mb-2">
                          {label}: {dataByType[label]}
                        </li>
                      );
                    })}
                  </p>
                </div>
              </div>
              <div className="col-md-7 ">{renderPieChart2()}</div>
            </div>
            <h6 className="text-center text-info mt-3">
              fig. Total Bills by category
            </h6>
          </div>

          <div
            className="card-outer-div text-white mb-3 col-10 col-lg-5"
            style={{ padding: "30px 20px" }}
          >
            <div className="row g-0">
              <h6 className="card-title mb-3 text-center">
                Amount spent: &#8377;  <span className="fs-md-4 fs-6">{pendingBill + rejectedBill + acceptedBill}</span>
              </h6>
              <div className="col-12">
                {Object.values(dataByTypeAmount).length > 0 && (
                  <BarPlot
                    label={"Amount spend by category"}
                    labels={categories}
                    data={Object.values(dataByTypeAmount)}
                    className="ms-auto"
                  />
                )}
              </div>
            </div>
            <h6 className="text-center text-info mt-5">
              fig. Amount spent by category
            </h6>
          </div>

          <div className="card-outer-div text-white mb-3 col-10 col-lg-5">
            <div className="row g-0">
              <div className="col-md-5">
                <div className="card-body">
                  <h5 className="card-title">
                    Total Bills With Gst: {totalGstBills}
                  </h5>
                  <p className="card-text ms-2">
                    <li className="pending">Pending: {gstPendingBill}</li>
                    <li className="accepted">Accepted: {gstAcceptedBill}</li>
                    <li className="rejected">Rejected: {gstRejectedBill}</li>
                  </p>
                </div>
              </div>
              <div className="col-md-7 ">
                {gstAcceptedBill+gstPendingBill+gstRejectedBill != 0 && renderPieChart1()}
                {gstAcceptedBill+gstPendingBill+gstRejectedBill == 0 && renderPieChart1()}
              </div>
            </div>
            <h6 className="text-center text-info mt-4 mt-lg-4">
              fig. Total number of Gst bills
            </h6>
          </div>

          
          <div className="card-outer-div text-white mb-3 col-10 col-lg-5">
            <div className="row g-0">
              <div className="col-md-5">
                <div className="card-body">
                  <h5 className="card-title fs-6 fs-md-4">
                    Total Bills With NonGst: {totalNonGstBills}
                  </h5>
                  <p className="card-text ms-2">
                    <li className="pending">Pending: {NonGstPendingBill}</li>
                    <li className="accepted">Accepted: {NonGstAcceptedBill}</li>
                    <li className="rejected">Rejected: {NonGstPendingBill}</li>
                  </p>
                </div>
              </div>
              <div className="col-md-7 ">
                {NonGstPendingBill+NonGstAcceptedBill+NonGstPendingBill != 0 && renderPieChart1()}
                {NonGstPendingBill+NonGstAcceptedBill+NonGstPendingBill == 0 && renderPieChart1()}
              </div>
            </div>
            <h6 className="text-center text-info mt-4 mt-lg-4">
              fig. Total number of NonGst bills
            </h6>
          </div>

        </div>
      </div>
    </BillContext.Provider>
  );
};

export default Home;











// const bills = [
//   {
//       _id: "677e6105b92ac6d5426d502b",
//       name: "yashw",
//       amount: 123,
//       type: "hospitality",
//       uploadedBy: "siva",
//       image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736335593/2025-01-08-16-56-31.png",
//       status: "rejected",
//       __v: 0
//   },
//   {
//       _id: "677e6178b92ac6d5426d5035",
//       name: "guna",
//       amount: 121,
//       type: "infra",
//       uploadedBy: "siva",
//       image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736335727/2025-01-08-16-58-42.png",
//       status: "accepted",
//       __v: 0
//   },
//   {
//       _id: "677e61afb92ac6d5426d503f",
//       name: "yaswanth",
//       amount: 121,
//       type: "hospitality",
//       uploadedBy: "siva",
//       image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736335784/2025-01-08-16-59-41.png",
//       status: "rejected",
//       __v: 0
//   },
//   {
//       _id: "677e66bbb92ac6d5426d5055",
//       name: "yash",
//       amount: 12323,
//       type: "hospitality",
//       uploadedBy: "siva",
//       image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736337067/2025-01-08-17-21-04.png",
//       status: "pending",
//       __v: 0
//   },
//   {
//       _id: "677e675ab92ac6d5426d5065",
//       name: "yash",
//       amount: 213,
//       type: "hospitality",
//       uploadedBy: "siva",
//       image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736337235/2025-01-08-17-23-55.png",
//       status: "pending",
//       __v: 0
//   },
//   {
//       _id: "677e6f5abd610cebbd98e46e",
//       name: "jhsds",
//       amount: 12345,
//       type: "hospitality",
//       uploadedBy: "siva",
//       image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736339285/2025-01-08-17-58-01.png",
//       status: "pending",
//       __v: 0
//   },
//   {
//       _id: "677e7f09c241557bc3ad9c11",
//       name: "234",
//       amount: 1345,
//       type: "hospitality",
//       uploadedBy: "siva",
//       image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736343192/2025-01-08-19-03-07.png",
//       status: "pending",
//       __v: 0
//   },
//   {
//       _id: "677e7f3ec241557bc3ad9c16",
//       name: "qwer",
//       amount: 12345678,
//       type: "hospitality",
//       uploadedBy: "siva",
//       image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736343353/2025-01-08-19-05-49.png",
//       status: "pending",
//       __v: 0
//   },
//   {
//       _id: "677e8146b6a64f1f464e2913",
//       name: "yashh",
//       amount: 123,
//       type: "hospitality",
//       uploadedBy: "siva",
//       image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736343873/2025-01-08-19-14-28.png",
//       status: "pending",
//       __v: 0
//   },
//   {
//       _id: "67824c3a046aa414cd17aa9e",
//       name: "yash",
//       billType: "GST",
//       billNumber: "12345",
//       category: "printing",
//       firmName: "yash",
//       date: "2025-01-04T00:00:00.000Z",
//       amount: 23,
//       uploadedBy: "siva",
//       image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736592353/2025-01-2025-01-04-16-15-44.png",
//       status: "pending",
//       __v: 0
//   },
//   {
//       _id: "67824c84046aa414cd17aaa3",
//       name: "yash",
//       billType: "GST",
//       billNumber: "12345",
//       category: "printing",
//       firmName: "wer",
//       date: "2025-01-24T00:00:00.000Z",
//       amount: 1234,
//       uploadedBy: "siva",
//       image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736592513/2025-01-2025-01-24-16-18-26.png",
//       status: "rejected",
//       __v: 0
//   },
//   {
//       _id: "67824e18efc8852ba7888b17",
//       name: "yash",
//       billType: "GST",
//       billNumber: "1234",
//       category: "marketing",
//       firmName: "yasg",
//       date: "2025-01-04T00:00:00.000Z",
//       amount: 21,
//       uploadedBy: "siva",
//       image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736592887/2025-01-2025-01-04-16-24-41.png",
//       status: "accepted",
//       __v: 0
//   },
//   {
//       _id: "67824e82efc8852ba7888b1b",
//       name: "yash",
//       billType: "Non GST",
//       billNumber: "",
//       category: "printing",
//       firmName: "yash",
//       date: "2025-01-03T00:00:00.000Z",
//       amount: 123,
//       uploadedBy: "siva",
//       image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736593022/2025-01-2025-01-03-16-26-55.png",
//       status: "accepted",
//       __v: 0
//   },
//   {
//       _id: "6782551fefc8852ba7888b1f",
//       name: "yah",
//       billType: "Non GST",
//       billNumber: "",
//       category: "printing",
//       firmName: "dfghj",
//       date: "2025-01-12T00:00:00.000Z",
//       amount: 1234,
//       uploadedBy: "siva",
//       image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
//       status: "accepted",
//       __v: 0
//   },
//   {
//     _id: "6782551fefc8852ba7888b1f",
//     name: "yah",
//     billType: "Non GST",
//     billNumber: "",
//     category: "printing",
//     firmName: "dfghj",
//     date: "2025-01-01T00:00:00.000Z",
//     amount: 1234,
//     uploadedBy: "siva",
//     image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
//     status: "accepted",
//     __v: 0
// },
// {
//   _id: "6782551fefc8852ba7888b1f",
//   name: "yah",
//   billType: "Non GST",
//   billNumber: "",
//   category: "printing",
//   firmName: "dfghj",
//   date: "2025-01-02T00:00:00.000Z",
//   amount: 1234,
//   uploadedBy: "siva",
//   image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
//   status: "accepted",
//   __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-02-12T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-02-03T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-02-24T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-01-11T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-01-13T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-01-15T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-01-16T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-01-17T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-01-19T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-02-22T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-02-05T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-02-06T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-02-07T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-02-08T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-02-14T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-02-14T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
// {
// _id: "6782551fefc8852ba7888b1f",
// name: "yah",
// billType: "Non GST",
// billNumber: "",
// category: "printing",
// firmName: "dfghj",
// date: "2025-01-05T00:00:00.000Z",
// amount: 1234,
// uploadedBy: "siva",
// image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736594696/2025-01-2025-01-12-16-54-38.png",
// status: "accepted",
// __v: 0
// },
//   {
//       _id: "6784f48b7c1d29347ea2a811",
//       name: "yash",
//       billType: "GST",
//       billNumber: "1212",
//       GstNumber: "12312",
//       category: "printing",
//       firmName: "yasgh",
//       date: "2025-01-03T00:00:00.000Z",
//       amount: 1234,
//       uploadedBy: "siva",
//       image: "http://res.cloudinary.com/dgelue5vg/image/upload/v1736766341/2025-01-2025-01-03-16-34-55.png",
//       status: "accepted",
//       __v: 0
//   }
// ];
