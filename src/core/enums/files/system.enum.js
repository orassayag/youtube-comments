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