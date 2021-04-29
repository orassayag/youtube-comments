const validationUtils = require('./validation.utils');
const regexUtils = require('./regex.utils');

class TextUtils {

    constructor() {
        this.b = '===';
    }

    setLogStatus(status) {
        if (!status) {
            return '';
        }
        return `${this.b}${status}${this.b}`;
    }

    getBackupName(data) {
        const { applicationName, date, title, index } = data;
        return `${applicationName}_${date}-${(index + 1)}${title ? `-${title}` : ''}`;
    }

    removeAllCharacters(text, target) {
        if (!text) {
            return '';
        }
        return text.split(target).join('');
    }

    toLowerCase(text) {
        if (!text) {
            return '';
        }
        return text.toLowerCase();
    }

    // This method adds leading 0 if needed.
    addLeadingZero(number) {
        if (!validationUtils.isValidNumber(number)) {
            return '';
        }
        return number < 10 ? `0${number}` : number;
    }

    addBackslash(text) {
        if (!text) {
            return '';
        }
        return `${text}/`;
    }

    // This method converts a given number to display comma number.
    getNumberWithCommas(number) {
        if (number <= -1 || !validationUtils.isValidNumber(number)) {
            return '';
        }
        return number.toString().replace(regexUtils.numberCommasRegex, ',');
    }

    removeLastCharacters(data) {
        const { value, charactersCount } = data;
        if (!value || !validationUtils.isValidNumber(charactersCount)) {
            return '';
        }
        return value.substring(0, value.length - charactersCount);
    }

    calculatePercentageDisplay(data) {
        const { partialValue, totalValue } = data;
        if (!validationUtils.isValidNumber(partialValue) || !validationUtils.isValidNumber(totalValue)) {
            return '';
        }
        return `${this.addLeadingZero(((100 * partialValue) / totalValue).toFixed(2))}%`;
    }

    getNumberOfNumber(data) {
        const { number1, number2 } = data;
        if (!validationUtils.isValidNumber(number1) || !validationUtils.isValidNumber(number2)) {
            return '';
        }
        return `${this.getNumberWithCommas(number1)}/${this.getNumberWithCommas(number2)}`;
    }

    addBreakLine(text) {
        return `${text}\r\n`;
    }
}

module.exports = new TextUtils();