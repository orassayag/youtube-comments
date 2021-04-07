const { Placeholder } = require('../../enums');

class YouTubeData {

	constructor(settings) {
		// Set the parameters from the settings file.
		const { VIDEO_ID, API_BASE_URL } = settings;
		this.apiKey = null;
		this.videoId = VIDEO_ID;
		this.apiBaseURL = API_BASE_URL;
		this.commentsIndex = null;
		this.commentsCount = null;
		this.videoDetailsQuery = `videos?part=statistics&id=${Placeholder.VIDEO_ID}&key=${Placeholder.KEY}`;
		this.videoCommentsQuery = `commentThreads?part=snippet&videoId=${Placeholder.VIDEO_ID}&maxResults=${Placeholder.MAX_RESULTS}&pageToken=${Placeholder.PAGE_TOKEN}&key=${Placeholder.KEY}`;
	}
}

module.exports = YouTubeData;
/* 		this.pageToken = ''; */
/* 		this.validateVideoIdQuery = `videos?part=${Placeholder.PART}&id=${Placeholder.VIDEO_ID}&key=${Placeholder.KEY}`;
		this.fetchCommentsQuery = `commentThreads?part=${Placeholder.PART}&videoId=${Placeholder.VIDEO_ID}&maxResults=${Placeholder.MAX_RESULTS}&key=${Placeholder.KEY}&pageToken=${Placeholder.PAGE_TOKEN}`; */
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