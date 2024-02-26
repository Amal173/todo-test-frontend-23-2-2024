
import React from 'react';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ShareIcon from '@mui/icons-material/Share';
import Cookies from 'js-cookie';
import './Header.css'

const Header = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        Cookies.remove('token');
        localStorage.removeItem("userId");
        navigate("/");
    };

    const handleNotification = () => {
        navigate('/notifications')
    };

    const handleShare = () => {
        navigate('/shared')
    };

    const handleHome = () => {
        navigate('/dashbord')
    };

    return (
        <header className="header">
            <div className="logo-container">
                <h1 className='logo' onClick={handleHome}>To Do List</h1>
            </div>
            <div className="header-icons">
                <button onClick={handleLogout} className="logout-button">Logout</button>
                <FaBell className="notification-icon" onClick={handleNotification} />
                <ShareIcon className="share-icon" onClick={handleShare} sx={{ m: 2 }} />
            </div>
        </header>
    );
};

export default Header;
