import React, { useState, useEffect, useMemo } from 'react';
import { Card, Button, Form, Modal, Row, Col, ProgressBar, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageHeader from "../../components/PageHeader";
import DataTable from "react-data-table-component";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
         
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          
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
  const [selectedTask, setSelectedTask] = useState({
    executionDate: '',
    duration: '',
  });
  const [viewTaskModalOpen, setViewTaskModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isStatusChanged, setIsStatusChanged] = useState(false);
  const [minMinutes, setMinMinutes] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ 
    key: 'taskId',  
    direction: 'ascending'  
  });
  const [showExecutionDatePicker, setShowExecutionDatePicker] = useState(false);
  const [executionDate, setExecutionDate] = useState(
    selectedTask.executionDate 
      ? new Date(selectedTask.executionDate) 
      : new Date()
  );
  const [selectedDate, setSelectedDate] = useState('');

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
      paymentType:'Pay Per Minute',
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
      paymentType:'Lump Sum',
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
                         row.status === 'In Progress' ? 99 : 0
                        
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

  const handleTaskDetailChange = (field, value) => {
    const updatedTask = { ...selectedTask, [field]: value };
    
    // If rate per hour changes, recalculate total cost
    if (field === 'ratePerHour') {
      const totalHours = selectedTask.executedMinutes / 60;
      updatedTask.totalCost = Number((totalHours * value).toFixed(2));
    }
    
    setSelectedTask(updatedTask);
  };

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

                <div className="row mb-3">
                <div className="col-md-6">
                        <label>Assignment Duration</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter duration date"
                          style={{ width: '340px' }}
                          value={selectedTask.duration ? `${selectedTask.duration} ` : '5/1/2025'}
                          readOnly
                        />
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
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Enter execution date"
                          style={{ width: '340px' }}
                          value={selectedTask.executionDate || ''}
                          onChange={(e) => {
                            const newDate = e.target.value;
                            const updatedTask = {
                              ...selectedTask,
                              executionDate: newDate
                            };
                            setSelectedTask(updatedTask);
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                    <label>Status</label>
                    <select
                      className="form-control"
                      value={selectedTask.status || ''}
                      onChange={(e) => handleTaskDetailChange('status', e.target.value)}
                      style={{ width: '330px' }}
                    >
                      <option value="">Select Status</option>
                    
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  
                </div>
                {/* Task Rows */}
                <div className="table-responsive">
                  <table className="table table-bordered text-center">
                    <thead className="thead-white" style={{ color: 'black', backgroundColor: 'white' }}>
                      <tr>
                        <th className="text-center" style={{ width: '400px' }}>Title</th>
                        <th className="text-center"style={{ width: '80px' }}>Minutes</th>
                        <th className="text-center">Executed Minutes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTask.rows.map((row, index) => {
                        return (
                          <tr key={index} className="text-center">
                            <td>{row.title}</td>
                            <td>{row.minutes || 0} mins</td>
                            <td className="text-center align-middle p-2">
                              <div className="input-group justify-content-center">
                                <div className="input-group-prepend">
                                  <span 
                                    className="input-group-text" 
                                    style={{ 
                                      backgroundColor: 'white', 
                                      border: '1px solid #ced4da',
                                      borderRight: 'none'
                                    }}
                                  >
                                    <i className="fa fa-clock-o"></i>
                                  </span>
                                </div>
                                <input
                                  type="number"
                                  className="form-control text-center"
                                  style={{ 
                                    maxWidth: '100px',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    borderColor: '#ced4da'
                                  }}
                                  value={row.executedMinutes || ''}
                                  onChange={(e) => {
                                    const executedMinutes = parseInt(e.target.value) || 0;
                                    setSelectedTask(prev => {
                                      const updatedRows = [...prev.rows];
                                      updatedRows[index] = {
                                        ...updatedRows[index],
                                        executedMinutes,
                                        // Optionally update percentage or other derived values
                                        percentage: executedMinutes > 0 ? 
                                          Math.min(100, Math.round((executedMinutes / row.minutes) * 100)) : 
                                          0
                                      };
                                      
                                      // Recalculate total executed minutes and other task-level metrics
                                      const totalExecutedMinutes = updatedRows.reduce((sum, r) => sum + (r.executedMinutes || 0), 0);
                                      const totalHours = Number((totalExecutedMinutes / 60).toFixed(2));
                                      const ratePerHour = prev.ratePerHour || 0;
                                      const totalCost = Number((totalHours * ratePerHour).toFixed(2));

                                      return { 
                                        ...prev, 
                                        rows: updatedRows,
                                        executedMinutes: totalExecutedMinutes,
                                        totalHours,
                                        totalCost
                                      };
                                    });
                                  }}
                                  placeholder="Mins"
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

               

                {/* Calculations Section */}
                <div className="row mb-3 justify-content-center">
                  {/* <div className="col-md-6 text-center" style={{maxWidth: '150px'}}>
                    <label>Executed Minutes</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-clock-o"></i>
                        </span>
                      </div>
                      <input
                        type="number"
                        className="form-control text-center"
                        style={{ 
                          maxWidth: '100px',
                          backgroundColor: '#F0F0F0',
                          color: 'black',
                          borderColor: '#ced4da',
                          borderRadius: '0.25rem'
                        }}
                        value={selectedTask.executedMinutes || ''}
                        onChange={(e) => {
                          const executedMinutes = parseInt(e.target.value) || 0;
                          const totalHours = Number((executedMinutes / 60).toFixed(2)); // Convert minutes to hours
                          const ratePerHour = selectedTask.ratePerHour || 0;
                          const totalCost = Number((totalHours * ratePerHour).toFixed(2));
                          
                          setSelectedTask(prevTask => ({
                            ...prevTask,
                            executedMinutes,
                            totalHours,
                            totalCost
                          }));
                        }}
                        placeholder="Minutes"
                      />
                    </div>
                  </div> */}
                 
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
                        onChange={(e) => {
                          const ratePerHour = parseFloat(e.target.value) || 0;
                          handleTaskDetailChange('ratePerHour', ratePerHour);
                        }}
                      />
                    </div>
                  </div>
                
                </div>

                <div className="row mb-3">
                  <div className="col-12 d-flex justify-content-end">
                  <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setViewTaskModalOpen(false)}
                    >
close                    </button>
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
          <div className="input-group" style={{ width: '50%' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <Card className="product_item_list product-order-list">
       
        <Card.Body>
          <table className="table table-hover m-b-0 text-center">
            <thead className="thead-theme theme-bg-primary">
              <tr>
                <th 
                  onClick={() => handleSort('taskId')}
                  className={sortConfig.key === 'taskId' ? 'sortable active' : 'sortable'}
                >
                  Task ID
                  <span style={{ 
                    marginLeft: '3px', 
                    fontSize: '0.5em',  
                    verticalAlign: 'super',  
                    opacity: 0.7  
                  }}>
                    ▲
                  </span>
                </th>
                <th 
                  onClick={() => handleSort('client')}
                  className={sortConfig.key === 'client' ? 'sortable active' : 'sortable'}
                >
                  Client
                  {sortConfig.key === 'client' && (
                    <span style={{ 
                      marginLeft: '3px', 
                      fontSize: '0.5em',  
                      verticalAlign: 'super',  
                      opacity: 0.7  
                    }}>
                      {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
                <th 
                  onClick={() => handleSort('title')}
                  className={sortConfig.key === 'title' ? 'sortable active' : 'sortable'}
                >
                  Title
                  {sortConfig.key === 'title' && (
                    <span style={{ 
                      marginLeft: '3px', 
                      fontSize: '0.5em',  
                      verticalAlign: 'super',  
                      opacity: 0.7  
                    }}>
                      {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
                <th 
                  onClick={() => handleSort('category')}
                  className={sortConfig.key === 'category' ? 'sortable active' : 'sortable'}
                >
                  Category
                  {sortConfig.key === 'category' && (
                    <span style={{ 
                      marginLeft: '3px', 
                      fontSize: '0.5em',  
                      verticalAlign: 'super',  
                      opacity: 0.7  
                    }}>
                      {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
               
                <th 
                  onClick={() => handleSort('PaymentType')}
                  className={sortConfig.key === 'PaymentType' ? 'sortable active' : 'sortable'}
                >
                  Payment Type
                  {sortConfig.key === 'PaymentType' && (
                    <span style={{ 
                      marginLeft: '3px', 
                      fontSize: '0.5em',  
                      verticalAlign: 'super',  
                      opacity: 0.7  
                    }}>
                      {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
                <th 
                  onClick={() => handleSort('totalCost')}
                  className={sortConfig.key === 'totalCost' ? 'sortable active' : 'sortable'}
                >
                   Assignment Value
                  {sortConfig.key === 'totalCost' && (
                    <span style={{ 
                      marginLeft: '3px', 
                      fontSize: '0.5em',  
                      verticalAlign: 'super',  
                      opacity: 0.7  
                    }}>
                      {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
          
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
                   
                    <td>{task.taskId}</td>
                    <td>{task.client}</td>
                    <td>{task.title}</td>
                    <td>{task.category}</td>
                    
                    <td>{task.paymentType}</td>
                    <td>{task.totalCost}</td>
                    
                   
                   
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