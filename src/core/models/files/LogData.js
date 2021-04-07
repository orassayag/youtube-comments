class LogData {

	constructor(settings) {
		// Set the parameters from the settings file.
		const { DIST_FILE_NAME } = settings;
		this.distFileName = DIST_FILE_NAME;
	}
}

module.exports = LogData;
/* 		const { IS_LOG_RESULTS, MAXIMUM_LOGS_COUNT_PER_FILE } = settings;
		this.isLogResults = IS_LOG_RESULTS;
		this.maximumLogsCountPerFile = MAXIMUM_LOGS_COUNT_PER_FILE; */