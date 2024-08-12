import AdminLeftbar from '@/components/Admin/AdminLeftbar'
import AdminTopbar from '@/components/Admin/AdminTopbar'
import React,{useState,useEffect} from 'react'
import { Outlet ,useNavigate} from 'react-router-dom'
import { authService } from '../services/auth';


const AdminLayout = () => {
  const Navigate = useNavigate()
  const checkAuth = async () => {
      if (!authService.isLoggedIn() || authService.getUserRole() !== "ADMIN") {
          Navigate('/login');
      }
  };
  useEffect(() => {
      checkAuth();
  }, [Navigate]);
  return (
    <div className='h-screen w-screen overflow-x-hidden  m-0 p-0 flex flex-row overflow-y-auto'>
        <AdminLeftbar/>
        <div className='h-screen w-5/6 flex justify-center items-center flex-col'>
        
        <AdminTopbar/>
        <div className='h-[92vh] w-full'>

        <Outlet/>
        </div>
        </div> 
    </div>
  )
}

export default AdminLayout