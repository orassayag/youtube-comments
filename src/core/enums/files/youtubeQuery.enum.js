import enumUtils from '../enum.utils';

const PlaceholderEnum = enumUtils.createEnum([
    ['VIDEO_ID', '#VIDEO_ID#'],
    ['KEY', '#KEY#'],
    ['MAX_RESULTS', '#MAX_RESULTS#'],
    ['PAGE_TOKEN', '#PAGE_TOKEN#']
]);

export { PlaceholderEnum };