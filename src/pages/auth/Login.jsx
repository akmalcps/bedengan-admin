import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Eye, EyeOff, AtSign, Lock } from 'lucide-react';
import { login, isAuthenticated } from '../../utils/auth';
// Replace this placeholder with the Bedengan Xplore logo asset.
import bedenganLogo from '../../assets/images/bedengan-logo2.png';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (isAuthenticated()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Using setTimeout to simulate loading state slightly for better UX,
    // although existing logic was synchronous.
    setTimeout(() => {
      if (login(email, password)) {
        navigate('/admin/dashboard');
      } else {
        setError('Email atau kata sandi tidak valid.');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-brand">
          <img src={bedenganLogo} alt="Bedengan Xplore" className="login-brand-logo" />
          <div className="login-brand-name">
            <span className="brand-bedengan">BEDENGAN</span>
            <span className="brand-xplore"> XPLORE</span>
          </div>
        </div>

        <div className="login-header">
          <h1>Selamat Datang, Admin</h1>
          <p>Sistem Informasi Manajemen Katalog Bedengan Xplore.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Petugas</label>
            <div className="input-with-icon">
              <AtSign className="input-icon left-icon" size={18} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bedenganxplore.id"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Kata Sandi</label>
            <div className="input-with-icon">
              <Lock className="input-icon left-icon" size={18} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Ingat saya</span>
            </label>
            <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>
              Lupa password?
            </a>
          </div>

          <button type="submit" className="login-submit-btn" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Masuk ke Dashboard →'}
          </button>
        </form>
      </div>
    </div>
  );
}
