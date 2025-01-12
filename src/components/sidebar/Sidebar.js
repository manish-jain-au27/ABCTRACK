import React, { useState, lazy, Suspense } from 'react';
import {
  Home,
  Kanban,
  CheckCircle2,
  Settings,
  User,
  Puzzle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import DashBoard from '../dashboard/dashboard';
import CreateEntity from '../masters/entity/createEntity';

const CompletedTasks = lazy(() => import('../taskboard/CompletedTasks'));
const TaskBoard = lazy(() => import('../taskboard/TaskBoard'));

// SidebarItem Component with sub-items
const SidebarItem = ({ icon: Icon, label, active, onClick, subItems, onSubItemClick }) => (
  <div>
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

    {/* Render nested sub-items */}
    {subItems && (
      <div className="pl-4 mt-2">
        {subItems.map((subItem) => (
          <div
            key={subItem.key}
            className="flex items-center p-2 cursor-pointer hover:bg-gray-100 text-sm"
            onClick={() => onSubItemClick(subItem.key)}
          >
            <span className="text-sm">{subItem.label}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedItems, setExpandedItems] = useState({});

  // Sidebar items including subItems for different sections
  const sidebarItems = [
    {
      icon: Home,
      label: 'Dashboard',
      key: 'dashboard',
    },
    {
      icon: Puzzle,
      label: 'Masters',
      key: 'masters',
      subItems: [
        {
          label: 'Entity',
          key: 'createEntity'
        },
        {
          label: 'Party',
          key: 'createParty'
        }
      ]
    },
    {
      icon: Kanban,
      label: 'Task Board',
      key: 'taskboard',
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

  const toggleItemExpansion = (key) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [key]: !prevExpandedItems[key]
    }));
  };

  const renderView = () => {
    switch (activeItem) {
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
              }}
              onCreateInvoice={(task) => {
                console.log('Create invoice for task:', task);
              }}
            />
          </Suspense>
        );
      case 'dashboard':
        return (
          <Suspense fallback={<div>Loading Dashboard...</div>}>
            <DashBoard />
          </Suspense>
        );
      case 'createEntity':
        return (
          <Suspense fallback={<div>Loading Dashboard...</div>}>
            <CreateEntity />
          </Suspense>
        );
      case 'profile':
        return <div>Profile View</div>;
      case 'settings':
        return <div>Settings View</div>;
      default:
        return (
          <Suspense fallback={<div>Loading Task Board...</div>}>
            <DashBoard />
          </Suspense>
        );
    }
  };

  return (
    <div className="flex w-full h-full">
      <div
        className={`
          bg-white border-r h-full 
          flex flex-col transition-all duration-300
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}
      >
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

        <div className="flex-grow">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.key}
              icon={item.icon}
              label={!isCollapsed ? item.label : ''}
              active={activeItem === item.key}
              onClick={() => {
                if (item.subItems) {
                  // If there are subItems, toggle the expansion of this item
                  toggleItemExpansion(item.key);
                } else {
                  // If no subItems, just set it as active
                  setActiveItem(item.key);
                }
              }}
              subItems={expandedItems[item.key] ? item.subItems : []}
              onSubItemClick={(subItemKey) => setActiveItem(subItemKey)}
            />
          ))}
        </div>

        {!isCollapsed && (
          <div className="p-4 border-t text-center text-xs text-gray-500">
            ABC Track
          </div>
        )}
      </div>

      <div className="flex-grow overflow-auto">
        {renderView()}
      </div>
    </div>
  );
};

export default Sidebar;