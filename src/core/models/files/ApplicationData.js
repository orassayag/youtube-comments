class ApplicationData {

	constructor(data) {
		// Set the parameters from the settings file.
		const { settings, status } = data;
		this.youtubeVideoId = null;
		this.status = status;
		this.startDateTime = null;
	}
}

module.exports = ApplicationData;

/* const { timeUtils } = require('../../../utils'); */
/* 		const { METHOD, MODE, SCAN_PATH, VALIDATION_CONNECTION_LINK } = settings;
		this.method = METHOD;
		this.mode = MODE;
		this.scanPath = SCAN_PATH;
		this.validationConnectionLink = VALIDATION_CONNECTION_LINK;
		this.status = status;
		this.startDateTime = null;
		this.time = null;
		this.logDateTime = timeUtils.getFullDateNoSpaces();
		this.itemIndex = 0;
		this.itemName = null;
		this.itemDirectoryPath = null;
		this.itemCheckResult = null; */