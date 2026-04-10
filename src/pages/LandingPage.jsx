import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page page-container">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <Badge variant="primary" className="mb-4">v2.0 Now Live</Badge>
            <h1 className="hero-title">
              Simplify B2B Invoicing & <span className="text-gradient">GST Returns</span>
            </h1>
            <p className="hero-description">
              Streamline your billing process with automated GST summaries, real-time tracking, 
              and a seamless buyer-seller experience.
            </p>
            
            <div className="hero-actions">
              <Button size="lg" onClick={() => navigate('/login')}>
                Get Started <ArrowRight size={18} />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/dashboard')}>
                View Demo
              </Button>
            </div>
          </div>
          
          <div className="hero-illustration">
            <div className="abstract-shape shape-1"></div>
            <div className="abstract-shape shape-2"></div>
            <div className="glass-panel illustration-card animate-slide-up">
              <div className="mock-invoice">
                <div className="mock-header"></div>
                <div className="mock-line-item"></div>
                <div className="mock-line-item"></div>
                <div className="mock-line-item short"></div>
                <div className="mock-footer">
                   <div className="status-approved"><CheckCircle2 size={16} /> Approved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="features-section container">
        <div className="feature-grid">
           <div className="glass-panel feature-card">
              <h3>Real-Time Tracking</h3>
              <p>Know exactly when your invoices are viewed, approved, or rejected.</p>
           </div>
           <div className="glass-panel feature-card">
              <h3>Automated GST</h3>
              <p>Generate detailed tax breakdowns (CGST, SGST, IGST) automatically.</p>
           </div>
           <div className="glass-panel feature-card">
              <h3>Seamless Collaboration</h3>
              <p>Communicate directly with clients via in-app messaging on every invoice.</p>
           </div>
        </div>
      </section>
    </div>
  );
};

// Need to import Badge for the Hero section
import { Badge } from '../components/Badge';

export default LandingPage;
