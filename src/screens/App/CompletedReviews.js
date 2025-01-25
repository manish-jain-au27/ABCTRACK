import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import PageHeader from "../../components/PageHeader";
import DataTable from "react-data-table-component";

const CompletedReviews = () => {
  const [loading, setLoading] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Mock data for completed tasks with reviews
  const mockCompletedTasks = [
    {
      id: 1,
      taskId: 'TASK-001',
      title: 'Financial Report Analysis',
      category: 'Finance',
      subcategory: 'Reports',
      client: 'ABC Corp',
      status: 'completed',
      subtaskDetails: {
        title: 'Q4 Analysis',
        minutes: '180',
        status: 'completed'
      },
      review: {
        rating: 9,
        price: '2500',
        remarks: 'Excellent work on the financial analysis',
        reviewedAt: '2024-03-15',
        reviewedBy: 'John Doe'
      }
    },
    {
      id: 2,
      taskId: 'TASK-002',
      title: 'Website Development',
      category: 'Development',
      subcategory: 'Frontend',
      client: 'XYZ Tech',
      status: 'completed',
      subtaskDetails: {
        title: 'Homepage Design',
        minutes: '240',
        status: 'completed'
      },
      review: {
        rating: 8,
        price: '3000',
        remarks: 'Great design implementation',
        reviewedAt: '2024-03-14',
        reviewedBy: 'Jane Smith'
      }
    }
  ];

  const columns = [
    {
      name: 'Task ID',
      selector: row => row.taskId,
      sortable: true,
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Subtask',
      selector: row => row.subtaskDetails.title,
    },
    {
      name: 'Status',
      cell: row => (
        <span 
          className={`badge rounded-pill text-uppercase fw-bold px-3 py-2 bg-success text-white`}
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: 'Rating',
      cell: row => (
        <div className="d-flex align-items-center">
          <span className="text-warning me-1">★</span>
          {row.review.rating}/10
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => `$${row.review.price}`,
      sortable: true,
    },
   
   
  ];

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCompletedTasks(mockCompletedTasks);
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
      setLoading(false);
    };

    fetchCompletedTasks();
  }, []);

  return (
    <div>
      <PageHeader 
        HeaderText="Completed Reviews"
        Breadcrumb={[
          { name: 'Tasks', navigate: '/tasks' },
          { name: 'Completed Reviews' }
        ]}
      />
      
      <Card>
        <Card.Body>
          <DataTable
            title="Completed Tasks and Reviews"
            columns={columns}
            data={completedTasks}
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

export default CompletedReviews;