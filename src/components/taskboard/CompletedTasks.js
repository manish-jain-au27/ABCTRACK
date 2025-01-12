// src/components/taskboard/CompletedTasks.js
import React, { useState, useMemo, useCallback } from 'react';
import { Edit, FileText, Search } from 'lucide-react';
import CreateInvoiceModal from '../invoicing/CreateInvoiceModal';

// Dummy entities data
const ENTITIES = [
  {
    id: 'ent1',
    name: 'Chirag Corporations',
    address: 'gokul nagar, Bhiwandi 421302',
    gstNumber: 'sdfasd897f9sd8g',
    contactEmail: 'chirag@chiragcorporations.com'
  },
  {
    id: 'ent2',
    name: 'Kalash Infotech',
    address: 'Anjurphata, Bhiwandi 421302',
    gstNumber: 'sdfsd97f6sd87f',
    contactEmail: 'darshan@kalashinfotech.com'
  },
  {
    id: 'ent3',
    name: 'Riddhi infotech',
    address: 'gokul nagar, Bhiwandi 421302',
    gstNumber: 'sdf76dsf7sd',
    contactEmail: 'mansih@riddhi-infotech.com'
  }
];

// Directly import the JSON data
const completedTasksData = [
  {
    "id": "ct1",
    "title": "Financial Statement Audit",
    "subtitle": "Annual Audit for Chirag Corporations",
    "client": "Chirag Corporations",
    "status": "done",
    "priority": "high",
    "category": "Audit Services",
    "subcategoryDetails": [
      {
        "id": "sub1",
        "name": "Financial Statement Review",
        "hours": 40,
        "pricePerHour": 250
      },
      {
        "id": "sub2",
        "name": "Compliance Verification",
        "hours": 20,
        "pricePerHour": 225
      }
    ],
    "startDate": "2024-01-15",
    "endDate": "2024-02-28",
    "hours": 60,
    "totalCost": 15300,
    "taskId": "AUDIT-2024-001"
  },
  {
    "id": "ct2",
    "title": "Corporate Tax Strategy",
    "subtitle": "Tax Planning for Kalash Infotech",
    "client": "Kalash Infotech",
    "status": "done",
    "priority": "medium",
    "category": "Tax Services",
    "subcategoryDetails": [
      {
        "id": "sub1",
        "name": "Corporate Tax Planning",
        "hours": 30,
        "pricePerHour": 275
      },
      {
        "id": "sub2",
        "name": "International Tax Consultation",
        "hours": 15,
        "pricePerHour": 300
      }
    ],
    "startDate": "2024-03-01",
    "endDate": "2024-03-20",
    "hours": 45,
    "totalCost": 14625,
    "taskId": "TAX-2024-002"
  },
  {
    "id": "ct3",
    "title": "Forensic Accounting Investigation",
    "subtitle": "Financial Irregularities Analysis",
    "client": "Riddhi Infotech",
    "status": "done",
    "priority": "high",
    "category": "Advisory Services",
    "subcategoryDetails": [
      {
        "id": "sub1",
        "name": "Forensic Accounting",
        "hours": 50,
        "pricePerHour": 295
      },
      {
        "id": "sub2",
        "name": "Risk Management Review",
        "hours": 20,
        "pricePerHour": 265
      }
    ],
    "startDate": "2024-02-10",
    "endDate": "2024-03-15",
    "hours": 70,
    "totalCost": 23450,
    "taskId": "FORENSIC-2024-003"
  }
];

const CompletedTasks = ({ onEditTask, onCreateInvoice }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ 
    key: 'title', 
    direction: 'ascending' 
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const [tasks, setTasks] = useState([
    { 
      id: 't1', 
      taskId: 'TASK-CA-001',
      category: 'audit',
      subcategories: ['financial'],
      subcategoryDetails: [
        { id: 'financial', name: 'Financial Statement Audit', pricePerHour: 250, hours: 40 }
      ],
      title: 'Preliminary Audit Assessment', 
      subtitle: 'Initial financial review for Chirag Corporations',
      startDate: '2024-04-01',
      endDate: '2024-04-15',
      client: 'Chirag Corporations',
      hours: 40,
      totalCost: 10000,
      priority: 'high', 
      boardId: '1',
      status: 'todo'
    },
    { 
      id: 't2', 
      taskId: 'TASK-CA-002',
      category: 'tax',
      subcategories: ['corporate'],
      subcategoryDetails: [
        { id: 'corporate', name: 'Corporate Tax Planning', pricePerHour: 275, hours: 30 }
      ],
      title: 'Tax Optimization Strategy', 
      subtitle: 'Develop tax efficiency plan for Kalash Infotech',
      startDate: '2024-04-10',
      endDate: '2024-04-25',
      client: 'Kalash Infotech',
      hours: 30,
      totalCost: 8250,
      priority: 'medium', 
      boardId: '2',
      status: 'inprogress'
    },
    { 
      id: 't3', 
      taskId: 'TASK-CA-003',
      category: 'advisory',
      subcategories: ['risk-management'],
      subcategoryDetails: [
        { id: 'risk-management', name: 'Risk Management Consulting', pricePerHour: 265, hours: 25 }
      ],
      title: 'Financial Risk Assessment', 
      subtitle: 'Comprehensive risk evaluation for Riddhi Infotech',
      startDate: '2024-04-20',
      endDate: '2024-05-10',
      client: 'Riddhi Infotech',
      hours: 25,
      totalCost: 6625,
      priority: 'low', 
      boardId: '3',
      status: 'review'
    }
  ]);

  // Memoized sorting and filtering logic
  const sortedTasks = useMemo(() => {
    return [...tasks]
      .filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        task.client.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
  }, [tasks, searchTerm, sortConfig]);

  // Memoized sort handler to prevent unnecessary re-renders
  const handleSort = useCallback((key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    }));
  }, []);

  // Memoized search handler
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Handle creating invoice
  const handleCreateInvoice = useCallback((task) => {
    setSelectedTask(task);
    setIsInvoiceModalOpen(true);
  }, []);

  // Handle closing invoice modal
  const handleCloseInvoiceModal = useCallback(() => {
    setIsInvoiceModalOpen(false);
    setSelectedTask(null);
  }, []);

  // Handle invoice submission
  const handleInvoiceSubmit = useCallback((invoiceData) => {
    // Implement invoice submission logic here
    console.log('Invoice submitted:', invoiceData);
    onCreateInvoice(invoiceData);
    handleCloseInvoiceModal();
  }, [onCreateInvoice]);

  return (
    <div className="p-6 bg-white h-full">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Completed Tasks</h2>
        <div className="relative w-full max-w-md">
          <input 
            type="text" 
            placeholder="Search completed tasks..." 
            className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {[
                { key: 'title', label: 'Task Title' },
                { key: 'client', label: 'Client' },
                { key: 'totalCost', label: 'Total Cost' },
                { key: 'endDate', label: 'Completed Date' }
              ].map(({ key, label }) => (
                <th 
                  key={key}
                  className="p-3 text-left cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort(key)}
                >
                  {label}
                  {sortConfig.key === key && (
                    <span className="ml-2">
                      {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <tr 
                key={task.id} 
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{task.title}</td>
                <td className="p-3">{task.client}</td>
                <td className="p-3">${task.totalCost.toFixed(2)}</td>
                <td className="p-3">
                  {new Date(task.endDate).toLocaleDateString()}
                </td>
                <td className="p-3 flex justify-center space-x-2">
                  <button 
                    onClick={() => onEditTask(task)}
                    className="text-blue-500 hover:text-blue-700 transition"
                    title="Edit Task"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleCreateInvoice(task)}
                    className="text-green-500 hover:text-green-700 transition"
                    title="Create Invoice"
                  >
                    <FileText size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sortedTasks.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No completed tasks found
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      {isInvoiceModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-8">
            <CreateInvoiceModal 
              task={selectedTask}
              entities={ENTITIES}
              onClose={handleCloseInvoiceModal}
              onSubmit={handleInvoiceSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedTasks;