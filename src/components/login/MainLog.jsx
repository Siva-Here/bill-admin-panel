import React from 'react'
import Log from './Log'

const MainLog = () => {
    return (
        <div className='container-lg'>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="col-lg-6 col-md-8 col-sm-12">
                    <Log/>
                </div>
            </div>
        </div>
    )
}

export default MainLog;