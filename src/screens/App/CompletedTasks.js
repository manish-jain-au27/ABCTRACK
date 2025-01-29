import React, { useState, useEffect } from 'react';
import { Button, Table, Badge, Row, Col, Card, Form, Alert, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CompletedTasks = () => {
  // State variables
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [minMinutes, setMinMinutes] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [isStatusChanged, setIsStatusChanged] = useState(false);

  // Fetch completed tasks (replace with actual API call)
  useEffect(() => {
    const fetchCompletedTasks = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call to fetch completed tasks
        
        const mockCompletedTasks = [
          {
            id: 1,
            client:'Acme Corporation',
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
            subcategory: 'Proposal',
            date: '01-05-2024',
            rows: [
              { title: 'Research', minutes: '60', percentage: 100, status: 'completed' },
              { title: 'Draft', minutes: '120', percentage: 100, status: 'completed' },
              { title: 'Review', minutes: '90', percentage: 100, status: 'completed' }
            ]
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

  // Calculate Total Minutes
  const calculateTotalMinutes = (rows) => {
    if (!rows || !Array.isArray(rows)) return 0;
    return rows.reduce((sum, row) => sum + Number(row.minutes), 0);
  };

  // Calculate Total Hours
  const calculateTotalHours = (rows) => {
    const totalMinutes = calculateTotalMinutes(rows);
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Modal styles
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

  // Custom Modal Component
  const TaskDetailsModal = ({ 
    show, 
    onHide, 
    task 
  }) => {
    // Ensure task and rows exist
    if (!task) return null;

    // Fallback for rows
    const taskRows = task.rows || task.subtasks || [
      {
        title: task.title || 'N/A', 
        percentage: task.completionPercentage || 0,
        minutes: task.minutes || 0,
        status: task.status || 'Not Set'
      }
    ];

    // Calculate overall task progress
    const calculateOverallProgress = () => {
      // If the task is completed, always return 100
      if (task.status?.toLowerCase() === 'completed') return 100;

      // If no rows/subtasks, return 0
      if (!taskRows.length) return 0;

      // Otherwise, calculate progress as before
      return taskRows.reduce((sum, r) => sum + (r.percentage || 0), 0) / taskRows.length;
    };

    return (
      <div 
        className={`task-modal-overlay ${show ? 'open' : ''}`} 
        onClick={onHide}
      >
        <div 
          className={`task-modal-container ${show ? 'open' : ''}`} 
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h5 className="modal-title ubuntu-font ubuntu-bold">View Task</h5>
            <button
              type="button"
              className="close"
              onClick={onHide}
            >
              &times;
            </button>
          </div>

          <div className="modal-body ubuntu-font ubuntu-regular">
            {/* Task Details */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Task ID</label>
                <input
                  type="text"
                  className="form-control task-id-input"
                  value={task.taskId || 'N/A'}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label>Client</label>
                <input
                  type="text"
                  className="form-control"
                  value={task.client || 'N/A'}
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

            {/* Task Rows */}
            <div className="table-responsive">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    
                    <th>Title</th>
                    <th>Subtask</th>
                    
                    <th>Minutes</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    
                    <td>{task.title || 'N/A'}</td>
                    <td>{task.currentSubtask?.title || 'N/A'}</td>
                    
                    <td>{task.subtaskMinutes || 0}</td>
                    <td>
                      <Badge
                        bg={task.status?.toLowerCase() === 'completed' ? 'success' : 'secondary'}
                        className="px-2 py-1"
                      >
                        {task.status || 'N/A'}
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Task Status Progress Bar */}
            <div className="row mb-3">
              <div className="col-md-12">
                <label>Task Progress</label>
                <ProgressBar 
                  now={calculateOverallProgress()} 
                  label={`${calculateOverallProgress().toFixed(0)}%`} 
                  animated 
                  variant={
                    !task.rows || task.rows.length === 0 ? 'danger' : 
                    task.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / task.rows.length === 0 ? 'danger' : 
                    task.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / task.rows.length < 99 ? 'warning' : 
                    'success'
                  } 
                  labelProps={{ style: { color: 'black', fontWeight: 'bold' } }}
                />
              </div>
            </div>

            {/* Calculations Section */}
            <div className="row mb-3 justify-content-center">
              <div className="col-md-3 text-center" style={{maxWidth: '150px'}}>
                <label>Total Minutes</label>
                <input
                  type="text"
                  className="form-control text-center"
                  value={calculateTotalMinutes(taskRows)}
                  readOnly
                />
              </div>
              <div className="col-md-3 text-center" style={{maxWidth: '150px'}}>
                <label>Total Hours</label>
                <input
                  type="text"
                  className="form-control text-center"
                  value={(calculateTotalMinutes(taskRows) / 60).toFixed(2)}
                  readOnly
                />
              </div>
              <div className="col-md-3 text-center" style={{maxWidth: '150px'}}>
                <label>Rate per Hour</label>
                <input
                  type="text"
                  className="form-control text-center"
                  value={task.ratePerHour || '0'}
                  readOnly
                />
              </div>
              <div className="col-md-3 text-center" style={{maxWidth: '150px'}}>
                <label>Total Cost</label>
                <input
                  type="text"
                  className="form-control text-center"
                  value={
                    task.ratePerHour && task.totalMinutes 
                      ? `₹${((task.ratePerHour * task.totalMinutes) / 60).toFixed(2)}` 
                      : '₹0.00'
                  }
                  readOnly
                />
              </div>
            </div>

          

      
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary mr-2"
              style={{
                borderRadius: '20px',
                padding: '0.25rem 0.75rem',
                textTransform: 'uppercase',
                fontWeight: '600',
                letterSpacing: '0.5px',
                border: '2px solid',
                transition: 'all 0.3s ease'
              }}
              onClick={onHide}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Open task details modal
  const handleViewDetails = (task, subtask) => {
    console.log('Selected Task:', task);
    console.log('Selected Subtask:', subtask);
    setSelectedTask({
      ...task,
      currentSubtask: subtask
    });
    setIsModalOpen(true);
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
                  <table className="table table-hover m-b-0">
                    <thead className="thead-dark">
                      <tr>
                        <th>Date</th>
                        <th>Task ID</th>
                        <th>Title</th>
                        <th>Client</th>
                        <th>Category</th>
                        <th>Minutes</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedTasks.map((task) => (
                        <tr key={task.taskId}>
                          <td>{task.date || new Date().toLocaleDateString('en-GB')}</td>
                          <td>{task.taskId}</td>
                          <td>{task.title}</td>
                          <td>{task.client || 'N/A'}</td>
                          <td>{task.category || 'N/A'}</td>
                          <td>
                            {calculateTotalMinutes(task.rows)} mins
                          </td>
                          <td>
                            <div style={{ width: '100%' }}>
                              <ProgressBar 
                                now={task.rows && task.rows.length > 0 ? task.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / task.rows.length : 0} 
                                label={`${(task.rows && task.rows.length > 0 ? task.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / task.rows.length : 0).toFixed(0)}%`} 
                                animated 
                                variant={
                                  !task.rows || task.rows.length === 0 ? 'danger' : 
                                  task.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / task.rows.length === 0 ? 'danger' : 
                                  task.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / task.rows.length < 99 ? 'warning' : 
                                  'success'
                                } 
                                labelProps={{ style: { color: 'black', fontWeight: 'bold' } }}
                              />
                            </div>
                          </td>
                          <td>
                            <Link 
                              to="#" 
                              className="btn btn-outline-info mr-1" 
                              onClick={() => {
                                setSelectedTask(task);
                                setIsModalOpen(true);
                              }}
                            >
                              <i className="icon-eye"></i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">No completed tasks found</div>
      )}

      {isModalOpen && selectedTask && (
        <TaskDetailsModal 
          show={isModalOpen} 
          onHide={() => setIsModalOpen(false)} 
          task={selectedTask} 
        />
      )}
    </div>
  );
};

export default CompletedTasks;