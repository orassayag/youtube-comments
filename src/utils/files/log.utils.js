import textUtils from './text.utils';
import validationUtils from './validation.utils';

class LogUtils {

    constructor() { }

    log(message) {
        console.log(message);
    }

    logStatus(message) {
        this.log(textUtils.setLogStatus(message));
    }

    logProgress(data) {
        const { progressData, percentage } = data;
        const keys = Object.keys(progressData);
        let result = '';
        for (let i = 0, length = keys.length; i < length; i++) {
            const value = progressData[keys[i]];
            const displayValue = validationUtils.isValidNumber(value) ? textUtils.getNumberWithCommas(value) : value;
            result += `${keys[i]}: ${displayValue} | `;
        }
        result += percentage ? `${percentage} | ` : '';
        result = textUtils.removeLastCharacters({
            value: result,
            charactersCount: 3
        });
        process.stdout.write(`\r${textUtils.setLogStatus(result)}`);
    }

    logSpace() {
        process.stdout.write('\n\r');
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
    }
}

export default new LogUtils();