import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import PageHeader from "../../components/PageHeader";
import DataTable from "react-data-table-component";

const CompletedPayments = () => {
  const [loading, setLoading] = useState(false);
  const [completedPayments, setCompletedPayments] = useState([]);

  const mockCompletedPayments = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-002',
      clientName: 'XYZ Tech',
      amount: 30000,
      paidDate: '2024-03-25',
      taskId: 'TASK-002',
      taskTitle: 'Website Development',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN123456',
      status: 'paid'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-003',
      clientName: 'Global Corp',
      amount: 45000,
      paidDate: '2024-03-20',
      taskId: 'TASK-003',
      taskTitle: 'Marketing Strategy',
      paymentMethod: 'UPI',
      transactionId: 'TXN789012',
      status: 'paid'
    }
  ];

  const columns = [
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
      name: 'Task',
      selector: row => row.taskTitle,
    },
    {
      name: 'Amount',
      selector: row => `₹${row.amount.toLocaleString()}`,
      sortable: true,
    },
    {
      name: 'Paid Date',
      selector: row => row.paidDate,
      sortable: true,
    },
    {
      name: 'Payment Method',
      selector: row => row.paymentMethod,
    },
    {
      name: 'Status',
      cell: row => (
        <Badge 
          bg="success"
          className="text-uppercase px-3 py-2"
        >
          Paid
        </Badge>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex gap-2">
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => window.alert('View receipt clicked')}
          >
            <i className="fa fa-file-invoice me-1"></i> Receipt
          </Button>
        </div>
      ),
    }
  ];

  useEffect(() => {
    const fetchCompletedPayments = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCompletedPayments(mockCompletedPayments);
      } catch (error) {
        console.error('Error fetching completed payments:', error);
      }
      setLoading(false);
    };

    fetchCompletedPayments();
  }, []);

  return (
    <div>
      <PageHeader 
        HeaderText="Completed Payments"
        Breadcrumb={[
          { name: 'Payments', navigate: '#' },
          { name: 'Completed Payments' }
        ]}
      />
      
      <Card>
        <Card.Body>
          <DataTable
            title="Completed Payments"
            columns={columns}
            data={completedPayments}
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

export default CompletedPayments;