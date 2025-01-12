import React, { useState } from 'react';
import { MoreHorizontal, ChevronDown, Eye } from 'lucide-react';

const Task = ({ 
  task, 
  onUpdateTask, 
  boards = [], 
  onDeleteTask,
  onTaskClick,
  onMoveTask 
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isBoardDropdownOpen, setIsBoardDropdownOpen] = useState(false);

  const { 
    id, 
    title, 
    subtitle, 
    priority, 
    boardId,
    status
  } = task;

  const handleMoveTask = (newBoardId) => {
    onMoveTask(id, newBoardId);
    setIsBoardDropdownOpen(false);
  };

  const getBoardNameById = (boardId) => {
    const board = boards.find(b => b.id === boardId);
    return board ? board.name : 'Unknown';
  };

  return (
    <div className="border rounded p-3 mb-2 relative group">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs border rounded px-2 py-1">
            {title.split(' ')[0]}
          </span>
          
          <div className="relative">
            <button 
              onClick={() => setIsBoardDropdownOpen(!isBoardDropdownOpen)}
              className="text-xs border rounded px-2 py-1 flex items-center"
            >
              {getBoardNameById(boardId)}
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            
            {isBoardDropdownOpen && (
              <div className="absolute z-10 bg-white border rounded shadow-lg">
                {boards.map(board => (
                  <button
                    key={board.id}
                    onClick={() => handleMoveTask(board.id)}
                    className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                  >
                    {board.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
          <button 
            onClick={() => onTaskClick(task)}
            className="p-1 hover:bg-gray-100 rounded"
            title="View Task Details"
          >
            <Eye className="w-5 h-5 text-blue-600" />
          </button>

          <button 
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          
          {isOptionsOpen && (
            <div className="absolute right-0 top-full bg-white border rounded shadow-lg">
              <button 
                onClick={() => onDeleteTask(id)}
                className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-red-500"
              >
                Delete
              </button>
              <button 
                onClick={() => onTaskClick(task)}
                className="block w-full text-left px-2 py-1 hover:bg-gray-100"
              >
                Edit Task
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>

      <div className="mt-2 flex justify-between items-center">
        <span 
          className={`text-xs px-2 py-1 rounded ${
            priority === 'high' ? 'bg-red-100 text-red-600' :
            priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
            'bg-green-100 text-green-600'
          }`}
        >
          {priority}
        </span>
      </div>
    </div>
  );
};

export default Task;