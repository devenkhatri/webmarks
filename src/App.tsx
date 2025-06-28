import React, { useState, useMemo } from 'react';
import { BookmarkIcon, AlertCircle, RefreshCw } from 'lucide-react';
import { useGoogleSheets, saveConfigToStorage, getInitialConfig } from './hooks/useGoogleSheets';
import { BookmarkCard } from './components/BookmarkCard';
import { BookmarkList } from './components/BookmarkList';
import { BookmarkTable } from './components/BookmarkTable';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { ViewModeToggle } from './components/ViewModeToggle';
import { SortControls } from './components/SortControls';
import { ConfigPanel } from './components/ConfigPanel';
import { EmptyState } from './components/EmptyState';
import { LoadingSpinner } from './components/LoadingSpinner';
import { GoogleSheetsConfig, ViewMode, SortMode } from './types';

function App() {
  const [config, setConfig] = useState<GoogleSheetsConfig | null>(getInitialConfig());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [configPanelOpen, setConfigPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortMode, setSortMode] = useState<SortMode>('latest-first');

  const { bookmarks, loading, error, refetch } = useGoogleSheets(config);

  const filteredAndSortedBookmarks = useMemo(() => {
    let filtered = bookmarks.filter(bookmark => {
      const matchesSearch = searchQuery === '' || 
        bookmark.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        bookmark.types.some(type => type.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = selectedType === '' || bookmark.types.includes(selectedType);
      const matchesTag = selectedTag === '' || bookmark.tags.includes(selectedTag);

      return matchesSearch && matchesType && matchesTag;
    });

    // Apply sorting
    switch (sortMode) {
      case 'name-asc':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'latest-first':
        filtered = [...filtered].reverse();
        break;
      case 'none':
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [bookmarks, searchQuery, selectedType, selectedTag, sortMode]);

  const allTypes = useMemo(() => {
    const types = [...new Set(bookmarks.flatMap(b => b.types).filter(Boolean))];
    return types.sort();
  }, [bookmarks]);

  const allTags = useMemo(() => {
    const tags = [...new Set(bookmarks.flatMap(b => b.tags))];
    return tags.sort();
  }, [bookmarks]);

  const handleConfigSave = (newConfig: GoogleSheetsConfig) => {
    setConfig(newConfig);
    saveConfigToStorage(newConfig);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedTag('');
  };

  const renderBookmarks = () => {
    switch (viewMode) {
      case 'list':
        return <BookmarkList bookmarks={filteredAndSortedBookmarks} onTagClick={handleTagClick} onTypeClick={handleTypeClick} />;
      case 'table':
        return <BookmarkTable bookmarks={filteredAndSortedBookmarks} onTagClick={handleTagClick} onTypeClick={handleTypeClick} />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedBookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} onTagClick={handleTagClick} onTypeClick={handleTypeClick} />
            ))}
          </div>
        );
    }
  };

  // Show config panel if no environment config and no manual config and no stored config
  const hasEnvConfig = !!getInitialConfig() && !!getInitialConfig()?.apiKey && !!getInitialConfig()?.spreadsheetId;
  const hasStoredConfig = !!getInitialConfig() && !getInitialConfig()?.apiKey && !!getInitialConfig()?.spreadsheetId;
  if (!hasEnvConfig && !config && !hasStoredConfig) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ConfigPanel
          onConfigSave={handleConfigSave}
          isOpen={configPanelOpen}
          onToggle={() => setConfigPanelOpen(!configPanelOpen)}
          hasEnvConfig={hasEnvConfig}
          hasStoredConfig={hasStoredConfig}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookmarkIcon className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Webmarks</h1>
            </div>
            <p className="text-lg text-gray-600">
              Organize and search your webmarks from Google Sheets
            </p>
          </div>
          <EmptyState onConfigOpen={() => setConfigPanelOpen(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ConfigPanel
        onConfigSave={handleConfigSave}
        isOpen={configPanelOpen}
        onToggle={() => setConfigPanelOpen(!configPanelOpen)}
        hasEnvConfig={hasEnvConfig}
        hasStoredConfig={hasStoredConfig}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookmarkIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Webmarks</h1>
          </div>
          <p className="text-lg text-gray-600">
            {bookmarks.length} webmarks from your Google Sheet
            {hasEnvConfig && (
              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Auto-configured
              </span>
            )}
            {!hasEnvConfig && hasStoredConfig && (
              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Saved config
              </span>
            )}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-800 font-medium">Error loading webmarks</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
            <button
              onClick={refetch}
              className="px-3 py-1.5 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors flex items-center gap-1"
            >
              <RefreshCw size={14} />
              Retry
            </button>
          </div>
        )}

        {bookmarks.length > 0 && (
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 w-full sm:max-w-md">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search webmarks by name, URL, notes, types, or tags..."
                />
              </div>
              <div className="flex gap-4 items-center">
                <SortControls currentSort={sortMode} onSortChange={setSortMode} />
                <ViewModeToggle currentView={viewMode} onViewChange={setViewMode} />
              </div>
            </div>
            
            <FilterBar
              types={allTypes}
              tags={allTags}
              selectedType={selectedType}
              selectedTag={selectedTag}
              onTypeChange={setSelectedType}
              onTagChange={setSelectedTag}
            />

            {(selectedTag || selectedType || searchQuery) && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Active filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Search: "{searchQuery}"
                  </span>
                )}
                {selectedType && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Type: {selectedType}
                  </span>
                )}
                {selectedTag && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Tag: {selectedTag}
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium text-xs"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : filteredAndSortedBookmarks.length > 0 ? (
          <>
            <div className="mb-6 text-sm text-gray-600">
              Showing {filteredAndSortedBookmarks.length} of {bookmarks.length} webmarks
              {sortMode !== 'none' && (
                <span className="ml-2 text-gray-500">
                  (sorted by {sortMode === 'name-asc' ? 'A→Z' : sortMode === 'name-desc' ? 'Z→A' : 'latest first'})
                </span>
              )}
            </div>
            {renderBookmarks()}
          </>
        ) : searchQuery || selectedType || selectedTag ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookmarkIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No webmarks found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookmarkIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No webmarks yet</h3>
            <p className="text-gray-600">
              Add some webmarks to your Google Sheet to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;