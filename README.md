# Webmarks

A modern, feature-rich webmark manager that connects to Google Sheets for seamless bookmark organization and management.

## ✨ Features

### 🔍 Advanced Search & Filtering
- **Real-time search** across webmark names, URLs, notes, types, and tags
- **Smart filtering** by webmark type and tags
- **Clickable tags and types** for instant filtering
- **Clear filters** functionality for easy reset

### 📊 Multiple View Modes
- **Grid View**: Beautiful card-based layout with hover animations
- **List View**: Compact list format for quick scanning
- **Table View**: Spreadsheet-like tabular display for detailed information

### 🔄 Flexible Sorting Options
- **Natural Order**: Display webmarks as they appear in your Google Sheet
- **A → Z**: Sort alphabetically by name (ascending)
- **Z → A**: Sort alphabetically by name (descending)
- **Latest First**: Reverse the natural order to show newest entries first

### 🏷️ Multi-Type Support
- **Comma-separated types**: Each webmark can have multiple types (e.g., "article,tutorial")
- **Clickable type badges**: Click any type to filter webmarks instantly
- **Color-coded types** for visual organization

### 🎨 Modern Design
- **Responsive design** that works on all devices
- **Color-coded webmark types** for visual organization
- **Smooth animations** and micro-interactions
- **Professional UI** with excellent contrast and typography
- **Loading states** and error handling

### 🔧 Flexible Configuration
- **Environment variables** support for easy deployment
- **localStorage persistence** - configuration saved automatically
- **Manual configuration** through settings panel
- **Secure API key handling** with visibility toggle
- **Customizable sheet range** selection

### 📱 User Experience
- **Copy to clipboard** functionality for URLs
- **External link opening** in new tabs
- **Tag and type-based navigation** with click-to-filter
- **Empty states** with helpful guidance
- **Error recovery** with retry functionality

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A Google account with access to Google Sheets
- Google Cloud Console access for API setup

### 1. Clone and Install
```bash
git clone <repository-url>
cd webmarks
npm install
```

### 2. Google Sheets API Setup

#### Enable Google Sheets API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Library"
4. Search for "Google Sheets API" and enable it
5. Go to "APIs & Services" > "Credentials"
6. Click "Create Credentials" > "API Key"
7. Copy your API key and restrict it to Google Sheets API for security

#### Prepare Your Google Sheet
1. Create a Google Sheet with the following columns:
   - **Column A**: Webmark Name
   - **Column B**: URL
   - **Column C**: Type (comma-separated for multiple types, e.g., "article,tutorial")
   - **Column D**: Notes
   - **Column E**: Tags (comma-separated)

2. Make your sheet publicly readable:
   - Click "Share" in the top-right corner
   - Change access to "Anyone with the link can view"
   - Copy the spreadsheet ID from the URL

### 3. Configuration

#### Option A: Environment Variables (Recommended)
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your configuration:
   ```env
   VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
   VITE_GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
   VITE_GOOGLE_SHEETS_RANGE=Sheet1!A:E
   ```

#### Option B: Manual Configuration (Saved Automatically)
1. Start the application
2. Click the settings (⚙️) button in the top-right corner
3. Enter your API key, spreadsheet ID, and range
4. Click "Connect"
5. Your configuration will be saved automatically in localStorage

### 4. Run the Application
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📋 Google Sheet Format

Your Google Sheet should follow this structure:

| Webmark Name | URL | Type | Notes | Tags |
|--------------|-----|------|-------|------|
| React Documentation | https://react.dev | documentation,reference | Official React docs | react,javascript,frontend |
| Tailwind CSS | https://tailwindcss.com | tool,framework | Utility-first CSS framework | css,styling,framework |
| MDN Web Docs | https://developer.mozilla.org | reference,documentation | Web development reference | javascript,html,css,reference |

### Supported Webmark Types
- `article` - Blog posts, articles
- `tool` - Development tools, utilities
- `tutorial` - Learning resources, guides
- `reference` - Documentation, references
- `documentation` - Official docs
- `inspiration` - Design inspiration, examples
- `news` - News articles, updates
- `video` - Video content, tutorials
- `course` - Online courses, learning materials

**Note**: You can assign multiple types to a single webmark by separating them with commas (e.g., "article,tutorial").

## 🎯 Usage Tips

### Effective Tagging and Typing
- Use consistent, lowercase tags and types
- Separate multiple items with commas
- Consider using categories like: `javascript`, `react`, `css`, `design`, `backend`
- Combine types for better categorization: `article,tutorial` or `tool,reference`

### Search Strategies
- Search across all fields simultaneously (name, URL, notes, types, tags)
- Use partial matches for flexible searching
- Combine search with filters for precise results

### View Modes
- **Grid View**: Best for browsing and visual organization
- **List View**: Ideal for quick scanning and mobile devices
- **Table View**: Perfect for detailed information review

### Sorting Options
- **Natural Order**: Maintains the order from your Google Sheet
- **A → Z / Z → A**: Alphabetical sorting by webmark name
- **Latest First**: Shows most recently added items first (reverse order)

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Lint Code
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## 🔒 Security Notes

- API keys are handled securely and never exposed in the client
- Configuration is saved locally using localStorage
- Restrict your Google Sheets API key to prevent unauthorized usage
- Consider using service accounts for production deployments
- Keep your `.env` file out of version control

## 🆕 Recent Updates

### Multi-Type Support
- Webmarks can now have multiple types separated by commas
- All type badges are clickable for instant filtering
- Enhanced filtering logic to handle multiple types per webmark

### Persistent Configuration
- Configuration is automatically saved to localStorage
- No need to re-enter settings on the same device
- Supports environment variables, manual config, and stored config priority

### Advanced Sorting
- Four sorting options: Natural Order, A→Z, Z→A, Latest First
- Sort indicator shows current sorting method
- Maintains filter state while sorting

### Enhanced User Experience
- Improved visual feedback for clickable elements
- Better responsive design across all view modes
- Enhanced error handling and loading states

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**"Failed to fetch webmarks"**
- Verify your API key is correct and has Google Sheets API access
- Ensure your spreadsheet is publicly readable
- Check that the spreadsheet ID and range are correct

**"No webmarks found"**
- Verify your sheet has data in the specified range
- Check that column headers match the expected format
- Ensure the first row contains headers, not data

**Configuration Issues**
- Check if configuration is saved in localStorage (look for "Saved config" indicator)
- Try clearing localStorage and reconfiguring if issues persist
- Verify environment variables are properly set if using .env file

**API Key Issues**
- Make sure the API key is restricted to Google Sheets API only
- Verify the key hasn't been regenerated or disabled
- Check Google Cloud Console for any usage limits

### Getting Help
- Check the browser console for detailed error messages
- Verify your Google Sheet structure matches the expected format
- Ensure all environment variables are properly set
- Clear browser cache and localStorage if experiencing persistent issues

---

Built with ❤️ using React, TypeScript, and Tailwind CSS