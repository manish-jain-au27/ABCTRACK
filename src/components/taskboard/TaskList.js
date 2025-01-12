// d:/kalash/ABC Track/Dashtail-v1.3.0/abctrack/src/components/taskboard/TaskList.js
import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

const TaskList = ({ 
  tasks, 
  onDeleteTask, 
  onUpdateTask,
  onTaskClick 
}) => {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = () => {
    if (editingTask) {
      onUpdateTask(editingTask);
      setEditingTask(null);
    }
  };

  // Calculate totals
  const totalHours = tasks.reduce((sum, task) => sum + (task.hours || 0), 0);
  const totalCost = tasks.reduce((sum, task) => sum + (task.totalCost || 0), 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">
              <input 
                type="checkbox"
                checked={selectedTasks.length === tasks.length}
                onChange={() => 
                  setSelectedTasks(
                    selectedTasks.length === tasks.length 
                      ? [] 
                      : tasks.map(task => task.id)
                  )
                }
              />
            </th>
            <th className="p-3 text-left">Task ID</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Subtitle</th>
            <th className="p-3 text-left">Client</th>
            <th className="p-3 text-left">Hours</th>
            <th className="p-3 text-left">Cost</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                <input 
                  type="checkbox"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => toggleTaskSelection(task.id)}
                />
              </td>
              <td className="p-3">{task.taskId}</td>
              <td className="p-3">{task.category} - {task.subcategories?.join(', ')}</td>
              <td className="p-3">{task.title}</td>
              <td className="p-3">{task.subtitle}</td>
              <td className="p-3">{task.client}</td>
              <td className="p-3">{task.hours}</td>
              <td className="p-3">${task.totalCost.toFixed(2)}</td>
              <td className="p-3 flex space-x-2">
                <button 
                  onClick={() => onTaskClick(task)}
                  className="text-blue-500 hover:text-blue-700"
                  title="View Task Details"
                >
                  View
                </button>
                <button 
                  onClick={() => handleEditTask(task)}
                  className="text-green-500 hover:text-green-700"
                  title="Edit Task"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => onDeleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Task"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-100 font-bold">
          <tr>
            <td colSpan="6" className="p-3 text-right">Total:</td>
            <td className="p-3">{totalHours}</td>
            <td className="p-3">${totalCost.toFixed(2)}</td>
            <td className="p-3"></td>
          </tr>
        </tfoot>
      </table>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                <input
                  type="text"
                  value={editingTask.subtitle}
                  onChange={(e) => setEditingTask({...editingTask, subtitle: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;