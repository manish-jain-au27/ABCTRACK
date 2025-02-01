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

const AppTaskbar = (props) => {
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
  const [selectedTask, setSelectedTask] = useState({
    title: '',
    rows: [],
    ratePerHour: 0,
    totalCost: 0
  });

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
  const addTaskRow = (newRow = {}) => {
    const defaultRow = {
      title: newRow.title || '',
      minutes: newRow.minutes || 0,
      percentage: newRow.percentage || 0,
      status: newRow.status || 'Not Started',
      rate: newRow.rate || 0
    };

    const updatedRows = [...taskRows, defaultRow];
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

  const createTask = () => {
    // Validate clients
    const clientsValid = selectedClients.length > 0;
    
    // Validate template
    const templateValid = selectedTemplate !== '';
    
    // Validate category and subcategory
    const categoryValid = taskHeader.category !== '';
    const subcategoryValid = taskHeader.subcategory !== '';
    
    // Validate date range
    const dateRangeValid = dateRange.startDate && dateRange.endDate && 
      dateRange.startDate <= dateRange.endDate;
    
    // Validate payment type
    const paymentTypeValid = paymentType !== '';
    
    // Validate task details
    const taskDetailsValid = taskRows.length > 0 && 
      taskRows.every(row => row.title && 
        (paymentType === 'lumpsum' ? row.rate : row.minutes)
      );

    // Prepare validation errors
    const errors = {
      clients: !clientsValid,
      template: !templateValid,
      category: !categoryValid,
      subcategory: !subcategoryValid,
      dateRange: !dateRangeValid,
      paymentType: !paymentTypeValid,
      taskDetails: !taskDetailsValid
    };

    // Update validation errors
    setValidationErrors(errors);

    // Collect and show validation error notifications
    const errorMessages = [];
    if (!clientsValid) errorMessages.push('Please select at least one client');
    if (!templateValid) errorMessages.push('Please select a template');
    if (!categoryValid) errorMessages.push('Please select a category');
    if (!subcategoryValid) errorMessages.push('Please select a subcategory');
    if (!dateRangeValid) errorMessages.push('Please provide a valid date range');
    if (!paymentTypeValid) errorMessages.push('Please select a payment type');
    if (!taskDetailsValid) errorMessages.push('Please fill in all task details correctly');

    // Show error notifications if there are validation errors
    if (errorMessages.length > 0) {
      errorMessages.forEach(message => {
        toast.error(message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: '#dc3545', // Bootstrap danger red
            color: 'white',
          }
        });
      });
      return; // Stop execution if there are validation errors
    }

    // Only create task if all validations pass
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

    // Validate task creation
    if (taskRows.length > 0) {
      // Show success notification first
      toast.success('Task created successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: '#28a745', // Bootstrap success green
          color: 'white',
        }
      });

      // Check for empty task rows and show error if needed
      const emptyTaskRows = taskRows.filter(row => !row.title.trim());
      if (emptyTaskRows.length > 0) {
        toast.error(`${emptyTaskRows.length} task row(s) are empty!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: '#dc3545', // Bootstrap danger red
            color: 'white',
          }
        });
      }

      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks, newTask];
        return updatedTasks;
      });

      // Delay closing the modal to ensure notifications are visible
      setTimeout(() => {
        setIsCreateTaskModalOpen(false);
      }, 3000); // 3 seconds delay
    } else {
      // Error notification for no task rows
      toast.error('No task rows created!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: '#dc3545', // Bootstrap danger red
          color: 'white',
        }
      });
    }
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
    setSelectedTask({
      ...selectedTask,
      ...row,
      ratePerHour: row.ratePerHour || selectedTask.ratePerHour || 0,
      totalCost: row.totalCost || selectedTask.totalCost || 0
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

  const addNewTaskRow = () => {
    const newRow = {
      title: '',
      minutes: '0',
      percentage: 0
    };
    addTaskRow(newRow);
  };

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
            <CustomTable
              title="Task List"
              rows={rows}
              onSearch={handleSearch}
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

            {/* Create Task Sliding Panel */}
            {isCreateTaskModalOpen && (
              <div className={`task-modal-overlay ${isCreateTaskModalOpen ? 'open' : ''}`} onClick={() => setIsCreateTaskModalOpen(false)}>
                <div className={`task-modal-container ${isCreateTaskModalOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header d-flex justify-content-between align-items-center">
                <h5 className="modal-title ubuntu-font ubuntu-bold">View Task</h5>
                <div className="d-flex align-items-center justify-content-end">
                  <input
                    type="text"
                    className="form-control task-id-input text-center"
                    value={taskHeader.taskId || 'N/A'}
                    readOnly
                    style={{ width: '150px' }}
                  />
                  <button
                    type="button"
                    className="close ml-2"
                    onClick={() => setIsCreateTaskModalOpen(false)}
                  >
                    &times;
                  </button>
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
                          styles={{
                            control: (base) => ({
                              ...base,
                              fontSize: '0.9rem',
                              minHeight: '38px',
                            }),
                            placeholder: (base) => ({
                              ...base,
                              color: '#6c757d', // Bootstrap's default placeholder color
                              fontSize: '0.9rem',
                              opacity: 0.7
                            }),
                            singleValue: (base) => ({
                              ...base,
                              fontSize: '0.9rem'
                            }),
                            input: (base) => ({
                              ...base,
                              fontSize: '0.9rem'
                            })
                          }}
                        />
                        {validationErrors.clients && (
                          <div className="text-danger">Please select at least one client.</div>
                        )}
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
                        {validationErrors.template && (
                          <div className="text-danger">Please select a template.</div>
                        )}
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
                        {validationErrors.category && (
                          <div className="text-danger">Please select a category.</div>
                        )}
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
                        {validationErrors.subcategory && (
                          <div className="text-danger">Please select a subcategory.</div>
                        )}
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
                            className="position-absolute calendar-icon"
                            style={{ right: '10px', cursor: 'pointer' }}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent event from propagating to input
                              setShowDateRangePicker(prev => !prev);
                            }}
                          >
                            📅
                          </span>
                        </div>
                        {showDateRangePicker && (
                          <div 
                            className="position-absolute date-range-dropdown" 
                            style={{ 
                              zIndex: 1000,
                              top: '100%', // Position below the input
                              left: 0,
                              width: '100%'
                            }}
                            onClick={(e) => e.stopPropagation()} // Prevent clicking inside dropdown from closing it
                          >
                            <DateRangePicker
                              ranges={[dateRange]}
                              onChange={(selection) => {
                                handleDateRangeChange(selection);
                              }}
                              moveRangeOnFirstSelection={false}
                              showSelectionPreview={true}
                              editableDateInputs={true}
                              className="date-range-picker"
                            />
                          </div>
                        )}
                        {validationErrors.dateRange && (
                          <div className="text-danger">Please select a valid date range.</div>
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
                        {validationErrors.paymentType && (
                          <div className="text-danger">Please select a payment type.</div>
                        )}
                      </div>
                    </div>
                   
                    {/* Task Details Table */}
                    <div className="form-group">

                      <div className="table-responsive">
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr>
                              <th style={{ width: '50px', textAlign: 'center' }}>Sr. No.</th>
                              <th style={{ textAlign: 'center' }}>Task Details</th>
                              {paymentType === 'lumpsum' ? (
                                <th className="text-center" style={{ width: '150px' }}>
                                  <div className="d-flex flex-column align-items-center">

                                    <span>Fees</span>
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
                                      style={{ maxWidth: '500px' }} 
                                      value={row.title}
                                      onChange={(e) => updateTaskRow(index, 'title', e.target.value)}
                                    />
                                  </div>
                                </td>
                                {paymentType === 'lumpsum' ? (
                                  <td>
                                    <div className="d-flex justify-content-center">
                                      <div className="input-group mb-3" style={{ maxWidth: '150px',marginTop:'10px' }}>
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
                                      </div>
                                    </div>
                                  </td>
                                ) : (
                                  <td>
                                    <div className="d-flex justify-content-center">
                                      <div className="input-group">
                                        <div className="input-group-prepend">
                                          <span className="input-group-text">
                                            <i className="fa fa-clock-o"></i>
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
                                backgroundColor: 'white',
                                color: 'black'
                              }}
                              value={taskRows.reduce((sum, row) => sum + Number(row.minutes || 0), 0)}
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
                                backgroundColor: 'white',
                                color: 'black'
                              }}
                              value={(taskRows.reduce((sum, row) => sum + Number(row.minutes || 0), 0) / 60).toFixed(2)}
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
                                backgroundColor: 'white',
                                color: 'black'
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
                                backgroundColor: 'white',
                                color: 'black'
                              }}
                              value={
                                ((taskRows.reduce((sum, row) => sum + Number(row.minutes || 0), 0) / 60) * 
                                (selectedTask.ratePerHour || 500)).toFixed(2)
                              }
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    ) : paymentType === 'lumpsum' ? (
                      <div className="row mb-3">
                        <div className="col-md-9"></div>
                        <div className="col-md-3 text-center">
                          <label className="d-block text-center">Total Fees</label>
                          <div className="input-group justify-content-center" style={{ width: '100px', margin: '0 auto' }}>
                            <div className="input-group-prepend">
                              <span className="input-group-text">₹</span>
                            </div>
                            <input
                              type="text"
                              className="form-control text-center"
                              style={{
                               
                                minWidth: '60px',
                               
                              }}
                              value={`${realTimeCost.totalCost.toFixed(2)}`}
                              readOnly
                            />
                          </div>
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
                    <div className="d-flex align-items-center justify-content-end">
              <input
                type="text"
                className="form-control task-id-input text-center"
                value={selectedTask.taskId}
                readOnly
                style={{ width: '150px',marginLeft:'590px' }}
              />
            </div>
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
                          style={{ width: '410px' }}
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