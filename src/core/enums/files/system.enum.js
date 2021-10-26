import enumUtils from '../enum.utils';

const ScriptTypeEnum = enumUtils.createEnum([
    ['BACKUP', 'backup'],
    ['COMMENTS', 'comments'],
    ['TEST', 'test']
]);

const StatusEnum = enumUtils.createEnum([
    ['INITIATE', 'INITIATE'],
    ['ABORT_BY_THE_USER', 'ABORT BY THE USER'],
    ['VALIDATE', 'VALIDATE'],
    ['FETCH', 'FETCH'],
    ['LIMIT_EXCEEDED', 'LIMIT EXCEEDED'],
    ['FINISH', 'FINISH']
]);

export { ScriptTypeEnum, StatusEnum };