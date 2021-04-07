const settings = require('../../settings/settings');
const { /* Method, Mode,  */ScriptType } = require('../../core/enums');
const globalUtils = require('../../utils/files/global.utils');
const { fileUtils, pathUtils, validationUtils } = require('../../utils');

class InitiateService {

	constructor() {
		this.scriptType = null;
	}

	initiate(scriptType) {
		// First, setup handles errors and promises.
		this.setup();
		// Validate the script type.
		this.scriptType = scriptType;
		this.validateScriptType();
		// The second important thing to do is to validate all the parameters of the settings.js file.
		this.validateSettings();
		// The next thing is to calculate paths and inject back to the settings.js file.
		this.calculateSettings();
		// Make sure that the dist directory exists. If not, create it.
		this.validateDirectories();
		// Validate that certain directories exist, and if not, create them.
		this.createDirectories();
	}

	setup() {
		// Handle any uncaughtException error.
		process.on('uncaughtException', (error) => {
			process.stdout.write('\n\r');
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			console.log(error);
		});
		// Handle any unhandledRejection promise error.
		process.on('unhandledRejection', (reason, promise) => {
			process.stdout.write('\n\r');
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			console.log(reason);
			console.log(promise);
		});
		// Handle ctrl+v keys.
		process.on('SIGINT', () => {
			process.stdout.write('\n\r');
			process.exit(0);
		});
	}

	validateScriptType() {
		if (!this.scriptType || !validationUtils.isValidEnum({
			enum: ScriptType,
			value: this.scriptType
		})) {
			throw new Error('Invalid or no ScriptType parameter was found (1000003)');
		}
	}

	validateSettings() {
		// Validate the settings object existence.
		if (!settings) {
			throw new Error('Invalid or no settings object was found (1000004)');
		}
		this.validatePositiveNumbers();
		this.validateStrings();
		this.validateArrays();
		this.validateSpecial();
	}

	calculateSettings() {
		const { OUTER_APPLICATION_PATH, INNER_APPLICATION_PATH, APPLICATION_PATH, BACKUPS_PATH, DIST_PATH,
			NODE_MODULES_PATH, PACKAGE_JSON_PATH, PACKAGE_LOCK_JSON_PATH } = settings;
		// ===DYNAMIC PATH=== //
		settings.APPLICATION_PATH = pathUtils.getJoinPath({ targetPath: OUTER_APPLICATION_PATH, targetName: APPLICATION_PATH });
		if (this.scriptType === ScriptType.BACKUP) {
			settings.BACKUPS_PATH = pathUtils.getJoinPath({ targetPath: OUTER_APPLICATION_PATH, targetName: BACKUPS_PATH });
		}
		settings.DIST_PATH = pathUtils.getJoinPath({ targetPath: INNER_APPLICATION_PATH, targetName: DIST_PATH });
		settings.NODE_MODULES_PATH = pathUtils.getJoinPath({ targetPath: INNER_APPLICATION_PATH, targetName: NODE_MODULES_PATH });
		settings.PACKAGE_JSON_PATH = pathUtils.getJoinPath({ targetPath: INNER_APPLICATION_PATH, targetName: PACKAGE_JSON_PATH });
		settings.PACKAGE_LOCK_JSON_PATH = pathUtils.getJoinPath({ targetPath: INNER_APPLICATION_PATH, targetName: PACKAGE_LOCK_JSON_PATH });
	}

	validatePositiveNumbers() {
		[
			// ===COUNT & LIMIT=== //
			'MAXIMUM_COMMENTS_COUNT', 'MILLISECONDS_FETCH_DELAY_COUNT', 'MAXIMUM_FETCH_COMMENTS_COUNT',
			'MILLISECONDS_END_DELAY_COUNT', 'MAXIMUM_URL_VALIDATION_COUNT', 'MILLISECONDS_TIMEOUT_URL_VALIDATION',
			// ===BACKUP=== //
			'MILLISECONDS_DELAY_VERIFY_BACKUP_COUNT', 'BACKUP_MAXIMUM_DIRECTORY_VERSIONS_COUNT'
		].map(key => {
			const value = settings[key];
			if (!validationUtils.isPositiveNumber(value)) {
				throw new Error(`Invalid or no ${key} parameter was found: Expected a number but received: ${value} (10000005)`);
			}
		});
	}

	validateStrings() {
		const keys = this.scriptType === ScriptType.BACKUP ? ['BACKUPS_PATH'] : [];
		[
			...keys,
			// ===GENERAL=== //
			'VIDEO_ID', 'API_BASE_URL',
			// ===LOG=== //
			'DIST_FILE_NAME',
			// ===SOURCE=== //
			'API_KEY_PATH',
			// ===ROOT PATH=== //
			'APPLICATION_NAME', 'OUTER_APPLICATION_PATH', 'INNER_APPLICATION_PATH',
			// ===DYNAMIC PATH=== //
			'APPLICATION_PATH', 'DIST_PATH', 'NODE_MODULES_PATH', 'PACKAGE_JSON_PATH',
			'PACKAGE_LOCK_JSON_PATH',
			// ===VALIDATION=== //
			'VALIDATION_CONNECTION_LINK'
		].map(key => {
			const value = settings[key];
			if (!validationUtils.isExists(value)) {
				throw new Error(`Invalid or no ${key} parameter was found: Expected a string but received: ${value} (1000006)`);
			}
		});
	}

	validateArrays() {
		[
			// ===BACKUP=== //
			'IGNORE_DIRECTORIES', 'IGNORE_FILES', 'INCLUDE_FILES'
		].map(key => {
			const value = settings[key];
			if (!validationUtils.isValidArray(value)) {
				throw new Error(`Invalid or no ${key} parameter was found: Expected a array but received: ${value} (1000008)`);
			}
		});
	}

	validateSpecial() {
		const { VIDEO_ID, MAXIMUM_FETCH_COMMENTS_COUNT } = settings;
		// ===GENERAL=== //
		if (!validationUtils.isValidYouTubeId(VIDEO_ID)) {
			throw new Error(`Invalid or no VIDEO_ID parameter was found: Expected a YouTube video Id but received: ${VIDEO_ID} (1000008)`);
		}
		// ===COUNT & LIMIT=== //
		if (MAXIMUM_FETCH_COMMENTS_COUNT <= 0 || MAXIMUM_FETCH_COMMENTS_COUNT > 100) {
			throw new Error(`Invalid or no MAXIMUM_FETCH_COMMENTS_COUNT parameter was found: Needs to be between 1 to 100 ${VIDEO_ID} (1000008)`);
		}
		[
			// ===GENERAL=== //
			'API_BASE_URL',
			// ===VALIDATION=== //
			'VALIDATION_CONNECTION_LINK'
		].map(key => {
			const value = settings[key];
			if (!validationUtils.isValidLink(value)) {
				throw new Error(`Invalid or no ${key} parameter was found: Expected a URL but received: ${value} (1000008)`);
			}
		});
	}

	validateDirectories() {
		const keys = this.scriptType === ScriptType.BACKUP ? ['BACKUPS_PATH'] : [];
		[
			...keys,
			// ===ROOT PATH=== //
			'OUTER_APPLICATION_PATH', 'INNER_APPLICATION_PATH',
			// ===DYNAMIC PATH=== //
			'APPLICATION_PATH', 'PACKAGE_JSON_PATH'
		].map(key => {
			const value = settings[key];
			// Verify that the dist and the sources paths exist.
			globalUtils.isPathExistsError(value);
			// Verify that the dist and the sources paths are accessible.
			globalUtils.isPathAccessible(value);
		});
		[
			...keys,
			// ===ROOT PATH=== //
			'OUTER_APPLICATION_PATH', 'INNER_APPLICATION_PATH'
		].map(key => {
			const value = settings[key];
			// Verify that the paths are of directory and not a file.
			if (!fileUtils.isDirectoryPath(value)) {
				throw new Error(`The parameter path ${key} marked as directory but it's a path of a file: ${value} (1000013)`);
			}
		});
	}

	createDirectories() {
		[
			// ===DYNAMIC PATH=== //
			'DIST_PATH', 'NODE_MODULES_PATH'
		].map(key => {
			const value = settings[key];
			// Make sure that the dist directory exists, if not, create it.
			fileUtils.createDirectory(value);
		});
	}
}

module.exports = new InitiateService();
/* 		console.log('1')	; */
/* 			// ===GENERAL=== // */
/* 	createDirectories() {
		[
			// ===DYNAMIC PATH=== //
			'DIST_PATH', 'NODE_MODULES_PATH'
		].map(async (key) => {
			const value = settings[key];
			// Make sure that the dist directory exists, if not, create it.
			await fileUtils.createDirectory(value);
		});
	} */
/* 		// Handle any uncaughtException error.
		process.on('uncaughtException', (error) => {
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			console.log(error);
			process.exit(0);
		});
		// Handle any unhandledRejection promise error.
		process.on('unhandledRejection', (reason, promise) => {
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			console.log(reason);
			console.log(promise);
			process.exit(0);
		}); */
		/* , API_KEY_PATH  */
/* 		// ===SOURCE=== //
		if (!fileUtils.isFilePath(API_KEY_PATH)) {
			throw new Error(`The path API_KEY_PATH parameter needs to be a file path but it's a directory path: ${API_KEY_PATH} (1000011)`);
		} */
/* 	  // ===GENERAL=== //
// Determine the YouTube video Id from which to fetch all the comments.
VIDEO_ID: '',
// Determine the YouTube's API base URL to call in order to get the comments.
API_BASE_URL: 'https://www.googleapis.com/youtube/v3/',

// ===LOG=== //
// Determine the name of the resulting comments new TXT file in the 'dist' directory.
DIST_FILE_NAME: 'comments-',

// ===COUNT & LIMIT=== //
// Determine the total maximum comments count to fetch per session. If the limit exceeds, the application exits.
MAXIMUM_COMMENTS_COUNT: 100000,
// Determine the delay in milliseconds to pause between API calls to fetch comments.
MILLISECONDS_FETCH_DELAY_COUNT: 1000,
// Determine the maximum comments to fetch per API call.
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
	targetName: '../../../../../../Users/Or/Dropbox/accounts/youtube/apikey.json'
}), */

/* 			// ===LOG=== // */
/* SCAN_PATH,  */
/* 		this.validateBooleans(); */
/* 		this.validateEnums(); */
/* , DICTIONARIES_PATH */
/* 		settings.DICTIONARIES_PATH = pathUtils.getJoinPath({ targetPath: INNER_APPLICATION_PATH, targetName: DICTIONARIES_PATH }); */
/* 	validateBooleans() {
	[
		// ===LOG=== //
		'IS_LOG_RESULTS'
	].map(key => {
		const value = settings[key];
		if (!validationUtils.isValidBoolean(value)) {
			throw new Error(`Invalid or no ${key} parameter was found: Expected a boolean but received: ${value} (1000007)`);
		}
	});
} */

/* 	validateEnums() {
		const { METHOD, MODE } = settings;
		// ===GENERAL=== //
		if (!validationUtils.isValidEnum({
			enum: Method,
			value: METHOD
		})) {
			throw new Error('Invalid or no METHOD parameter was found (1000009)');
		}
		if (!validationUtils.isValidEnum({
			enum: Mode,
			value: MODE
		})) {
			throw new Error('Invalid or no MODE parameter was found (1000010)');
		}
	} */

/* 'DICTIONARIES_PATH', */
/* 			'METHOD', 'MODE', 'SCAN_PATH', */
/* , 'DICTIONARIES_PATH' */
/* 			'SCAN_PATH', */
/* 			'MAXIMUM_LOGS_COUNT_PER_FILE', */
/* 			'MAXIMUM_WORDS_SCAN_COUNT', 'MILLISECONDS_INTERVAL_COUNT', 'MAXIMUM_ITEM_NAME_PATH_CHARACTERS_DISPLAY_COUNT',
			'MAXIMUM_ITEMS_COUNT', 'MILLISECONDS_BETWEEN_ITEMS_DELAY_COUNT', */