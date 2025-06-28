//import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import '../../styles/dashboard-off.css';


export default function Sidebar({ isOpen, toggleSidebar, scrollToSection }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate('/');
    }
    return (
        <>
            <div className='toggle-icon' onClick={toggleSidebar}>☰</div>
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <ul>
                    <li onClick={() => scrollToSection('dashboard')}>Dashboard</li>
                    <li onClick={() => scrollToSection('assigned-tasks')}>Assigned Tasks</li>
                    <li onClick={() => scrollToSection('my-tasks')}>My Tasks</li>
                    <li><NavLink to="/done-tasks" className="nav-link">Done Tasks</NavLink></li>
                     <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>
        </>
    );
}