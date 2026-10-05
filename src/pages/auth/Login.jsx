import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { login, isAuthenticated } from '../../utils/auth';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (isAuthenticated()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (login(email, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Email atau password salah');
    }
  };

  return (
    <div className="login-container">
      <div className="login-visual">
        <div className="login-visual-content">
          <h1>Jelajahi<br/>Bedengan</h1>
          <p>Sistem Informasi Manajemen Katalog Bedengan Xplore.</p>
        </div>
      </div>
      
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <div className="login-header">
            <h2>Admin Panel</h2>
            <p>Masuk untuk mengelola ekosistem Bedengan Xplore</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="login-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bedenganxplore.test"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-submit-btn">
              Masuk
            </button>
            
            <p className="login-hint">
              Demo: admin@bedenganxplore.test / admin123
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
