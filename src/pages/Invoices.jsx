import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Invoices.css';

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  return (
    <div className="invoices-page container page-container">
      <div className="page-header d-flex justify-between align-center">
        <div>
          <h2>Invoices</h2>
          <p>Manage, track, and create your B2B invoices.</p>
        </div>
        <Button onClick={() => navigate('/invoices/new')}>
          <Plus size={18} /> New Invoice
        </Button>
      </div>

      <Card className="invoices-list-card">
        <div className="invoices-toolbar">
          <div className="search-bar">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search invoices by ID or Client..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline"><Filter size={18} /> Filter</Button>
        </div>

        <div className="table-wrapper">
          <table className="custom-table hoverable-rows">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Client</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>#INV-2041</strong></td>
                <td>TechCorp India</td>
                <td>Apr 10, 2026</td>
                <td>₹12,500</td>
                <td><Badge variant="success">Approved</Badge></td>
                <td><button className="action-btn"><MoreHorizontal size={18} /></button></td>
              </tr>
              <tr>
                <td><strong>#INV-2042</strong></td>
                <td>Global Solutions</td>
                <td>Apr 09, 2026</td>
                <td>₹4,200</td>
                <td><Badge variant="warning">Pending</Badge></td>
                <td><button className="action-btn"><MoreHorizontal size={18} /></button></td>
              </tr>
              <tr>
                <td><strong>#INV-2043</strong></td>
                <td>Apex Systems</td>
                <td>Apr 05, 2026</td>
                <td>₹8,950</td>
                <td><Badge variant="danger">Rejected</Badge></td>
                <td><button className="action-btn"><MoreHorizontal size={18} /></button></td>
              </tr>
              <tr>
                <td><strong>#INV-2044</strong></td>
                <td>Innovate LLC</td>
                <td>Apr 01, 2026</td>
                <td>₹21,000</td>
                <td><Badge variant="success">Approved</Badge></td>
                <td><button className="action-btn"><MoreHorizontal size={18} /></button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Invoices;
