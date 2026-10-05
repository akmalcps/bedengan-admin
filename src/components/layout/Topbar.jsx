import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Bell, CheckCircle2 } from 'lucide-react';
import { getUser } from '../../utils/auth';

export default function Topbar({ onMenuClick, pendingApplications = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  const pendingCount = pendingApplications.length;

  // Format the path for the breadcrumb
  const pathParts = location.pathname.split('/').filter(p => p && p !== 'admin');
  const currentTitle = pathParts.length > 0
    ? pathParts[pathParts.length - 1].charAt(0).toUpperCase() + pathParts[pathParts.length - 1].slice(1)
    : 'Dashboard';

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isNotificationOpen]);

  // Close on route change
  useEffect(() => {
    setIsNotificationOpen(false);
  }, [location.pathname]);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return 'Baru saja';
    if (diffHours < 24) return `${diffHours} jam lalu`;
    return `${diffDays} hari lalu`;
  };

  const handleNotificationClick = (appId) => {
    setIsNotificationOpen(false);
    navigate(`/admin/pendaftaran/${appId}`);
  };

  const handleViewAll = () => {
    setIsNotificationOpen(false);
    navigate('/admin/pendaftaran');
  };

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
        <div className="notification-wrapper" ref={notificationRef}>
          <button
            className="notification-btn"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            aria-label="Notifikasi"
            aria-expanded={isNotificationOpen}
          >
            <Bell size={20} />
            {pendingCount > 0 && <span className="notification-badge">{pendingCount}</span>}
          </button>

          {isNotificationOpen && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Notifikasi</h3>
                {pendingCount > 0 && <span>{pendingCount} pengajuan menunggu review</span>}
              </div>

              <div className="notification-body">
                {pendingCount > 0 ? (
                  pendingApplications.map(app => (
                    <button
                      key={app.id}
                      className="notification-item"
                      onClick={() => handleNotificationClick(app.id)}
                    >
                      <div className="notification-dot"></div>
                      <div className="notification-content">
                        <span className="notification-title">{app.businessName}</span>
                        <span className="notification-desc">{app.applicantName}</span>
                        <span className="notification-desc">{app.category}</span>
                        <span className="notification-time">{formatTimeAgo(app.submittedAt)}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="notification-empty">
                    <CheckCircle2 size={32} className="empty-icon" />
                    <p className="empty-title">Tidak ada pengajuan baru</p>
                    <p className="empty-desc">Semua pengajuan sudah diproses.</p>
                  </div>
                )}
              </div>

              <div className="notification-footer">
                <button onClick={handleViewAll}>Lihat semua pengajuan &rarr;</button>
              </div>
            </div>
          )}
        </div>

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
