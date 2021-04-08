const applicationService = require('./files/application.service');
const axiosService = require('./files/axios.service');
const confirmationService = require('./files/confirmation.service');
const countLimitService = require('./files/countLimit.service');
const logService = require('./files/log.service');
const pathService = require('./files/path.service');
const validationService = require('./files/validation.service');
const youtubeService = require('./files/youtube.service');

module.exports = {
    applicationService, axiosService, confirmationService, countLimitService, logService,
    pathService, validationService, youtubeService
};