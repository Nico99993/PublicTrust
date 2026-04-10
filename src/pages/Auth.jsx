import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Mail, Lock, Building, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.includes('@')) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    if (!isLogin && !role) {
      toast.error("Please select a role (Buyer/Seller).");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        toast.success("Welcome back!");
        navigate('/dashboard');
      } else {
        await signup(email, password, role);
        toast.success("Account created successfully!");
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      // Map common Firebase errors to friendly messages
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        toast.error("Invalid email or password.");
      } else if (error.code === 'auth/email-already-in-use') {
        toast.error("An account with this email already exists.");
      } else {
        toast.error("Authentication failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
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
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required 
                />
              </div>
              {isLogin && <a href="#" className="forgot-password">Forgot password?</a>}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Role</label>
                <select className="role-select" value={role} onChange={e => setRole(e.target.value)} required>
                  <option value="">Select a role</option>
                  <option value="seller">Seller (Create Invoices)</option>
                  <option value="buyer">Buyer (Manage Approvals)</option>
                </select>
              </div>
            )}

            <Button type="submit" size="lg" fullWidth disabled={loading}>
              {loading ? <Loader2 size={18} className="animate-spin" /> : (isLogin ? 'Log In' : 'Sign Up')}
            </Button>
          </form>

          <div className="auth-toggle">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" className="toggle-btn" onClick={() => setIsLogin(!isLogin)} disabled={loading}>
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
