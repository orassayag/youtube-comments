import { YouTubeDataModel } from '../../core/models';
import { PlaceholderEnum } from '../../core/enums';
import axiosService from './axios.service';
import countLimitService from './countLimit.service';
import logService from './log.service';
import pathService from './path.service';
import globalUtils from '../../utils/files/global.utils';
import { fileUtils, pathUtils, validationUtils } from '../../utils';

class YoutubeService {

    constructor() {
        this.youtubeDataModel = null;
    }

    initiate(settings) {
        this.youtubeDataModel = new YouTubeDataModel(settings);
    }

    async logComments() {
        // First, get the API key from the external source JSON file.
        await this.getAPIKey({
            path: pathService.pathDataModel.apiKeyPath,
            parameterName: 'API_KEY_PATH',
            fileExtension: '.json'
        });
        // Second, validate the YouTube video Id.
        const videoDetails = await this.validateVideoId();
        // Next, get the expected total comments count.
        this.getCommentsCount(videoDetails);
        // Then, fetch the comments and log them into a TXT file,
        // And finally, return the result - If the limit is exceeded or not.
        return await this.fetchComments();
    }

    async getAPIKey(data) {
        const { path, parameterName, fileExtension } = data;
        if (!await fileUtils.isPathExists(path)) {
            throw new Error(`Path not exists: ${path} (10000013)`);
        }
        if (!fileUtils.isFilePath(path)) {
            throw new Error(`The parameter path ${parameterName} marked as file but it's a path of a directory: ${path} (1000014)`);
        }
        const extension = pathUtils.getExtension(path);
        if (extension !== fileExtension) {
            throw new Error(`The parameter path ${parameterName} must be a ${fileExtension} file but it's: ${extension} file (1000015)`);
        }
        const fileData = await fileUtils.read(path);
        const jsonData = JSON.parse(fileData);
        if (!jsonData) {
            throw new Error('No data found in the file (1000016)');
        }
        if (!validationUtils.isPropertyExists(jsonData, 'api_key')) {
            throw new Error('Missing api_key parameter (1000017)');
        }
        if (!validationUtils.isValidYouTubeAPIKey(jsonData.api_key)) {
            throw new Error('Invalid api_key parameter (1000018)');
        }
        this.youtubeDataModel.apiKey = jsonData.api_key.trim();
    }

    async validateVideoId() {
        const url = `${this.youtubeDataModel.apiBaseURL}${this.youtubeDataModel.videoDetailsQuery
            .replace(PlaceholderEnum.VIDEO_ID, this.youtubeDataModel.videoId)
            .replace(PlaceholderEnum.KEY, this.youtubeDataModel.apiKey)}`;
        const response = await axiosService.getRequest(url);
        if (!response || !response.data) {
            throw new Error(`Video ${this.youtubeDataModel.videoId} not exists via YouTube API details call (1000019)`);
        }
        if (!validationUtils.isPropertyExists(response.data, 'items')) {
            throw new Error('Missing `items` field in the JSON response (1000020)');
        }
        if (!validationUtils.isExists(response.data.items)) {
            throw new Error('`items` field is empty in the JSON response (1000021)');
        }
        if (!validationUtils.isPropertyExists(response.data.items[0], 'id')) {
            throw new Error('Missing `items.id` field in the JSON response (1000022)');
        }
        const responseVideoId = response.data.items[0].id.trim();
        if (this.youtubeDataModel.videoId !== responseVideoId) {
            throw new Error(`Mismatch video Ids between settings and API response: ${this.youtubeDataModel.videoId} | ${responseVideoId} (1000023)`);
        }
        return response.data.items[0];
    }

    getCommentsCount(videoDetails) {
        if (!validationUtils.isPropertyExists(videoDetails, 'statistics')) {
            throw new Error('Missing `items.statistics` field in the JSON response (1000024)');
        }
        if (!validationUtils.isPropertyExists(videoDetails.statistics, 'commentCount')) {
            throw new Error('Missing `items.statistics.commentCount` field in the JSON response (1000025)');
        }
        this.youtubeDataModel.commentsCount = parseInt(videoDetails.statistics.commentCount);
    }

    async fetchComments() {
        let isFetchComments = true;
        let isLimitExceeded = false;
        this.youtubeDataModel.commentsIndex = 0;
        let pageToken = '';
        while (isFetchComments) {
            const url = `${this.youtubeDataModel.apiBaseURL}${this.youtubeDataModel.videoCommentsQuery
                .replace(PlaceholderEnum.VIDEO_ID, this.youtubeDataModel.videoId)
                .replace(PlaceholderEnum.MAX_RESULTS, countLimitService.countLimitDataModel.maximumFetchCommentsCount)
                .replace(PlaceholderEnum.PAGE_TOKEN, pageToken)
                .replace(PlaceholderEnum.KEY, this.youtubeDataModel.apiKey)}`;
            const response = await axiosService.getRequest(url);
            if (!response || !response.data) {
                throw new Error(`Video ${this.youtubeDataModel.videoId} not exists via YouTube API details call (1000026)`);
            }
            if (!validationUtils.isPropertyExists(response.data, 'items')) {
                throw new Error('Missing `items` field in the JSON response (1000027)');
            }
            // If token does not exist - There are no more comments to fetch (can be less comments than expected).
            if (validationUtils.isPropertyExists(response.data, 'nextPageToken')) {
                pageToken = response.data.nextPageToken.trim();
            }
            else {
                isFetchComments = false;
            }
            const comments = response.data.items;
            if (!pageToken || !validationUtils.isExists(comments)) {
                isFetchComments = false;
            }
            for (let i = 0; i < comments.length; i++) {
                this.youtubeDataModel.commentsIndex++;
                await this.logComment(comments[i]);
                this.logProgress(this.youtubeDataModel.commentsIndex);
                if (this.youtubeDataModel.commentsIndex >= this.youtubeDataModel.commentsCount) {
                    isFetchComments = false;
                    break;
                }
                if (this.youtubeDataModel.commentsIndex >= countLimitService.countLimitDataModel.maximumCommentsCount) {
                    isFetchComments = false;
                    isLimitExceeded = true;
                    break;
                }
            }
            await globalUtils.sleep(countLimitService.countLimitDataModel.millisecondsFetchDelayCount);
        }
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
            totalNumber: this.youtubeDataModel.commentsCount
        });
    }
}

export default new YoutubeService();