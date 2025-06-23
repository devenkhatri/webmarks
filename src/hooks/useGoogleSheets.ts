import { useState, useEffect } from 'react';
import { Bookmark, GoogleSheetsConfig } from '../types';

declare global {
  interface Window {
    gapi: any;
  }
}

const CONFIG_STORAGE_KEY = 'webmarks-config';

const getConfigFromEnv = (): GoogleSheetsConfig | null => {
  const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  const spreadsheetId = import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID;
  const range = import.meta.env.VITE_GOOGLE_SHEETS_RANGE || 'Sheet1!A:E';

  if (apiKey && spreadsheetId) {
    return { apiKey, spreadsheetId, range };
  }
  
  return null;
};

const getConfigFromStorage = (): GoogleSheetsConfig | null => {
  try {
    const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const getInitialConfig = (): GoogleSheetsConfig | null => {
  return getConfigFromEnv() || getConfigFromStorage();
};

const saveConfigToStorage = (config: GoogleSheetsConfig) => {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save config to localStorage:', err);
  }
};

export { saveConfigToStorage, getInitialConfig };

export const useGoogleSheets = (config: GoogleSheetsConfig | null) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeGapi = async () => {
      if (!window.gapi) return;
      
      try {
        await new Promise((resolve) => {
          window.gapi.load('client', resolve);
        });
        
        setInitialized(true);
      } catch (err) {
        setError('Failed to initialize Google API');
      }
    };

    initializeGapi();
  }, []);

  const fetchBookmarks = async () => {
    if (!config || !initialized) return;
    
    setLoading(true);
    setError(null);

    try {
      await window.gapi.client.init({
        apiKey: config.apiKey,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      });

      const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: config.spreadsheetId,
        range: config.range,
      });

      const rows = response.result.values || [];
      const headers = rows[0] || [];
      const data = rows.slice(1);

      const formattedBookmarks: Bookmark[] = data.map((row: string[], index: number) => ({
        id: `bookmark-${index}`,
        name: row[0] || '',
        url: row[1] || '',
        types: row[2] ? row[2].split(',').map(type => type.trim()).filter(Boolean) : [],
        notes: row[3] || '',
        tags: row[4] ? row[4].split(',').map(tag => tag.trim()).filter(Boolean) : [],
      }));

      setBookmarks(formattedBookmarks);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (config && initialized) {
      fetchBookmarks();
    }
  }, [config, initialized]);

  return { 
    bookmarks, 
    loading, 
    error, 
    refetch: fetchBookmarks,
    hasEnvConfig: !!getConfigFromEnv(),
    hasStoredConfig: !!getConfigFromStorage()
  };
};