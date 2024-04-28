import React from 'react';
import Reg from './Reg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainReg = () => {
    const isLoggedIn = localStorage.getItem('jwtToken') !==null;
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isLoggedIn){
        navigate('/');
        return;
        }
    },[]);
    return (
        <>
        
            <div className='container-lg'>
                <div className="row justify-content-center align-content-center align-items-center ">
                    <div className="col-lg-6 col-md-6 col-sm-12 mt-5 pt-5">
                        <Reg />
                    </div>
                </div>
            </div>
        
        </>
    );
};

export default MainReg;
