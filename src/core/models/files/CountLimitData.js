class CountLimitData {

	constructor(settings) {
		// Set the parameters from the settings file.
		const { MAXIMUM_COMMENTS_COUNT, MILLISECONDS_FETCH_DELAY_COUNT, MAXIMUM_FETCH_COMMENTS_COUNT,
			MILLISECONDS_END_DELAY_COUNT, MAXIMUM_URL_VALIDATION_COUNT, MILLISECONDS_TIMEOUT_URL_VALIDATION } = settings;
		this.maximumCommentsCount = MAXIMUM_COMMENTS_COUNT;
		this.millisecondsFetchDelayCount = MILLISECONDS_FETCH_DELAY_COUNT;
		this.maximumFetchCommentsCount = MAXIMUM_FETCH_COMMENTS_COUNT;
		this.millisecondsEndDelayCount = MILLISECONDS_END_DELAY_COUNT;
		this.maximumURLValidationCount = MAXIMUM_URL_VALIDATION_COUNT;
		this.millisecondsTimeoutURLValidation = MILLISECONDS_TIMEOUT_URL_VALIDATION;
	}
}

module.exports = CountLimitData;
/* 		const { MAXIMUM_WORDS_SCAN_COUNT, MILLISECONDS_INTERVAL_COUNT, MAXIMUM_ITEM_NAME_PATH_CHARACTERS_DISPLAY_COUNT,
			MAXIMUM_ITEMS_COUNT, MILLISECONDS_BETWEEN_ITEMS_DELAY_COUNT, MILLISECONDS_END_DELAY_COUNT,
			MAXIMUM_URL_VALIDATION_COUNT, MILLISECONDS_TIMEOUT_URL_VALIDATION } = settings;
		this.maximumWordsScanCount = MAXIMUM_WORDS_SCAN_COUNT;
		this.millisecondsIntervalCount = MILLISECONDS_INTERVAL_COUNT;
		this.maximumItemNamePathCharactersDisplayCount = MAXIMUM_ITEM_NAME_PATH_CHARACTERS_DISPLAY_COUNT;
		this.maximumItemsCount = MAXIMUM_ITEMS_COUNT;
		this.millisecondsBetweenItemsDelayCount = MILLISECONDS_BETWEEN_ITEMS_DELAY_COUNT;
		this.millisecondsEndDelayCount = MILLISECONDS_END_DELAY_COUNT;
		this.maximumURLValidationCount = MAXIMUM_URL_VALIDATION_COUNT;
		this.millisecondsTimeoutURLValidation = MILLISECONDS_TIMEOUT_URL_VALIDATION; */