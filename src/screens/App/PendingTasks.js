import React, { useState, useEffect } from 'react';
import { Card, Button, Form, ProgressBar, Table, Modal, Row, Col, Alert } from 'react-bootstrap';
import PageHeader from "../../components/PageHeader";
import DataTable from "react-data-table-component";

const TaskRowItem = ({ 
  row, 
  index, 
  onStatusChange 
}) => {
  const [rowStatus, setRowStatus] = useState(row.status || 'in progress');
  const [isRowChanged, setIsRowChanged] = useState(false);

  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{row.title}</td>
      <td>{row.minutes}</td>
      <td>
        <Form.Control 
          as="select" 
          size="sm"
          value={rowStatus}
          onChange={(e) => {
            const newStatus = e.target.value;
            setRowStatus(newStatus);
            setIsRowChanged(newStatus !== row.status);
          }}
        >
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </Form.Control>
      </td>
      <td>
        {isRowChanged && (
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => {
              onStatusChange(index, rowStatus);
              setIsRowChanged(false);
            }}
          >
            Save
          </Button>
        )}
      </td>
    </tr>
  );
};

const PendingTasks = () => {
  // State variables
  const [pendingTasks, setPendingTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [viewTaskModalOpen, setViewTaskModalOpen] = useState(false);
  const [isStatusChanged, setIsStatusChanged] = useState(false);
  const [minMinutes, setMinMinutes] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState(0);

  // Move mockTasks to be accessible in the component scope
  const mockTasks = [
    {
      id: 1,
      taskId: 'TASK-001',
      title: 'Project Proposal Development',
      category: 'Development',
      subcategory: 'Frontend',
      client: 'Acme Corp',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      description: 'Develop a comprehensive project proposal for the new web application',
      status: 'completed',
      completionPercentage: 100,
      rows: [
        { title: 'Design', minutes: '15', status: 'completed' },
        { title: 'Implement', minutes: '35', status: 'completed' },
        { title: 'Review', minutes: '10', status: 'completed' },
        { title: 'Finalize', minutes: '5', status: 'completed' }
      ],
      ratePerHour: '2000',
      totalCost: '1500'
    },
    {
      id: 2,
      taskId: 'TASK-002',
      title: 'Design UI Mockups',
      category: 'Design',
      subcategory: 'UI Design',
      client: 'Tech Solutions',
      startDate: '2024-01-25',
      endDate: '2024-02-10',
      description: 'Create detailed UI mockups for the mobile application',
      assignedTo: 'Jane Smith',
      status: 'in progress',
      completionPercentage: 50,
      rows: [
        { title: 'Wireframing', minutes: '25', status: 'in progress' },
        { title: 'Prototyping', minutes: '30', status: 'in progress' }
      ],
      ratePerHour: '1500',
      totalCost: '1200'
    }
  ];

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchPendingTasks = async () => {
      try {
        setLoading(true);

        // Expand tasks based on subtasks
        const expandedTasks = mockTasks.flatMap(task => 
          task.rows.map((row, index) => ({
            ...task,
            title: row.title, // Use subtask title
            uniqueId: `${task.taskId}-${index}`, // Create a unique identifier
            subtaskDetails: {
              title: row.title,
              minutes: row.minutes,
              status: row.status,
              percentage: row.status === 'completed' ? 100 : 
                         row.status === 'in progress' ? 50 : 0
            }
          }))
        );

        setPendingTasks(expandedTasks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pending tasks:', error);
        setLoading(false);
      }
    };

    fetchPendingTasks();
  }, []);

  // Open task details modal
  const viewTask = (task) => {
    // Find the original task based on the task ID
    const originalTask = mockTasks.find(t => t.taskId === task.taskId);
    
    // Find the specific subtask within the original task
    const specificSubtask = originalTask.rows.find(
      row => row.title === task.title && row.minutes === task.subtaskDetails.minutes
    );

    // Create a modified task object with only the specific subtask details
    const taskDetails = {
      ...originalTask,
      title: task.title, // Use subtask title
      subtaskDetails: specificSubtask, // Include specific subtask details
      subtaskMinutes: task.subtaskDetails.minutes,
      subtaskStatus: task.subtaskDetails.status,
      rows: [specificSubtask] // Only include the specific subtask in rows
    };

    setSelectedTask(taskDetails);
    setViewTaskModalOpen(true);
    setMinMinutes('');
    setCalculatedAmount(0);
  };

  // Calculate Total Minutes
  const calculateTotalMinutes = (rows) => {
    return rows.reduce((sum, row) => sum + Number(row.minutes), 0);
  };

  // Calculate Total Hours
  const calculateTotalHours = (rows) => {
    const totalMinutes = calculateTotalMinutes(rows);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${hours}:${formattedMinutes}`;
  };

  // Calculate real-time cost
  const calculateRealTimeCost = (rows = [], ratePerHour = 0, additionalMinutes = 0) => {
    const totalMinutesFromRows = rows.reduce((sum, row) => {
      const minutes = Number(row.minutes) || 0;
      return sum + minutes;
    }, 0);

    const totalMinutes = totalMinutesFromRows + Number(additionalMinutes || 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const formattedHours = `${hours}:${minutes.toString().padStart(2, '0')}`;

    const totalHoursDecimal = Number(formattedHours.replace(':', '.'));

    const totalAmount = totalHoursDecimal * ratePerHour;

    return {
      totalMinutes,
      totalHoursDecimal,
      totalAmount,
      formattedHours
    };
  };

  // Calculate overall task completion percentage
  const calculateOverallCompletion = () => {
    if (pendingTasks.length === 0) return 0;
    const completedTasks = pendingTasks.filter(task => task.status === 'completed').length;
    return Math.round((completedTasks / pendingTasks.length) * 100);
  };

  // Calculate amount based on rate and minutes
  const calculateAmount = () => {
    if (!selectedTask) return;
    const rate = parseFloat(selectedTask.ratePerHour || '0');
    const minutes = parseFloat(minMinutes || '0');
    const hours = minutes / 60;
    const amount = rate * hours;
    setCalculatedAmount(amount);
  };

  // DataTable columns configuration
  const columns = [
    {
      name: 'Task ID',
      selector: row => row.taskId || 'N/A',
    },
    {
      name: 'Title',
      selector: row => row.title || 'Untitled Task',
    },
    {
      name: 'Subtask',
      selector: row => row.subtaskDetails?.title || 'No Subtask',
    },
    {
      name: 'Status',
      cell: row => (
        <span 
          className={`badge rounded-pill text-uppercase fw-bold px-3 py-2 ${
            (row.subtaskDetails?.status || '').toLowerCase() === 'created' ? 'bg-secondary text-white' :
            (row.subtaskDetails?.status || '').toLowerCase() === 'in progress' ? 'bg-warning text-dark' :
            (row.subtaskDetails?.status || '').toLowerCase() === 'completed' ? 'bg-success text-white' :
            'bg-light text-muted'
          }`}
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {row.subtaskDetails?.status || 'Unknown'} {row.subtaskDetails?.percentage || 0}%
        </span>
      ),
    },
    {
      name: 'Minutes',
      selector: row => row.subtaskDetails?.minutes || '0',
    },
    {
      name: 'Actions',
      cell: row => (
        <Button 
          variant="info" 
          size="sm" 
          onClick={() => viewTask(row)}
        >
          View Details
        </Button>
      ),
    }
  ];

  const handleRowStatusChange = (rowIndex, newStatus) => {
    if (!selectedTask) return;

    // Update the specific row's status
    const updatedRows = [...selectedTask.rows];
    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex],
      status: newStatus
    };

    // Update the entire task
    const updatedTask = {
      ...selectedTask,
      rows: updatedRows
    };

    // Calculate overall task status
    const allRowsCompleted = updatedRows.every(r => r.status === 'completed');
    const hasInProgressRows = updatedRows.some(r => r.status === 'in progress');

    // Update tasks
    setPendingTasks(prevTasks => 
      prevTasks.map(task => 
        task.taskId === selectedTask.taskId 
          ? { 
              ...updatedTask,
              status: allRowsCompleted ? 'completed' : 
                      hasInProgressRows ? 'in progress' : 'created',
              completionPercentage: allRowsCompleted ? 100 : 
                                    hasInProgressRows ? 50 : 0
            }
          : task
      )
    );

    // Update selected task and set status changed
    setSelectedTask(updatedTask);
    setIsStatusChanged(true);
  };

  const renderTaskDetailsModal = () => {
    if (!selectedTask) return null;

    const realTimeCost = calculateRealTimeCost(selectedTask.rows || [], Number(selectedTask.ratePerHour || 0));

    return (
      <Modal 
        show={viewTaskModalOpen} 
        onHide={() => {
          setViewTaskModalOpen(false);
          setMinMinutes('');
          setCalculatedAmount(0);
          setIsStatusChanged(false);
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
                    selectedTask?.subtaskDetails?.status?.toLowerCase() === 'created' ? 'bg-secondary text-white' :
                    selectedTask?.subtaskDetails?.status?.toLowerCase() === 'in progress' ? 'bg-warning text-dark' :
                    selectedTask?.subtaskDetails?.status?.toLowerCase() === 'completed' ? 'bg-success text-white' :
                    'bg-light text-muted'
                  }`}
                  style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {selectedTask?.subtaskDetails?.status || 'N/A'}
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
                          <strong>{selectedTask.taskId}</strong>
                        </div>
                        <div className="mb-2 d-flex justify-content-between">
                          <small className="text-muted">Original Task</small>
                          <strong>{selectedTask.title}</strong>
                        </div>
                        <div className="d-flex justify-content-between">
                          <small className="text-muted">Subtask Title</small>
                          <strong>{selectedTask.subtaskDetails.title}</strong>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <h6 className="text-muted mb-3 text-uppercase">Subtask Details</h6>
                      <div className="bg-light p-3 rounded">
                        <div className="mb-2 d-flex justify-content-between">
                          <small className="text-muted">Minutes</small>
                          <strong>{selectedTask.subtaskDetails.minutes}</strong>
                        </div>
                        <div className="mb-2 d-flex justify-content-between">
                          <small className="text-muted">Category</small>
                          <strong>{selectedTask.category} - {selectedTask.subcategory}</strong>
                        </div>
                        <div className="d-flex justify-content-between">
                          <small className="text-muted">Rate per Hour</small>
                          <strong>₹{selectedTask.ratePerHour || '0'}</strong>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <hr className="my-4 border-dashed" />

                  <h6 className="text-muted mb-3 text-uppercase">Amount Calculation</h6>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="text-muted">Enter Minimum Minutes</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="Enter minutes" 
                          value={minMinutes}
                          onChange={(e) => {
                            const minutes = e.target.value;
                            setMinMinutes(minutes);
                            
                            if (minutes && Number(minutes) > 0) {
                              const realTimeCost = calculateRealTimeCost(
                                selectedTask.rows || [], 
                                Number(selectedTask.ratePerHour || 0), 
                                Number(minutes)
                              );
                              
                              setCalculatedAmount(realTimeCost.totalAmount);
                            } else {
                              setCalculatedAmount(0);
                            }
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="text-muted">Calculated Amount</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={`₹${calculatedAmount.toFixed(2)}`} 
                          readOnly 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            
            {/* Status Update Section */}
            <Col md={4}>
              <Card className="shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <Card.Body className="p-4">
                  <h6 className="text-muted mb-3 text-uppercase">Update Status</h6>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Status</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={selectedTask?.subtaskDetails?.status || 'N/A'} 
                        readOnly 
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Change Status</Form.Label>
                      <Form.Select 
                        value={selectedTask?.subtaskDetails?.status || ''}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          setSelectedTask(prev => ({
                            ...prev,
                            subtaskDetails: {
                              ...prev.subtaskDetails,
                              status: newStatus
                            }
                          }));
                          setIsStatusChanged(true);
                        }}
                      >
                        <option value="">Select Status</option>
                        <option value="CREATED">Created</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                      </Form.Select>
                    </Form.Group>
                    {isStatusChanged && (
                      <Alert variant="warning" className="mt-3">
                        Status has been modified. Save changes to update.
                      </Alert>
                    )}
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setViewTaskModalOpen(false);
            setMinMinutes('');
            setCalculatedAmount(0);
            setIsStatusChanged(false);
          }}>
            Close
          </Button>
          <Button 
            variant="primary" 
            disabled={!isStatusChanged}
            onClick={() => {
              // TODO: Implement actual status update API call
              console.log('Updating task status:', selectedTask);
              // Example: handleUpdateTaskStatus(selectedTask);
              
              // Reset state
              setViewTaskModalOpen(false);
              setMinMinutes('');
              setCalculatedAmount(0);
              setIsStatusChanged(false);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div>
      {/* Page Header */}
      <PageHeader 
        HeaderText="Pending Tasks"
        Breadcrumb={[
          { name: 'Tasks', navigate: '/tasks' },
          { name: 'Pending Tasks' }
        ]}
      />
      
      {/* Tasks Table */}
      <Card>
        <Card.Body>
          <DataTable
            columns={columns}
            data={pendingTasks}
            progressPending={loading}
            pagination
            highlightOnHover
            striped
          />
        </Card.Body>
      </Card>

      {renderTaskDetailsModal()}
    </div>
  );
};

export default PendingTasks;