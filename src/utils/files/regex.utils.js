/* eslint-disable no-control-regex */
class RegexUtils {

	constructor() {
		this.numberCommasRegex = /\B(?=(\d{3})+(?!\d))/g;
		this.validateLinkRegex = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$', 'i');
		this.validateAPIKeyRegex = /^[a-zA-Z0-9-_]+$/;
		this.validateYouTubeRegex = /^[A-Za-z0-9_-]{11}$/;
	}
}

module.exports = new RegexUtils();

/*
		this.splitWords = /(?=[A-Z])|[\s, _.-]+/;
		this.clearNoneAlphabets = /[^A-Za-z'`]/g;
 */