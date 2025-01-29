import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal, Row, Col, Alert, Badge } from 'react-bootstrap';
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
  const [showRemarksSection, setShowRemarksSection] = useState(false);
  const [submittedRemarks, setSubmittedRemarks] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

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

  const fields = [
    { id: 1, name: "Technical" },
    { id: 2, name: "Communication" },
    { id: 3, name: "Management" },
    { id: 4, name: "Creative" }
  ];

  const skills = [
    { id: 1, name: "Programming" },
    { id: 2, name: "Design" },
    { id: 3, name: "Writing" },
    { id: 4, name: "Analysis" }
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
      cell: row => {
        // Determine status color and style
        const getStatusStyle = (status) => {
          switch(status.toLowerCase()) {
            case 'pending':
              return {
                backgroundColor: '#dc3545', // Bootstrap danger red
                color: 'white',
                borderColor: '#dc3545'
              };
            case 'in progress':
              return {
                backgroundColor: '#ffc107', // Bootstrap warning yellow
                color: 'black',
                borderColor: '#ffc107'
              };
            case 'completed':
              return {
                backgroundColor: '#28a745', // Bootstrap success green
                color: 'white',
                borderColor: '#28a745'
              };
            default:
              return {
                backgroundColor: '#6c757d', // Bootstrap secondary gray
                color: 'white',
                borderColor: '#6c757d'
              };
          }
        };

        const statusStyle = getStatusStyle(row.status);

        return (
          <span 
            className="badge rounded-pill text-uppercase fw-bold px-3 py-2"
            style={{
              backgroundColor: statusStyle.backgroundColor,
              color: statusStyle.color,
              border: `1px solid ${statusStyle.borderColor}`
            }}
          >
            {row.status}
          </span>
        );
      },
      sortable: true,
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

  const handleSubmitReview = async () => {
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
      setShowTaskModal(false);
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

  const handleSaveAndContinue = () => {
    // Validate remarks
    if (remarks.trim() === '') {
      // Show error or prevent submission
      return;
    }

    // Save remarks
    setSubmittedRemarks({
      text: remarks,
      timestamp: new Date(),
      task: selectedTask
    });

    // Reset remark input and show remarks section
    setShowRemarksSection(true);
    setRemarks('');
  };

  const renderRemarksSection = () => {
    return (
      <Card className="mt-3">
        <Card.Header>
          <h5 className="mb-0">Remarks</h5>
        </Card.Header>
        <Card.Body>
          {/* Remarks Input */}
          <Form.Group className="mb-3">
            <Form.Label>Add Remarks</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter your remarks here..."
            />
          </Form.Group>

          <Button 
            variant="primary" 
            onClick={handleSaveAndContinue}
            className="me-2"
          >
            Save and Continue
          </Button>

          {/* Submitted Remarks Display */}
          {submittedRemarks && (
            <Card className="mt-3 bg-light">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong>Previous Remarks</strong>
                  <small className="text-muted">
                    {submittedRemarks.timestamp.toLocaleString()}
                  </small>
                </div>
                <p>{submittedRemarks.text}</p>
                <Badge bg="info">
                  Task: {submittedRemarks.task.title}
                </Badge>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    );
  };

  const renderEntityModal = () => (
    <Modal 
      show={showEntityModal} 
      onHide={() => setShowEntityModal(false)}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>Task Review <small>Entity and Template Selection</small></h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="mb-3">
          <Card.Header>
            <h2>
              <strong>Step 1:</strong> Select Entity
              {selectedEntity && (
                <span className="text-success float-end">
                  <i className="fa fa-check-circle me-2"></i>
                  {entities.find(entity => entity.id === selectedEntity)?.name || 'Selected Entity'}
                </span>
              )}
            </h2>
          </Card.Header>
          <Card.Body>
            {!selectedEntity ? (
              <Row>
                {entities.map((entity) => (
                  <Col key={entity.id} md={4} className="mb-3">
                    <Card 
                      onClick={() => setSelectedEntity(entity.id)}
                      className="hover-shadow"
                      style={{ 
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease',
                        border: selectedEntity === entity.id ? '2px solid #28a745' : '1px solid #dee2e6'
                      }}
                    >
                      <Card.Body className="text-center">
                        <Card.Title className="mb-2">{entity.name}</Card.Title>
                        <p className="text-muted small">Click to select this entity</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Alert variant="info" className="text-center">
                Entity "{entities.find(entity => entity.id === selectedEntity)?.name || 'Selected Entity'}" has been selected. 
                Proceed to select a review template.
              </Alert>
            )}
          </Card.Body>
        </Card>

        <Card className={`mb-3 ${!selectedEntity ? 'opacity-50' : ''}`}>
          <Card.Header>
            <h2>
              <strong>Step 2:</strong> Select Review Template
              {selectedTemplate && (
                <span className="text-success float-end">
                  <i className="fa fa-check-circle me-2"></i>
                  {templates.find(template => template.id === selectedTemplate)?.name || 'Selected Template'}
                </span>
              )}
            </h2>
          </Card.Header>
          <Card.Body>
            {selectedEntity && !selectedTemplate ? (
              <Row>
                {templates.map((template) => (
                  <Col key={template.id} md={4} className="mb-3">
                    <Card 
                      onClick={() => setSelectedTemplate(template.id)}
                      className="hover-shadow"
                      style={{ 
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease',
                        border: selectedTemplate === template.id ? '2px solid #28a745' : '1px solid #dee2e6'
                      }}
                    >
                      <Card.Body className="text-center">
                        <Card.Title className="mb-2">{template.name}</Card.Title>
                        <p className="text-muted small">Click to select this template</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : selectedEntity && selectedTemplate ? (
              <Alert variant="success" className="text-center">
                Template "{templates.find(template => template.id === selectedTemplate)?.name || 'Selected Template'}" has been selected. 
                You can now start the review.
              </Alert>
            ) : (
              <Alert variant="warning" className="text-center">
                Please select an entity first to enable template selection.
              </Alert>
            )}
          </Card.Body>
        </Card>

        {selectedEntity && selectedTemplate && renderRemarksSection()}
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={() => setShowEntityModal(false)}
          className="px-4"
        >
          Close
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {/* Add logic to proceed */}}
          disabled={!(selectedEntity && selectedTemplate)}
          className="px-4"
        >
          Proceed
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const renderTaskModal = () => (
    <Modal 
      show={showTaskModal} 
      onHide={() => setShowTaskModal(false)}
      size="lg"
      centered
    >
      <Modal.Header closeButton className="border-bottom-0 pb-0">
        <Modal.Title className="text-secondary">Task Review</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Row className="g-4">
          <Col md={6}>
            <Card border="light" className="shadow-sm h-100">
              <Card.Header className="bg-light py-2">
                <h6 className="mb-0 text-muted">Task Overview</h6>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Title:</span>
                  <strong>{selectedTask?.title || 'N/A'}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Category:</span>
                  <strong>{selectedTask?.category || 'N/A'}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Client:</span>
                  <strong>{selectedTask?.client || 'N/A'}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Rate per Hour:</span>
                  <strong>₹{selectedTask?.ratePerHour || 'N/A'}</strong>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span className="text-muted">Total Amount:</span>
                  <strong className="text-success">
                    ₹{(selectedTask?.ratePerHour * (selectedTask?.subtaskDetails?.minutes / 60)).toFixed(2) || 'N/A'}
                  </strong>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card border="light" className="shadow-sm h-100">
              <Card.Header className="bg-light py-2">
                <h6 className="mb-0 text-muted">Sub Task Details</h6>
              </Card.Header>
              <Card.Body>
                <p className="text-muted fst-italic mb-0">
                  {selectedTask?.details || 'No additional details available.'}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card border="light" className="shadow-sm mt-4">
          <Card.Header className="bg-light py-2">
            <h6 className="mb-0 text-muted">Review Information</h6>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted">Enter Amount</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter total amount"
                    size="sm"
                    min="0"
                    step="0.01"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted">Rating</Form.Label>
                  <div className="d-flex align-items-center">
                    <div className="d-flex">
                      {[...Array(10)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                          <span 
                            key={index} 
                            onClick={() => setRating(ratingValue)}
                            style={{
                              color: ratingValue <= rating ? '#ffd700' : '#e4e5e9',
                              cursor: 'pointer',
                              fontSize: '24px',
                              marginRight: '5px'
                            }}
                          >
                            ★
                          </span>
                        );
                      })}
                    </div>
                    {rating > 0 && (
                      <Badge bg="secondary" className="ms-2">
                        {rating} / 10
                      </Badge>
                    )}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted">Remarks</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={4} 
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter detailed remarks about task performance..."
                    size="sm"
                    className="mb-3"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted mb-2">Select Entity</Form.Label>
                  <Form.Select 
                    value={selectedEntity} 
                    onChange={(e) => setSelectedEntity(e.target.value)}
                    size="sm"
                    className={`examples--dropdown ${!selectedEntity ? 'is-invalid' : ''}`}
                    required
                  >
                    <option value="" disabled>Choose Entity</option>
                    {entities.map(entity => (
                      <option key={entity.id} value={entity.id}>
                        {entity.name}
                      </option>
                    ))}
                  </Form.Select>
                  {!selectedEntity && (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      Please select an entity
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted mb-2">
                    Select Template
                    <span className="text-danger ms-1">*</span>
                  </Form.Label>
                  <Form.Select 
                    value={selectedTemplate} 
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    size="sm"
                    className={`examples--dropdown ${!selectedTemplate ? 'is-invalid' : ''}`}
                    required
                  >
                    <option value="" disabled>Choose Template</option>
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </Form.Select>
                  {!selectedTemplate && (
                    <div className="invalid-feedback d-block">
                      Please select a review template
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={12}>
                <Button 
                  variant="primary" 
                  onClick={handleSubmitReview}
                  className="w-100"
                  disabled={!selectedTemplate || !selectedEntity || rating === 0}
                >
                  Submit Review
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer className="border-top-0 pt-0">
        <Button 
          variant="outline-secondary" 
          onClick={() => setShowTaskModal(false)}
          className="px-3"
        >
          Cancel
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
          { name: 'Pending Reviews', navigate: '/pending-reviews' }
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

      {renderTaskModal()}
      
      {renderEntityModal()}
    </div>
  );
};

export default PendingReviews;