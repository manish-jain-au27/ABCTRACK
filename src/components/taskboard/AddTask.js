import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

const TASK_CATEGORIES = [
  { 
    id: 'audit', 
    name: 'Audit Services',
    subcategories: [
      { id: 'financial', name: 'Financial Statement Audit', pricePerHour: 250 },
      { id: 'compliance', name: 'Compliance Audit', pricePerHour: 225 },
      { id: 'internal', name: 'Internal Audit Review', pricePerHour: 200 }
    ]
  },
  { 
    id: 'tax', 
    name: 'Tax Services',
    subcategories: [
      { id: 'corporate', name: 'Corporate Tax Planning', pricePerHour: 275 },
      { id: 'personal', name: 'Personal Tax Consulting', pricePerHour: 200 },
      { id: 'international', name: 'International Tax Strategy', pricePerHour: 300 }
    ]
  },
  { 
    id: 'advisory', 
    name: 'Advisory Services',
    subcategories: [
      { id: 'financial-planning', name: 'Financial Advisory', pricePerHour: 285 },
      { id: 'risk-management', name: 'Risk Management Consulting', pricePerHour: 265 },
      { id: 'forensic', name: 'Forensic Accounting', pricePerHour: 295 }
    ]
  }
];

const CLIENTS = [
  { id: 'client1', name: 'Chirag corporation' },
  { id: 'client2', name: 'Kalash infotech' },
  { id: 'client3', name: ' Riddhi infotech' }
];

const PRIORITY_LEVELS = [
  { id: 'low', name: 'Low', color: 'text-green-500' },
  { id: 'medium', name: 'Medium', color: 'text-yellow-500' },
  { id: 'high', name: 'High', color: 'text-red-500' },
  { id: 'critical', name: 'Critical', color: 'text-red-700' }
];

const EMPLOYEES = [
  { 
    id: 1, 
    name: 'Manish', 
    department: 'Audit & Assurance', 
   
    specialties: ['financial', 'compliance']
  },
  { 
    id: 2, 
    name: 'Ruchita', 
    department: 'Tax Advisory', 
    
    specialties: ['corporate', 'personal']
  },
  { 
    id: 3, 
    name: 'Swati', 
    department: 'Financial Advisory', 
    
    specialties: ['financial-planning', 'risk-management']
  },
  { 
    id: 4, 
    name: 'Darshan', 
    department: 'Forensic Accounting', 
    
    specialties: ['forensic', 'internal']
  },
  { 
    id: 5, 
    name: 'Manoj', 
    department: 'International Tax', 
    
    specialties: ['international', 'corporate']
  }
];

const AddTask = ({ 
  onClose, 
  boardId, 
  onAddTask 
}) => {
  const [taskData, setTaskData] = useState({
    id: `t${Date.now()}`,
    taskId: '',
    category: '',
    subcategories: [],
    title: '',
    subtitle: '',
    startDate: '',
    endDate: '',
    client: '',
    hours: 0,
    priority: 'medium',
    subcategoryDetails: [],
    totalCost: 0,
    boardId,
    assignedTo: null
  });

  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'category') {
      setTaskData(prev => ({
        ...prev,
        [name]: value,
        subcategories: [],
        subcategoryDetails: []
      }));
    } else {
      setTaskData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubcategoryChange = (subcategoryId) => {
    const category = TASK_CATEGORIES.find(cat => cat.id === taskData.category);
    const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);

    setTaskData(prev => {
      const currentSubcategories = prev.subcategories.includes(subcategoryId)
        ? prev.subcategories.filter(id => id !== subcategoryId)
        : [...prev.subcategories, subcategoryId];

      const currentSubcategoryDetails = currentSubcategories.map(subId => {
        const subcat = category.subcategories.find(s => s.id === subId);
        return {
          id: subId,
          name: subcat.name,
          pricePerHour: subcat.pricePerHour,
          hours: 0
        };
      });

      return {
        ...prev,
        subcategories: currentSubcategories,
        subcategoryDetails: currentSubcategoryDetails
      };
    });
  };

  const handleSubcategoryHoursChange = (subcategoryId, hours) => {
    setTaskData(prev => {
      const updatedSubcategoryDetails = prev.subcategoryDetails.map(detail => 
        detail.id === subcategoryId ? { ...detail, hours: Number(hours) } : detail
      );

      const totalHours = updatedSubcategoryDetails.reduce((sum, detail) => sum + detail.hours, 0);
      const totalCost = updatedSubcategoryDetails.reduce((sum, detail) => 
        sum + (detail.hours * detail.pricePerHour), 0
      );

      return {
        ...prev,
        hours: totalHours,
        totalCost,
        subcategoryDetails: updatedSubcategoryDetails
      };
    });
  };

  const openEmployeeModal = () => {
    const categorySubspecialties = taskData.subcategories;
    const filtered = EMPLOYEES.filter(emp => 
      categorySubspecialties.some(specialty => 
        emp.specialties.includes(specialty)
      )
    );
    
    setFilteredEmployees(filtered.length > 0 ? filtered : EMPLOYEES);
    setIsEmployeeModalOpen(true);
  };

  const handleAssignEmployee = (employee) => {
    setTaskData(prev => ({
      ...prev,
      assignedTo: employee
    }));
    setIsEmployeeModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!taskData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    if (taskData.subcategoryDetails.length === 0) {
      alert('Please select at least one subcategory');
      return;
    }

    const finalTaskData = {
      ...taskData,
      taskId: taskData.taskId || `TASK-${Math.floor(Math.random() * 10000)}`
    };

    onAddTask(finalTaskData);
    onClose();
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* Task ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Task ID</label>
            <input
              type="text"
              name="taskId"
              value={taskData.taskId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              placeholder="Enter Task ID"
            />
          </div>

      
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={taskData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            >
              <option value="">Select Category</option>
              {TASK_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

         
          {taskData.category && (
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Subcategories</label>
              <div className="mt-1 grid grid-cols-3 gap-4">
                {TASK_CATEGORIES
                  .find(cat => cat.id === taskData.category)
                  .subcategories.map(subcat => (
                    <div key={subcat.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={subcat.id}
                        checked={taskData.subcategories.includes(subcat.id)}
                        onChange={() => handleSubcategoryChange(subcat.id)}
                        className="mr-2"
                      />
                      <label 
                        htmlFor={subcat.id} 
                        className="flex-grow"
                      >
                        {subcat.name} (${subcat.pricePerHour}/hr)
                      </label>
                      {taskData.subcategories.includes(subcat.id) && (
                        <input
                          type="number"
                          placeholder="Hours"
                          min="0"
                          value={
                            taskData.subcategoryDetails.find(d => d.id === subcat.id)?.hours || 0
                          }
                          onChange={(e) => handleSubcategoryHoursChange(subcat.id, e.target.value)}
                          className="w-20 border rounded px-2 py-1"
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <div className="mt-1 flex space-x-4">
              {PRIORITY_LEVELS.map(level => (
                <label key={level.id} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value={level.id}
                    checked={taskData.priority === level.id}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className={level.color}>{level.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              placeholder="Enter Title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={taskData.subtitle}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              placeholder="Enter Subtitle"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={taskData.startDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={taskData.endDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Client</label>
            <select
              name="client"
              value={taskData.client}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            >
              <option value="">Select Client</option>
              {CLIENTS.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
            {taskData.assignedTo ? (
              <div className="flex items-center bg-gray-100 rounded-md p-2">
                <img 
                  src={taskData.assignedTo.avatar} 
                  alt={taskData.assignedTo.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{taskData.assignedTo.name}</p>
                  <p className="text-xs text-gray-500">{taskData.assignedTo.department}</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setTaskData(prev => ({...prev, assignedTo: null}))}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={openEmployeeModal}
                className="w-full border-2 border-dashed border-gray-300 rounded-md px-3 py-2 text-gray-500 hover:border-blue-500 hover:text-blue-500"
                disabled={!taskData.category}
              >
                {taskData.category 
                  ? '+ Assign Employee' 
                  : 'Select Category First'}
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Total Hours</label>
            <input
              type="text"
              value={taskData.hours}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Cost</label>
            <input
              type="text"
              value={`$${taskData.totalCost.toFixed(2)}`}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Task
          </button>
        </div>
      </form>

      {isEmployeeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Select Employee</h3>
              <button 
                onClick={() => setIsEmployeeModalOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {filteredEmployees.map(employee => (
                <button
                  key={employee.id}
                  onClick={() => handleAssignEmployee(employee)}
                  className="flex items-center p-3 border rounded-md hover:bg-blue-50 hover:border-blue-500 transition"
                >
                  <img 
                    src={employee.avatar} 
                    alt={employee.name} 
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div className="text-left">
                    <p className="font-semibold">{employee.name}</p>
                    <p className="text-xs text-gray-500">{employee.department}</p>
                    <p className="text-xs text-gray-400">
                      Specialties: {employee.specialties.join(', ')}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;