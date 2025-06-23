import React from 'react';
import { ExternalLink, Copy, Tag } from 'lucide-react';
import { Bookmark } from '../types';

interface BookmarkTableProps {
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

export const BookmarkTable: React.FC<BookmarkTableProps> = ({ bookmarks, onTagClick, onTypeClick }) => {
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Types
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tags
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookmarks.map((bookmark) => (
              <tr key={bookmark.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                    {bookmark.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 max-w-xs truncate">
                    {bookmark.url}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {bookmark.types.map((type, index) => (
                      <button
                        key={index}
                        onClick={() => onTypeClick(type)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity ${getTypeColor(type)}`}
                        title={`Filter by ${type}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 max-w-xs line-clamp-2">
                    {bookmark.notes}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {bookmark.tags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => onTagClick(tag)}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded hover:bg-blue-100 hover:text-blue-800 transition-colors cursor-pointer"
                        title={`Filter by ${tag}`}
                      >
                        <Tag size={10} className="mr-1" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openUrl(bookmark.url)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                      title="Open bookmark"
                    >
                      <ExternalLink size={16} />
                    </button>
                    <button
                      onClick={() => copyToClipboard(bookmark.url)}
                      className="text-green-600 hover:text-green-900 transition-colors"
                      title="Copy URL"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};