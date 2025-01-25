import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import PageHeader from "../../components/PageHeader";
import DataTable from "react-data-table-component";

const PendingPayments = () => {
  const [loading, setLoading] = useState(false);
  const [pendingPayments, setPendingPayments] = useState([]);

  const mockPendingPayments = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      clientName: 'ABC Corp',
      amount: 25000,
      dueDate: '2024-03-30',
      taskId: 'TASK-001',
      taskTitle: 'Financial Report Analysis',
      status: 'pending'
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
      name: 'Due Date',
      selector: row => row.dueDate,
      sortable: true,
    },
    {
      name: 'Status',
      cell: row => (
        <Badge 
          bg="warning"
          className="text-uppercase px-3 py-2"
        >
          Pending
        </Badge>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <Button 
          variant="success" 
          size="sm"
          onClick={() => window.alert('Process payment clicked')}
        >
          <i className="fa fa-credit-card me-1"></i> Process Payment
        </Button>
      ),
    }
  ];

  useEffect(() => {
    const fetchPendingPayments = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPendingPayments(mockPendingPayments);
      } catch (error) {
        console.error('Error fetching pending payments:', error);
      }
      setLoading(false);
    };

    fetchPendingPayments();
  }, []);

  return (
    <div>
      <PageHeader 
        HeaderText="Pending Payments"
        Breadcrumb={[
          { name: 'Payments', navigate: '#' },
          { name: 'Pending Payments' }
        ]}
      />
      
      <Card>
        <Card.Body>
          <DataTable
            title="Pending Payments"
            columns={columns}
            data={pendingPayments}
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

export default PendingPayments;