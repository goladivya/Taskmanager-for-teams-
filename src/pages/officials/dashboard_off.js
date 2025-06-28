import React, { useState } from 'react';
import Sidebar from './sidebar_off';
import AssignedTasks from './assignedTasks';
import MyTasks from '../Mytasks';
import '../../styles/dashboard-off.css';

export default function DashboardOfficer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const user = JSON.parse(localStorage.getItem("user")); 
   const username = user?.username || "Officer";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        scrollToSection={scrollToSection}
      />
      <div className="main-content">
        <h1 className="dashboard-title" id="dashboard">Welcome  {username.charAt(0).toUpperCase() + username.slice(1)} – Stay on Track!</h1>
        <div id="assigned-tasks"><AssignedTasks /></div>
        <div id="my-tasks"><MyTasks /></div>
      </div>
    </div>
  );
}
