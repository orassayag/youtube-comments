const applicationService = require('./files/application.service');
const confirmationService = require('./files/confirmation.service');
const countLimitService = require('./files/countLimit.service');
const logService = require('./files/log.service');
const pathService = require('./files/path.service');
const validationService = require('./files/validation.service');
const youtubeService = require('./files/youtube.service');

module.exports = {
    applicationService, confirmationService, countLimitService, logService, pathService,
    validationService, youtubeService
};

/* const applicationService = require('./files/application.service');
const confirmationService = require('./files/confirmation.service');
const countLimitService = require('./files/countLimit.service');
const itemService = require('./files/item.service');
const logService = require('./files/log.service');
const nSpellService = require('./files/nspell.service');
const pathService = require('./files/path.service');
const scanService = require('./files/scan.service');
const spellCheckService = require('./files/spellCheck.service');
const validationService = require('./files/validation.service');

module.exports = {
    applicationService, confirmationService, countLimitService, itemService, logService,
    nSpellService, pathService, scanService, spellCheckService, validationService
}; */