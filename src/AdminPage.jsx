
import Sidebar  from './components/navbar/Sidebar';
import Home from './components/home/Home';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function AdminPage() {
  const isLoggedIn = localStorage.getItem('jwtToken') !==null;
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/');
      return;
    }
  },[])
  
  return(
    <>
      <div>
          <Sidebar />
          <div className='container-lg'>
          <Home className='ms-5'/>
          </div>
      </div>
    </>
  )
}

export default AdminPage;