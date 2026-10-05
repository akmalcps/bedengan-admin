import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Tent,
  Utensils,
  Camera,
  ClipboardList,
  Settings,
  LogOut
} from 'lucide-react';
import { logout } from '../../utils/auth';
import bedenganLogo from '../../assets/images/bedengan-logo.png';
import { currentAdmin } from '../../data/mock/adminMock';



export default function Sidebar({ isOpen, onClose, pendingCount }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Rental Camping", path: "/admin/rental", icon: Tent },
    { label: "Warung & Kuliner", path: "/admin/warung", icon: Utensils },
    { label: "Fotografer", path: "/admin/fotografer", icon: Camera },
    { label: "Pengajuan\nUsaha/Jasa", path: "/admin/pendaftaran", icon: ClipboardList, badge: pendingCount > 0 ? pendingCount : null }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <img src={bedenganLogo} alt="Bedengan Xplore" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-bedengan">BEDENGAN</span>
            <span className="brand-xplore">XPLORE</span>
          </div>
        </div>
        <div className="admin-panel-badge">
          <span className="status-dot"></span> Admin Panel
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span className="icon-wrapper"><item.icon size={18} strokeWidth={2.5} /></span>
            <span className="nav-label" style={{ whiteSpace: 'pre-line' }}>{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </NavLink>
        ))}

        <div className="nav-divider"></div>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={onClose}
        >
          <span className="icon-wrapper"><Settings size={18} strokeWidth={2.5} /></span>
          <span className="nav-label">Pengaturan</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="profile-card">
          <div className="profile-avatar">{currentAdmin.initials}</div>
          <div className="profile-info">
            <span className="profile-name">{currentAdmin.name}</span>
            <span className="profile-role">{currentAdmin.role}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <LogOut size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </aside>
  );
}
