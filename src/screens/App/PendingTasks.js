import React, { useState, useEffect, useMemo } from 'react';
import { Card, Button, Form, Modal, Row, Col, ProgressBar, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageHeader from "../../components/PageHeader";
import DataTable from "react-data-table-component";

const TaskRowItem = ({ 
  row, 
  index, 
  onStatusChange,
  onViewTask,
  onEditTask 
}) => {
  const [rowStatus, setRowStatus] = useState(row.status || 'Created');
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
          <option value="Created">Created</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
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
        <div className="d-flex">
          <Link 
            to="#" 
            className="btn btn-outline-info mr-1" 
            onClick={() => onViewTask(row)}
          >
            <i className="icon-eye"></i>
          </Link>
          <Link 
            to="#" 
            className="btn btn-outline-warning mr-1" 
            onClick={() => onEditTask(row)}
          >
            <i className="icon-pencil"></i>
          </Link>
        </div>
      </td>
    </tr>
  );
};

const PendingTasks = () => {
  // State variables
  const [pendingTasks, setPendingTasks] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [viewTaskModalOpen, setViewTaskModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isStatusChanged, setIsStatusChanged] = useState(false);
  const [minMinutes, setMinMinutes] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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
      status: 'pending',
      completionPercentage: 0,
      rows: [
        { title: 'Wireframing', minutes: '25', status: 'pending' },
        { title: 'Prototyping', minutes: '30', status: 'pending' }
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
              percentage: row.status === 'Completed' ? 100 : 
                         row.status === 'In Progress' ? 50 : 
                         row.status === 'Created' ? 0 : 
                         row.status === 'On Hold' ? 25 : 0
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
      name: 'Progress',
      cell: row => (
        <div className="progress-container" style={{ width: '100%' }}>
          <ProgressBar 
            now={row.subtaskDetails?.percentage || 0} 
            label={`${row.subtaskDetails?.percentage || 0}%`} 
            animated 
            variant={
              (row.subtaskDetails?.percentage || 0) < 25 ? 'danger' : 
              (row.subtaskDetails?.percentage || 0) < 50 ? 'warning' : 
              (row.subtaskDetails?.percentage || 0) < 75 ? 'info' : 
              'success'
            } 
            labelProps={{ style: { color: 'black', fontWeight: 'bold' } }}
          />
        </div>
      ),
    },
    {
      name: 'Status',
      cell: row => (
        <span className={`badge badge-${
          row.subtaskDetails?.status === 'created' ? 'secondary' :
          row.subtaskDetails?.status === 'in progress' ? 'warning' :
          row.subtaskDetails?.status === 'completed' ? 'success' :
          'light'
        } bg-${
          row.subtaskDetails?.status === 'created' ? 'secondary' :
          row.subtaskDetails?.status === 'in progress' ? 'warning' :
          row.subtaskDetails?.status === 'completed' ? 'success' :
          'light'
        } text-white`}>
          {row.subtaskDetails?.status || 'Unknown'}
        </span>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex justify-content-center align-items-center">
          <Link 
            to="#" 
            className="btn btn-outline-info mr-1" 
            onClick={() => viewTask(row)}
          >
            <i className="icon-eye"></i>
          </Link>
        </div>
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

  // Filtering logic
  const filteredTasks = pendingTasks.filter(
    task => 
      task.taskId.toLowerCase().includes(filterText.toLowerCase()) ||
      task.title.toLowerCase().includes(filterText.toLowerCase()) ||
      task.category.toLowerCase().includes(filterText.toLowerCase()) ||
      task.subcategory.toLowerCase().includes(filterText.toLowerCase()) ||
      task.client.toLowerCase().includes(filterText.toLowerCase())
  );

  const filteredAndSortedTasks = useMemo(() => {
    let result = filteredTasks;

    // Search functionality
    if (searchTerm) {
      result = result.filter(task => 
        task.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting functionality
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (sortConfig.key === 'date') {
          // Convert date strings to Date objects for comparison
          const dateA = new Date(a[sortConfig.key]);
          const dateB = new Date(b[sortConfig.key]);
          return sortConfig.direction === 'ascending' 
            ? dateA - dateB 
            : dateB - dateA;
        }
        
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [filteredTasks, searchTerm, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Search Component
  const SubHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <Form.Group className="d-flex align-items-center">
        <Form.Control
          id="search"
          type="text"
          placeholder="Search tasks..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="me-2"
          style={{ width: '250px' }}
        />
        <Button 
          variant="outline-secondary" 
          onClick={handleClear}
        >
          Clear
        </Button>
      </Form.Group>
    );
  }, [filterText, resetPaginationToggle]);

  const modalStyles = `
    .task-details-modal-container {
      position: fixed;
      top: 0;
      right: -500px;
      width: 50vw;
      height: 100vh;
      background-color: white;
      box-shadow: -2px 0 5px rgba(0,0,0,0.1);
      transition: right 0.3s ease-in-out;
      z-index: 1050;
      overflow-y: auto;
      padding: 0px;
    }
    .task-details-modal-container.open {
      right: 0;
    }
    .task-details-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 1040;
      display: none;
    }
    .task-details-modal-overlay.open {
      display: block;
    }
  `;

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.textContent = modalStyles;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const renderTaskDetailsModal = () => {
    if (!selectedTask) return null;

    return (
      <>
        {viewTaskModalOpen && (
          <div 
            className={`task-details-modal-overlay ${viewTaskModalOpen ? 'open' : ''}`} 
            onClick={() => setViewTaskModalOpen(false)}
          >
            <div 
              className={`task-details-modal-container ${viewTaskModalOpen ? 'open' : ''}`} 
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
                    onClick={() => setViewTaskModalOpen(false)}
                  >
                    &times;
                  </button>
                </div>
              </div>

              <div className="modal-body ubuntu-font ubuntu-regular">
                {/* Task Details */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Task ID</label>
                    <input
                      type="text"
                      className="form-control task-id-input"
                      value={selectedTask.taskId}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Client</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedTask.client}
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
                      value={selectedTask.category}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Subcategory</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedTask.subcategory}
                      readOnly
                    />
                  </div>
                </div>

                

                {/* Task Rows */}
                <div className="table-responsive">
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th className="text-center sr-no-shrink" style={{width: '30px'}}>Sr. No.</th>
                        <th className="text-center" style={{ width: '300px' }}>Title</th>
                        <th className="text-center"style={{ width: '80px' }}>Minutes</th>
                        <th className="text-center" style={{ width: '10px' }}>Add Mins</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTask.rows.map((row, index) => {
                        // Define status options
                        const statusOptions = [
                          { value: 'pending', label: 'Pending' },
                          { value: 'in_progress', label: 'In Progress' },
                          { value: 'completed', label: 'Completed' },
                          { value: 'on_hold', label: 'On Hold' }
                        ];

                        return (
                          <tr key={index} className="text-center">
                            <td>{index + 1}</td>
                            <td>{row.title}</td>
                            <td>{row.minutes || 0} mins</td>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-sm text-center"
                                placeholder="Add mins"
                                min="0"
                                value={row.additionalMinutes || ''}
                                onChange={(e) => {
                                  const additionalMinutes = parseInt(e.target.value) || 0;
                                  setSelectedTask(prev => {
                                    const updatedRows = [...prev.rows];
                                    updatedRows[index] = {
                                      ...updatedRows[index],
                                      additionalMinutes: additionalMinutes
                                    };
                                    return { ...prev, rows: updatedRows };
                                  });
                                }}
                                style={{ width: '80px', margin: '0 auto' }}
                              />
                            </td>
                            <td>
                              <select
                                className="form-control form-control-sm text-center"
                                value={row.status}
                                onChange={(e) => {
                                  const newStatus = e.target.value;
                                  setSelectedTask(prev => {
                                    const updatedRows = [...prev.rows];
                                    updatedRows[index] = {
                                      ...updatedRows[index],
                                      status: newStatus,
                                      // Automatically update percentage based on status
                                      percentage: 
                                        newStatus === 'pending' ? 0 :
                                        newStatus === 'in_progress' ? 50 :
                                        newStatus === 'completed' ? 100 :
                                        0
                                    };
                                    return { ...prev, rows: updatedRows };
                                  });
                                }}
                              >
                                {statusOptions.map(option => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Task Status Progress Bar with Animation */}
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>Task Progress</label>
                    <ProgressBar 
                      now={selectedTask.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / selectedTask.rows.length} 
                      label={`${(selectedTask.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / selectedTask.rows.length).toFixed(0)}%`} 
                      animated 
                      variant={
                        selectedTask.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / selectedTask.rows.length === 0 ? 'danger' : 
                        selectedTask.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / selectedTask.rows.length < 50 ? 'warning' : 
                        selectedTask.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / selectedTask.rows.length < 99 ? 'info' :
                        'success'
                      } 
                      labelProps={{ 
                        style: { 
                          color: 'black', 
                          fontWeight: 'bold',
                          transition: 'width 0.5s ease-in-out' 
                        } 
                      }}
                    />
                  </div>
                </div>

                {/* Calculations Section */}
                <div className="row mb-3 justify-content-center">
                  <div className="col-md-6 text-center" style={{maxWidth: '150px'}}>
                    <label>Total Minutes</label>
                    <input
                      type="text"
                      className="form-control text-center"
                      value={selectedTask.rows.reduce((sum, row) => sum + (parseInt(row.minutes) || 0), 0)}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 text-center" style={{maxWidth: '150px'}}>
                    <label>Total Hours</label>
                    <input
                      type="text"
                      className="form-control text-center"
                      value={(selectedTask.rows.reduce((sum, row) => sum + (parseInt(row.minutes) || 0), 0) / 60).toFixed(2)}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 text-center" style={{maxWidth: '150px'}}>
                    <label>Rate per Hour</label>
                    <input
                      type="text"
                      className="form-control text-center"
                      value={selectedTask.ratePerHour}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 text-center" style={{maxWidth: '150px'}}>
                    <label>Total Cost</label>
                    <input
                      type="text"
                      className="form-control text-center"
                      value={selectedTask.totalCost}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12 d-flex justify-content-end">
                    <button
                      className="btn btn-secondary"
                      style={{
                        borderRadius: '20px',
                        padding: '0.25rem 0.75rem',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                        letterSpacing: '0.5px',
                        border: '2px solid',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => setViewTaskModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const handleStatusChange = (taskId, newStatus) => {
    console.log(`Changing status of task ${taskId} to ${newStatus}`);
    // Implement actual status change logic here
    // This might involve updating state or making an API call
    // For now, just a placeholder
    setSelectedTask(prevTask => ({
      ...prevTask,
      status: newStatus
    }));
  };

  const handleCreateInvoice = (taskId) => {
    console.log(`Creating invoice for task ${taskId}`);
    // Implement invoice creation logic here
    // This might involve opening an invoice modal or making an API call
  };

  const addAdditionalMinutes = (rowIndex) => {
    const additionalMinutes = selectedTask.rows[rowIndex].additionalMinutes;
    
    if (additionalMinutes !== null && !isNaN(additionalMinutes)) {
      setSelectedTask(prev => {
        const updatedRows = [...prev.rows];
        const currentMinutes = parseInt(updatedRows[rowIndex].minutes || 0);
        const newMinutes = currentMinutes + parseInt(additionalMinutes);
        
        updatedRows[rowIndex] = {
          ...updatedRows[rowIndex],
          minutes: newMinutes.toString(),
          additionalMinutes: 0, // Reset additional minutes after adding
          percentage: Math.min(100, Math.round((newMinutes / 60) * 100))
        };
        
        return { ...prev, rows: updatedRows };
      });
    }
  };

  const customStyles = {
    headCells: {
      style: {
        fontSize: '0.875rem',
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        padding: '0.5rem 1rem',
        border: 'none',
        backgroundColor: '#f7f7f7',
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem'
      },
    },
    cells: {
      style: {
        fontSize: '0.875rem',
        padding: '0.5rem 1rem',
        border: 'none',
        borderBottom: '1px solid #ddd'
      },
    },
    pagination: {
      style: {
        fontSize: '0.875rem',
        padding: '0.5rem 1rem',
        border: 'none',
        backgroundColor: '#f7f7f7',
        borderBottomLeftRadius: '0.5rem',
        borderBottomRightRadius: '0.5rem'
      },
    },
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
      
      {/* Search Bar */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Tasks Table */}
      <Card className="product_item_list product-order-list">
        <Card.Header>
          <Card.Title>Pending Tasks</Card.Title>
        </Card.Header>
        <Card.Body>
          <table className="table table-hover m-b-0 text-center">
            <thead className="thead-dark">
              <tr>
                <th onClick={() => handleSort('date')}>
                  Date {sortConfig.key === 'date' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort('taskId')}>
                  Task ID {sortConfig.key === 'taskId' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort('title')}>
                  Title {sortConfig.key === 'title' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort('category')}>
                  Category {sortConfig.key === 'category' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort('subcategory')}>
                  Subcategory {sortConfig.key === 'subcategory' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                </th>
                <th>Minutes</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTasks.map((task, index) => {
                const totalMinutes = calculateTotalMinutes(task.rows);
                const statusColor = 
                  task.status === 'created' || task.completionPercentage === 0 ? 'danger' :
                  task.status === 'in progress' ? 'warning' :
                  task.status === 'completed' ? 'success' : 'light';

                const taskProgress = 
                  task.status === 'created' ? 0 :
                  task.status === 'completed' ? 100 : 0;

                return (
                  <tr key={index} className="text-center">
                    <td>{task.date || new Date().toLocaleDateString('en-GB')}</td>
                    <td>{task.taskId}</td>
                    <td>{task.title}</td>
                    <td>{task.category}</td>
                    <td>{task.subcategory}</td>
                    <td>
                      {task.rows.reduce((total, row) => total + parseInt(row.minutes || 0), 0)}
                    </td>
                   
                    <td>
                      <div className="progress-container" style={{ width: '100%' }}>
                        <ProgressBar 
                          now={taskProgress} 
                          label={`${taskProgress}%`} 
                          variant={
                            taskProgress <= 25 ? 'danger' :
                            taskProgress <= 50 ? 'warning' :
                            taskProgress <= 75 ? 'info' : 'success'
                          }
                          style={{ height: '20px', fontSize: '0.8em' }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <Link 
                          to="#" 
                          className="btn btn-outline-info mr-1" 
                          onClick={() => viewTask(task)}
                        >
                          <i className="icon-eye"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card.Body>
      </Card>

      {renderTaskDetailsModal()}
    </div>
  );
};

export default PendingTasks;