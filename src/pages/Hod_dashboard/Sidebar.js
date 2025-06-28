import React from "react";
import { useNavigate ,NavLink } from "react-router-dom";

import '../../styles/dashboard-off.css';

export default function SidebarOfficer({ isOpen, toggleSidebar, scrollToSection }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/');
  };

  return (
    <div className={`sidebar-wrapper ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </div>
      {isOpen && (
        <div className="sidebar">
          <ul>
            <li onClick={() => scrollToSection('dashboard')}>Dashboard</li>
            <li onClick={() => scrollToSection('officers')}>Assigned Tasks</li>
            <li onClick={() => scrollToSection('my-tasks')}>My Tasks</li>
            <li><NavLink to="/done-tasks" className="nav-link">Done Tasks</NavLink></li>
            <li onClick={handleLogout}>Log Out</li>
          </ul>
        </div>
      )}
    </div>
  );
}
