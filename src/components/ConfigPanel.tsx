import React, { useState } from 'react';
import { Settings, Eye, EyeOff, Info } from 'lucide-react';
import { GoogleSheetsConfig } from '../types';

interface ConfigPanelProps {
  onConfigSave: (config: GoogleSheetsConfig) => void;
  isOpen: boolean;
  onToggle: () => void;
  hasEnvConfig: boolean;
  hasStoredConfig: boolean;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ 
  onConfigSave, 
  isOpen, 
  onToggle, 
  hasEnvConfig,
  hasStoredConfig
}) => {
  const [apiKey, setApiKey] = useState('');
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [range, setRange] = useState('Sheet1!A:E');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey && spreadsheetId && range) {
      onConfigSave({ apiKey, spreadsheetId, range });
      onToggle();
    }
  };

  return (
    <>
      {!hasEnvConfig && (
        <button
          onClick={onToggle}
          className="fixed top-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-20"
          title="Configure Google Sheets"
        >
          <Settings size={20} />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Google Sheets Configuration</h2>
            
            {hasEnvConfig && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                <Info size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-800">
                  <p className="font-medium">Environment configuration detected</p>
                  <p>Using configuration from environment variables.</p>
                </div>
              </div>
            )}

            {!hasEnvConfig && hasStoredConfig && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Saved configuration found</p>
                  <p>Using previously saved configuration from localStorage.</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Sheets API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your API key"
                    required={!hasEnvConfig && !hasStoredConfig}
                    disabled={hasEnvConfig}
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={hasEnvConfig}
                  >
                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spreadsheet ID
                </label>
                <input
                  type="text"
                  value={spreadsheetId}
                  onChange={(e) => setSpreadsheetId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                  required={!hasEnvConfig && !hasStoredConfig}
                  disabled={hasEnvConfig}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Range
                </label>
                <input
                  type="text"
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Sheet1!A:E"
                  required={!hasEnvConfig && !hasStoredConfig}
                  disabled={hasEnvConfig}
                />
              </div>

              <div className="flex gap-3 pt-4">
                {!hasEnvConfig && (
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {hasStoredConfig ? 'Update' : 'Connect'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={onToggle}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  {hasEnvConfig ? 'Close' : 'Cancel'}
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Setup Instructions:</h3>
              <ol className="text-xs text-blue-800 space-y-1">
                <li>1. Enable Google Sheets API in Google Cloud Console</li>
                <li>2. Create API credentials (API Key)</li>
                <li>3. Make your Google Sheet publicly readable</li>
                <li>4. Copy the spreadsheet ID from the URL</li>
                <li>5. Set up environment variables for automatic configuration</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  );
};