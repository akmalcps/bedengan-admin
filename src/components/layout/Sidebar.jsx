import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  UtensilsCrossed, 
  Tent, 
  Camera, 
  ClipboardList, 
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { logout } from '../../utils/auth';

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo-text">
          <h2>BEDENGAN XPLORE</h2>
          <span>Admin Panel</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title">Main</div>
          <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Kawasan</div>
          <NavLink to="/admin/kawasan" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <Map size={20} />
            Kawasan Bedengan
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Katalog</div>
          <NavLink to="/admin/warung" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <UtensilsCrossed size={20} />
            Warung & Kuliner
          </NavLink>
          <NavLink to="/admin/rental" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <Tent size={20} />
            Rental Camping
          </NavLink>
          <NavLink to="/admin/fotografer" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <Camera size={20} />
            Fotografer
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Moderasi</div>
          <NavLink to="/admin/pendaftaran" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <ClipboardList size={20} />
            Pendaftaran Usaha/Jasa
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">System</div>
          <NavLink to="/admin/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
            <Settings size={20} />
            Pengaturan
          </NavLink>
        </div>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/admin/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
          <User size={20} />
          Admin Profile
        </NavLink>
        <button className="nav-item" onClick={handleLogout} style={{ width: '100%', textAlign: 'left' }}>
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
