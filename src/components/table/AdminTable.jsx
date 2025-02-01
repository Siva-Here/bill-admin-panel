// import React, { useState, useEffect } from 'react';
// import './AdminTable.css';
// import axios from 'axios';

// function AdminTable() {
//   const [status, setStatus] = useState('All Bills');
//   const [data, setData] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image URL
//   let statusColor = '';
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('jwtToken');
//         console.log(token);
//         const response = await axios.get(
//           'http://localhost:8000/admin/fetchAllBills',
//           // { username: localStorage.getItem('username') },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
        
//         setData(response.data.bills.reverse());
//       } catch (error) {
//         console.error('Error:', error);
//         // Handle error
//       }
//     };

//     fetchData();
//   }, []);


//   // Function to handle image click
//   const handleImageClick = (image) => {
//     console.log("Image clicked:", image);
//     setSelectedImage(image); // Set the selected image URL to show in the popup
//   };
  

//   return (
//     <div>
//       <div className='d-flex'>
//         <h1 className='text-white ms-auto text-center flex-1'>Your Bills</h1>
//         <select className='w-25 ms-auto me-auto m-3 form-select flex-2' onChange={(e) => { setStatus(e.target.value); }}>
//           <option value="All Bills">All Bills</option>
//           <option value="pending">pending</option>
//           <option value="accepted">accepted</option>
//           <option value="rejected">rejected</option>
//         </select>
//       </div>
//       <table className='table-striped table-hover w-75 container'>
//         <tr className='row heading mb-3'>
//           <td data-cell='SNO' className='col-1 text-center heading d-none d-sm-inline '>SN0</td>
//           <td data-cell='Name' className='col-2 text-center heading d-none d-sm-inline'>NAME</td>
//           <td data-cell='Amount' className='col-3 text-center heading d-none d-sm-inline'>AMOUNT</td>
//           <td data-cell='Type' className='col-3 text-center heading d-none d-sm-inline'>TYPE</td>
//           <td data-cell='status' className='col-3 text-center heading d-none d-sm-inline'>STATUS</td>
//         </tr>
//         <hr className='d-none d-sm-inline' id='hr1' />
//         <tbody>
//           {data.map((data1, index) => {
//             return (
//               <>
//                 {(data1.status === status || status==='All Bills') ? (
//                   <>
//                     <tr className='row' key={index}>
//                       <td data-cell='SNo' className='col-1 text-center d-none d-md-inline d-sm-none'>{index + 1}</td>
//                       <td data-cell='Name' className='col-xs-8 col-sm-4 col-md-2 text-center'>{data1.name}</td>
//                       <td data-cell='Amount' className='col-xs-8 col-sm-4 col-md-3 text-center'>{data1.amount}</td>
//                       <td data-cell='Type' className='col-xs-8 col-sm-4 col-md-3 text-center'>{data1.type}</td>
//                       <td data-cell='Status' className='col-xs-8 col-sm-4 col-md-3 text-center d-sm-inline' style={{color: {statusColor}}}>{data1.status}</td>
//                       <td data-cell='image' className='col-12 text-center d-sm-inline'>
//                         <img 
//                           className='ms-auto me-auto' 
//                           src={data1.image} 
//                           alt="" 
//                           width="300vw" 
//                           onClick={() => handleImageClick(data1.image)} // Call handleImageClick on image click
//                         />
//                       </td>
//                     </tr>
//                     <hr id='hr' />
//                   </>
//                 ) : (
//                   <></>
//                 )}
//               </>
//             );
//           })}
//         </tbody>
//       </table>
//       {/* Popup for displaying the selected image */}
//       {selectedImage && (
//         <div className="popup">
//           <div className="popup-content">
//             <a target='_blank' href={selectedImage}><img src={selectedImage} alt="Popup" /></a>
//             <button onClick={() => setSelectedImage(null)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminTable;





import React, { useState, useEffect } from 'react';
import styles from './AdminTable.module.css';
import axios from 'axios';

function AdminTable() {
  const [status, setStatus] = useState('All Bills');
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  let statusColor = '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        console.log(token);
        const response = await axios.get('http://localhost:8000/admin/fetchAllBills', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        
        setData(response.data.bills.reverse());
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const handleImageClick = (image) => {
    console.log("Image clicked:", image);
    setSelectedImage(image);
  };

  return (
    <div>
      <div className='d-flex'>
        <h1 className='text-white ms-auto text-center flex-1'>Your Bills</h1>
        <select className='w-25 ms-auto me-auto m-3 form-select flex-2' onChange={(e) => { setStatus(e.target.value); }}>
          <option value="All Bills">All Bills</option>
          <option value="pending">pending</option>
          <option value="accepted">accepted</option>
          <option value="rejected">rejected</option>
        </select>
      </div>
      {/* <table className={`${styles.table} table-striped table-hover w-75 container`}>
        <tr className={`${styles.heading} row mb-3`}>
          <td data-cell='SNO' className='col-1 text-center d-none d-sm-inline'>SN0</td>
          <td data-cell='Name' className='col-2 text-center d-none d-sm-inline'>NAME</td>
          <td data-cell='Amount' className='col-3 text-center d-none d-sm-inline'>AMOUNT</td>
          <td data-cell='Type' className='col-3 text-center d-none d-sm-inline'>TYPE</td>
          <td data-cell='status' className='col-3 text-center d-none d-sm-inline'>STATUS</td>
        </tr>
        <hr className='d-none d-sm-inline' id={styles.hr1} />
        <tbody>
          {data.map((data1, index) => (
            (data1.status === status || status === 'All Bills') && (
              <>
                <tr className='row' key={index}>
                  <td data-cell='SNo' className='col-1 text-center d-none d-md-inline d-sm-none'>{index + 1}</td>
                  <td data-cell='Name' className='col-xs-8 col-sm-4 col-md-2 text-center'>{data1.name}</td>
                  <td data-cell='Amount' className='col-xs-8 col-sm-4 col-md-3 text-center'>{data1.amount}</td>
                  <td data-cell='Type' className='col-xs-8 col-sm-4 col-md-3 text-center'>{data1.type}</td>
                  <td data-cell='Status' className='col-xs-8 col-sm-4 col-md-3 text-center d-sm-inline' style={{ color: statusColor }}>{data1.status}</td>
                  <td data-cell='image' className='col-12 text-center d-sm-inline'>
                    <img 
                      className='ms-auto me-auto' 
                      src={data1.image} 
                      alt="" 
                      width="300vw" 
                      onClick={() => handleImageClick(data1.image)} 
                    />
                  </td>
                </tr>
                <hr className={styles.hr} />
              </>
            )
          ))}
        </tbody>
      </table> */}


<div className={`${styles.tableContainer} w-100 container mb-5 p-2`}>
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
                (data1.status === status || status === 'All Bills') &&
                (data1.name.toLowerCase().includes(text.toLowerCase()) ||
                  data1?.billType?.toLowerCase().includes(text.toLowerCase())) && (
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
                    <td className={styles.tableDataCell} style={{ color: statusColor }}>
                      {data1.status}
                    </td>
                    <td className={styles.tableDataCell}>
                      <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                        <img
                          src={data1.image}
                          alt=""
                          className={styles.image}
                          style={{ cursor: 'pointer', borderRadius: '2px' }}
                          onClick={() => handlePreview(data1.image)}
                        />
                         <button className={styles.buttonOverlay} style={{ width: '100px', height: '20px', fontSize: '9px' }} onClick={() => handlePreview(data1.image)}>Click For Preview</button>
                      </div>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>




      {selectedImage && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <a target='_blank' href={selectedImage}><img src={selectedImage} alt="Popup" /></a>
            <button onClick={() => setSelectedImage(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTable;



