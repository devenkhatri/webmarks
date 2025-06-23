export interface Bookmark {
  id: string;
  name: string;
  url: string;
  types: string[];
  notes: string;
  tags: string[];
}

export interface GoogleSheetsConfig {
  apiKey: string;
  spreadsheetId: string;
  range: string;
}

export type ViewMode = 'grid' | 'list' | 'table';

export type SortMode = 'none' | 'name-asc' | 'name-desc' | 'latest-first';