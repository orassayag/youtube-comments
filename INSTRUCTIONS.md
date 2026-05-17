# Setup and Usage Instructions

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Configuration](#configuration)
4. [Running Scripts](#running-scripts)
5. [Available Commands](#available-commands)
6. [Extending the Application](#extending-the-application)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)
9. [Documentation](#documentation)
10. [External Resources](#external-resources)

## Prerequisites

### System Requirements

- **Node.js**: Version 20.0.0 or higher
- **Package Manager**: npm or pnpm (>= 8.0.0)
- **Operating System**: Windows (optimized), macOS, or Linux
- **Network**: Stable internet connection for YouTube API access

### API Requirements

Before running the application, ensure you have:

- **YouTube API Key** (v3): Get one from [Google Cloud Console](https://console.cloud.google.com/)
- **API Enabled**: Ensure "YouTube Data API v3" is enabled in your GCP project

## Initial Setup

### 1. Install Dependencies

**Using npm:**

```bash
npm install
```

**Using pnpm:**

```bash
pnpm install
```

### 2. Project Initialization

1. Open the project in your IDE (VSCode recommended)
2. Follow the configuration steps below to set up your API key and video settings.

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

## Available Commands

### Development Commands

**Fetching and Extraction:**

```bash
# Start the main comment extraction process
npm start
```

**Backup and Maintenance:**

```bash
# Create a timestamped backup of the project
npm run backup my-backup-title

# Force stop all node processes (Windows)
npm run stop
```

**Testing:**

```bash
# Run the sandbox test environment
npm run sand
```

## Extending the Application

### Adding New Services

1. Create a new service file in `src/services/files/`.
2. Implement your logic as a class or a set of functions.
3. Export the service from `src/services/index.js` for project-wide availability.

### Defining New Models

1. Add new data structures to `src/core/models/files/`.
2. Use these models in your services and logics to maintain data consistency.

### Creating Utility Helpers

1. Place reusable, stateless functions in `src/utils/files/` grouped by domain (e.g., `date.utils.js`).
2. Export them through `src/utils/index.js`.

## Best Practices

- **Quota Management**: Always check your remaining Google Cloud quota if you plan to fetch comments from very large videos.
- **Error Tracking**: Use the unique error codes in the console output to quickly identify the source of failures in the `src/scripts/error.script.js`.
- **Environment Safety**: Regularly use the `npm run backup` command before making significant changes to the logic or structure.
- **Code Style**: Ensure new code follows the project's ESLint and Prettier configurations for consistency.

## Troubleshooting

### Issue: "Path not exists" error

**Solution:** Check that `API_KEY_PATH` in `settings.js` points to a valid JSON file.

### Issue: "Invalid api_key parameter"

**Solution:** Verify your API key is valid and has YouTube Data API v3 enabled in the Google Cloud Console.

### Issue: Writing comments not progressing

**Solution:**

- Check your internet connection.
- Verify the `VIDEO_ID` is correct.
- Ensure the video has comments enabled.
- Check if your API quota hasn't been exceeded for the day.

### Issue: Empty or missing comments

**Solution:**

- Verify the video has public comments.
- Check if comments are disabled or held for review on the video.
- Ensure your API key has the necessary permissions.

## Documentation

- **README.md**: High-level overview, architecture, and feature list.
- **INSTRUCTIONS.md**: Comprehensive setup, usage, and extension guide.
- **CHANGELOG.md**: History of changes and version updates.
- **CODE_OF_CONDUCT.md**: Guidelines for contributing and community interaction.

## External Resources

- [YouTube Data API v3 Reference](https://developers.google.com/youtube/v3/docs)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Node.js Documentation](https://nodejs.org/docs)
- [Axios HTTP Client](https://axios-http.com/docs/intro)

---

**Last Updated**: 2026-05-17
**Version**: 1.0.0

## Author

- **Or Assayag** - _Initial work_ - [orassayag](https://github.com/orassayag)
- Or Assayag <orassayag@gmail.com>
- GitHub: https://github.com/orassayag
- StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
- LinkedIn: https://linkedin.com/in/orassayag
