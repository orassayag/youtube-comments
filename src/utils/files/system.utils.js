class SystemUtils {

    constructor() { }
}

module.exports = new SystemUtils();

/* const logUtils = require('./log.utils'); */

/*     exit(exitReason, color) {
        logUtils.logColorStatus({
            status: this.getExitReason(exitReason),
            color: color
        });
        process.exit(0);
    }

    getExitReason(exitReason) {
        if (!exitReason) {
            return '';
        }
        return `EXIT: ${exitReason}`;
    } */