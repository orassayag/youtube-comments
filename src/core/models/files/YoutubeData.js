class YoutubeData {

	constructor(data) {
		// Set the parameters from the settings file.
		const { settings } = data;
		this.apiKey = null;
		this.videoId = null;
		this.apiBaseURL = null;
		this.validateVideoIdQuery = 'videos?part=#PART#&id=#VIDEO_ID#&key=#KEY#';
		this.fetchCommentsQuery = 'commentThreads?part=#PART#&videoId=#VIDEO_ID#&maxResults=#MAX_RESULTS#&key=#KEY#&pageToken=#PAGE_TOKEN#';
	}
}

module.exports = YoutubeData;

/* const { timeUtils } = require('../../../utils'); */
/* 		const { METHOD, MODE, SCAN_PATH, VALIDATION_CONNECTION_LINK } = settings;
		this.method = METHOD;
		this.mode = MODE;
		this.scanPath = SCAN_PATH;
		this.validationConnectionLink = VALIDATION_CONNECTION_LINK;
		this.status = status;
		this.startDateTime = null;
		this.time = null;
		this.logDateTime = timeUtils.getFullDateNoSpaces();
		this.itemIndex = 0;
		this.itemName = null;
		this.itemDirectoryPath = null;
		this.itemCheckResult = null; */