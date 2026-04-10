import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, FileText, LayoutDashboard, FileSpreadsheet, LogIn } from 'lucide-react';
import './Navbar.css';

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-container">
        <NavLink to="/" className="navbar-brand">
          <div className="brand-logo">
            <span className="logo-icon">IT</span>
          </div>
          <h1>InvoiceTracker</h1>
        </NavLink>

        <div className="navbar-links">
          <NavLink to="/dashboard" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/invoices" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <FileText size={18} />
            <span>Invoices</span>
          </NavLink>
          <NavLink to="/gst-reports" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <FileSpreadsheet size={18} />
            <span>GST Reports</span>
          </NavLink>
        </div>

        <div className="navbar-actions">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <NavLink to="/login" className="login-btn">
            <LogIn size={18} />
            <span>Login</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
