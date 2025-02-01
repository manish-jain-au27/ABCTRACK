import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal, Row, Col, Alert, Badge, ProgressBar } from 'react-bootstrap';
import PageHeader from "../../components/PageHeader";
import CustomTable from '../../components/customUI/CustomTable';
import Rating from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const PendingReviews = () => {
  const [loading, setLoading] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showEntityModal, setShowEntityModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({
    entity: '',
    template: ''
  });
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
  const [validationErrors, setValidationErrors] = useState({
    entity: false,
    template: false
  });
  const [reviewDate, setReviewDate] = useState(null);

  // Mock data for pending tasks
  const mockTasks = [
    {
      id: 1,
      taskId: 'TASK-001',
      title: 'Financial Report Analysis',
      category: 'Finance',
      subcategory: 'Reports',
      client: 'ABC Corp',
      paymentType: 'pay per Minute',
      totalCost:'2000',
      status: 'pending',
      subtaskDetails: {
        title: 'Q4 Analysis',
        minutes: '180',
        status: 'pending'
      },
      ratePerHour: '2500',
      details: 'Comprehensive analysis of Q4 financial statements',
      executionType: '',
      executionMode: '',
      rows: [
        {
          title: 'Review',
          review: 0,
          rate: '2000',
          remarks: ''
        }
      ]
    },
    {
      id: 2,
      taskId: 'TASK-002',
      title: 'Website Development',
      category: 'Development',
      subcategory: 'Frontend',
      client: 'XYZ Tech',
      paymentType: 'lumpsum',
      totalCost:'3000',
      status: 'pending',
      subtaskDetails: {
        title: 'Homepage Design',
        minutes: '240',
        status: 'pending'
      },
      ratePerHour: '3000',
      details: 'Modern responsive homepage design',
      executionType: '',
      executionMode: '',
      rows: [
        {
          title: 'Review',
          review: 0,
          rate: '2000',
          remarks: ''
        }
      ]
    },
    {
      id: 3,
      taskId: 'TASK-003',
      title: 'Marketing Strategy',
      category: 'Marketing',
      subcategory: 'Digital',
      client: 'Global Retail',
      paymentType: 'lumpsum',
      totalCost:'4000',
      status: 'pending',
      subtaskDetails: {
        title: 'Social Media Plan',
        minutes: '120',
        status: 'pending'
      },
      ratePerHour: '2000',
      details: 'Social media marketing strategy',
      executionType: '',
      executionMode: '',
      rows: [
        {
          title: 'Review',
          review: 0,
          rate: '2000',
          remarks: ''
        }
      ]
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

  const EXECUTION_TYPES = [
    {
      id: 1,
      name: 'Type 1',
      modes: [
        { id: 1, name: 'Mode 1' },
        { id: 2, name: 'Mode 2' }
      ]
    },
    {
      id: 2,
      name: 'Type 2',
      modes: [
        { id: 3, name: 'Mode 3' },
        { id: 4, name: 'Mode 4' }
      ]
    }
  ];

  const ENTITIES = [
    {
      id: 'company',
      name: 'Company',
      templates: [
        { id: 'standard', name: 'Standard Company Template' },
        { id: 'startup', name: 'Startup Company Template' }
      ]
    },
    {
      id: 'individual',
      name: 'Individual',
      templates: [
        { id: 'freelance', name: 'Freelance Template' },
        { id: 'consultant', name: 'Consultant Template' }
      ]
    }
  ] || [];

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
                        <p className="text-muted small">Click to select Invoice template</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : selectedEntity && selectedTemplate ? (
              <Alert variant="success" className="text-center">
                Invoice Template "{templates.find(template => template.id === selectedTemplate)?.name || 'Selected Template'}" has been selected. 
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

  const modalStyles = `
    .task-modal-container {
      position: fixed;
      top: 0;
      right: -500px;
      width: 60vw;
      height: 100vh;
      background-color: white;
      box-shadow: -2px 0 5px rgba(0,0,0,0.1);
      transition: right 0.3s ease-in-out;
      z-index: 1050;
      overflow-y: auto;
      padding: 0px;
    }
    .task-modal-container.open {
      right: 0;
    }
    .task-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 1040;
      display: none;
    }
    .task-modal-overlay.open {
      display: block;
    }
    /* New CSS to reduce task ID input box size */
    .task-id-input {
      max-width: 120px;
      padding: 5px;
      font-size: 0.9em;
    }
  `;

  const handleReviewDateChange = (date) => {
    setReviewDate(date);
    setSelectedTask(prevTask => ({
      ...prevTask,
      reviewDate: date ? date.toISOString().split('T')[0] : null
    }));
  };

  const renderTaskModal = (task) => {
    const safeEntities = ENTITIES || [];

    return (
      <>
        <style>{modalStyles}</style>
        
        <div 
          className={`task-modal-overlay ${showTaskModal ? 'open' : ''}`}
          onClick={() => setShowTaskModal(false)}
        >
          <div 
            className={`task-modal-container ${showTaskModal ? 'open' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header d-flex justify-content-between align-items-center p-3 border-bottom">
              <h5 className="modal-title ubuntu-font ubuntu-bold mb-0">Task Review</h5>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control task-id-input text-center mr-2"
                  value={task?.taskId || 'N/A'}
                  readOnly
                />
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowTaskModal(false)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '1.5rem', 
                    lineHeight: 1,
                    color: '#000',
                    opacity: 0.5,
                    cursor: 'pointer'
                  }}
                >
                  &times;
                </button>
              </div>
            </div>
            
            {task && (
              <div className="modal-body ubuntu-font ubuntu-regular">
                <div className="row mb-3">
                  <div className="col-md-5">
                    <label>Client</label>
                    <input
                      type="text"
                      className="form-control"
                      value={task.client || 'N/A'}
                      style={{
                        width:'415px'
                      }}
                      readOnly
                    />
                  </div>
                  <div 
                    className="col-md-5"
                    style={{
                      marginLeft: '75px'
                    }}
                  >
                    <label className="font-weight-bold">Task Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={task.title || 'N/A'}
                      style={{
                        width:'415px'
                      }}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Task Category</label>
                    <input
                      type="text"
                      className="form-control"
                      value={task.category || 'N/A'}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Subcategory</label>
                    <input
                      type="text"
                      className="form-control"
                      value={task.subcategory || 'N/A'}
                      readOnly
                    />
                  </div>
                </div>


                <div className="row mb-3">
                 
                  <div className="col-md-6">
                    <label>Assignment Duration</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: '#f0f0f0', border: 'none' }}>
                        <i className="fa fa-calendar" style={{ color: '#6c757d' }}></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        value={task.planDate || '05/01/2025'}
                        placeholder="Plan Date"
                        style={{ 
                          backgroundColor: '#f0f0f0',
                          color: 'black',
                          cursor: 'default'
                        }}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                        <label>Payment Type</label>
                        <div className="d-flex align-items-center">
                          <input
                            type="text"
                            className="form-control"
                            value={'Pay Per Minute'}
                            placeholder="Select execution date"
                            style={{ width: '410px' }}
                            readOnly
                          />
                        </div>
                      </div>
                </div>
                <div className="row mb-3">
                <div className="col-md-6">
                    <label>Execution Date</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: '#f0f0f0', border: 'none' }}>
                        <i className="fa fa-calendar" style={{ color: '#6c757d' }}></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        value={task.executionDate || '05/01/2025'}
                        placeholder="Execution Date"
                        style={{ 
                          backgroundColor: '#f0f0f0',
                          color: 'black',
                          cursor: 'default'
                        }}
                        readOnly
                      />
                    </div>
                  </div>
             <div className="col-md-6">
               <div className="row">
                 <div className="col-md-6 mb-2">
                   <label>Execution Minutes</label>
                   <div className="input-group">
                     <span className="input-group-text" style={{ background: '#f0f0f0', border: 'none' }}>
                       <i className="fa fa-clock-o" style={{ color: '#6c757d' }}></i>
                     </span>
                     <input
                       type="text"
                       className="form-control"
                       value={
                         task.totalMinutes 
                         ? `${task.totalMinutes} ` 
                         : (task.subtasks 
                           ? `${task.subtasks.reduce((sum, subtask) => sum + (subtask.minutes || 0), 0)}`
                           : '120')
                       }
                       placeholder="Total Minutes"
                       style={{ 
                         backgroundColor: '#f0f0f0',
                         color: 'black',
                         cursor: 'not-allowed'
                       }}
                       readOnly
                     />
                   </div>
                 </div>
                 <div className="col-md-6 mb-2">
                   <label>Plan Minutes</label>
                   <div className="input-group">
                     <span className="input-group-text" style={{ background: '#f0f0f0', border: 'none' }}>
                       <i className="fa fa-clock-o" style={{ color: '#6c757d' }}></i>
                     </span>
                     <input
                       type="text"
                       className="form-control"
                       value={
                         task.plannedMinutes 
                         ? `${task.plannedMinutes}` 
                         : '60'
                       }
                       placeholder="Planned Minutes"
                       style={{ 
                         backgroundColor: '#f0f0f0',
                         color: 'black',
                         cursor: 'not-allowed'
                       }}
                       readOnly
                     />
                   </div>
                 </div>
               </div>
             </div>
           </div>
                <div className="table-responsive">
                  <table className="table table-bordered text-center">
                    <thead className="thead-white" style={{ color: 'black', backgroundColor: 'white' }}>
                      <tr>
                        <th className="text-center" style={{ width: '200px' }}>Reviews</th>
                        <th className="text-center"style={{ width: '80px' }}>Total Fee</th>
                        <th className="text-center" style={{ width: '80px' }}>Final Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(task?.rows || []).map((row, index) => {
                        return (
                          <tr key={index} className="text-center">
                            <td>
                              {row.title}
                              <div className="mt-2 d-flex justify-content-center">
                                <Rating
                                  count={10}
                                  value={row.review || 0}
                                  size={35}
                                  activeColor="#ffd700"
                                  onChange={(newRating) => {
                                    setSelectedTask(prev => {
                                      const updatedRows = [...(prev.rows || [])];
                                      updatedRows[index] = {
                                        ...updatedRows[index],
                                        review: newRating
                                      };
                                      return { ...prev, rows: updatedRows };
                                    });
                                  }}
                                />
                              </div>
                            </td>
                            <td>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">₹</span>
                                </div>
                                <input
                                  type="text"
                                  className="form-control text-center"
                                  value={row.rate || '2000'}
                                  readOnly
                                  placeholder="Rate"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">₹</span>
                                </div>
                                <input
                                  type="number"
                                  className="form-control text-center"
                                  value={row.rate || ''}
                                  onChange={(e) => {
                                    const newRate = e.target.value;
                                    setSelectedTask(prev => {
                                      const updatedRows = [...(prev.rows || [])];
                                      updatedRows[index] = {
                                        ...updatedRows[index],
                                        rate: newRate
                                      };
                                      return { ...prev, rows: updatedRows };
                                    });
                                  }}
                                  placeholder="Final Price"
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Remark</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter your remarks"
                      value={task.remark || ''}
                      onChange={(e) => {
                        setSelectedTask(prevTask => ({
                          ...prevTask,
                          remark: e.target.value
                        }));
                      }}
                      style={{ 
                        width: '100%', 
                        backgroundColor: 'white',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Review Date</label>
                    <div className="position-relative">
                      <DatePicker
                        selected={reviewDate}
                        onChange={handleReviewDateChange}
                        placeholderText="Select review date"
                        dateFormat="MM-dd-YYYY"
                        className="form-control"
                        wrapperClassName="w-100"
                        // customInput={
                        //   <div className="input-group">
                        //     <input
                        //       type="text"
                        //       className="form-control"
                        //       value={reviewDate ? reviewDate.toLocaleDateString() : ''}
                        //       placeholder="MM/DD/YYYY"
                        //       readOnly
                        //     />
                        //     <div className="input-group-append">
                        //       <span 
                        //         className="input-group-text position-absolute" 
                        //         style={{
                        //           right: '10px', 
                        //           top: '50%', 
                        //           transform: 'translateY(-50%)', 
                        //           zIndex: 10,
                        //           backgroundColor: 'transparent',
                        //           border: 'none'
                        //         }}
                        //       >
                        //         <i 
                        //           className="fa fa-calendar" 
                        //           style={{ 
                        //             cursor: 'pointer', 
                        //             color: '#6c757d' 
                        //           }} 
                        //         />
                        //       </span>
                        //     </div>
                        //   </div>
                        // }
                      />
                    </div>
                    {validationErrors.reviewDate && (
                      <div className="text-danger">Please select a valid review date.</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Entity</label>
                    <select
                      name="entity"
                      className="form-control"
                      value={task.entity || ''}
                      onChange={(e) => {
                        const entity = e.target.value;
                        setSelectedTask(prev => ({
                          ...prev,
                          entity,
                          template: '' // Reset template when entity changes
                        }));
                        setValidationErrors(prev => ({ ...prev, entity: false }));
                      }}
                      required
                    >
                      <option value="">Select Entity</option>
                      {safeEntities.map(entity => (
                        <option key={entity.id} value={entity.id}>
                          {entity.name}
                        </option>
                      ))}
                    </select>
                    {validationErrors.entity && (
                      <div className="text-danger">Please select an entity.</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label>Invoice Templates</label>
                    <div className="d-flex align-items-center">
                      <select
                        name="template"
                        className="form-control flex-grow-1"
                        value={task.template || ''}
                        onChange={(e) => {
                          const template = e.target.value;
                          setSelectedTask(prev => ({
                            ...prev,
                            template
                          }));
                          setValidationErrors(prev => ({ ...prev, template: false }));
                        }}
                        disabled={!task.entity}
                        required
                      >
                        <option value="">Select Invoice Template</option>
                        {task.entity && 
                          safeEntities.find(entity => entity.id === task.entity)?.templates?.map(template => (
                            <option key={template.id} value={template.id}>
                              {template.name}
                            </option>
                          ))
                        }
                      </select>
                      <Link 
                        to="#" 
                        className="btn btn-outline-info btn-sm ml-2" 
                        onClick={() => {
                          // Optional: Add functionality when eye icon is clicked
                          // For example, preview the selected template
                        }}
                      >
                        <i className="icon-eye"></i>
                      </Link>
                    </div>
                    {validationErrors.template && (
                      <div className="text-danger">Please select a invoice template.</div>
                    )}
                  </div>
                </div>
             
                <div className="modal-footer">
                   
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        // Perform any validation or data processing if needed
                        setShowTaskModal(false);
                      }}
                    >
                      Submit
                    </button>
                  </div>
              </div>
              
            )}
          </div>
        </div>
      </>
    );
  };

  // Transform tasks to match CustomTable's expected structure
  const transformedTasks = completedTasks.map(task => ({
    ...task,
    status: task.status, // Explicitly add status
    rows: [{
      minutes: task.subtaskDetails?.minutes || 0,
      percentage: task.status === 'pending' ? 0 : 
                  task.status === 'in progress' ? 50 : 100,
      status: task.status,
      statusText: task.status, // Add explicit status text
      statusVariant: task.status === 'pending' ? 'danger' : 
                     task.status === 'in progress' ? 'warning' : 'success'
    }]
  }));

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
          <CustomTable 
            title=""
            headers={[
              { key: 'taskId', label: 'Task ID', sortable: true },
              { key: 'client', label: 'Client', sortable: true },
              { key: 'title', label: 'Title', sortable: true },
              { key: 'category', label: 'Category', sortable: true },
              { key: 'paymentType', label: 'Payment Type', sortable: true },
              { key: 'totalCost', label: 'Assignment Value', sortable: true },
              { key: 'action', label: 'Action' }
            ]}
            rows={transformedTasks}
            onRowAction={handleReviewClick}
            renderActionColumn={(task) => (
              <div className="d-flex justify-content-center">
                <Link 
                  to="#" 
                  className="btn btn-outline-info btn-sm mr-1" 
                  onClick={() => handleReviewClick(task)}
                >
                  <i className="icon-eye"></i>
                </Link>
              </div>
            )}
          />
        </Card.Body>
      </Card>

      {renderTaskModal(selectedTask)}
      
      {renderEntityModal()}
    </div>
  );
};

export default PendingReviews;