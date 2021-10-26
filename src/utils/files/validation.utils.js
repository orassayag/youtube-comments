import regexUtils from './regex.utils';

class ValidationUtils {

    constructor() { }

    isExists(list) {
        return list && list.length > 0;
    }

    isValidArray(variable) {
        return Object.prototype.toString.call(variable) === '[object Array]';
    }

    isPositiveNumber(number) {
        if (!this.isValidNumber(number)) {
            return false;
        }
        return Number(number) > 0;
    }

    // This method validates if a given value is a valid number and returns the result.
    isValidNumber(number) {
        number = Number(number);
        return !isNaN(number) && typeof number == 'number';
    }

    // This method validates that a given string exists in an array list of specific types.
    isValidEnum(data) {
        // Validate the existence and validity of the validateEnumData parameters. If not exists, return false.
        if (!data || !data.enum || !data.value) {
            return false;
        }
        // Check if the value exists within a given array. Return false if not.
        return Object.values(data.enum).indexOf(data.value) > -1;
    }

    isValidLink(link) {
        return regexUtils.validateLinkRegex.test(link);
    }

    isValidYouTubeAPIKey(apiKey) {
        return regexUtils.validateAPIKeyRegex.test(apiKey);
    }

    isValidYouTubeId(youtubeId) {
        return regexUtils.validateYouTubeRegex.test(youtubeId);
    }

    isPropertyExists(obj, fieldName) {
        return Object.prototype.hasOwnProperty.call(obj, fieldName);
    }
}

export default new ValidationUtils();