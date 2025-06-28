import React, { useState } from 'react';
import Sidebar from './Sidebar';
import OfficerTasks from './officerTasks';
import MyTasks from '../Mytasks';
import '../../styles/dashboard-hod.css';

export default function DashboardHod() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <h1 className="dashboard-title" id="dashboard">Stay organized and achieve your goals</h1>
        <div id="officers"><OfficerTasks /></div>
        <div id="my-tasks"><MyTasks /></div>
      </div>
    </div>
  );
}
