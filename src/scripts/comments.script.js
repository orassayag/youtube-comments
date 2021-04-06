const errorScript = require('./error.script');
require('../services/files/initiate.service').initiate('comments');
const CommentsLogic = require('../logics/comments.logic');

(async () => {
    await new CommentsLogic().run();
})().catch(e => errorScript.handleScriptError(e, 1));