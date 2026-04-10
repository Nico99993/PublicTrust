import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { FileDown, Calendar } from 'lucide-react';

const GstReports = () => {
  return (
    <div className="gst-reports-page container page-container">
      <div className="page-header d-flex justify-between align-center">
        <div>
          <h2>GST Returns</h2>
          <p>Auto-generated GST summaries for easy filing.</p>
        </div>
        <Button>
          <FileDown size={18} /> Export JSON
        </Button>
      </div>

      <div className="overview-cards" style={{ marginBottom: '2rem' }}>
        <Card className="stat-card">
          <div className="stat-details">
            <span className="stat-label">Total Taxable Value</span>
            <h3 className="stat-value">₹2,45,000</h3>
            <span className="stat-trend">Current Month</span>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-details">
            <span className="stat-label">Total CGST</span>
            <h3 className="stat-value">₹22,050</h3>
            <span className="stat-trend text-primary">@ 9% average</span>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-details">
            <span className="stat-label">Total SGST</span>
            <h3 className="stat-value">₹22,050</h3>
            <span className="stat-trend text-primary">@ 9% average</span>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-details">
            <span className="stat-label">Total IGST</span>
            <h3 className="stat-value">₹5,200</h3>
            <span className="stat-trend text-primary">Inter-state sales</span>
          </div>
        </Card>
      </div>

      <Card>
        <div className="d-flex justify-between align-center mb-4" style={{ marginBottom: '1.5rem' }}>
          <h3>GSTR-1 Summary (April 2026)</h3>
          <Button variant="outline" size="sm"><Calendar size={16}/> Select Month</Button>
        </div>

        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>No. of Invoices</th>
                <th>Taxable Value</th>
                <th>CGST</th>
                <th>SGST</th>
                <th>IGST</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>B2B Sales</strong></td>
                <td>42</td>
                <td>₹2,00,000</td>
                <td>₹18,000</td>
                <td>₹18,000</td>
                <td>₹5,200</td>
              </tr>
              <tr>
                <td><strong>B2C Sales</strong></td>
                <td>18</td>
                <td>₹45,000</td>
                <td>₹4,050</td>
                <td>₹4,050</td>
                <td>-</td>
              </tr>
              <tr style={{ background: 'var(--bg-color)' }}>
                <td><strong>Total</strong></td>
                <td><strong>60</strong></td>
                <td><strong>₹2,45,000</strong></td>
                <td><strong>₹22,050</strong></td>
                <td><strong>₹22,050</strong></td>
                <td><strong>₹5,200</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default GstReports;
