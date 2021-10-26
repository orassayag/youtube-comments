import path from 'path';
import { fileURLToPath } from 'url';
import { pathUtils } from '../utils';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const settings = {
    // ===GENERAL=== //
    // Determine the YouTube video Id from which to fetch all the comments. Example: 'y1STthONg-c'.
    VIDEO_ID: '',
    // Determine the YouTube's API base URL to call in order to get the comments.
    API_BASE_URL: 'https://www.googleapis.com/youtube/v3/',

    // ===LOG=== //
    // Determine the name of the resulting comments in the new TXT file in the 'dist' directory.
    DIST_FILE_NAME: 'comments',

    // ===COUNT & LIMIT=== //
    // Determine the total maximum comments count to fetch per session. If the limit exceeds, the application exits.
    MAXIMUM_COMMENTS_COUNT: 100000,
    // Determine the delay in milliseconds to pause between API calls to fetch comments.
    // Please note that the daily limit is 200,000 read operations.
    MILLISECONDS_FETCH_DELAY_COUNT: 1000,
    // Determine the maximum comments to fetch per API call. Minimum = 1; Maximum = 100 (YouTube API restrictions).
    MAXIMUM_FETCH_COMMENTS_COUNT: 100,
    // Determine the delay in milliseconds to pause before exiting the application in the end.
    MILLISECONDS_END_DELAY_COUNT: 1000,
    // Determine the number of retries to validate the URLs.
    MAXIMUM_URL_VALIDATION_COUNT: 5,
    // Determine the milliseconds count timeout to wait between URL validation retry.
    MILLISECONDS_TIMEOUT_URL_VALIDATION: 1000,

    // ===SOURCE=== //
    // Determine the path from which the YouTube API key will be fetched. Must be a JSON file,
    // and in the correct structure, as in the 'misc/examples/apiKey.json' file.
    API_KEY_PATH: pathUtils.getJoinPath({
        targetPath: __dirname,
        targetName: '../../../../../../Users/Or/Dropbox/accounts/youtube/apiKey.json'
    }),

    // ===ROOT PATH=== //
    // Determine the application name used for some of the calculated paths.
    APPLICATION_NAME: 'youtube-comments',
    // Determine the path for the outer application, where other directories located, such as backups, sources, etc...
    // (Working example: 'C:\\Or\\Web\\youtube-comments\\').
    OUTER_APPLICATION_PATH: pathUtils.getJoinPath({
        targetPath: __dirname,
        targetName: '../../../'
    }),
    // Determine the inner application path where all the source of the application is located.
    // (Working example: 'C:\\Or\\Web\\youtube-comments\\youtube-comments\\').
    INNER_APPLICATION_PATH: pathUtils.getJoinPath({
        targetPath: __dirname,
        targetName: '../../'
    }),

    // ===DYNAMIC PATH=== //
    // All these paths will be calculated during runtime in the initial service.
    // DON'T REMOVE THE KEYS, THEY WILL BE CALCULATED TO PATHS DURING RUNTIME.
    // Determine the application path where all the source of the application is located.
    // (Working example: 'C:\\Or\\Web\\youtube-comments\\youtube-comments').
    APPLICATION_PATH: 'youtube-comments',
    // Determine the backups directory which all the local backup will be created to.
    // (Working example: 'C:\\Or\\Web\\youtube-comments\\backups').
    BACKUPS_PATH: 'backups',
    // Determine the dist directory path which there, all the outcome of the logs will be created.
    // (Working example: 'C:\\Or\\Web\\youtube-comments\\youtube-comments\\dist').
    DIST_PATH: 'dist',
    // (Working example: 'C:\\Or\\Web\\youtube-comments\\youtube-comments\\node_modules').
    NODE_MODULES_PATH: 'node_modules',
    // (Working example: 'C:\\Or\\Web\\youtube-comments\\youtube-comments\\package.json').
    PACKAGE_JSON_PATH: 'package.json',
    // (Working example: 'C:\\Or\\Web\\youtube-comments\\youtube-comments\\package-lock.json').
    PACKAGE_LOCK_JSON_PATH: 'package-lock.json',

    // ===BACKUP=== //
    // Determine the directories to ignore when a backup copy is taking place.
    // For example: 'dist'.
    IGNORE_DIRECTORIES: ['.git', 'dist', 'node_modules', 'sources'],
    // Determine the files to ignore when the back copy is taking place.
    // For example: 'back_sources_tasks.txt'.
    IGNORE_FILES: [],
    // Determine the files to force include when the back copy is taking place.
    // For example: '.gitignore'.
    INCLUDE_FILES: ['.gitignore'],
    // Determine the period of time in milliseconds to
    // check that files were created / moved to the target path.
    MILLISECONDS_DELAY_VERIFY_BACKUP_COUNT: 1000,
    // Determine the number of times in loop to check for version of a backup.
    // For example, if a backup name 'test-test-test-1' exists, it will check for 'test-test-test-2',
    // and so on, until the current maximum number.
    BACKUP_MAXIMUM_DIRECTORY_VERSIONS_COUNT: 50,

    // ===VALIDATION=== //
    // Determine the link address to test the internet connection.
    VALIDATION_CONNECTION_LINK: 'google.com'
};

export default settings;