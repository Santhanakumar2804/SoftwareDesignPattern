// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { LayoutDashboard, FileText, Headphones, HelpCircle, LogOut } from 'lucide-react';

// const UserLeftbar = () => {
//   const navigate = useNavigate();

//   const UserLinks = [
//     {
//       title: 'Dashboard',
//       link: '/user/dashboard',
//       icon: <LayoutDashboard className='mr-2' />,
//     },
//     {
//       title: 'Get Policy',
//       link: '/user/policy',
//       icon: <FileText className='mr-2' />,
//     },
//     {
//       title: 'FAQ',
//       link: '/user/faq',
//       icon: <HelpCircle className='mr-2' />,
//     },
//   ];

//   const handleLogout = () => {
//     navigate('/');
//   };

//   return (
//     <div className='fixed h-screen w-1/6 flex flex-col justify-between items-center bg-card text-card-foreground pt-10 shadow-lg border-r border-gray-300'>
//       <div className='w-full flex flex-col items-center'>
//         {UserLinks.map((data, index) => (
//           <li key={index} className='list-none w-[90%] my-2'>
//             <NavLink
//               to={data.link}
//               className='flex items-center w-full px-4 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-200'
//               activeClassName='bg-primary text-primary-foreground font-semibold'
//             >
//               {data.icon}
//               {data.title}
//             </NavLink>
//           </li>
//         ))}
//       </div>
//       <div className='w-full flex flex-col items-center pb-10'>
//         <button
//           onClick={handleLogout}
//           className='flex items-center px-4 py-2 rounded-md bg-destructive hover:bg-red-950 text-destructive-foreground transition-colors duration-200'
//         >
//           <LogOut className='mr-2' />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default UserLeftbar;