
import React from 'react';
import { FaBell } from 'react-icons/fa'; // Import notification icon from react-icons/fa
import './Header.css'
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate=useNavigate()
    const handleLogout = () => {
        // Your logout logic here
    };
    const handleNotification = () => {
        navigate('/notifications')
    };
    const handleHome = () => {
        navigate('/dashbord')
    };

    return (
        <header className="header">
            <div className="logo-container">
               <h1 onClick={handleHome}>To Do List</h1>
            </div>
            <div className="header-icons">
                <button onClick={handleLogout} className="logout-button">Logout</button>
                <FaBell className="notification-icon" onClick={handleNotification}/>
            </div>
        </header>
    );
};

export default Header;
