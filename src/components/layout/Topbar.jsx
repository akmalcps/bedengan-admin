import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import { getUser } from '../../utils/auth';

export default function Topbar({ onMenuClick }) {
  const location = useLocation();
  const user = getUser();
  
  // Format the path for the breadcrumb
  const pathParts = location.pathname.split('/').filter(p => p && p !== 'admin');
  const currentTitle = pathParts.length > 0 
    ? pathParts[pathParts.length - 1].charAt(0).toUpperCase() + pathParts[pathParts.length - 1].slice(1)
    : 'Dashboard';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className="breadcrumb">
          <h1>{currentTitle}</h1>
        </div>
      </div>
      
      <div className="topbar-right">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>
        
        <div className="user-profile">
          <div className="user-info">
            <div className="user-name">{user?.name || 'Admin'}</div>
            <div className="user-role">{user?.role || 'Administrator'}</div>
          </div>
          <div className="user-avatar">
            <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=85BB45&color=fff`} alt="Profile" />
          </div>
        </div>
      </div>
    </header>
  );
}
