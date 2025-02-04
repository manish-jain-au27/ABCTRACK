import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import PageHeader from "../../components/PageHeader";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css
import { enUS } from 'date-fns/locale';
import { addDays } from 'date-fns';
import Select from "react-dropdown-select";
import { ProgressBar } from "react-bootstrap"; // Import ProgressBar from react-bootstrap
import CustomTable from '../../components/customUI/CustomTable';
import { notifyGeneralInfo } from '../../actions/UIElementsAction'; // Import notifyGeneralInfo from UIElementsAction
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const AppTaskbar = (props) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const [tasks, setTasks] = useState([]);
  // New state for controlling task duration section visibility
  const [isTaskDurationOpen, setIsTaskDurationOpen] = useState(false);

  const [taskHeader, setTaskHeader] = useState({
    taskId: '',
    category: '',
    subcategory: '',
    client: '',
    startDate: '',
    endDate: '',
    title: ''
  });

  const [taskRows, setTaskRows] = useState([
    { title: '', minutes: '0', percentage: 0 }
  ]);
  const [ratePerHour, setRatePerHour] = useState(0);
  const [realTimeCost, setRealTimeCost] = useState({
    totalMinutes: 0,
    totalHoursDecimal: 0,
    totalCost: 0,
    formattedHours: '0:00'
  });
  const [viewTaskModalOpen, setViewTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({
    title: '',
    rows: [],
    ratePerHour: 0,
    totalCost: 0
  });

  const data = [
    {
      index: "1",
      taskId: "TASK-001",
      date: new Date().toLocaleDateString('en-GB'), // DD/MM/YYYY format
      title: "Design",
      status: "Created",
      rows: [
        {
          title: "Design",
          minutes: "55",
          percentage: 20
        },
        {
          title: "Implement",
          minutes: "35",
          percentage: 50
        }
      ],
      totalHours: "0.2",
      client: "Amit",
      category: "Development",
      subcategory: "Frontend",
      ratePerHour: "2000",
      totalCost: "2000",
      paymentType: "lumpsum"
    },
    {
      index: "2",
      taskId: "TASK-002",
      date: new Date().toLocaleDateString('en-GB'), // DD/MM/YYYY format
      title: "Develop",
      status: "In Progress",
      rows: [
        {
          title: "Develop",
          minutes: "15",
          percentage: 75
        },
        {
          title: "Implement",
          minutes: "35",
          percentage: 40
        }
      ],
      totalHours: "12",
      client: "Amit",
      category: "Development",
      subcategory: "Frontend",
      ratePerHour: "2000",
      totalCost: "3400",
      paymentType: "Pay Per Minute"
    },
  ];

  // Handle Header Input Changes
  const handleHeaderInputChange = (e) => {
    const { name, value } = e.target;
    setTaskHeader(prev => ({
      ...prev,
      [name]: value
    }));
  };
 // Calculate Total Minutes
  const calculateTotalMinutes = () => {
    return taskRows.reduce((sum, row) => sum + Number(row.minutes), 0);
  };

  // Calculate Total Hours
  const calculateTotalHours = () => {
    return calculateTotalMinutes();
  };

  // Calculate real-time cost
  const calculateRealTimeCost = (rows = taskRows, rate = ratePerHour) => {
    // Calculate total minutes
    const totalMinutes = rows.reduce((sum, row) => sum + Number(row.minutes), 0);
    const totalHoursDecimal = totalMinutes / 60;

    // Calculate total cost based on payment type
    let totalCost = 0;
    let lumpsumTotal = 0;
    let perMinuteTotal = 0;

    // Calculate lumpsum total (sum of rates)
    lumpsumTotal = rows.reduce((sum, row) => {
      const rowRate = parseFloat(row.rate) || 0;
      return sum + rowRate;
    }, 0);

    // Calculate per-minute total
    perMinuteTotal = totalHoursDecimal * rate;

    // Set total cost based on payment type
    if (paymentType === 'lumpsum') {
      totalCost = lumpsumTotal;
    } else {
      totalCost = perMinuteTotal;
    }

    return {
      totalMinutes,
      totalHoursDecimal,
      totalCost,
      lumpsumTotal,
      perMinuteTotal,
      formattedHours: `${Math.floor(totalHoursDecimal)}:${String(Math.round((totalHoursDecimal % 1) * 60)).padStart(2, '0')}`
    };
  };

  // Modify the rate per hour setter to include logging
  const setRatePerHourWithLogging = (rate) => {
    const numericRate = Number(rate);

    const safeRate = isNaN(numericRate) ? 0 : numericRate;

    setRatePerHour(safeRate);

    const updatedCost = calculateRealTimeCost(taskRows, safeRate);

    setRealTimeCost(updatedCost);
  };

  // Add validation state
  const [validationErrors, setValidationErrors] = useState({
    clients: false,
    template: false,
    category: false,
    subcategory: false,
    dateRange: false,
    paymentType: false,
    taskDetails: false
  });



  // Load tasks from localStorage on component mount
  useEffect(() => {
    document.title = "Tasks - ABC Track"
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        setTasks([]);
      }
    } else {
      setTasks([]);
    }
  }, []);

  const viewTask = (row) => {
    setSelectedTask({
      ...selectedTask,
      ...row,
      ratePerHour: row.ratePerHour || selectedTask.ratePerHour || 0,
      totalCost: row.totalCost || selectedTask.totalCost || 2500
    });
    setViewTaskModalOpen(true);
  };

  const updateTaskStatus = (taskId, newStatus) => {
  };

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.taskId === taskId
        ? { ...task, status: newStatus }
        : task
    );

    setTasks(updatedTasks);
    setViewTaskModalOpen(false);
  };

  // Utility function to normalize status for comparison
  const normalizeStatus = (status) => {
    return (status || '').trim().toLowerCase();
  };

  // Status comparison function
  const isStatus = (currentStatus, targetStatus) => {
    const normalizedCurrent = normalizeStatus(currentStatus);
    const normalizedTarget = normalizeStatus(targetStatus);

    const statusMappings = {
      'created': ['created'],
      'in progress': ['in progress'],
      'completed': ['completed']
    };

    return statusMappings[normalizedTarget]?.includes(normalizedCurrent) || false;
  };

  // Filtering tasks by status
  const createdTasks = data.filter(task => isStatus(task.status, 'created'));
  const inProgressTasks = data.filter(task => isStatus(task.status, 'in progress'));
  const completedTasks = data.filter(task => isStatus(task.status, 'completed'));

  // Calculations
  const calculateTotalCost = () => {
    const totalCost = tasks.reduce((acc, task) => {
      const totalHoursDecimal = convertHoursToDecimal(task.totalHours);

      const taskCost = totalHoursDecimal * (task.ratePerHour || 0);

      return acc + taskCost;
    }, 0);

    return totalCost;
  };

  const calculateTotalTaskHours = () => {
    const totalHours = tasks.reduce((acc, task) => {
      if (!task.totalHours) return acc;

      const [hours, minutes] = task.totalHours.split(':').map(Number);
      return {
        hours: acc.hours + hours,
        minutes: acc.minutes + minutes
      };
    }, { hours: 0, minutes: 0 });

    const normalizedHours = totalHours.hours + Math.floor(totalHours.minutes / 60);
    const normalizedMinutes = totalHours.minutes % 60;

    return `${normalizedHours}:${normalizedMinutes.toString().padStart(2, '0')}`;
  };

  // Helper function to convert hours:minutes to decimal hours
  const convertHoursToDecimal = (hoursString) => {
    if (!hoursString) return 0;
    const [hours, minutes] = hoursString.split(':').map(Number);
    return hours + (minutes / 60);
  };

  const customStyles = {
    table: {
      style: {
        borderCollapse: 'collapse',
        border: '1px solid #ddd',
      },
    },
    rows: {
      style: {
        '&:hover': {
          backgroundColor: '#f3f0fe',
        },
      },
    },
    headCells: {
      style: {
        border: '1px solid #ddd',
        borderCollapse: 'collapse',
        padding: '10px',
        textAlign: 'center',
        fontSize: '15px',
        textTransform: 'uppercase'
      },
    },
    cells: {
      style: {
        border: '1px solid #ddd',
        borderCollapse: 'collapse',
        padding: '10px',
        textAlign: 'center'
      },
    },
  };

  const columns = [
    {
      name: "Task ID",
      selector: (row) => row.taskId,
      sortable: true,
      wrap: true,
      width: '10%',
      minWidth: '100px',
      maxWidth: '150px',
      center: true,
      headerStyle: () => ({
        textAlign: 'center',
        justifyContent: 'center'
      })
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
      width: '20%',
      minWidth: '150px',
      maxWidth: '400px',
      center: true,
      headerStyle: () => ({
        textAlign: 'center',
        justifyContent: 'center'
      })
    },
    {
      name: "Client",
      selector: (row) => row.client,
      sortable: true,
      wrap: true,
      width: '15%',
      minWidth: '120px',
      maxWidth: '180px',
      center: true,
      headerStyle: () => ({
        textAlign: 'center',
        justifyContent: 'center'
      })
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      wrap: true,
      width: '15%',
      minWidth: '120px',
      maxWidth: '180px',
      center: true,
      headerStyle: () => ({
        textAlign: 'center',
        justifyContent: 'center'
      })
    },
    {
      name: "Payment Type",
      selector: (row) => row.paymentType || 'Not Specified',
      sortable: true,
      wrap: true,
      width: '10%',
      minWidth: '100px',
      maxWidth: '150px',
      center: true,
      headerStyle: () => ({
        textAlign: 'center',
        justifyContent: 'center'
      })
    },
    {
      name: "Assignment Value",
      selector: (row) => {
        // If the row has multiple sub-rows, sum their totalcost
        if (row.rows) {
          const totalCost = row.rows.reduce((sum, r) => {
            // Use totalcost if available, otherwise use rate
            const cost = Number(r.totalcost || r.rate || 0);
            return sum + cost;
          }, 0);
          return totalCost;
        }
        
        // For single rows, use totalcost or rate
        return Number(row.totalcost || row.rate || 0);
      },
      format: (row) => {
        // Format the value with comma separators and currency symbol
        const value = row.rows 
          ? row.rows.reduce((sum, r) => sum + Number(r.totalcost || r.rate || 0), 0)
          : Number(row.totalcost || row.rate || 0);
        return `₹ ${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      },
      sortable: true,
      wrap: true,
      width: '10%',
      minWidth: '100px',
      maxWidth: '150px',
      center: true,
      headerStyle: () => ({
        textAlign: 'center',
        justifyContent: 'center'
      })
    },
    {
      name: "Status",
      cell: (row) => {
        // Calculate overall percentage based on task rows
        const averagePercentage = row.rows
          ? Math.round(row.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / row.rows.length)
          : 0;

        // Determine status and color based on percentage
        const getStatusAndColor = (percentage) => {
          if (percentage === 0) return { status: 'Pending', color: 'bg-danger text-white border border-black' }; // Red for Pending
          if (percentage > 0 && percentage < 100) return { status: 'In Progress', color: 'bg-warning text-white border border-black' }; // Orange for In Progress
          if (percentage === 100) return { status: 'Completed', color: 'bg-success text-white border border-black' }; // Green for Completed
          return { status: 'Unknown', color: 'bg-danger' };
        };

        const { status, color } = getStatusAndColor(averagePercentage);

        return (
          <div className="d-flex justify-content-center w-100 text-center">
            <span
              className={`badge rounded-pill text-uppercase fw-bold ${color}`}
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.05em',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                maxWidth: '90%',
                width: 'auto',
                padding: '0.2rem 0.5rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                border: `1px solid currentColor`
              }}
            >
              {status}
            </span>
          </div>
        );
      },
      sortable: true,
      width: '10%',
      minWidth: '100px',
      maxWidth: '150px',
      center: true,
      headerStyle: () => ({
        textAlign: 'center',
        justifyContent: 'center'
      })
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex justify-content-center w-100">
          <button
            type="button"
            className="btn btn-sm btn-outline-info"
            style={{
              borderRadius: '20px', // Rounded pill shape
              padding: '0.25rem 0.75rem',
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: '0.5px',
              border: '2px solid',
              transition: 'all 0.3s ease'
            }}
            onClick={() => {
              setSelectedTask({
                ...selectedTask,
                ...row,
                ratePerHour: row.ratePerHour || selectedTask.ratePerHour || 0,
                totalCost: row.totalCost || selectedTask.totalCost || 2500
              });
              setViewTaskModalOpen(true);
            }}
          >
            View
          </button>
        </div>
      ),
      sortable: false,
      width: '10%',
      minWidth: '100px',
      maxWidth: '150px',
      center: true,
      headerStyle: () => ({
        textAlign: 'center',
        justifyContent: 'center'
      })
    }
  ];

  const [rows, setRows] = useState(data);

  const handleSearch = (e) => {
    let searchValue;
    let indexValue;
    let taskIdValue;
    let titleValue;
    let statusValue;

    const newRows = data.filter((row) => {
      indexValue = row.index
        .toString()
        .includes(e.target.value);
      taskIdValue = row.taskId.toLowerCase().includes(e.target.value.toLowerCase());
      titleValue = row.title
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      statusValue = row.status
        .toLowerCase()
        .includes(e.target.value.toLowerCase());


      if (taskIdValue) {
        searchValue = taskIdValue;
      } else if (titleValue) {
        searchValue = titleValue;
      } else if (indexValue) {
        searchValue = indexValue;
      } else if (statusValue) {
        searchValue = statusValue;
      } else {
        searchValue = "";
      }

      return searchValue;
    });

    setRows(newRows);
  };

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

  const styleTag = document.createElement('style');
  styleTag.textContent = modalStyles;
  document.head.appendChild(styleTag);

  // Add state for date range
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  // Add handler for date range change
  const handleDateRangeChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    // Update date range state
    setDateRange(ranges.selection);

    // Only close and update when both start and end dates are selected
    if (startDate && endDate && startDate !== endDate) {
      setShowDateRangePicker(false);
      setIsTaskDurationOpen(false);
      setTaskHeader(prev => ({
        ...prev,
        startDate: startDate,
        endDate: endDate
      }));
    }
  };

  const [showDateRangePicker, setShowDateRangePicker] = useState(false);

  // Add handler for manual date input
  const handleManualDateInput = (e) => {
    const inputValue = e.target.value;
    const datePattern = /^(\d{1,2}\/\d{1,2}\/\d{4}) - (\d{1,2}\/\d{1,2}\/\d{4})$/;

    if (datePattern.test(inputValue)) {
      const [startDateStr, endDateStr] = inputValue.split(' - ');
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);

      if (!isNaN(startDate) && !isNaN(endDate) && startDate <= endDate) {
        setDateRange({
          startDate,
          endDate,
          key: 'selection'
        });
        setTaskHeader(prev => ({
          ...prev,
          startDate,
          endDate
        }));
      } else {
        // Optional: Add error handling for invalid dates
        console.warn('Invalid date range');
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dateRangeElement = document.querySelector('.date-range-picker');
      const inputElement = event.target.closest('.form-control');

      if (dateRangeElement && !dateRangeElement.contains(event.target) &&
        (!inputElement || !inputElement.closest('.date-range-picker'))) {
        setShowDateRangePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add state for payment type and rate
  const [paymentType, setPaymentType] = useState('');
  const [paymentRate, setPaymentRate] = useState('');



  // Notification handling from Redux
  useEffect(() => {
    if (props.notifyData && props.notifyData.length > 0) {
      const notification = props.notifyData[props.notifyData.length - 1];
      // Only show notifications that are not theme-related
      if (notification.type !== 'info' || notification.dialogText.indexOf('theme') === -1) {
        switch (notification.type) {
          case 'success':
            toast.success(notification.dialogText, {
              position: "top-right",
              autoClose: 3000,
            });
            break;
          case 'error':
            toast.error(notification.dialogText, {
              position: "top-right",
              autoClose: 3000,
            });
            break;
          case 'info':
            toast.info(notification.dialogText, {
              position: "top-right",
              autoClose: 3000,
            });
            break;
          case 'warning':
            toast.warning(notification.dialogText, {
              position: "top-right",
              autoClose: 3000,
            });
            break;
          default:
            toast(notification.dialogText, {
              position: "top-right",
              autoClose: 3000,
            });
        }
      }
    }
  }, [props.notifyData]);

  const [showExecutionDatePicker, setShowExecutionDatePicker] = useState(false);
  const [executionDate, setExecutionDate] = useState(
    selectedTask.executionDate 
      ? new Date(selectedTask.executionDate) 
      : new Date()
  );

  const handleTaskDetailChange = (field, value) => {
    setSelectedTask(prevTask => ({
      ...prevTask,
      [field]: value
    }));
  };

  return (
    <div style={{ flex: 1 }}>
      <div>
        <div className="ng-star-inserted">
          <div className="container-fluid px-4">
            <PageHeader
              HeaderText="TaskBoard"
              Breadcrumb={[{ name: "App" }, { name: "TaskBoard" }]}
              SearchComponent={
                <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group" style={{ width: '50%' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search tasks..."
             
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </div>
      </div>
              }
            />
            {/* Tasks Table */}
            <div className="row px-0 mb-n3">
              <div className="col-12 px-0">
                <div className="card border-0">
                  <div className="card-body py-0" style={{ padding: 0 }}>
                    <CustomTable
                      title=""
                      rows={rows}
                      onRowAction={(task) => {
                        setSelectedTask({
                          ...selectedTask,
                          ...task,
                          ratePerHour: task.ratePerHour || selectedTask.ratePerHour || 0,
                          totalCost: task.totalCost || selectedTask.totalCost || 2500
                        });
                        setViewTaskModalOpen(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

          

            {/* View Task Modal */}
            {viewTaskModalOpen && (
              <div className={`task-modal-overlay ${viewTaskModalOpen ? 'open' : ''}`} onClick={() => setViewTaskModalOpen(false)}>
                <div className={`task-modal-container ${viewTaskModalOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header d-flex justify-content-between align-items-center">
                    <h5 className="modal-title ubuntu-font ubuntu-bold">View Task</h5>
                    <div className="d-flex align-items-center justify-content-end">
              <input
                type="text"
                className="form-control task-id-input text-center"
                value={selectedTask.taskId}
                readOnly
                
              />
               <button
                      type="button"
                      className="close"
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
                          
                        
                        {validationErrors.template && (
                          <div className="text-danger">Please select a template.</div>
                        )}
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
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    {/* Task Rows */}
                    <div className="table-responsive">
                      <table className="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th style={{ width: '50px', textAlign: 'center' }}>Sr. No.</th>
                            <th style={{ textAlign: 'center' }}>Title</th>
                            <th style={{ width: '100px', textAlign: 'center' }}>Minutes</th>
                            <th style={{ textAlign: 'center' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedTask.rows.map((row, index) => (
                            <tr key={index}>
                              <td style={{ width: '50px', textAlign: 'center' }}>{index + 1}</td>
                              <td style={{ textAlign: 'center' }}>{row.title}</td>
                              <td style={{ width: '100px', textAlign: 'center' }}>
                                <div className="d-flex justify-content-center">
                                  <input
                                    type="number"
                                    className="form-control mr-2"
                                    placeholder="0-100%"
                                    min="0"
                                    max="100"
                                    value={row.percentage || 0}
                                    readOnly
                                    style={{ width: '80px', marginRight: '10px', textAlign: 'center' }}
                                  />
                                </div>
                              </td>
                              <td style={{ textAlign: 'center' }}>
                                <ProgressBar
                                  now={row.percentage || 0}
                                  label={`${(row.percentage || 0)}%`}
                                  animated
                                  variant={
                                    row.percentage === 0 ? 'danger' :
                                      row.percentage < 99 ? 'warning' :
                                        'success'
                                  }
                                  labelProps={{ style: { color: 'black', fontWeight: 'bold' } }}
                                  style={{ marginTop: '10px' }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Task Status Progress Bar */}
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <label>Task Progress</label>
                        <ProgressBar
                          now={selectedTask.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / selectedTask.rows.length}
                          label={`${(selectedTask.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / selectedTask.rows.length).toFixed(0)}%`}
                          animated
                          variant={
                            selectedTask.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / selectedTask.rows.length === 0 ? 'danger' :
                              selectedTask.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / selectedTask.rows.length < 99 ? 'warning' :
                                'success'
                          }
                          labelProps={{ style: { color: 'black', fontWeight: 'bold' } }}
                          style={{ marginTop: '10px' }}
                        />
                      </div>
                    </div>

                    {/* Calculations Section */}
                    <div className="row mb-3 d-flex justify-content-center align-items-center text-center">
                      <div className="col-md-3 d-flex flex-column align-items-center">
                        <label className="mb-2">Total Minutes</label>
                        <div className="input-group justify-content-center" style={{width: 'auto'}}>
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fa fa-clock-o"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control text-center"
                            style={{ 
                              width: '100px',
                              backgroundColor: '#e9ecef',
                              color: 'black',
                              cursor: 'default'
                            }}
                            value={selectedTask.rows.reduce((sum, row) => sum + Number(row.minutes || 0), 0)}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-3 d-flex flex-column align-items-center">
                        <label className="mb-2">Total Hours</label>
                        <div className="input-group justify-content-center" style={{width: 'auto'}}>
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fa fa-clock-o"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control text-center"
                            style={{ 
                              width: '100px',
                              backgroundColor: '#e9ecef',
                              color: 'black',
                              cursor: 'default'
                            }}
                            value={(selectedTask.rows.reduce((sum, row) => sum + Number(row.minutes || 0), 0) / 60).toFixed(2)}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-3 d-flex flex-column align-items-center">
                        <label className="mb-2">Fee per Hour</label>
                        <div className="input-group justify-content-center" style={{width: 'auto'}}>
                          <div className="input-group-prepend">
                            <span className="input-group-text">₹</span>
                          </div>
                          <input
                            type="text"
                            className="form-control text-center"
                            style={{ 
                              width: '100px',
                              backgroundColor: '#e9ecef',
                              color: 'black',
                              cursor: 'default'
                            }}
                            value={selectedTask.ratePerHour || 500}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-3 d-flex flex-column align-items-center">
                        <label className="mb-2">Total Fees</label>
                        <div className="input-group justify-content-center" style={{width: 'auto'}}>
                          <div className="input-group-prepend">
                            <span className="input-group-text">₹</span>
                          </div>
                          <input
                            type="text"
                            className="form-control text-center"
                            style={{ 
                              width: '100px',
                              backgroundColor: '#e9ecef',
                              color: 'black',
                              cursor: 'default'
                            }}
                            value={selectedTask.totalCost || 0}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="modal-footer">
                  <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setViewTaskModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = ({ UIElementsReducer }) => ({
  notifyData: UIElementsReducer.notifyData,
  notifyGeneralInfo: UIElementsReducer.notifyGeneralInfo
});

export default connect(mapStateToProps, { notifyGeneralInfo })(AppTaskbar);