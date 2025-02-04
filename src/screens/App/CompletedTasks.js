import React, { useState, useEffect, useMemo } from 'react';
import { Button, Badge, Row, Col, Card, Form, Alert, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomTable from '../../components/customUI/CustomTable';
import PageHeader from "../../components/PageHeader";

const CompletedTasks = () => {
  // State variables
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [minMinutes, setMinMinutes] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [isStatusChanged, setIsStatusChanged] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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
            paymentType: 'lumpsum',
            totalCost: 300,
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

  // Calculate Total Cost
  const calculateTotalCost = (taskRows, ratePerHour) => {
    const totalMinutes = taskRows.reduce((sum, row) => sum + (Number(row.minutes) || 0), 0);
    return Number(((totalMinutes / 60) * ratePerHour).toFixed(2));
  };

  // Modal styles
  const modalStyles = `
    .task-modal-container {
      position: fixed !important;
      top: 0 !important;
      right: -100% !important;  
      width: 60vw !important;
      height: 100vh !important;
      background-color: white !important;
      box-shadow: -2px 0 5px rgba(0,0,0,0.1) !important;
      transition: right 0.3s ease-in-out !important;
      z-index: 1050 !important;
      overflow-y: auto !important;
      padding: 0px !important;
    }
    .task-modal-container.open {
      right: 0 !important;
    }
    .task-modal-overlay {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      background-color: rgba(0,0,0,0.5) !important;
      z-index: 1040 !important;
      display: none !important;
    }
    .task-modal-overlay.open {
      display: block !important;
    }
  `;

  // Add useEffect to dynamically inject styles
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.id = 'task-modal-styles';
    styleTag.innerHTML = modalStyles;
    document.head.appendChild(styleTag);

    return () => {
      const existingStyleTag = document.getElementById('task-modal-styles');
      if (existingStyleTag) {
        document.head.removeChild(existingStyleTag);
      }
    };
  }, []);

  // Custom Modal Component
  const TaskDetailsModal = ({ 
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

    // Close modal handler
    const handleCloseModal = () => {
      console.log('Closing modal');
      setIsModalOpen(false);
      setSelectedTask(null);
    };

    // Calculate overall task progress
    const calculateOverallProgress = () => {
      // If the task is completed, always return 100
      if (task.status?.toLowerCase() === 'completed') return 100;

      // If no rows/subtasks, return 0
      if (!taskRows.length) return 0;

      // Otherwise, calculate progress as before
      return taskRows.reduce((sum, r) => sum + (r.percentage || 0), 0) / taskRows.length;
    };

    const totalMinutesValue = calculateTotalMinutes(taskRows);
    const totalCostValue = calculateTotalCost(taskRows, selectedTask.ratePerHour || 0);

    return (
      <>
        <div 
          className={`task-modal-overlay ${isModalOpen ? 'open' : ''}`} 
          onClick={handleCloseModal}
        />
        <div 
          className={`task-modal-container ${isModalOpen ? 'open' : ''}`} 
          onClick={(e) => e.stopPropagation()}
        >
         <div className="modal-header d-flex justify-content-between align-items-center">
                <h5 className="modal-title ubuntu-font ubuntu-bold">View Task</h5>
                <div className="d-flex align-items-center justify-content-end">
                  <input
                    type="text"
                    className="form-control task-id-input text-center"
                    value={selectedTask.taskId || 'N/A'}
                    readOnly
                    style={{ width: '150px' }}
                  />
                  <button
                    type="button"
                    className="close ml-2"
                    onClick={() => handleCloseModal()}
                  >
                    &times;
                  </button>
                </div>
              </div>

          <div className="modal-body ubuntu-font ubuntu-regular">
            {/* Task Details */}
            <div className="row mb-3">
                     
                      <div className="col-md-6">
                        <label>Client</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedTask.client}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label>Template</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedTask.template || 'Web Design'}
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
                        value={task.date || 'N/A'}
                        placeholder="Execution Date"
                        style={{ 
                          backgroundColor: '#f0f0f0',
                          color: 'black',
                          cursor: 'not-allowed'
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
                        value={task.date ? new Date(task.date).toLocaleDateString() : 'N/A'}
                        placeholder="Execution Date"
                        style={{ 
                          backgroundColor: '#f0f0f0',
                          color: 'black',
                          cursor: 'not-allowed'
                        }}
                        readOnly
                      />
                    </div>
                  </div>
             <div className="col-md-6">
               <div className="row">
                 <div className="col-md-6 mb-2 pl-0">
                   <label className="ml">Execution Minutes</label>
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
                           : 'N/A')
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
                 <div className="col-md-6 mb-2 pr-0">
                   <label className="mr">Plan Minutes</label>
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
            {/* Task Rows */}
            <div className="table-responsive">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    
                    <th>Title</th>
                    <th>Subtask</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    
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
                  </tr>
                </tbody>
              </table>
            </div>

            

            {/* Calculations Section */}
            <div className="row mb-3 justify-content-center">
              <div className="col-md-3 text-center" style={{maxWidth: '150px'}}>
                <label>Total Minutes</label>
                <input
                  type="text"
                  className="form-control text-center"
                  value={totalMinutesValue}
                  readOnly
                />
              </div>
          
              <div className="col-md-6 text-center" style={{maxWidth: '150px'}}>
                <label>Fee per Hour</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">₹</span>
                  </div>
                  <input
                    type="number"
                    className="form-control text-center"
                    value={selectedTask.ratePerHour || ''}
                    readOnly
                    style={{ 
                      backgroundColor: '#e9ecef',
                      color: 'black',
                      
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6 text-center" style={{maxWidth: '150px'}}>
                <label>Total Fees</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">₹</span>
                  </div>
                  <input
                    type="number"
                    className="form-control text-center"
                    value={totalCostValue}
                    readOnly
                    style={{ 
                      backgroundColor: '#e9ecef',
                      color: 'black'
                    }}
                  />
                </div>
              </div>
            </div>

      
          </div>

          <div className="modal-footer">
          <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
          </div>
        </div>
      </>
    );
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key) {
      // If clicking on the same column, toggle direction
      direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    
    return (
      <span style={{ 
        marginLeft: '3px', 
        fontSize: '0.5em',  
        verticalAlign: 'super',  
        opacity: 0.7  
      }}>
        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
      </span>
    );
  };

  const filteredTaskRows = completedTasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAndFilteredTaskRows = useMemo(() => {
    let result = [...filteredTaskRows];

    if (sortConfig.key) {
      result.sort((a, b) => {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (valueA == null) return sortConfig.direction === 'ascending' ? 1 : -1;
        if (valueB == null) return sortConfig.direction === 'ascending' ? -1 : 1;

        if (valueA < valueB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valueA > valueB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [filteredTaskRows, sortConfig]);

  const handleViewTask = (task) => {
    console.log('View Task clicked:', task);
    setSelectedTask(prevTask => {
      console.log('Previous Task:', prevTask);
      return task;
    });
    
    setIsModalOpen(prevState => {
      console.log('Previous Modal State:', prevState);
      return true;
    });
  };

  return (
    <div>
      {/* Page Header */}
      <PageHeader 
        HeaderText="Completed Tasks"
        Breadcrumb={[
          { name: 'Tasks', navigate: '/tasks' },
          { name: 'Completed Tasks' }
        ]}
      />
      
      <CustomTable 
        title=""
        rows={sortedAndFilteredTaskRows}
        onRowAction={(task) => {
          handleViewTask(task);
        }}
      />

      {isModalOpen && selectedTask && (
        <TaskDetailsModal 
          task={selectedTask} 
        />
      )}
    </div>
  );
};

export default CompletedTasks;