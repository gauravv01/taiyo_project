import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, ChartBarIcon, MapIcon } from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <NavLink to="/" className={({ isActive }) => 
          `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
            isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
          }`
        }>
          <HomeIcon className="h-6 w-6" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/contacts" className={({ isActive }) => 
          `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
            isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
          }`
        }>
          <UserGroupIcon className="h-6 w-6" />
          <span>Contacts</span>
        </NavLink>
        <NavLink to="/charts" className={({ isActive }) => 
          `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
            isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
          }`
        }>
          <ChartBarIcon className="h-6 w-6" />
          <span>Charts</span>
        </NavLink>
        <NavLink to="/maps" className={({ isActive }) => 
          `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
            isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
          }`
        }>
          <MapIcon className="h-6 w-6" />
          <span>Maps</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;