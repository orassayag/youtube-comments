import settings from '../settings/settings';
import { StatusEnum } from '../core/enums';
import {
    applicationService, confirmationService, countLimitService, logService,
    pathService, validationService, youtubeService
} from '../services';
import globalUtils from '../utils/files/global.utils';
import { logUtils, systemUtils, timeUtils } from '../utils';

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
        this.updateStatus('INITIATE THE SERVICES', StatusEnum.INITIATE);
        pathService.initiate(settings);
        youtubeService.initiate(settings);
        await logService.initiate(settings, youtubeService.youtubeDataModel.videoId);
    }

    async validateGeneralSettings() {
        this.updateStatus('VALIDATE GENERAL SETTINGS', StatusEnum.VALIDATE);
        // Validate that the internet connection works.
        countLimitService.initiate(settings);
        applicationService.initiate(settings, StatusEnum.INITIATE);
        await validationService.validateInternetConnection();
    }

    async startSession() {
        // Initiate.
        applicationService.applicationDataModel.startDateTime = timeUtils.getCurrentDate();
        this.updateStatus('FETCH COMMENTS', StatusEnum.FETCH);
        const isLimitExceeded = await youtubeService.logComments();
        await this.exit(isLimitExceeded ? StatusEnum.LIMIT_EXCEEDED : StatusEnum.FINISH);
    }

    async sleep() {
        await globalUtils.sleep(countLimitService.countLimitDataModel.millisecondsEndDelayCount);
    }

    // Let the user confirm all the IMPORTANT settings before the process starts.
    async confirm() {
        if (!await confirmationService.confirm(settings)) {
            await this.exit(StatusEnum.ABORT_BY_THE_USER);
        }
    }

    updateStatus(text, status) {
        logUtils.logStatus(text);
        if (applicationService.applicationDataModel) {
            applicationService.applicationDataModel.status = status;
        }
    }

    async exit(status) {
        if (applicationService.applicationDataModel) {
            applicationService.applicationDataModel.status = status;
            await this.sleep();
        }
        logUtils.logSpace();
        systemUtils.exit(status);
    }
}

export default CommentsLogic;