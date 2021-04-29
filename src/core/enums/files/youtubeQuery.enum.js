const enumUtils = require('../enum.utils');

const PlaceholderEnum = enumUtils.createEnum([
    ['VIDEO_ID', '#VIDEO_ID#'],
    ['KEY', '#KEY#'],
    ['MAX_RESULTS', '#MAX_RESULTS#'],
    ['PAGE_TOKEN', '#PAGE_TOKEN#']
]);

module.exports = { PlaceholderEnum };