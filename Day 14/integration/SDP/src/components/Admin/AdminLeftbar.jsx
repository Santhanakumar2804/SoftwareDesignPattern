import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import { LayoutDashboard, Users, ClipboardCheck, LogOut } from 'lucide-react';

const AdminLeftbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const AdminLinks = [
    {
      title: 'Dashboard',
      link: '/admin/dashboard',
      icon: <LayoutDashboard className='mr-2' />,
    },
    {
      title: 'Users',
      link: '/admin/users',
      icon: <Users className='mr-2' />,
    },
    {
      title: 'Claims',
      link: '/admin/claims',
      icon: <ClipboardCheck className='mr-2' />,
    },
  ];

  const handleLogout = () => {
    // Perform any necessary logout logic here (e.g., clearing tokens, user data)
    
    // Navigate to the home page
    navigate('/');
  };

  return (
    <div className='h-screen w-1/6 flex flex-col justify-between items-center bg-card text-card-foreground pt-10 shadow-lg border-r border-gray-300'>
      
      <div className='w-full flex flex-col items-center'>
        
        {AdminLinks.map((data, index) => (
          <li key={index} className='list-none w-[90%] my-2'>
            <NavLink
              to={data.link}
              className='flex items-center w-full px-4 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-200'
              activeClassName='bg-primary text-primary-foreground font-semibold'
            >
              {data.icon}
              {data.title}
            </NavLink>
          </li>
        ))}
      </div>
      <div className='w-full flex flex-col items-center pb-10'>
        
        <button
          onClick={handleLogout}
          className='flex items-center px-4 py-2 rounded-md bg-destructive hover:bg-red-950 text-destructive-foreground transition-colors duration-200'
        >
          <LogOut className='mr-2' />
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminLeftbar;