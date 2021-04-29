class CountLimitDataModel {

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

module.exports = CountLimitDataModel;