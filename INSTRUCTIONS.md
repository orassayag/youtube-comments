# Instructions

## Setup Instructions

1. Open the project in your IDE (VSCode recommended)
2. Install dependencies:
   ```bash
   npm install
   ```

## Prerequisites

Before running the application, ensure you have:
- **YouTube API Key** (v3): Get one from [Google Cloud Console](https://console.cloud.google.com/)
- **Node.js** (v14 or higher)
- **Internet connection** for API calls

## Configuration

1. **Create API Key File**
   
   Create a JSON file with your YouTube API key. Use the example format in `misc/examples/apiKey.json`:
   ```json
   {
     "api_key": "YOUR_YOUTUBE_API_KEY_HERE"
   }
   ```

2. **Configure Settings**
   
   Open `src/settings/settings.js` and update:
   - `VIDEO_ID`: YouTube video ID to fetch comments from (e.g., 'y1STthONg-c')
   - `API_KEY_PATH`: Path to your API key JSON file
   - `DIST_FILE_NAME`: Output filename (default: 'comments')
   - `MAXIMUM_COMMENTS_COUNT`: Max comments to fetch (default: 100000)
   - `MILLISECONDS_FETCH_DELAY_COUNT`: Delay between API calls in ms (default: 1000)
   - `MAXIMUM_FETCH_COMMENTS_COUNT`: Comments per API call (max: 100)

## Running Scripts

### Fetch Comments
Fetches all comments from the configured YouTube video:
```bash
npm start
```

**What it does:**
1. Validates internet connection
2. Loads YouTube API key from external file
3. Validates the video ID exists
4. Fetches all comments with pagination
5. Saves comments to a TXT file in the `dist` directory

**Expected output:**
```
===IMPORTANT SETTINGS===
VIDEO_ID: y1STthONg-c
API_BASE_URL: https://www.googleapis.com/youtube/v3/
DIST_FILE_NAME: comments
MAXIMUM_COMMENTS_COUNT: 100000
MILLISECONDS_FETCH_DELAY_COUNT: 1000
MAXIMUM_FETCH_COMMENTS_COUNT: 100
========================
OK to run? (y = yes)
y
===VALIDATE GENERAL SETTINGS===
===INITIATE THE SERVICES===
===FETCH COMMENTS===
===Writing comments: 11,201/16,993 | 65.92%===
===EXIT: FINISH===
```

### Create Backup
Creates a timestamped backup of the project:
```bash
npm run backup your-backup-title
```

**What it does:**
- Creates a backup directory in the backups folder
- Excludes node_modules, dist, and .git directories
- Includes all source code and configuration files

### Stop Execution
Forcefully stops all Node.js processes (Windows only):
```bash
npm run stop
```

## File Structure

### Source Files (`src/`)
- `scripts/` - Main entry point scripts
- `logics/` - Business logic for comments and backup
- `services/` - Service layer (YouTube API, validation, logging, etc.)
- `core/` - Models and enums
- `utils/` - Utility functions
- `settings/` - Configuration file

### Output Files (`dist/`)
Generated comment files are placed here with the configured filename.

### Backup Files (`backups/`)
Project backups are stored here with automatic versioning.

## Error Codes

All errors include a unique code (1000001-1000099) for easy troubleshooting:
- **1000001-1000002**: Backup errors
- **1000013-1000027**: YouTube API and comment fetching errors

## API Rate Limits

YouTube Data API v3 has a daily quota limit of **200,000 read operations**. Each comment fetch API call consumes quota units:
- Video details: 1 unit
- Comment threads list: 1 unit per request

To stay within limits:
1. Adjust `MILLISECONDS_FETCH_DELAY_COUNT` to add delays between requests
2. Use `MAXIMUM_COMMENTS_COUNT` to limit total comments fetched
3. Monitor your quota in Google Cloud Console

## Troubleshooting

### Issue: "Path not exists" error
**Solution:** Check that `API_KEY_PATH` in settings.js points to a valid JSON file

### Issue: "Invalid api_key parameter"
**Solution:** Verify your API key is valid and has YouTube Data API v3 enabled

### Issue: Writing comments not progressing
**Solution:** 
- Check internet connection
- Verify video ID is correct
- Ensure video has comments enabled
- Check API quota hasn't been exceeded

### Issue: Empty or missing comments
**Solution:**
- Verify the video has public comments
- Check if comments are disabled on the video
- Ensure API key has proper permissions

## Notes

- The application requires an internet connection to fetch comments from YouTube
- Ensure proper file permissions for reading API key file and writing to dist directory
- All output files use UTF-8 encoding
- Comments are fetched in their original language and format

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag