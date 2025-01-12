// d:/kalash/ABC Track/Dashtail-v1.3.0/abctrack/src/components/taskboard/Board.js
import React, { useState } from 'react';
import { MoreHorizontal, Plus, UserPlus } from 'lucide-react';

const Board = ({ 
  board, 
  children, 
  onEdit, 
  taskHandler, 
  isTaskOpen, 
  showButton = true 
}) => {
  const [open, setOpen] = useState(false);
  const { name, status, id } = board;

  const handleDelete = () => {
    // Implement delete logic
    console.log(`Deleting board ${id}`);
  };

  return (
    <div 
      className={`
        max-w-[277px] border-t-4 rounded-md flex-none w-full 
        shadow-lg bg-gray-100 dark:bg-gray-50
        ${status === 'primary' ? 'border-blue-500' : 
          status === 'warning' ? 'border-yellow-500' : 
          status === 'success' ? 'border-green-500' : 'border-gray-500'}
      `}
    >
      {/* Board Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-3">
        <button className="p-1 bg-transparent border border-gray-200 rounded">
          <UserPlus className="w-4 h-4" />
        </button>
        
        <h3 className="text-sm font-semibold">{name}</h3>
        
        <div className="relative">
          <button onClick={() => setOpen(!open)}>
            <MoreHorizontal className="w-5 h-5" />
          </button>
          
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
              <button 
                onClick={() => onEdit(board)} 
                className="block w-full text-left p-2 hover:bg-gray-100"
              >
                Edit
              </button>
              <button 
                onClick={handleDelete} 
                className="block w-full text-left p-2 hover:bg-gray-100 text-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Board Content */}
      <div className="p-3 max-h-[calc(100vh-300px)] overflow-y-auto">
        {children}
      </div>

      {/* Add Task Button */}
      {showButton && (
        <div className="p-3 border-t">
          <button 
            onClick={() => taskHandler(id)}
            className="w-full flex items-center justify-center text-blue-500 hover:bg-blue-50 p-2 rounded"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Task
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;