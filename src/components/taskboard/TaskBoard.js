import React, { useState, useMemo } from 'react';
import TaskHeader from './TaskHeader';
import Board from './Board';
import Task from './Task';
import AddTask from './AddTask';
import TaskList from './TaskList';
import TaskDetailModal from './TaskDetailModal';

const TaskBoard = () => {
  const [boards, setBoards] = useState([
    { id: '1', name: 'To Do', status: 'todo' },
    { id: '2', name: 'In Progress', status: 'inprogress' },
    { id: '3', name: 'Done', status: 'done' }
  ]);

  const [tasks, setTasks] = useState([
    { 
      id: 't1', 
      taskId: 'TASK-CA-001',
      category: 'audit',
      subcategories: ['financial'],
      subcategoryDetails: [
        { id: 'financial', name: 'Financial Statement Review', pricePerHour: 250, hours: 40 }
      ],
      title: 'Annual Financial Audit', 
      subtitle: 'Comprehensive financial review for Chirag Corporations',
      startDate: '2024-04-15',
      endDate: '2024-05-15',
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
      title: 'Tax Compliance Strategy', 
      subtitle: 'Develop tax optimization plan for Kalash Infotech',
      startDate: '2024-04-20',
      endDate: '2024-05-20',
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
      title: 'Financial Risk Evaluation', 
      subtitle: 'Comprehensive risk assessment for Riddhi Infotech',
      startDate: '2024-05-01',
      endDate: '2024-05-25',
      client: 'Riddhi Infotech',
      hours: 25,
      totalCost: 6625,
      priority: 'low', 
      boardId: '3',
      status: 'review'
    }
  ]);

  const [view, setView] = useState('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);

  const handleCreateBoard = () => {
    const newBoard = {
      id: `${boards.length + 1}`,
      name: `New Board ${boards.length + 1}`,
      status: 'todo'
    };
    setBoards([...boards, newBoard]);
  };

  const handleAddTask = (boardId) => {
    setSelectedBoardId(boardId);
    setIsAddTaskOpen(true);
  };

  const handleTaskSubmit = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: `t${Date.now()}`,
      taskId: newTask.taskId || `TASK-${(tasks.length + 1).toString().padStart(3, '0')}`,
      status: 'todo',
      boardId: selectedBoardId || '1'
    };
    setTasks([...tasks, taskWithId]);
    setIsAddTaskOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleMoveTask = (taskId, newBoardId) => {
    const board = boards.find(b => b.id === newBoardId);
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            boardId: newBoardId,
            status: board.status 
          } 
        : task
    ));
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  const handleCloseTaskDetail = () => {
    setIsTaskDetailOpen(false);
    setSelectedTask(null);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.taskId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' || 
        task.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchTerm, statusFilter]);

  return (
    <div className="flex flex-col h-screen">
      <TaskHeader 
        onCreateBoard={handleCreateBoard}
        onViewChange={setView}
        onSearch={setSearchTerm}
        onAddTask={() => {
          setSelectedBoardId(null);
          setIsAddTaskOpen(true);
        }}
        onStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
        view={view}
      />
      
      {view === 'kanban' ? (
        <div className="flex overflow-x-auto p-4 space-x-4 relative">
          {boards.map(board => (
            <Board 
              key={board.id}
              board={board}
              taskHandler={() => handleAddTask(board.id)}
              onEdit={() => {/* Edit board logic */}}
            >
              {filteredTasks
                .filter(task => task.boardId === board.id)
                .map(task => (
                  <Task 
                    key={task.id}
                    task={task}
                    boards={boards}
                    onDeleteTask={handleDeleteTask}
                    onUpdateTask={handleUpdateTask}
                    onMoveTask={handleMoveTask}
                    onTaskClick={() => handleTaskClick(task)}
                  />
                ))
              }
            </Board>
          ))}
        </div>
      ) : (
        <div className="p-4">
          <TaskList 
            tasks={filteredTasks}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            onTaskClick={handleTaskClick}
          />
        </div>
      )}

     
      {isTaskDetailOpen && selectedTask && (
        <TaskDetailModal 
          task={selectedTask}
          onClose={handleCloseTaskDetail}
        />
      )}

     
      {isAddTaskOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-[800px] max-h-[90vh] overflow-y-auto">
            <AddTask 
              boardId={selectedBoardId}
              onClose={() => setIsAddTaskOpen(false)}
              onAddTask={handleTaskSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;