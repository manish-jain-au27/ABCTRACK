import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal, Row, Col, Alert } from 'react-bootstrap';
import PageHeader from "../../components/PageHeader";
import DataTable from "react-data-table-component";
import Rating from 'react-rating-stars-component';

const PendingReviews = () => {
  const [loading, setLoading] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showEntityModal, setShowEntityModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState('');
  const [remarks, setRemarks] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);

  // Mock data for pending tasks
  const mockTasks = [
    {
      id: 1,
      taskId: 'TASK-001',
      title: 'Financial Report Analysis',
      category: 'Finance',
      subcategory: 'Reports',
      client: 'ABC Corp',
      status: 'pending',
      subtaskDetails: {
        title: 'Q4 Analysis',
        minutes: '180',
        status: 'pending'
      },
      ratePerHour: '2500',
      details: 'Comprehensive analysis of Q4 financial statements'
    },
    {
      id: 2,
      taskId: 'TASK-002',
      title: 'Website Development',
      category: 'Development',
      subcategory: 'Frontend',
      client: 'XYZ Tech',
      status: 'pending',
      subtaskDetails: {
        title: 'Homepage Design',
        minutes: '240',
        status: 'pending'
      },
      ratePerHour: '3000',
      details: 'Modern responsive homepage design'
    },
    {
      id: 3,
      taskId: 'TASK-003',
      title: 'Marketing Strategy',
      category: 'Marketing',
      subcategory: 'Digital',
      client: 'Global Retail',
      status: 'pending',
      subtaskDetails: {
        title: 'Social Media Plan',
        minutes: '120',
        status: 'pending'
      },
      ratePerHour: '2000',
      details: 'Social media marketing strategy'
    }
  ];

  const entities = [
    { id: 1, name: "Acme Corporation" },
    { id: 2, name: "Global Technologies" },
    { id: 3, name: "Tech Innovators" }
  ];

  const templates = [
    { id: 1, name: "Standard Review Template" },
    { id: 2, name: "Detailed Analysis Template" },
    { id: 3, name: "Quick Review Template" }
  ];

  const handleReviewClick = (task) => {
    setSelectedTask(task);
    setPrice(task.ratePerHour);
    setShowTaskModal(true);
  };

  // Define columns for DataTable
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
          className={`badge rounded-pill text-uppercase fw-bold px-3 py-2 bg-warning text-dark`}
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
      name: 'Minutes',
      selector: row => row.subtaskDetails.minutes,
    },
    {
      name: 'Actions',
      cell: row => (
        <Button 
          variant="info" 
          size="sm" 
          onClick={() => handleReviewClick(row)}
        >
          <i className="fa fa-star me-1"></i> Review
        </Button>
      ),
    }
  ];

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCompletedTasks(mockTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
      setLoading(false);
    };

    fetchCompletedTasks();
  }, []);

  const handleTaskModalSave = () => {
    setShowTaskModal(false);
    setShowEntityModal(true);
  };

  const handleEntitySelect = () => {
    setShowEntityModal(false);
    setShowTemplateModal(true);
  };

  const handleSendToClient = async () => {
    try {
      // Add your API call here to update the task status and send review
      const reviewData = {
        taskId: selectedTask.taskId,
        rating,
        price,
        remarks,
        entityId: selectedEntity,
        templateId: selectedTemplate
      };
      
      console.log('Sending review:', reviewData);
      // Update task status to "Review Completed"
      
      // Close all modals and reset state
      setShowTemplateModal(false);
      setSelectedTask(null);
      setRating(0);
      setPrice('');
      setRemarks('');
      setSelectedEntity('');
      setSelectedTemplate('');
      
      // Refresh the task list
      // Add your refresh logic here
      
    } catch (error) {
      console.error('Error sending review:', error);
      // Add error handling
    }
  };

  const renderEntityModal = () => (
    <Modal 
      show={showEntityModal} 
      onHide={() => setShowEntityModal(false)}
      size="lg"
      centered
      dialogClassName="custom-modal-style"
    >
      <Modal.Header 
        closeButton 
        className="border-bottom-0 pb-0"
      >
        <Modal.Title className="w-100">
          <h4 className="mb-0 text-primary fw-bold">Select Entity</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-1">
        <Card className="shadow-sm border-0" style={{ borderRadius: '12px' }}>
          <Card.Body className="p-4">
            <Form>
              <Form.Group>
                <Form.Label className="text-muted mb-3 text-uppercase">Entity</Form.Label>
                <Form.Select
                  className="form-control"
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                >
                  <option value="">Select an entity...</option>
                  {entities.map(entity => (
                    <option key={entity.id} value={entity.id}>
                      {entity.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <Button 
          variant="secondary" 
          onClick={() => setShowEntityModal(false)}
          className="px-4"
        >
          Close
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            setShowEntityModal(false);
            setShowTemplateModal(true);
          }}
          disabled={!selectedEntity}
          className="px-4"
        >
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const renderTemplateModal = () => (
    <Modal 
      show={showTemplateModal} 
      onHide={() => setShowTemplateModal(false)}
      size="lg"
      centered
      dialogClassName="custom-modal-style"
    >
      <Modal.Header 
        closeButton 
        className="border-bottom-0 pb-0"
      >
        <Modal.Title className="w-100">
          <h4 className="mb-0 text-primary fw-bold">Select Template</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-1">
        <Card className="shadow-sm border-0" style={{ borderRadius: '12px' }}>
          <Card.Body className="p-4">
            <Form>
              <Form.Group>
                <Form.Label className="text-muted mb-3 text-uppercase">Template</Form.Label>
                <Form.Select
                  className="form-control"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                >
                  <option value="">Select a template...</option>
                  {templates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <Button 
          variant="secondary" 
          onClick={() => setShowTemplateModal(false)}
          className="px-4"
        >
          Close
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            // Handle send to client
            setShowTemplateModal(false);
            // Reset all states
            setSelectedTask(null);
            setRating(0);
            setPrice('');
            setRemarks('');
            setSelectedEntity('');
            setSelectedTemplate('');
          }}
          disabled={!selectedTemplate}
          className="px-4"
        >
          Send to Client
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div>
      <PageHeader 
        HeaderText="Pending Reviews"
        Breadcrumb={[
          { name: 'Tasks', navigate: '/tasks' },
          { name: 'Pending Reviews' }
        ]}
      />
      
      <Card>
        <Card.Body>
          <DataTable
            title="Pending Tasks for Review"
            columns={columns}
            data={completedTasks}
            progressPending={loading}
            pagination
            highlightOnHover
            striped
          />
        </Card.Body>
      </Card>

      {/* Task Review Modal */}
      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Review Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask && (
            <div>
              <h5>Task Details</h5>
              <p><strong>Task ID:</strong> {selectedTask.taskId}</p>
              <p><strong>Title:</strong> {selectedTask.title}</p>
              <p><strong>Details:</strong> {selectedTask.details}</p>
              
              <hr />
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Rating (1-10)</Form.Label>
                  <div>
                    <Rating
                      count={10}
                      value={rating}
                      onChange={setRating}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTaskModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleTaskModalSave}>
            Save & Continue
          </Button>
        </Modal.Footer>
      </Modal>

      {renderEntityModal()}

      {renderTemplateModal()}
    </div>
  );
};

export default PendingReviews;