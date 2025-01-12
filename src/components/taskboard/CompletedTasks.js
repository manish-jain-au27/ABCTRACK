// src/components/taskboard/CompletedTasks.js
import React, { useState, useMemo, useCallback } from 'react';
import { Edit, FileText, Search } from 'lucide-react';
import CreateInvoiceModal from '../invoicing/CreateInvoiceModal';

// Dummy entities data
const ENTITIES = [
  {
    id: 'ent1',
    name: 'Kalash Technologies Pvt Ltd',
    address: '123 Tech Park, Bangalore, Karnataka 560001',
    gstNumber: '07AATCA2480C1Z0',
    contactEmail: 'billing@kalashtech.com'
  },
  {
    id: 'ent2',
    name: 'ABC Innovations Inc.',
    address: '456 Innovation Drive, Silicon Valley, CA 94000',
    gstNumber: 'US-TAX-1234567',
    contactEmail: 'finance@abcinnovations.com'
  },
  {
    id: 'ent3',
    name: 'Global Solutions LLC',
    address: '789 Business Center, New York, NY 10001',
    gstNumber: 'US-TAX-7654321',
    contactEmail: 'accounts@globalsolutions.com'
  }
];

// Directly import the JSON data
const completedTasksData = [
  {
    "id": "ct1",
    "title": "Website Redesign Project",
    "subtitle": "Redesign corporate website",
    "client": "Acme Corporation",
    "status": "done",
    "priority": "high",
    "category": "Web Design",
    "subcategoryDetails": [
      {
        "id": "sub1",
        "name": "UI/UX Design",
        "hours": 40,
        "pricePerHour": 100
      },
      {
        "id": "sub2",
        "name": "Frontend Development",
        "hours": 60,
        "pricePerHour": 120
      }
    ],
    "startDate": "2023-09-01",
    "endDate": "2023-11-15",
    "hours": 100,
    "totalCost": 14000,
    "taskId": "PROJ-2023-001"
  },
  // ... other tasks (keep existing data)
];

const CompletedTasks = ({ onEditTask, onCreateInvoice }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ 
    key: 'title', 
    direction: 'ascending' 
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // Memoize tasks to prevent unnecessary re-renders
  const tasks = useMemo(() => completedTasksData, []);

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