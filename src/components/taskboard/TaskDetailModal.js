import React, { useState, useEffect } from 'react';
import { X, Eye, Clock, Calendar, User, Tag, List, DollarSign } from 'lucide-react';

const TaskDetailModal = ({ 
  task, 
  onClose, 
  onViewTask 
}) => {
  const [localTask, setLocalTask] = useState(task);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'todo': return { 
        color: 'bg-blue-100 text-blue-800', 
        label: 'To Do' 
      };
      case 'inprogress': return { 
        color: 'bg-yellow-100 text-yellow-800', 
        label: 'In Progress' 
      };
      case 'done': return { 
        color: 'bg-green-100 text-green-800', 
        label: 'Done' 
      };
      default: return { 
        color: 'bg-gray-100 text-gray-800', 
        label: status 
      };
    }
  };

  const getPriorityStyle = (priority) => {
    switch(priority) {
      case 'high': return { 
        color: 'bg-red-100 text-red-800', 
        label: 'High Priority' 
      };
      case 'medium': return { 
        color: 'bg-yellow-100 text-yellow-800', 
        label: 'Medium Priority' 
      };
      case 'low': return { 
        color: 'bg-green-100 text-green-800', 
        label: 'Low Priority' 
      };
      default: return { 
        color: 'bg-gray-100 text-gray-800', 
        label: priority 
      };
    }
  };

  const statusStyle = getStatusStyle(localTask.status);
  const priorityStyle = getPriorityStyle(localTask.priority);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <div className="bg-gray-50 p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{localTask.title}</h2>
            <p className="text-gray-600 mt-1">{localTask.subtitle}</p>
          </div>
          <div className="flex space-x-2">
            {onViewTask && (
              <button 
                onClick={() => onViewTask(localTask)}
                className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition"
                title="View Full Task"
              >
                <Eye size={24} />
              </button>
            )}
            <button 
              onClick={onClose} 
              className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition"
              title="Close"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Tag className="text-gray-500" size={20} />
              <div>
                <h3 className="font-semibold text-gray-700">Category</h3>
                <p className="text-gray-600">{localTask.category}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <List className="text-gray-500" size={20} />
              <div>
                <h3 className="font-semibold text-gray-700">Subcategories</h3>
                <div className="space-y-1">
                  {localTask.subcategoryDetails?.map(sub => (
                    <div key={sub.id} className="flex justify-between text-gray-600">
                      <span>{sub.name}</span>
                      <span>{sub.hours} hrs @ ${sub.pricePerHour}/hr</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <User className="text-gray-500" size={20} />
              <div>
                <h3 className="font-semibold text-gray-700">Client</h3>
                <p className="text-gray-600">{localTask.client}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Clock className="text-gray-500" size={20} />
              <div>
                <h3 className="font-semibold text-gray-700">Total Hours</h3>
                <p className="text-gray-600">{localTask.hours} hours</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <DollarSign className="text-gray-500" size={20} />
              <div>
                <h3 className="font-semibold text-gray-700">Total Cost</h3>
                <p className="text-gray-600">${localTask.totalCost.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="text-gray-500" size={20} />
              <div>
                <h3 className="font-semibold text-gray-700">Project Timeline</h3>
                <p className="text-gray-600">
                  {formatDate(localTask.startDate)} - {formatDate(localTask.endDate)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 border-t flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="font-semibold text-gray-700">Status</h3>
              <span 
                className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${statusStyle.color}
                `}
              >
                {statusStyle.label}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Priority</h3>
              <span 
                className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${priorityStyle.color}
                `}
              >
                {priorityStyle.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;