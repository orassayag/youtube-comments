const settings = require('../settings/settings');
const { Status } = require('../core/enums');
const { applicationService, confirmationService, countLimitService, logService,
    pathService, validationService, youtubeService } = require('../services');
const globalUtils = require('../utils/files/global.utils');
const { logUtils, systemUtils } = require('../utils');

class CommentsLogic {

    constructor() { }

    async run() {
        // Validate all settings are fit to the user needs.
        await this.confirm();
        // Validate general settings.
        await this.validateGeneralSettings();
        // Initiate all the settings, configurations, services, etc...
        await this.initiate();
        // Start the log comments process.
        await this.startSession();
    }

    async initiate() {
        this.updateStatus('INITIATE THE SERVICES', Status.INITIATE);
        pathService.initiate(settings);
        youtubeService.initiate(settings);
        await logService.initiate(settings, youtubeService.youtubeData.videoId);
    }

    async validateGeneralSettings() {
        this.updateStatus('VALIDATE GENERAL SETTINGS', Status.VALIDATE);
        // Validate that the internet connection works.
        countLimitService.initiate(settings);
        applicationService.initiate(settings, Status.INITIATE);
        await validationService.validateInternetConnection();
    }

    async startSession() {
        // Initiate.
        this.updateStatus('FETCH COMMENTS', Status.FETCH);
        applicationService.applicationData.startDateTime = new Date();
        const isLimitExceeded = await youtubeService.logComments();
        await this.exit(isLimitExceeded ? Status.LIMIT_EXCEEDED : Status.FINISH);
    }

    async sleep() {
        await globalUtils.sleep(countLimitService.countLimitData.millisecondsEndDelayCount);
    }

    // Let the user confirm all the IMPORTANT settings before the process starts.
    async confirm() {
        if (!await confirmationService.confirm(settings)) {
            await this.exit(Status.ABORT_BY_THE_USER);
        }
    }

    updateStatus(text, status) {
        logUtils.logStatus(text);
        if (applicationService.applicationData) {
            applicationService.applicationData.status = status;
        }
    }

    async exit(status) {
        if (applicationService.applicationData) {
            applicationService.applicationData.status = status;
            await this.sleep();
        }
        logUtils.logSpace();
        systemUtils.exit(status);
    }
}

module.exports = CommentsLogic;