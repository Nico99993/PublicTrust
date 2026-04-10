import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Mail, Lock, Building, ArrowLeft } from 'lucide-react';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder login action
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to Home</Link>
      
      <div className="auth-container animate-slide-up">
        <div className="auth-brand">
          <div className="brand-logo">IT</div>
          <h2>InvoiceTracker</h2>
          <p>{isLogin ? 'Welcome back! Log in to your account.' : 'Create an account to start managing invoices.'}</p>
        </div>

        <Card className="auth-card">
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label>Company Name</label>
                <div className="input-with-icon">
                  <Building className="input-icon" size={18} />
                  <input type="text" placeholder="Enter company name" required />
                </div>
              </div>
            )}
            
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail className="input-icon" size={18} />
                <input type="email" placeholder="name@company.com" required />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={18} />
                <input type="password" placeholder="••••••••" required />
              </div>
              {isLogin && <a href="#" className="forgot-password">Forgot password?</a>}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Role</label>
                <select className="role-select" required>
                  <option value="">Select a role</option>
                  <option value="seller">Seller (Create Invoices)</option>
                  <option value="buyer">Buyer (Manage Approvals)</option>
                </select>
              </div>
            )}

            <Button type="submit" size="lg" fullWidth>
              {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
          </form>

          <div className="auth-toggle">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
