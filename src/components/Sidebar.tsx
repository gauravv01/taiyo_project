import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  ChartBarIcon,
  MapIcon,
} from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={`bg-gray-800 text-white space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out pt-20 ${
        open ? "w-64" : "w-[7%]"
      }`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 mb-4 ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`
          }>
          <UserGroupIcon className="h-6 w-6" />
          {open && <span>Contacts</span>}
        </NavLink>
        <NavLink
          to="/charts"
          className={({ isActive }) =>
            `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 mb-4 ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`
          }>
          <ChartBarIcon className="h-6 w-6" />
          {open && <span>Charts</span>}
        </NavLink>
        <NavLink
          to="/maps"
          className={({ isActive }) =>
            `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`
          }>
          <MapIcon className="h-6 w-6" />
          {open && <span>Maps</span>}
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
