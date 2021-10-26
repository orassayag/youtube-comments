import { LogDataModel } from '../../core/models';
import pathService from './path.service';
import { fileUtils, logUtils, textUtils } from '../../utils';

class LogService {

	constructor() {
		this.logDataModel = null;
		// ===PATH=== //
		this.baseSessionPath = null;
		this.distFileName = null;
		this.logSeparator = '\n==========\n';
	}

	async initiate(settings, videoId) {
		this.logDataModel = new LogDataModel(settings);
		await this.initiateDirectories(videoId);
	}

	async initiateDirectories(videoId) {
		// ===PATH=== //
		this.baseSessionPath = pathService.pathDataModel.distPath;
		fileUtils.createDirectory(this.baseSessionPath);
		this.distFileName = `${this.baseSessionPath}\\${this.logDataModel.distFileName}-${videoId}.txt`;
		await fileUtils.removeFile(this.distFileName);
	}

	logProgress(data) {
		const { currentNumber, totalNumber } = data;
		logUtils.logProgress({
			progressData: {
				'Writing comments': textUtils.getNumberOfNumber({ number1: currentNumber, number2: totalNumber })
			},
			percentage: textUtils.calculatePercentageDisplay({
				partialValue: currentNumber,
				totalValue: totalNumber
			})
		});
	}

	async logComment(commentText) {
		if (!commentText) {
			return;
		}
		commentText += this.logSeparator;
		await fileUtils.appendFile({
			targetPath: this.distFileName,
			message: commentText
		});
	}

	createLineTemplate(title, value) {
		return textUtils.addBreakLine(`${title}: ${value}`);
	}

	createConfirmSettingsTemplate(settings) {
		const parameters = ['VIDEO_ID', 'API_BASE_URL', 'DIST_FILE_NAME', 'MAXIMUM_COMMENTS_COUNT',
			'MILLISECONDS_FETCH_DELAY_COUNT', 'MAXIMUM_FETCH_COMMENTS_COUNT'];
		let settingsText = Object.keys(settings).filter(s => parameters.indexOf(s) > -1)
			.map(k => this.createLineTemplate(k, settings[k])).join('');
		settingsText = textUtils.removeLastCharacters({
			value: settingsText,
			charactersCount: 1
		});
		return `${textUtils.setLogStatus('IMPORTANT SETTINGS')}
${settingsText}
========================
OK to run? (y = yes)`;
	}
}

export default new LogService();