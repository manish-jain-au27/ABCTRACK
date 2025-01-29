import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from "../../components/PageHeader";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css
import { enUS } from 'date-fns/locale';
import { addDays } from 'date-fns';
import Select from "react-dropdown-select";
import { ProgressBar } from "react-bootstrap"; // Import ProgressBar from react-bootstrap

// Constants
const TASK_CATEGORIES = [
  {
    id: 'dev',
    name: 'Development',
    subcategories: [
      { id: 'frontend', name: 'Frontend', pricePerHour: 50 },
      { id: 'backend', name: 'Backend', pricePerHour: 60 },
      { id: 'fullstack', name: 'Full Stack', pricePerHour: 70 }
    ]
  },
  {
    id: 'design',
    name: 'Design',
    subcategories: [
      { id: 'ui', name: 'UI Design', pricePerHour: 45 },
      { id: 'ux', name: 'UX Design', pricePerHour: 55 },
      { id: 'graphics', name: 'Graphic Design', pricePerHour: 40 }
    ]
  }
];

const CLIENTS = [
  { id: 'client1', name: 'Acme Corp' },
  { id: 'client2', name: 'Tech Solutions' },
  { id: 'client3', name: 'Innovative Inc' }
];

const AppTaskbar = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const [tasks, setTasks] = useState([]);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  
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
  const [selectedTask, setSelectedTask] = useState(null);

  const [selectedClients, setSelectedClients] = useState([]);

  const clientOptions = [
    { label: "Client 1", value: "client1" },
    { label: "Client 2", value: "client2" },
    { label: "Client 3", value: "client3" },
    // Add more client options as needed
  ];

  const handleClientChange = (values) => {
    setSelectedClients(values);
    // Add any additional logic for client selection
  };

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
      totalCost: "Rs.2000",
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
      totalCost: "Rs.3400",
    },
  ];

  // New state for template
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateOptions, setTemplateOptions] = useState([
    { value: 'template1', label: 'Template 1' },
    { value: 'template2', label: 'Template 2' },
    { value: 'template3', label: 'Template 3' },
  ]);

  const toggleTaskDuration = () => {
    setIsTaskDurationOpen(!isTaskDurationOpen);
  };

  const generateUniqueId = () => {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

 
  const generateTaskId = () => {
    const lastTaskId = localStorage.getItem('lastTaskId');
    const newTaskId = lastTaskId ? parseInt(lastTaskId) + 1 : 1;

    localStorage.setItem('lastTaskId', newTaskId.toString());

    return `TASK-${newTaskId.toString().padStart(4, '0')}`;
  };

  // Open Create Task Modal
  const openCreateTaskModal = () => {
    setTaskHeader({
      taskId: "TASK-0001",
      category: '',
      subcategory: '',
      client: '',
      startDate: '',
      endDate: '',
      title: ''
    });
    setTaskRows([{ title: '', minutes: '0', percentage: 0 }]);
    setRatePerHour(0);
    setIsCreateTaskModalOpen(true);
    // Reset task duration to closed when opening modal
    setIsTaskDurationOpen(false);
  };

  // Handle Header Input Changes
  const handleHeaderInputChange = (e) => {
    const { name, value } = e.target;
    setTaskHeader(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add New Task Row
  const addTaskRow = (newRow) => {
    const updatedRows = [...taskRows, newRow];
    setTaskRows(updatedRows);

    const costDetails = calculateRealTimeCost(updatedRows);

    setRealTimeCost(costDetails);
  };

  // Update Task Row
  const updateTaskRow = (index, field, value) => {
    const updatedRows = taskRows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setTaskRows(updatedRows);
    // console.log(index, "  ", field, " ", value, " ")
    const costDetails = calculateRealTimeCost(updatedRows);

    setRealTimeCost(costDetails);
  };

  // Remove Task Row
  const removeTaskRow = (index) => {
    const updatedRows = taskRows.filter((_, i) => i !== index);
    setTaskRows(updatedRows);

    const costDetails = calculateRealTimeCost(updatedRows);

    setRealTimeCost(costDetails);
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

  const createTask = () => {
    const taskRowTitles = taskRows.map(row => row.title).filter(title => title.trim() !== '');
    const combinedTaskTitle = taskRowTitles.length > 0
      ? taskRowTitles.join(', ')
      : taskHeader.title;

    setTaskHeader(prev => ({
      ...prev,
      title: combinedTaskTitle
    }));

    const newTask = {
      id: generateUniqueId(),
      ...taskHeader,
      rows: taskRows,
      rowTitles: taskRows.map(row => row.title).filter(title => title.trim() !== ''),
      title: taskRows[0]?.title || 'Untitled Task',
      totalHours: calculateTotalMinutes(),
      ratePerHour: ratePerHour,
      totalCost: realTimeCost.totalCost,
      status: 'created'
    };

    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks, newTask];

      return updatedTasks;
    });

    setIsCreateTaskModalOpen(false);
  };

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
    setSelectedTask(row);
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

  const handleCreateInvoice = (taskId) => {
    alert(`Invoice creation for task ${taskId} is not yet implemented`);
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
      maxWidth: '250px',
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
      name: "Minutes",
      selector: (row) => {
        const totalMinutes = row.rows 
          ? row.rows.reduce((sum, r) => sum + Number(r.minutes), 0) 
          : 0;
        return totalMinutes;
      },
      sortable: true,
      wrap: true,
      width: '10%',
      minWidth: '80px',
      maxWidth: '120px',
      center: true,
      headerStyle: () => ({
        textAlign: 'center',
        justifyContent: 'center'
      })
    },
    {
      name: "Cost",
      selector: (row) => row.totalCost,
      sortable: true,
      wrap: true,
      width: '8%',
      minWidth: '80px',
      maxWidth: '120px',
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
              setSelectedTask(row);
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

  const addNewTaskRow = () => {
    const newRow = {
      title: '',
      minutes: '0',
      percentage: 0
    };
    addTaskRow(newRow);
  };

  return (
    <div style={{ flex: 1 }}>
      <div>
        <div className="ng-star-inserted">
          <div className="container-fluid">
            <PageHeader
              HeaderText="TaskBoard"
              Breadcrumb={[{ name: "App" }, { name: "TaskBoard" }]}
            />
            <div className="row">
              {/* Create Task Button */}
              <div className="form-group col-lg-12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <span style={{ fontWeight: '600', color: '#6c757d' }}>Create Task</span>
                <button
                  className="btn theme-bg-primary rounded-pill"
                  onClick={openCreateTaskModal}
                  type="button"
                >
                  Create Assignment
                </button>
              </div>

              {/* Task Columns */}
              <div className="col-lg-4 col-md-12">
                <div className="card created_task">
                  <div className="header">
                    <h2>Created Tasks</h2>
                    <ul className="header-dropdown">
                      <li>
                        <Link to="#" onClick={openCreateTaskModal}>
                          <i className="icon-plus"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="body taskboard">
                    {createdTasks.map((task, i) => (
                      <div key={task.taskId} className="card mb-2">
                        <div className="card-body">
                          {task.rowTitles && task.rowTitles.length > 1 ? (
                            <>
                              <h5>{task.title}</h5>
                              <ul className="small text-muted pl-3">
                                {task.rowTitles.map((title, idx) => (
                                  <li key={idx}>{title}</li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <h5>{task.title}</h5>
                          )}
                          <p>{task.subtitle}</p>
                          <div className="action">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              style={{
                                borderRadius: '20px', // Rounded pill shape
                                padding: '0.25rem 0.75rem',
                                textTransform: 'uppercase',
                                fontWeight: '600',
                                letterSpacing: '0.5px',
                                border: '2px solid',
                                transition: 'all 0.3s ease'
                              }}
                              onClick={() => viewTask(task)}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* In Progress Tasks */}
              <div className="col-lg-4 col-md-12">
                <div className="card created_task">
                  <div className="header">
                    <h2>In Progress Tasks</h2>
                  </div>
                  <div className="body taskboard">
                    {inProgressTasks.map((task, i) => (
                      <div key={task.taskId} className="card mb-2">
                        <div className="card-body">
                          <h5>{task.title}</h5>
                          <p>{task.subtitle}</p>
                          <div className="action">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              style={{
                                borderRadius: '20px', // Rounded pill shape
                                padding: '0.25rem 0.75rem',
                                textTransform: 'uppercase',
                                fontWeight: '600',
                                letterSpacing: '0.5px',
                                border: '2px solid',
                                transition: 'all 0.3s ease'
                              }}
                              onClick={() => viewTask(task)}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Completed Tasks */}
              <div className="col-lg-4 col-md-12">
                <div className="card created_task">
                  <div className="header">
                    <h2>Completed Tasks</h2>
                  </div>
                  <div className="body taskboard">
                    {completedTasks.map((task, i) => (
                      <div key={task.taskId} className="card mb-2">
                        <div className="card-body">
                          <h5>{task.title}</h5>
                          <p>{task.subtitle}</p>
                          <div className="action">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              style={{
                                borderRadius: '20px', // Rounded pill shape
                                padding: '0.25rem 0.75rem',
                                textTransform: 'uppercase',
                                fontWeight: '600',
                                letterSpacing: '0.5px',
                                border: '2px solid',
                                transition: 'all 0.3s ease'
                              }}
                              onClick={() => viewTask(task)}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks Table */}
            <div className="col-lg-12">
              <div className="card product_item_list product-order-list">
                <div className="header">
                  <h2>Task List</h2>
                </div>
                <div className="body">
                  <form className="ng-untouched ng-dirty ng-invalid mb-3">
                    <div className="row d-flex justify-content-between">
                      <div className="form-group col-lg-3">
                        <label>Search</label>
                        <input
                          className={`form-control`}
                          name="search"
                          onChange={handleSearch}
                          placeholder="Search tasks..."
                        />
                      </div>
                    </div>
                  </form>
                  <div className="table-responsive">
                    <table className="table table-hover m-b-0">
                      <thead className="thead-dark">
                        <tr>
                          <th style={{ width: '50px' }}>Date</th>
                          <th>Task ID</th>
                          <th>Title</th>
                          <th>Client</th>
                          <th>Category</th>
                          <th style={{ width: '100px' }}>Minutes</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((task) => (
                          <tr key={task.taskId}>
                            <td style={{ width: '50px' }}>{task.date || new Date().toLocaleDateString('en-GB')}</td>
                            <td>{task.taskId}</td>
                            <td>{task.title}</td>
                            <td>{task.client}</td>
                            <td>{task.category}</td>
                            <td style={{ width: '100px' }}>
                              {task.rows 
                                ? task.rows.reduce((sum, r) => sum + Number(r.minutes), 0) 
                                : 0} mins
                            </td>
                            <td>
                              {/* Color-coded status display */}
                              <div style={{ width: '100%' }}>
                                <ProgressBar 
                                  now={task.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / task.rows.length} 
                                  label={`${(task.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / task.rows.length).toFixed(0)}%`} 
                                  animated 
                                  variant={
                                    task.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / task.rows.length === 0 ? 'danger' : 
                                    task.rows.reduce((sum, r) => sum + (r.percentage || 0), 0) / task.rows.length < 99 ? 'warning' : 
                                    'success'
                                  } 
                                  labelProps={{ style: { color: 'black', fontWeight: 'bold' } }}
                                  style={{ marginTop: '10px' }}
                                />
                              </div>
                            </td>
                            <td>
                              <Link 
                                to="#" 
                                className="btn btn-outline-info mr-1" 
                                onClick={() => {
                                  setSelectedTask(task);
                                  setViewTaskModalOpen(true);
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

            {/* Create Task Sliding Panel */}
            {isCreateTaskModalOpen && (
              <div className={`task-modal-overlay ${isCreateTaskModalOpen ? 'open' : ''}`} onClick={() => setIsCreateTaskModalOpen(false)}>
                <div className={`task-modal-container ${isCreateTaskModalOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header d-flex justify-content-between align-items-center">
                    <h5 className="modal-title ubuntu-font ubuntu-bold">Create New Assignment</h5>
                    <div className="d-flex align-items-center justify-content-end">
                      <input
                        type="text"
                        className="form-control task-id-input text-center"
                        value={taskHeader.taskId}
                        readOnly
                        style={{ width: '150px' }}
                      />
                    </div>
                  </div>

                  <div className="modal-body ubuntu-font ubuntu-regular">
                    {/* Task Header Inputs */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label>Select Clients</label>
                        <Select
                          className="js-states"
                          placeholder="Select Clients"
                          options={clientOptions}
                          values={selectedClients}
                          disabled={false}
                          create={true}
                          multi={true}
                          dropdownHandle={false}
                          searchable={true}
                          onChange={handleClientChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label>Template</label>
                        <select
                          name="template"
                          className="form-control"
                          value={selectedTemplate}
                          onChange={(e) => {
                            setSelectedTemplate(e.target.value);
                          }}
                          required
                        >
                          <option value="">Select Template</option>
                          {templateOptions.map(template => (
                            <option key={template.value} value={template.value}>
                              {template.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label>Task Category</label>
                        <select
                          name="category"
                          className="form-control"
                          value={taskHeader.category}
                          onChange={(e) => {
                            const selectedCategory = TASK_CATEGORIES.find(cat => cat.id === e.target.value);
                            setTaskHeader(prev => ({
                              ...prev,
                              category: e.target.value,
                              subcategory: ''
                            }));
                          }}
                          required
                        >
                          <option value="">Select Category</option>
                          {TASK_CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label>Subcategory</label>
                        <select
                          name="subcategory"
                          className="form-control"
                          value={taskHeader.subcategory}
                          onChange={(e) => {
                            const selectedSubcategory = e.target.value;
                            setTaskHeader(prev => ({
                              ...prev,
                              subcategory: selectedSubcategory
                            }));
                          }}
                          disabled={!taskHeader.category}
                          required
                        >
                          <option value="">Select Subcategory</option>
                          {taskHeader.category
                            ? TASK_CATEGORIES
                              .find(cat => cat.id === taskHeader.category)
                              .subcategories.map(sub => (
                                <option key={sub.id} value={sub.id}>
                                  {sub.name}
                                </option>
                              ))
                            : null
                          }
                        </select>
                      </div>
                    </div>

                    {/* Task Duration Section */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label>Task Duration</label>
                        <div className="d-flex align-items-center position-relative">
                          <input
                            type="text"
                            className="form-control"
                            value={`${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`}
                            onClick={() => setShowDateRangePicker(!showDateRangePicker)}
                            onChange={handleManualDateInput}
                            onBlur={handleManualDateInput}
                            placeholder="MM/DD/YYYY - MM/DD/YYYY"
                          />
                          <span 
                            className="position-absolute" 
                            style={{right: '10px', cursor: 'pointer'}}
                            onClick={() => setShowDateRangePicker(!showDateRangePicker)}
                          >
                            📅
                          </span>
                        </div>
                        {showDateRangePicker && (
                          <div className="position-absolute" style={{zIndex: 1000}}>
                            <DateRangePicker
                              ranges={[dateRange]}
                              onChange={handleDateRangeChange}
                              moveRangeOnFirstSelection={false}
                              className="date-range-picker"
                            />
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label>Payment Type</label>
                        <select 
                          className="form-control" 
                          value={paymentType} 
                          onChange={(e) => {
                            setPaymentType(e.target.value);
                            // Reset rate when payment type changes
                            setPaymentRate('');
                          }}
                        >
                          <option value="">Select Payment Type</option>
                          <option value="lumpsum">Lump Sum</option>
                          <option value="payperminute">Pay Per Minute</option>
                        </select>
                      </div>
                    </div>

                    {paymentType === 'lumpsum' && (
                      <div className="form-group">
                        <label>Lump Sum Amount</label>
                        <div className="input-group mb-3" style={{ maxWidth: '150px' }}>
                          <div className="input-group-prepend">
                            <span className="input-group-text">₹</span>
                          </div>
                          <input
                            aria-label="Amount (to the nearest rupee)"
                            className="form-control"
                            type="text"
                            value={paymentRate}
                            onChange={(e) => setPaymentRate(e.target.value)}
                            placeholder="Enter Lump Sum Amount"
                          />
                          
                        </div>
                      </div>
                    )}

                    {paymentType === 'payperminute' && (
                      <div className="form-group">
                        <label>Rate per Hour</label>
                        <div className="input-group mb-3" style={{ maxWidth: '150px' }}>
                          <div className="input-group-prepend">
                            <span className="input-group-text">₹</span>
                          </div>
                          <input
                            type="number"
                            aria-label="Amount (to the nearest rupee)"
                            className="form-control text-center"
                            value={ratePerHour}
                            onChange={(e) => setRatePerHourWithLogging(e.target.value)}
                            placeholder="Enter Rate per Hour"
                          />
                          
                        </div>
                      </div>
                    )}

                    {/* Task Details Table */}
                    <div className="form-group">
                      <label 
                        style={{ 
                          fontWeight: 'bold', 
                          padding: '5px 0',
                          textAlign: 'center',
                          display: 'block'
                        }}
                      >
                        Task Details
                      </label>
                      <div className="table-responsive">
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr>
                              <th style={{ width: '50px', textAlign: 'center' }}>Sr. No.</th>
                              <th style={{ textAlign: 'center' }}>Title</th>
                              {paymentType === 'lumpsum' ? (
                                <th className="text-center" style={{ width: '150px' }}>
                                  <div className="d-flex flex-column align-items-center">
                                    <div className="input-group mb-1">
                                      <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          <i className="fa fa-hourglass-half"></i>
                                        </span>
                                      </div>
                                      <input
                                        type="text"
                                        className="form-control text-center"
                                        style={{ maxWidth: '100px' }}
                                        value={taskRows[0].minutes}
                                        onChange={(e) => updateTaskRow(0, 'minutes', e.target.value)}
                                        placeholder="Minutes"
                                      />
                                    </div>
                                    <span>Minutes</span>
                                  </div>
                                </th>
                              ) : (
                                <th className="text-center" style={{ width: '150px' }}>
                                  <span className="d-block">Minutes</span>
                                </th>
                              )}
                              <th className="text-center">
                                <button 
                                  type="button" 
                                  className="btn btn-success mr-1"
                                  onClick={() => addTaskRow()}
                                >
                                  <i className="fa fa-plus-circle"></i>
                                </button>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {taskRows.map((row, index) => (
                              <tr key={index}>
                                <td style={{ width: '50px', textAlign: 'center' }}>{index + 1}</td>
                                <td style={{ textAlign: 'center' }}>
                                  <div className="d-flex justify-content-center">
                                    <input
                                      type="text"
                                      className="form-control text-center"
                                      style={{ maxWidth: '250px' }}
                                      value={row.title}
                                      onChange={(e) => updateTaskRow(index, 'title', e.target.value)}
                                    />
                                  </div>
                                </td>
                                {paymentType === 'lumpsum' ? (
                                  <td>
                                    <div className="d-flex justify-content-center">
                                      <div className="input-group mb-3" style={{ maxWidth: '150px' }}>
                                        <div className="input-group-prepend">
                                          <span className="input-group-text">₹</span>
                                        </div>
                                        <input
                                          type="text"
                                          aria-label="Amount (to the nearest rupee)"
                                          className="form-control text-center"
                                          value={row.rate || 0}
                                          onChange={(e) => updateTaskRow(index, 'rate', e.target.value)}
                                          placeholder="Enter Rate"
                                        />
                                        <div className="input-group-append">
                                          <span className="input-group-text">.00</span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                ) : (
                                  <td>
                                    <div className="d-flex justify-content-center">
                                      <div className="input-group">
                                        <div className="input-group-prepend">
                                          <span className="input-group-text">
                                            <i className="fa fa-hourglass-half"></i>
                                          </span>
                                        </div>
                                        <input
                                          type="text"
                                          className="form-control text-center"
                                          style={{ maxWidth: '100px' }}
                                          value={row.minutes}
                                          onChange={(e) => updateTaskRow(index, 'minutes', e.target.value)}
                                          placeholder="Minutes"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                )}
                                <td className="text-center align-middle">
                                  <button 
                                    type="button" 
                                    className="btn btn-danger mr-1"
                                    onClick={() => removeTaskRow(index)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Calculations Section */}
                    {paymentType === 'payperminute' ? (
                      <div className="row mb-3 d-flex">
                        <div className="col-md-3 text-center">
                          <label className="d-block text-center">Total Minutes</label>
                          <input
                            type="text"
                            className="form-control text-center"
                            style={{ width: '100px', margin: '0 auto' }}
                            // value={selectedTask.rows.reduce((sum, row) => sum + (parseInt(row.minutes) || 0), 0)}
                            value={45}
                            readOnly
                          />
                        </div>
                        <div className="col-md-3 text-center">
                          <label className="d-block text-center">Total Hours</label>
                          <input
                            type="text"
                            className="form-control text-center"
                            style={{ width: '100px', margin: '0 auto' }}
                            // value={(selectedTask.rows.reduce((sum, row) => sum + (parseInt(row.minutes) || 0), 0) / 60).toFixed(2)}
                            value={45 / 60}
                            readOnly
                          />
                        </div>
                        <div className="col-md-3 text-center">
                          <label className="d-block text-center">Rate per Hour</label>
                          <input
                            type="text"
                            className="form-control text-center"
                            style={{ width: '100px', margin: '0 auto' }}
                            value={selectedTask.ratePerHour}
                            readOnly
                          />
                        </div>
                        <div className="col-md-3 text-center">
                          <label className="d-block text-center">Total Cost</label>
                          <input
                            type="text"
                            className="form-control text-center"
                            style={{ width: '100px', margin: '0 auto' }}
                            value={selectedTask.totalCost}
                            readOnly
                          />
                        </div>
                      </div>
                    ) : paymentType === 'lumpsum' ? (
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <label>Total Cost</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            style={{ maxWidth: '150px' }}
                            value={`₹ ${realTimeCost.totalCost.toFixed(2)}`} 
                            readOnly 
                          />
                        </div>
                      </div>
                    ) : null}

                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary mr-2"
                      onClick={() => setIsCreateTaskModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={createTask}
                    >
                      Create Task
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View Task Modal */}
            {viewTaskModalOpen && (
              <div className={`task-modal-overlay ${viewTaskModalOpen ? 'open' : ''}`} onClick={() => setViewTaskModalOpen(false)}>
                <div className={`task-modal-container ${viewTaskModalOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header d-flex justify-content-between align-items-center">
                    <h5 className="modal-title ubuntu-font ubuntu-bold">View Task</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setViewTaskModalOpen(false)}
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
                    <div className="row mb-3 d-flex">
                      <div className="col-md-3 text-center">
                        <label className="d-block text-center">Total Minutes</label>
                        <input
                          type="text"
                          className="form-control text-center"
                          style={{ width: '100px', margin: '0 auto' }}
                          // value={selectedTask.rows.reduce((sum, row) => sum + (parseInt(row.minutes) || 0), 0)}
                          value={45}
                          readOnly
                        />
                      </div>
                      <div className="col-md-3 text-center">
                        <label className="d-block text-center">Total Hours</label>
                        <input
                          type="text"
                          className="form-control text-center"
                          style={{ width: '100px', margin: '0 auto' }}
                          // value={(selectedTask.rows.reduce((sum, row) => sum + (parseInt(row.minutes) || 0), 0) / 60).toFixed(2)}
                          value={45 / 60}
                          readOnly
                        />
                      </div>
                       <div className="col-md-3 text-center">
                        <label className="d-block text-center">Rate per Hour</label>
                        <input
                          type="text"
                          className="form-control text-center"
                          style={{ width: '100px', margin: '0 auto' }}
                          value={selectedTask.ratePerHour}
                          readOnly
                        />
                      </div>
                      <div className="col-md-3 text-center">
                        <label className="d-block text-center">Total Cost</label>
                        <input
                          type="text"
                          className="form-control text-center"
                          style={{ width: '100px', margin: '0 auto' }}
                          value={selectedTask.totalCost}
                          readOnly
                        />
                      </div>
                    </div>

                    {/* Status Change Buttons */}
                    <div className="row mb-3">
                      <div className="col-12">
                        {selectedTask && selectedTask.status === 'created' && (
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn btn-primary mr-2"
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
                                handleStatusChange(selectedTask.taskId, 'in progress');
                                setViewTaskModalOpen(false);
                              }}
                            >
                              In Progress
                            </button>
                            <button
                              className="btn btn-success"
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
                                handleStatusChange(selectedTask.taskId, 'completed');
                                setViewTaskModalOpen(false);
                              }}
                            >
                              Mark Completed
                            </button>
                          </div>
                        )}

                        {selectedTask && selectedTask.status === 'in progress' && (
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn btn-success"
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
                                handleStatusChange(selectedTask.taskId, 'completed');
                                setViewTaskModalOpen(false);
                              }}
                            >
                              Mark Completed
                            </button>
                          </div>
                        )}

                        {selectedTask && selectedTask.status === 'completed' && (
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn btn-primary"
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
                                handleCreateInvoice(selectedTask.taskId);
                              }}
                            >
                              Create Invoice
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary mr-2"
                      style={{
                        borderRadius: '20px', // Rounded pill shape
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppTaskbar;