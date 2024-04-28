
import Sidebar  from './components/navbar/Sidebar';
import Home from './components/home/Home';

function AdminPage() {
  return(
    <>
      {localStorage.getItem('jwtToken') && <div>
          <Sidebar />
          <div className='container-lg'>
          <Home className='ms-5'/>
          </div>
      </div>}    
    </>
  )
}

export default AdminPage;