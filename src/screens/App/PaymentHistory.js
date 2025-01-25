import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import PageHeader from "../../components/PageHeader";
import DataTable from "react-data-table-component";

const PaymentHistory = () => {
  const [loading, setLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const mockPaymentHistory = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-002',
      clientName: 'XYZ Tech',
      amount: 30000,
      date: '2024-03-25',
      taskTitle: 'Website Development',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN123456',
      status: 'paid',
      type: 'Credit'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-003',
      clientName: 'Global Corp',
      amount: 45000,
      date: '2024-03-20',
      taskTitle: 'Marketing Strategy',
      paymentMethod: 'UPI',
      transactionId: 'TXN789012',
      status: 'paid',
      type: 'Credit'
    }
  ];

  const columns = [
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
    },
    {
      name: 'Invoice #',
      selector: row => row.invoiceNumber,
      sortable: true,
    },
    {
      name: 'Client',
      selector: row => row.clientName,
      sortable: true,
    },
    {
      name: 'Type',
      cell: row => (
        <Badge 
          bg={row.type === 'Credit' ? 'success' : 'danger'}
          className="text-uppercase px-3 py-2"
        >
          {row.type}
        </Badge>
      ),
    },
    {
      name: 'Amount',
      cell: row => (
        <span className={row.type === 'Credit' ? 'text-success' : 'text-danger'}>
          {row.type === 'Credit' ? '+' : '-'}₹{row.amount.toLocaleString()}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Status',
      cell: row => (
        <Badge 
          bg={row.status === 'paid' ? 'success' : 'info'}
          className="text-uppercase px-3 py-2"
        >
          {row.status}
        </Badge>
      ),
    },
    {
      name: 'Payment Method',
      selector: row => row.paymentMethod || '-',
    },
    {
      name: 'Actions',
      cell: row => (
        <Button 
          variant="primary" 
          size="sm"
          onClick={() => window.alert('View details clicked')}
        >
          <i className="fa fa-eye me-1"></i> View
        </Button>
      ),
    }
  ];

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPaymentHistory(mockPaymentHistory);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
      setLoading(false);
    };

    fetchPaymentHistory();
  }, []);

  return (
    <div>
      <PageHeader 
        HeaderText="Payment History"
        Breadcrumb={[
          { name: 'Payments', navigate: '#' },
          { name: 'Payment History' }
        ]}
      />
      
      <Card>
        <Card.Body>
          <DataTable
            title="Payment History"
            columns={columns}
            data={paymentHistory}
            progressPending={loading}
            pagination
            highlightOnHover
            striped
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default PaymentHistory;