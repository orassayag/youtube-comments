class ApplicationDataModel {

	constructor(data) {
		// Set the parameters from the settings file.
		const { settings, status } = data;
		const { VALIDATION_CONNECTION_LINK } = settings;
		this.youtubeVideoId = null;
		this.validationConnectionLink = VALIDATION_CONNECTION_LINK;
		this.status = status;
		this.startDateTime = null;
	}
}

export default ApplicationDataModel;