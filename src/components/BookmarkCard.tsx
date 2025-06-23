import React from 'react';
import { ExternalLink, Copy, Tag, FileText } from 'lucide-react';
import { Bookmark } from '../types';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onTagClick: (tag: string) => void;
  onTypeClick: (type: string) => void;
}

const typeColors: Record<string, string> = {
  'article': 'bg-blue-100 text-blue-800 border-blue-200',
  'tool': 'bg-green-100 text-green-800 border-green-200',
  'tutorial': 'bg-purple-100 text-purple-800 border-purple-200',
  'reference': 'bg-orange-100 text-orange-800 border-orange-200',
  'documentation': 'bg-gray-100 text-gray-800 border-gray-200',
  'inspiration': 'bg-pink-100 text-pink-800 border-pink-200',
  'news': 'bg-red-100 text-red-800 border-red-200',
  'video': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'course': 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark, onTagClick, onTypeClick }) => {
  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('Failed to copy URL');
    }
  };

  const getTypeColor = (type: string) => {
    return typeColors[type.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {bookmark.name}
          </h3>
          <p className="text-sm text-gray-500 truncate mb-3">{bookmark.url}</p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => openUrl(bookmark.url)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Open bookmark"
          >
            <ExternalLink size={18} />
          </button>
          <button
            onClick={() => copyToClipboard(bookmark.url)}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Copy URL"
          >
            <Copy size={18} />
          </button>
        </div>
      </div>

      {bookmark.types.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {bookmark.types.map((type, index) => (
              <button
                key={index}
                onClick={() => onTypeClick(type)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border cursor-pointer hover:opacity-80 transition-opacity ${getTypeColor(type)}`}
                title={`Filter by ${type}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {bookmark.notes && (
        <div className="mb-4">
          <div className="flex items-start gap-2">
            <FileText size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600 line-clamp-3">{bookmark.notes}</p>
          </div>
        </div>
      )}

      {bookmark.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Tag size={14} className="text-gray-400 mt-1 flex-shrink-0" />
          <div className="flex flex-wrap gap-1">
            {bookmark.tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => onTagClick(tag)}
                className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-colors cursor-pointer"
                title={`Filter by ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};