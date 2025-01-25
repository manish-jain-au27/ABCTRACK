import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Badge, Row, Col, Card, Form } from 'react-bootstrap';

const CompletedTasks = () => {
  // State variables
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [viewTaskModalOpen, setViewTaskModalOpen] = useState(false);

  // Fetch completed tasks (replace with actual API call)
  useEffect(() => {
    const fetchCompletedTasks = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call to fetch completed tasks
        
        const mockCompletedTasks = [
          {
            id: 1,
            taskId: 'TASK-001',
            title: 'Project Proposal Development',
            subtasks: [
              { id: 1, title: 'Research', status: 'completed', minutes: 60 },
              { id: 2, title: 'Draft', status: 'completed', minutes: 120 },
              { id: 3, title: 'Review', status: 'completed', minutes: 90 }
            ],
            totalMinutes: 270,
            status: 'completed',
            ratePerHour: 50,
            category: 'Development',
            subcategory: 'Proposal'
          },
          // Add more mock completed tasks
        ];
        
        // Expand subtasks to individual rows
        const expandedTasks = mockCompletedTasks.length > 0 
          ? mockCompletedTasks.flatMap(task => 
              task.subtasks && task.subtasks.length > 0 
                ? task.subtasks.map(subtask => ({
                    ...task,
                    currentSubtask: subtask,
                    subtaskMinutes: subtask.minutes || 0
                  }))
                : [{ 
                    ...task, 
                    currentSubtask: { title: 'No Subtasks', status: 'N/A', minutes: 0 },
                    subtaskMinutes: 0 
                  }]
            )
          : [];
        
        setCompletedTasks(expandedTasks);
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
        setCompletedTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, []);

  // Function to calculate real-time cost
  const calculateRealTimeCost = (rows = [], ratePerHour = 0, minMinutes = 0) => {
    const totalMinutes = rows.reduce((sum, row) => sum + (Number(row.minutes) || 0), 0);
    const adjustedMinutes = Math.max(totalMinutes, minMinutes);
    const totalAmount = (adjustedMinutes / 60) * ratePerHour;
    return { totalMinutes: adjustedMinutes, totalAmount };
  };

  // Open task details modal
  const handleViewDetails = (task, specificSubtask) => {
    // Ensure specificSubtask exists and has required properties
    const safeSubtask = specificSubtask || { 
      title: 'N/A', 
      status: 'N/A', 
      minutes: 0 
    };

    setSelectedTask({
      ...task,
      subtaskDetails: safeSubtask,
      ratePerHour: task.ratePerHour || 50, // Default rate if not provided
      rows: task.subtasks || [], // For cost calculation
      category: task.category || 'N/A',
      subcategory: task.subcategory || 'N/A'
    });
    setViewTaskModalOpen(true);
  };

  // Render task details modal
  const renderTaskDetailsModal = () => {
    if (!selectedTask) return null;

    // Ensure all required properties exist
    const safeTask = {
      taskId: selectedTask.taskId || 'N/A',
      title: selectedTask.title || 'N/A',
      subtaskDetails: selectedTask.subtaskDetails || { 
        title: 'N/A', 
        status: 'N/A', 
        minutes: 0 
      },
      ratePerHour: selectedTask.ratePerHour || 50,
      rows: selectedTask.rows || [],
      category: selectedTask.category || 'N/A',
      subcategory: selectedTask.subcategory || 'N/A'
    };

    const realTimeCost = calculateRealTimeCost(
      safeTask.rows, 
      Number(safeTask.ratePerHour)
    );

    return (
      <Modal 
        show={viewTaskModalOpen} 
        onHide={() => {
          setViewTaskModalOpen(false);
        }}
        size="xl"
        centered
        dialogClassName="custom-modal-style"
      >
        <Modal.Header 
          closeButton 
          className="border-bottom-0 pb-0 position-relative"
          closeVariant="dark"
          style={{ zIndex: 1000 }}
        >
          <Modal.Title className="w-100">
            <div className="d-flex justify-content-between align-items-center w-100">
              <h4 className="mb-0 text-primary fw-bold">Task and Subtask Details</h4>
              <div className="d-flex align-items-center">
                <span 
                  className={`badge rounded-pill text-uppercase fw-bold px-3 py-2 me-2 ${
                    safeTask?.subtaskDetails?.status?.toLowerCase() === 'completed' ? 'bg-success' :
                    safeTask?.subtaskDetails?.status?.toLowerCase() === 'in progress' ? 'bg-warning' :
                    'bg-secondary'
                  }`}
                  style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {safeTask?.subtaskDetails?.status || 'N/A'}
                </span>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-1">
          <Row>
            <Col md={8}>
              <Card className="shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <Card.Body className="p-4">
                  <Row>
                    <Col md={6}>
                      <h6 className="text-muted mb-3 text-uppercase">Task Information</h6>
                      <div className="mb-3 bg-light p-3 rounded">
                        <div className="mb-2 d-flex justify-content-between">
                          <small className="text-muted">Task ID</small>
                          <strong>{safeTask.taskId}</strong>
                        </div>
                        <div className="mb-2 d-flex justify-content-between">
                          <small className="text-muted">Original Task</small>
                          <strong>{safeTask.title}</strong>
                        </div>
                        <div className="d-flex justify-content-between">
                          <small className="text-muted">Subtask Title</small>
                          <strong>{safeTask.subtaskDetails.title}</strong>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <h6 className="text-muted mb-3 text-uppercase">Subtask Details</h6>
                      <div className="bg-light p-3 rounded">
                        <div className="mb-2 d-flex justify-content-between">
                          <small className="text-muted">Minutes</small>
                          <strong>{safeTask.subtaskDetails.minutes}</strong>
                        </div>
                        <div className="mb-2 d-flex justify-content-between">
                          <small className="text-muted">Category</small>
                          <strong>{safeTask.category} - {safeTask.subcategory}</strong>
                        </div>
                        <div className="d-flex justify-content-between">
                          <small className="text-muted">Rate per Hour</small>
                          <strong>₹{safeTask.ratePerHour}</strong>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <hr className="my-4 border-dashed" />

                  <h6 className="text-muted mb-3 text-uppercase">Amount Calculation</h6>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="text-muted">Total Minutes</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={realTimeCost.totalMinutes} 
                          readOnly 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="text-muted">Calculated Amount</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={`₹${realTimeCost.totalAmount.toFixed(2)}`} 
                          readOnly 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            
            {/* Status Section */}
            <Col md={4}>
              <Card className="shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <Card.Body className="p-4">
                  <h6 className="text-muted mb-3 text-uppercase">Task Status</h6>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Status</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={safeTask?.subtaskDetails?.status || 'N/A'} 
                        readOnly 
                        className={`${
                          safeTask?.subtaskDetails?.status?.toLowerCase() === 'completed' 
                            ? 'bg-success text-white' 
                            : 'bg-secondary text-white'
                        }`}
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setViewTaskModalOpen(false);
          }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="container-fluid">
      <div className="block-header">
        <div className="row clearfix">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <h2>Completed Tasks</h2>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : completedTasks.length > 0 ? (
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card">
              <div className="body">
                <div className="table-responsive">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Task ID</th>
                        <th>Title</th>
                        <th>Subtask</th>
                        <th>Status</th>
                        <th>Minutes</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedTasks.map((task, index) => (
                        <tr key={index}>
                          <td>{task.taskId || 'N/A'}</td>
                          <td>{task.title || 'N/A'}</td>
                          <td>{task.currentSubtask?.title || 'N/A'}</td>
                          <td>
                            <Badge
                              bg={task.status?.toLowerCase() === 'completed' ? 'success' : 'secondary'}
                              className="px-2 py-1"
                            >
                              {task.status || 'N/A'}
                            </Badge>
                          </td>
                          <td>{task.subtaskMinutes || 0}</td>
                          <td>
                            <Button 
                              variant="info" 
                              size="sm" 
                              onClick={() => handleViewDetails(task, task.currentSubtask)}
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">No completed tasks found</div>
      )}

      {renderTaskDetailsModal()}
    </div>
  );
};

export default CompletedTasks;