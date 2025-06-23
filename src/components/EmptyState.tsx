import React from 'react';
import { BookmarkIcon, Settings } from 'lucide-react';

interface EmptyStateProps {
  onConfigOpen: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onConfigOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <BookmarkIcon className="w-12 h-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Connect Your Google Sheet
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Get started by connecting to your Google Sheets document containing your webmarks. 
        Click the settings button to configure your connection.
      </p>
      <button
        onClick={onConfigOpen}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <Settings size={20} />
        Configure Connection
      </button>
    </div>
  );
};