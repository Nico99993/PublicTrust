import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Send, Download, Clock, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const data = [
  { name: 'Jan', received: 4000, sent: 2400 },
  { name: 'Feb', received: 3000, sent: 1398 },
  { name: 'Mar', received: 2000, sent: 9800 },
  { name: 'Apr', received: 2780, sent: 3908 },
  { name: 'May', received: 1890, sent: 4800 },
  { name: 'Jun', received: 2390, sent: 3800 },
  { name: 'Jul', received: 3490, sent: 4300 },
];

const Dashboard = () => {
  return (
    <div className="dashboard-page container page-container">
      <div className="page-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back! Here's what's happening with your invoices today.</p>
      </div>

      <div className="overview-cards">
        <Card className="stat-card">
          <div className="stat-icon bg-primary-light">
            <Send className="text-primary" size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Total Invoices Sent</span>
            <h3 className="stat-value">1,245</h3>
            <span className="stat-trend positive">+12% from last month</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon bg-success-light">
            <Download className="text-success" size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Invoices Received</span>
            <h3 className="stat-value">842</h3>
            <span className="stat-trend positive">+5% from last month</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon bg-warning-light">
            <Clock className="text-warning" size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Pending Approvals</span>
            <h3 className="stat-value">34</h3>
            <span className="stat-trend negative">-2% from last month</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon bg-danger-light">
             <DollarSign className="text-danger" size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">GST Summary (Est.)</span>
            <h3 className="stat-value">₹45,200</h3>
            <span className="stat-trend">Current Month</span>
          </div>
        </Card>
      </div>

      <div className="dashboard-grid">
        <Card className="chart-card">
          <h3>Monthly Activity</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" tick={{fill: 'var(--text-secondary)'}} />
                <YAxis stroke="var(--text-muted)" tick={{fill: 'var(--text-secondary)'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                />
                <Line type="monotone" dataKey="sent" stroke="var(--primary)" strokeWidth={3} dot={{r: 4}} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="received" stroke="var(--success)" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="recent-transactions-card">
          <h3>Recent Transactions</h3>
          <div className="table-wrapper">
             <table className="custom-table">
               <thead>
                 <tr>
                   <th>Invoice ID</th>
                   <th>Client</th>
                   <th>Amount</th>
                   <th>Status</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>#INV-2041</td>
                   <td>TechCorp India</td>
                   <td>₹12,500</td>
                   <td><Badge variant="success">Approved</Badge></td>
                 </tr>
                 <tr>
                   <td>#INV-2042</td>
                   <td>Global Solutions</td>
                   <td>₹4,200</td>
                   <td><Badge variant="warning">Pending</Badge></td>
                 </tr>
                 <tr>
                   <td>#INV-2043</td>
                   <td>Apex Systems</td>
                   <td>₹8,950</td>
                   <td><Badge variant="danger">Rejected</Badge></td>
                 </tr>
                 <tr>
                   <td>#INV-2044</td>
                   <td>Innovate LLC</td>
                   <td>₹21,000</td>
                   <td><Badge variant="success">Approved</Badge></td>
                 </tr>
               </tbody>
             </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
