import React from 'react';
import { Grid3X3, List, Table } from 'lucide-react';
import { ViewMode } from '../types';

interface ViewModeToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ currentView, onViewChange }) => {
  const views = [
    { mode: 'grid' as ViewMode, icon: Grid3X3, label: 'Grid View' },
    { mode: 'list' as ViewMode, icon: List, label: 'List View' },
    { mode: 'table' as ViewMode, icon: Table, label: 'Table View' },
  ];

  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
      {views.map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          onClick={() => onViewChange(mode)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentView === mode
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
          title={label}
        >
          <Icon size={16} />
          <span className="hidden sm:inline">{label.split(' ')[0]}</span>
        </button>
      ))}
    </div>
  );
};