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