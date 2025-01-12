// src/components/sidebar/Sidebar.js
import React, { useState, lazy, Suspense } from 'react';
import { 
  Home, 
  Kanban, 
  CheckCircle2, 
  Settings, 
  User, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

// Use lazy loading for CompletedTasks
const CompletedTasks = lazy(() => import('../taskboard/CompletedTasks'));
const TaskBoard = lazy(() => import('../taskboard/TaskBoard'));

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    className={`
      flex items-center p-3 cursor-pointer 
      ${active ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}
    `}
    onClick={onClick}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="text-sm">{label}</span>
  </div>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('taskboard');

  const sidebarItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      key: 'dashboard' 
    },
    { 
      icon: Kanban, 
      label: 'Task Board', 
      key: 'taskboard' 
    },
    { 
      icon: CheckCircle2, 
      label: 'Completed', 
      key: 'completed' 
    },
    { 
      icon: User, 
      label: 'Profile', 
      key: 'profile' 
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      key: 'settings' 
    }
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Render the appropriate view based on activeItem
  const renderView = () => {
    switch(activeItem) {
      case 'taskboard':
        return (
          <Suspense fallback={<div>Loading Task Board...</div>}>
            <TaskBoard />
          </Suspense>
        );
      case 'completed':
        return (
          <Suspense fallback={<div>Loading Completed Tasks...</div>}>
            <CompletedTasks 
              onEditTask={(task) => {
                console.log('Edit task:', task);
                // Implement edit task logic
              }}
              onCreateInvoice={(task) => {
                console.log('Create invoice for task:', task);
                // Implement create invoice logic
              }}
            />
          </Suspense>
        );
      case 'dashboard':
        return <div>Dashboard View</div>;
      case 'profile':
        return <div>Profile View</div>;
      case 'settings':
        return <div>Settings View</div>;
      default:
        return (
          <Suspense fallback={<div>Loading Task Board...</div>}>
            <TaskBoard />
          </Suspense>
        );
    }
  };

  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <div 
        className={`
          bg-white border-r h-full 
          flex flex-col transition-all duration-300
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <div className="text-xl font-bold text-blue-600">
              MyApp
            </div>
          )}
          <button 
            onClick={toggleSidebar} 
            className="p-2 hover:bg-gray-100 rounded"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* Sidebar Items */}
        <div className="flex-grow">
          {sidebarItems.map(item => (
            <SidebarItem
              key={item.key}
              icon={item.icon}
              label={!isCollapsed ? item.label : ''}
              active={activeItem === item.key}
              onClick={() => setActiveItem(item.key)}
            />
          ))}
        </div>

        {/* Sidebar Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t text-center text-xs text-gray-500">
            © 2024 MyApp
          </div>
        )}
      </div>

      {/* Main Content Area - FULL WIDTH */}
      <div className="flex-grow overflow-auto">
        {renderView()}
      </div>
    </div>
  );
};

export default Sidebar;