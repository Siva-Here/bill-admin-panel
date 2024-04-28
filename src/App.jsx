import React, { useState, createContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLog from './components/login/MainLog';
import AdminPage from './AdminPage';
import BillsPage from './components/bills/bills-page/BillsPage';
import Upload from './components/upload-component/Upload';
import UserStats from './components/bills/bill-stats/UserStats';

const BillContext = createContext();

function App() {
    const [data, setData] = useState([]); 
    const [users, setUsers] = useState([]);
    
    return (
        <BillContext.Provider value={{ data, setData, users, setUsers }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLog />} />
                    <Route path="/login" element={<MainLog />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/admin/bills" element={<BillsPage />} />
                    <Route path="/admin/users" element={<UserStats />} />
                    <Route path="*" element={<h1 className='text-white'>Page Not Found</h1>} />
                </Routes>
            </BrowserRouter>
        </BillContext.Provider>
    );
}

export { App, BillContext };
