import React from 'react'
import Reg from './Reg'
import './register.css';
import Sidebar from '../navbar/Sidebar';

const MainReg = () => {
    return (
        <div>
            <Sidebar />
            <div className='container-lg'>
                <div className="row justify-content-center align-content-center align-items-center ">
                    <div className="col-lg-6 col-md-6 col-sm-12 mt-2 pt-5">
                        <Reg/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainReg