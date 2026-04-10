import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ArrowLeft, Plus, Trash2, Save, Send, Building, FileText, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import './CreateInvoice.css';

const generateInvoiceId = () => {
  return `INV-${Math.floor(100000 + Math.random() * 900000)}`;
};

const CreateInvoice = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form State
  const [buyerDetails, setBuyerDetails] = useState({
    name: '',
    company: '',
    gstin: '',
    email: ''
  });

  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: generateInvoiceId(),
    date: new Date().toISOString().split('T')[0],
    dueDate: ''
  });

  const [items, setItems] = useState([
    { id: 1, name: '', quantity: 1, price: 0, gstRate: 18 }
  ]);

  // Computed Totals
  const [totals, setTotals] = useState({
    subtotal: 0,
    totalGst: 0,
    grandTotal: 0
  });

  useEffect(() => {
    // Calculate totals automatically when items change
    let subtotal = 0;
    let totalGst = 0;

    items.forEach(item => {
      const itemTotal = (item.quantity || 0) * (item.price || 0);
      const gstAmount = itemTotal * ((item.gstRate || 0) / 100);
      
      subtotal += itemTotal;
      totalGst += gstAmount;
    });

    setTotals({
      subtotal,
      totalGst,
      grandTotal: subtotal + totalGst
    });
  }, [items]);

  // Handlers
  const handleBuyerChange = (e) => {
    setBuyerDetails({ ...buyerDetails, [e.target.name]: e.target.value });
  };

  const handleInvoiceChange = (e) => {
    setInvoiceDetails({ ...invoiceDetails, [e.target.name]: e.target.value });
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), name: '', quantity: 1, price: 0, gstRate: 18 }
    ]);
  };

  const removeItem = (id) => {
    if (items.length === 1) {
      toast.error("An invoice must have at least one item.");
      return;
    }
    setItems(items.filter(item => item.id !== id));
  };

  const validateForm = (isDraft) => {
    if (!isDraft) {
      if (!buyerDetails.name || !buyerDetails.email || !buyerDetails.company) {
        toast.error("Please fill in all required buyer details.");
        return false;
      }
      if (!invoiceDetails.dueDate) {
        toast.error("Please explicitly set a Due Date.");
        return false;
      }
    }
    
    // Check items formatting
    const hasEmptyItem = items.some(i => !i.name || i.price <= 0 || i.quantity <= 0);
    if (!isDraft && hasEmptyItem) {
      toast.error("All items must have a valid name, quantity, and price.");
      return false;
    }

    if (items.length === 0) {
      toast.error("Please add at least one item.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (status) => {
    // status = 'Pending' (Sent) | 'Draft'
    const isDraft = status === 'Draft';
    if (!validateForm(isDraft)) return;

    setLoading(true);
    try {
      const invoiceData = {
        sellerId: currentUser.uid,
        buyerDetails,
        invoiceDetails,
        items,
        totals,
        status: status,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'invoices'), invoiceData);
      
      toast.success(isDraft ? "Draft saved successfully!" : "Invoice sent successfully!");
      navigate('/invoices');

    } catch (error) {
      console.error("Error creating invoice: ", error);
      toast.error("Failed to save invoice.");
    } finally {
      setLoading(false);
    }
  };

  // View Helpers
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="create-invoice-page container page-container">
      <div className="page-header d-flex justify-between align-center">
        <div>
          <h2>Create New Invoice</h2>
          <p>Draft and send a professional B2B invoice.</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/invoices')}>
          <ArrowLeft size={18} /> Back
        </Button>
      </div>

      <Card className="invoice-form-card">
        {/* Section 1: Buyer Details */}
        <section className="form-section">
          <h3 className="section-title"><Building className="section-icon" size={20}/> Buyer Details</h3>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Contact Name <span className="text-danger">*</span></label>
              <input type="text" name="name" value={buyerDetails.name} onChange={handleBuyerChange} placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label>Company Name <span className="text-danger">*</span></label>
              <input type="text" name="company" value={buyerDetails.company} onChange={handleBuyerChange} placeholder="Acme Corp" />
            </div>
            <div className="form-group">
              <label>Email Address <span className="text-danger">*</span></label>
              <input type="email" name="email" value={buyerDetails.email} onChange={handleBuyerChange} placeholder="john@acme.com" />
            </div>
            <div className="form-group">
              <label>GSTIN (Optional)</label>
              <input type="text" name="gstin" value={buyerDetails.gstin} onChange={handleBuyerChange} placeholder="ex. 22AAAAA0000A1Z5" />
            </div>
          </div>
        </section>

        {/* Section 2: Invoice Details */}
        <section className="form-section">
          <h3 className="section-title"><FileText className="section-icon" size={20}/> Invoice Details</h3>
          <div className="form-grid-3">
            <div className="form-group">
              <label>Invoice Number</label>
              <input type="text" name="invoiceNumber" value={invoiceDetails.invoiceNumber} onChange={handleInvoiceChange} />
            </div>
            <div className="form-group">
              <label>Invoice Date</label>
              <input type="date" name="date" value={invoiceDetails.date} onChange={handleInvoiceChange} />
            </div>
            <div className="form-group">
              <label>Due Date <span className="text-danger">*</span></label>
              <input type="date" name="dueDate" value={invoiceDetails.dueDate} onChange={handleInvoiceChange} />
            </div>
          </div>
        </section>

        {/* Section 3: Line Items */}
        <section className="form-section">
          <div className="d-flex justify-between align-center mb-4" style={{marginBottom: '1rem'}}>
            <h3 className="section-title" style={{marginBottom: 0}}><Package className="section-icon" size={20}/> Line Items</h3>
            <Button variant="secondary" size="sm" onClick={addItem}>
              <Plus size={16} /> Add Item
            </Button>
          </div>

          <div className="items-table-wrapper">
            <table className="items-table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Product/Service Name</th>
                  <th>Quantity</th>
                  <th>Price (₹)</th>
                  <th>GST %</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const itemTotal = (item.quantity || 0) * (item.price || 0);
                  const gstAmount = itemTotal * ((item.gstRate || 0) / 100);
                  
                  return (
                    <tr key={item.id}>
                      <td>
                        <input 
                          type="text" 
                          className="table-input" 
                          placeholder="Web Development"
                          value={item.name}
                          onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                        />
                      </td>
                      <td>
                        <input 
                          type="number" 
                          className="table-input" 
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        />
                      </td>
                      <td>
                        <input 
                          type="number" 
                          className="table-input currency" 
                          min="0"
                          value={item.price}
                          onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                        />
                      </td>
                      <td>
                        <select 
                          className="table-select"
                          value={item.gstRate}
                          onChange={(e) => handleItemChange(item.id, 'gstRate', parseFloat(e.target.value) || 0)}
                        >
                          <option value="0">0%</option>
                          <option value="5">5%</option>
                          <option value="12">12%</option>
                          <option value="18">18%</option>
                          <option value="28">28%</option>
                        </select>
                      </td>
                      <td className="currency" style={{ fontWeight: 600 }}>
                        {formatCurrency(itemTotal + gstAmount)}
                      </td>
                      <td>
                        <button className="btn-remove" onClick={() => removeItem(item.id)} title="Remove Item">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="invoice-summary">
            <div className="summary-box">
              <div className="summary-row">
                <span>Subtotal</span>
                <span className="summary-value">{formatCurrency(totals.subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Total GST</span>
                <span className="summary-value">{formatCurrency(totals.totalGst)}</span>
              </div>
              <div className="summary-row total">
                <span>Grand Total</span>
                <span className="summary-value">{formatCurrency(totals.grandTotal)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="actions-row">
          <Button variant="outline" onClick={() => navigate('/invoices')} disabled={loading}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={() => handleSubmit('Draft')} disabled={loading}>
            <Save size={18} /> Save Draft
          </Button>
          <Button onClick={() => handleSubmit('Pending')} disabled={loading}>
            <Send size={18} /> Send Invoice
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CreateInvoice;
