import errorScript from './error.script';
import initiateService from '../services/files/initiate.service';
initiateService.initiate('comments');
import CommentsLogic from '../logics/comments.logic';

(async () => {
    await new CommentsLogic().run();
})().catch(e => errorScript.handleScriptError(e, 1));