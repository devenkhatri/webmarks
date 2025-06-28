import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Clock } from 'lucide-react';
import { SortMode } from '../types';

interface SortControlsProps {
  currentSort: SortMode;
  onSortChange: (sort: SortMode) => void;
}

export const SortControls: React.FC<SortControlsProps> = ({ currentSort, onSortChange }) => {
  const sortOptions = [
    { mode: 'latest-first' as SortMode, label: 'Latest First', icon: Clock },    
    { mode: 'name-asc' as SortMode, label: 'A → Z', icon: ArrowUp },
    { mode: 'name-desc' as SortMode, label: 'Z → A', icon: ArrowDown },
    { mode: 'none' as SortMode, label: 'Natural Order', icon: ArrowUpDown },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Sort:</span>
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortMode)}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        {sortOptions.map(({ mode, label }) => (
          <option key={mode} value={mode}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};