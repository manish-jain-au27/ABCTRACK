// d:/kalash/ABC Track/Dashtail-v1.3.0/abctrack/src/components/taskboard/TaskHeader.js
import React from 'react';
import { Plus, List, Kanban, Search } from 'lucide-react';

const TaskHeader = ({ 
  onCreateBoard, 
  onViewChange, 
  view = 'kanban', // Add a default value
  onSearch, 
  onAddTask,
  onStatusFilter,
  statusFilter 
}) => {
  return (
    <div className="bg-white border-b p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onAddTask}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus className="mr-2" /> Create Task
        </button>
        
        <button 
          onClick={onCreateBoard}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <Plus className="mr-2" /> Create Board
        </button>
      </div>

      <div className="flex items-center space-x-4">
        {/* View Switcher */}
        <div className="flex border rounded-md">
          <button 
            onClick={() => onViewChange('kanban')}
            className={`px-4 py-2 ${view === 'kanban' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            <Kanban />
          </button>
          <button 
            onClick={() => onViewChange('list')}
            className={`px-4 py-2 ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            <List />
          </button>
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilter(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="all">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {/* Search */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search tasks..."
            onChange={(e) => onSearch(e.target.value)}
            className="border rounded-md px-3 py-2 pl-10 w-64"
          />
          <Search className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;