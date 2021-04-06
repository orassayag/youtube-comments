const enumUtils = require('../enum.utils');

const ScriptType = enumUtils.createEnum([
    ['BACKUP', 'backup'],
    ['COMMENTS', 'comments'],
    ['TEST', 'test']
]);

const Status = enumUtils.createEnum([
    ['INITIATE', 'INITIATE'],
    ['VALIDATE', 'VALIDATE'],
    ['FETCH', 'FETCH'],
    ['PAUSE', 'PAUSE'],
    ['LIMIT_EXCEEDED', 'LIMIT EXCEEDED'],
    ['ABORT_BY_THE_USER', 'ABORT BY THE USER'],
    ['FINISH', 'FINISH']
]);

module.exports = { ScriptType, Status };
/*     ['SCAN', 'scan'], */
/*     ['DOWNLOAD', 'DOWNLOAD'],
    ['IMPLEMENT', 'IMPLEMENT'],
    ['SCAN', 'SCAN'], */
/* Method, Mode,  */
/* const Method = enumUtils.createEnum([
    ['NAME', 'NAME'],
    ['CONTENT', 'CONTENT']
]);

const Mode = enumUtils.createEnum([
    ['STANDARD', 'STANDARD'],
    ['SILENT', 'SILENT']
]);
 */