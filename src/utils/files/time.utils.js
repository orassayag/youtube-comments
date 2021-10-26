import textUtils from './text.utils';
import validationUtils from './validation.utils';

class TimeUtils {

    constructor() { }

    getCurrentDate(value) {
        return value ? validationUtils.isValidArray(value) ? new Date(...value) : new Date(value) : new Date();
    }

    getDateNoSpaces() {
        const date = this.getCurrentDate();
        return [this.getDay(date), this.getMonth(date), this.getYear(date)].join('');
    }

    getDay(date) {
        return textUtils.addLeadingZero(date.getDate());
    }

    getMonth(date) {
        return textUtils.addLeadingZero(date.getMonth() + 1);
    }

    getYear(date) {
        return date.getFullYear();
    }
}

export default new TimeUtils();