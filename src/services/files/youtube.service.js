const { YouTubeData } = require('../../core/models');
const { Placeholder } = require('../../core/enums');
const axiosService = require('./axios.service');
const countLimitService = require('./countLimit.service');
const logService = require('./log.service');
const pathService = require('./path.service');
const globalUtils = require('../../utils/files/global.utils');
const { fileUtils, pathUtils, textUtils, validationUtils } = require('../../utils');

class YoutubeService {

    constructor() {
        this.youtubeData = null;
    }

    initiate(settings) {
        this.youtubeData = new YouTubeData(settings);
    }

    async logComments() {
        // First, get the API key from the external source JSON file.
        await this.getAPIKey({
            path: pathService.pathData.apiKeyPath,
            parameterName: 'API_KEY_PATH',
            fileExtension: '.json'
        });
        // Second, validate the YouTube video Id.
        const videoDetails = await this.validateVideoId();
        // Next, get the expected total comments count.
        this.getCommentsCount(videoDetails);
        // Then, fetch the comments and log them into a TXT file,
        // And finnally, return the result - If limit is exceeded or not.
        return await this.fetchComments();
    }

    async getAPIKey(data) {
        const { path, parameterName, fileExtension } = data;
        if (!await fileUtils.isPathExists(path)) {
            throw new Error(`Invalid or no ${parameterName} parameter was found: Expected a number but received: ${path} (1000018)`);
        }
        if (!fileUtils.isFilePath(path)) {
            throw new Error(`The parameter path ${parameterName} marked as file but it's a path of a directory: ${path} (1000019)`);
        }
        const extension = pathUtils.getExtension(path);
        if (extension !== fileExtension) {
            throw new Error(`The parameter path ${parameterName} must be a ${fileExtension} file but it's: ${extension} file (1000020)`);
        }
        const fileData = await fileUtils.read(path);
        const jsonData = JSON.parse(fileData);
        if (!jsonData) {
            throw new Error('No data found in the file (1000021)');
        }
        if (!validationUtils.isPropertyExists(jsonData, 'api_key')) {
            throw new Error('Missing api_key parameter (1000003)');
        }
        if (!validationUtils.isValidYouTubeAPIKey(jsonData.api_key)) {
            throw new Error('Invalid api_key parameter (1000003)');
        }
        this.youtubeData.apiKey = jsonData.api_key.trim();
    }

    async validateVideoId() {
        const url = `${this.youtubeData.apiBaseURL}${this.youtubeData.videoDetailsQuery
            .replace(Placeholder.VIDEO_ID, this.youtubeData.videoId)
            .replace(Placeholder.KEY, this.youtubeData.apiKey)}`;
        const response = await axiosService.getRequest(url);
        if (!response || !response.data) {
            throw new Error(`Video ${this.youtubeData.videoId} not exists via YouTube API details call (1000045)`);
        }
        if (!validationUtils.isPropertyExists(response.data, 'items')) {
            throw new Error('Missing `items` field in the JSON response (1000045)');
        }
        if (!validationUtils.isPropertyExists(response.data.items[0], 'id')) {
            throw new Error('Missing `items.id` field in the JSON response (1000045)');
        }
        const responseVideoId = response.data.items[0].id.trim();
        if (this.youtubeData.videoId !== responseVideoId) {
            throw new Error(`Mismatch video Ids between settings and API response: ${this.youtubeData.videoId} | ${responseVideoId} (1000045)`);
        }
        return response.data.items[0];
    }

    getCommentsCount(videoDetails) {
        if (!validationUtils.isPropertyExists(videoDetails, 'statistics')) {
            throw new Error('Missing `items.statistics` field in the JSON response (1000045)');
        }
        if (!validationUtils.isPropertyExists(videoDetails.statistics, 'commentCount')) {
            throw new Error('Missing `items.statistics.commentCount` field in the JSON response (1000045)');
        }
        this.youtubeData.commentsCount = parseInt(videoDetails.statistics.commentCount);
    }

    async fetchComments() {
        let isFetchComments = true;
        let isLimitExceeded = false;
        this.youtubeData.commentsIndex = 0;
        let currentCommentsCount = 1;
        /*         while (isFetchComments)
                { */
        let pageToken = '';
        const url = `${this.youtubeData.apiBaseURL}${this.youtubeData.videoCommentsQuery
            .replace(Placeholder.VIDEO_ID, this.youtubeData.videoId)
            .replace(Placeholder.MAX_RESULTS, countLimitService.countLimitData.maximumFetchCommentsCount)
            .replace(Placeholder.PAGE_TOKEN, pageToken)
            .replace(Placeholder.KEY, this.youtubeData.apiKey)}`;
        const response = await axiosService.getRequest(url);
        if (!response || !response.data) {
            throw new Error(`Video ${this.youtubeData.videoId} not exists via YouTube API details call (1000045)`);
        }
        if (!validationUtils.isPropertyExists(response.data, 'items')) {
            throw new Error('Missing `items` field in the JSON response (1000045)');
        }
        if (!validationUtils.isPropertyExists(response.data, 'nextPageToken')) {
            throw new Error('Missing `nextPageToken` field in the JSON response (1000045)');
        }
        pageToken = response.data.nextPageToken.trim();
        const comments = response.data.items;
        if (!pageToken || !validationUtils.isExists(comments)) {
            isFetchComments = false;
        }

        this.youtubeData.commentsIndex++;
        currentCommentsCount++;
        await this.logComment(comments[0]);
        this.logProgress(currentCommentsCount);

        /*         for (let i = 0; i < comments.length; i++) {
                    this.youtubeData.commentsIndex++;
                    currentCommentsCount++;
                    await this.logComment(comments[i]);
                    this.logProgress(currentCommentsCount);
                } */
        //await this.logComment(comments[58]);
        if (currentCommentsCount > this.youtubeData.commentsCount) {
            isFetchComments = false;
        }
        if (currentCommentsCount > countLimitService.countLimitData.maximumCommentsCount) {
            isFetchComments = false;
            isLimitExceeded = true;
        }
        await globalUtils.sleep(countLimitService.countLimitData.millisecondsFetchDelayCount);
        // }
        return isLimitExceeded;
    }

    async logComment(commentContainer) {
        if (!validationUtils.isPropertyExists(commentContainer, 'snippet')) {
            return;
        }
        if (!validationUtils.isPropertyExists(commentContainer.snippet, 'topLevelComment')) {
            return;
        }
        if (!validationUtils.isPropertyExists(commentContainer.snippet.topLevelComment, 'snippet')) {
            return;
        }
        if (!validationUtils.isPropertyExists(commentContainer.snippet.topLevelComment.snippet, 'textOriginal')) {
            return;
        }
        await logService.logComment(commentContainer.snippet.topLevelComment.snippet.textOriginal);
    }

    logProgress(currentCommentsCount) {
        logService.logProgress({
            currentNumber: currentCommentsCount,
            totalNumber: this.youtubeData.commentsCount
        });
    }
}

module.exports = new YoutubeService();
/*         for (let i = 0; i < 100; i++) {
            currentCommentsCount++;
            this.logProgress(currentCommentsCount);
            await globalUtils.sleep(countLimitService.countLimitData.millisecondsFetchDelayCount);
        } */
/*         const comment = commentContainer.snippet.topLevelComment.snippet; */
/* commentText =  */
/*         let commentText = ''; */
/*         console.log(commentText); */
/*         console.log(commentContainer); */
        //console.log(response.data.items[0]);


        //console.log(response);
/*         } */
        //return false;
                //response.data.
        //console.log(videoDetails.statistics.commentCount);
/*     this.videoDetailsQuery = `videos?part=id&id=${Placeholder.VIDEO_ID}&key=${Placeholder.KEY}`;
this.videoCommentsQuery = `commentThreads?part=snippet&videoId=${Placeholder.VIDEO_ID}&maxResults=${Placeholder.MAX_RESULTS}&key=${Placeholder.KEY}&pageToken=${Placeholder.PAGE_TOKEN}`; */

/*     const Placeholder = enumUtils.createEnum([
    ['VIDEO_ID', '#VIDEO_ID#'],
    ['KEY', '#KEY#'],
    ['MAX_RESULTS', '#MAX_RESULTS#'],
    ['PAGE_TOKEN', '#PAGE_TOKEN#']
]); */

/*         const apiKey = Object.prototype.hasOwnProperty.call(jsonData, 'api_key');
if (!apiKey) {
    throw new Error('Missing api_key parameter (1000003)');
} */
/*         console.log(jsonData);
if (!validationUtils.isExists(jsonData)) { */
/*       //return jsonData; */
/*     async getJsonFileData(data) {

  } */
          //const isLimitExceeded = await this.fetchComments();

       // return isLimitExceeded;