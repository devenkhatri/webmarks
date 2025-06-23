import React from 'react';
import { ExternalLink, Copy, Tag, FileText } from 'lucide-react';
import { Bookmark } from '../types';

interface BookmarkListProps {
  bookmarks: Bookmark[];
  onTagClick: (tag: string) => void;
  onTypeClick: (type: string) => void;
}

const typeColors: Record<string, string> = {
  'article': 'bg-blue-100 text-blue-800',
  'tool': 'bg-green-100 text-green-800',
  'tutorial': 'bg-purple-100 text-purple-800',
  'reference': 'bg-orange-100 text-orange-800',
  'documentation': 'bg-gray-100 text-gray-800',
  'inspiration': 'bg-pink-100 text-pink-800',
  'news': 'bg-red-100 text-red-800',
  'video': 'bg-indigo-100 text-indigo-800',
  'course': 'bg-yellow-100 text-yellow-800',
};

export const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, onTagClick, onTypeClick }) => {
  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('Failed to copy URL');
    }
  };

  const getTypeColor = (type: string) => {
    return typeColors[type.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 p-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                  {bookmark.name}
                </h3>
                {bookmark.types.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {bookmark.types.map((type, index) => (
                      <button
                        key={index}
                        onClick={() => onTypeClick(type)}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity ${getTypeColor(type)}`}
                        title={`Filter by ${type}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-500 mb-2 truncate">{bookmark.url}</p>
              
              {bookmark.notes && (
                <div className="flex items-start gap-2 mb-2">
                  <FileText size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 line-clamp-2">{bookmark.notes}</p>
                </div>
              )}
              
              {bookmark.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-gray-400 flex-shrink-0" />
                  <div className="flex flex-wrap gap-1">
                    {bookmark.tags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => onTagClick(tag)}
                        className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded hover:bg-blue-100 hover:text-blue-800 transition-colors cursor-pointer"
                        title={`Filter by ${tag}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => openUrl(bookmark.url)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Open bookmark"
              >
                <ExternalLink size={16} />
              </button>
              <button
                onClick={() => copyToClipboard(bookmark.url)}
                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Copy URL"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};