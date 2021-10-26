class PathDataModel {

	constructor(settings) {
		// Set the parameters from the settings file.
		const { API_KEY_PATH, DIST_PATH } = settings;
		this.apiKeyPath = API_KEY_PATH;
		this.distPath = DIST_PATH;
	}
}

export default PathDataModel;