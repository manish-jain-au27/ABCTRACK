import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import PageHeader from "../../components/PageHeader";
import DataTable from "react-data-table-component";

const AllInvoices = () => {
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);

  // Mock data for invoices
  const mockInvoices = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      clientName: 'ABC Corp',
      amount: 25000,
      status: 'pending',
      dueDate: '2024-03-30',
      taskId: 'TASK-001',
      taskTitle: 'Financial Report Analysis'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      clientName: 'XYZ Tech',
      amount: 30000,
      status: 'paid',
      dueDate: '2024-03-25',
      taskId: 'TASK-002',
      taskTitle: 'Website Development'
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
          bg={row.status === 'paid' ? 'success' : 'warning'}
          className="text-uppercase px-3 py-2"
        >
          {row.status}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex gap-2">
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => window.alert('View invoice clicked')}
          >
            <i className="fa fa-eye me-1"></i> View
          </Button>
          {row.status === 'pending' && (
            <Button 
              variant="success" 
              size="sm"
              onClick={() => window.alert('Process payment clicked')}
            >
              <i className="fa fa-credit-card me-1"></i> Pay
            </Button>
          )}
        </div>
      ),
    }
  ];

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setInvoices(mockInvoices);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
      setLoading(false);
    };

    fetchInvoices();
  }, []);

  return (
    <div>
      <PageHeader 
        HeaderText="All Invoices"
        Breadcrumb={[
          { name: 'Payments', navigate: '#' },
          { name: 'All Invoices' }
        ]}
      />
      
      <Card>
        <Card.Body>
          <DataTable
            title="Invoices"
            columns={columns}
            data={invoices}
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

export default AllInvoices;