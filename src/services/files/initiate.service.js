const settings = require('../../settings/settings');
const { Method, Mode, ScriptType } = require('../../core/enums');
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
		this.validateBooleans();
		this.validateArrays();
		this.validateEnums();
		this.validateSpecial();
	}

	calculateSettings() {
		const { OUTER_APPLICATION_PATH, INNER_APPLICATION_PATH, APPLICATION_PATH, BACKUPS_PATH, DIST_PATH,
			NODE_MODULES_PATH, PACKAGE_JSON_PATH, PACKAGE_LOCK_JSON_PATH, DICTIONARIES_PATH } = settings;
		// ===DYNAMIC PATH=== //
		settings.APPLICATION_PATH = pathUtils.getJoinPath({ targetPath: OUTER_APPLICATION_PATH, targetName: APPLICATION_PATH });
		if (this.scriptType === ScriptType.BACKUP) {
			settings.BACKUPS_PATH = pathUtils.getJoinPath({ targetPath: OUTER_APPLICATION_PATH, targetName: BACKUPS_PATH });
		}
		settings.DIST_PATH = pathUtils.getJoinPath({ targetPath: INNER_APPLICATION_PATH, targetName: DIST_PATH });
		settings.NODE_MODULES_PATH = pathUtils.getJoinPath({ targetPath: INNER_APPLICATION_PATH, targetName: NODE_MODULES_PATH });
		settings.PACKAGE_JSON_PATH = pathUtils.getJoinPath({ targetPath: INNER_APPLICATION_PATH, targetName: PACKAGE_JSON_PATH });
		settings.PACKAGE_LOCK_JSON_PATH = pathUtils.getJoinPath({ targetPath: INNER_APPLICATION_PATH, targetName: PACKAGE_LOCK_JSON_PATH });
		settings.DICTIONARIES_PATH = pathUtils.getJoinPath({ targetPath: INNER_APPLICATION_PATH, targetName: DICTIONARIES_PATH });
	}

	validatePositiveNumbers() {
		[
			// ===LOG=== //
			'MAXIMUM_LOGS_COUNT_PER_FILE',
			// ===COUNT & LIMIT=== //
			'MAXIMUM_WORDS_SCAN_COUNT', 'MILLISECONDS_INTERVAL_COUNT', 'MAXIMUM_ITEM_NAME_PATH_CHARACTERS_DISPLAY_COUNT',
			'MAXIMUM_ITEMS_COUNT', 'MILLISECONDS_BETWEEN_ITEMS_DELAY_COUNT', 'MILLISECONDS_END_DELAY_COUNT',
			'MAXIMUM_URL_VALIDATION_COUNT', 'MILLISECONDS_TIMEOUT_URL_VALIDATION',
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
			'METHOD', 'MODE', 'SCAN_PATH',
			// ===ROOT PATH=== //
			'APPLICATION_NAME', 'OUTER_APPLICATION_PATH', 'INNER_APPLICATION_PATH',
			// ===DYNAMIC PATH=== //
			'APPLICATION_PATH', 'DIST_PATH', 'NODE_MODULES_PATH', 'PACKAGE_JSON_PATH',
			'PACKAGE_LOCK_JSON_PATH', 'DICTIONARIES_PATH',
			// ===VALIDATION=== //
			'VALIDATION_CONNECTION_LINK'
		].map(key => {
			const value = settings[key];
			if (!validationUtils.isExists(value)) {
				throw new Error(`Invalid or no ${key} parameter was found: Expected a string but received: ${value} (1000006)`);
			}
		});
	}

	validateBooleans() {
		[
			// ===LOG=== //
			'IS_LOG_RESULTS'
		].map(key => {
			const value = settings[key];
			if (!validationUtils.isValidBoolean(value)) {
				throw new Error(`Invalid or no ${key} parameter was found: Expected a boolean but received: ${value} (1000007)`);
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

	validateEnums() {
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
	}

	validateSpecial() {
		const { SCAN_PATH, VALIDATION_CONNECTION_LINK } = settings;
		// ===GENERAL=== //
		if (fileUtils.isFilePath(SCAN_PATH)) {
			throw new Error(`The path SCAN_PATH parameter needs to be a directory path but it's a file path: ${SCAN_PATH} (1000011)`);
		}
		// ===VALIDATION=== //
		if (!validationUtils.isValidLink(VALIDATION_CONNECTION_LINK)) {
			throw new Error('No VALIDATION_CONNECTION_LINK parameter was found (1000012)');
		}
	}

	validateDirectories() {
		const keys = this.scriptType === ScriptType.BACKUP ? ['BACKUPS_PATH'] : [];
		[
			...keys,
			// ===GENERAL=== //
			'SCAN_PATH',
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
			'DIST_PATH', 'NODE_MODULES_PATH', 'DICTIONARIES_PATH'
		].map(async (key) => {
			const value = settings[key];
			// Make sure that the dist directory exists, if not, create it.
			await fileUtils.createDirectory(value);
		});
	}
}

module.exports = new InitiateService();