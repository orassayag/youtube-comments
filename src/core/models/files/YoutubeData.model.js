import { PlaceholderEnum } from '../../enums';

class YouTubeDataModel {

	constructor(settings) {
		// Set the parameters from the settings file.
		const { VIDEO_ID, API_BASE_URL } = settings;
		this.apiKey = null;
		this.videoId = VIDEO_ID;
		this.apiBaseURL = API_BASE_URL;
		this.commentsIndex = null;
		this.commentsCount = null;
		this.videoDetailsQuery = `videos?part=statistics&id=${PlaceholderEnum.VIDEO_ID}&key=${PlaceholderEnum.KEY}`;
		this.videoCommentsQuery = `commentThreads?part=snippet&videoId=${PlaceholderEnum.VIDEO_ID}&maxResults=${PlaceholderEnum.MAX_RESULTS}&pageToken=${PlaceholderEnum.PAGE_TOKEN}&key=${PlaceholderEnum.KEY}`;
	}
}

export default YouTubeDataModel;