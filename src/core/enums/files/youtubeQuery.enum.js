const enumUtils = require('../enum.utils');

const Placeholder = enumUtils.createEnum([
    ['VIDEO_ID', '#VIDEO_ID#'],
    ['KEY', '#KEY#'],
    ['MAX_RESULTS', '#MAX_RESULTS#'],
    ['PAGE_TOKEN', '#PAGE_TOKEN#']
]);

module.exports = { Placeholder };
/* const Part = enumUtils.createEnum([
    ['ID', 'id'],
    ['SNIPPET', 'snippet']
]);
 */
/* Part,  */
/*     ['PART', '#PART#'], */
/* this.validateVideoIdQuery = 'videos?part=#PART#&id=#VIDEO_ID#&key=#KEY#';
this.fetchCommentsQuery = 'commentThreads?part=#PART#&videoId=#VIDEO_ID#&maxResults=#MAX_RESULTS#&key=#KEY#&pageToken=#PAGE_TOKEN#'; */