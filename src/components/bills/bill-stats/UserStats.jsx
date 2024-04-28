import React, { useContext, useEffect, useState } from 'react';
// import './UserStats.css';
import PieChart from '../../piechart/PieChart';
import BarPlot from '../../barplot/BarPlot';
import axios from 'axios';
import Log from '../../login/Log';
import { BillContext } from '../../../App';
import SideBar from '../../navbar/Sidebar';

const UserStats = () => {
    const {data, setData} = useContext(BillContext);

    const [pending, setPending] = useState(0);
    const [accepted, setAccepted] = useState(0);

    const [rejected, setRejected] = useState(0);

    const [pendingBill, setPendingBill] = useState(0);
    const [acceptedBill, setAcceptedBill] = useState(0);
    const [rejectedBill, setRejectedBill] = useState(0);

    const [dataByType, setDataByType] = useState({});
    const [dataByTypeAmount, setDataByTypeAmount] = useState({});
    const categories = ['infra','hospitality','food'];

    const renderPieChart1 = () => {
        if (pending !== 0 || accepted !== 0 || rejected !== 0) {
            return <PieChart labels = {['pending','accepted','rejected']} data = {[pending, accepted, rejected]} className="ms-auto"/>;
        } else {
            return null;
        }
    }

    const renderPieChart2 = () => {
        if (Object.keys(dataByType).length > 0) {
            return <PieChart labels={categories} data={Object.values(dataByType)} className="ms-auto"/>;
        } else {
            return null;
        }
    }
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get(
              'https://bill-server-hiq9.onrender.com/admin/fetchAllBills',
              
              {
                headers: {
                    'Content-Type': 'application/json',
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
            
            let dataByType = {};
            let dataByTypeAmount = {};

            categories.forEach((label)=>{
                dataByType[label] = 0;
                dataByTypeAmount[label] = 0;
            })

            response.data.bills.forEach((data1) => {
                if (data1.status === 'pending') {
                    pendingCount++;
                    pendingAmount += data1.amount;
                } else if (data1.status === 'accepted') {
                    acceptedCount++;
                    acceptedAmount += data1.amount;
                } else if (data1.status === 'rejected') {
                    rejectedCount++;
                    rejectedAmount += data1.amount;
                }
                dataByType[data1.type]+=1;
                dataByTypeAmount[data1.type]+=data1.amount;
            });

            setPending(pendingCount);
            setAccepted(acceptedCount);
            setRejected(rejectedCount);

            setPendingBill(pendingAmount);
            setAcceptedBill(acceptedAmount);
            setRejectedBill(rejectedAmount);

            setDataByType(dataByType);
            setDataByTypeAmount(dataByTypeAmount);

          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchData();
      }, []);
    
    return (
        <BillContext.Provider value={{ data }}>
        <SideBar />
        <div className='container-lg ms-auto me-auto'>
            <h1 className='display-3 text-white text-center mb-5' style={{marginTop: "50px"}}>Welcome To Admin Dashboard</h1>
            <div className='d-flex justify-content-evenly col-gap-3 row-gap-3 align-items-center row mt-5'>
                <div className="card-outer-div text-white mb-3 col-10 col-lg-5">
                    <div className="row g-0">
                        <div className="col-md-5">
                            <div className="card-body">
                                <h5 className="card-title">Total Bills: {pending+accepted+rejected}</h5>
                                <p className="card-text ms-2">
                                    <li className="pending">Pending: {pending}</li>
                                    <li className="accepted">Accepted: {accepted}</li>
                                    <li className="rejected">Rejected: {rejected}</li>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-7 ">
                            {renderPieChart1()}
                        </div>
                    </div>
                    <h6 className='text-center text-info mt-5'>fig. Total number of bills</h6>
                </div>
                <div className="card-outer-div text-white mb-3 col-10 col-lg-5">
                    <div className="row g-0">
                        <div className="col-md-5">
                            <div className="card-body">
                                <h5 className="card-title">Total Bills by category: {accepted+rejected+pending}</h5>
                                <p className="ms-3 mt-5">
                                    {categories.map((label, index)=>{
                                        return <li key={index} className='m-2'>
                                            {label}: {dataByType[label]}
                                        </li>
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="col-md-7 ">
                            {renderPieChart2()}
                        </div>
                    </div>
                    <h6 className='text-center text-info mt-5'>fig. Total Bills by category</h6>
                </div>
                <div className="card-outer-div text-white mb-3 col-10 col-lg-5" style={{padding: "50px 20px"}}>
                <div className="row g-0">
                        <h6 className="card-title">Amount spent(in &#8377;)</h6>
                        <div className="col-12">
                        {pendingBill !== 0 && <BarPlot label={'Amount spend by status'} labels={['pending','accepted','rejected']} data={[pendingBill, acceptedBill, rejectedBill]} className="ms-auto"/>}
                        </div>
                    </div>
                    <h6 className='text-center text-info mt-5'>fig. Amount spent by status</h6>
                </div>
                <div className="card-outer-div text-white mb-3 col-10 col-lg-5" style={{padding: "50px 20px"}}>
                    <div className="row g-0">
                        <h6 className="card-title">Amount spent(in &#8377;)</h6>
                        <div className="col-12">
                        {Object.values(dataByTypeAmount).length > 0 && <BarPlot label={'Amount spend by category'} labels={categories} data={Object.values(dataByTypeAmount)} className="ms-auto"/>}
                        </div>
                    </div>
                    <h6 className='text-center text-info mt-5'>fig. Amount spent by category</h6>
                </div>
            </div>
        </div>
        </BillContext.Provider>
    )
}

export default UserStats;