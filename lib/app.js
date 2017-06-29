const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

const Settings = require('./settings');
const Logger = require('./logger');
const Parser = require('./parser');

const getOutputFilepath = () => path.join(process.cwd(), 'test-report.html');

const writeFile = (content) => new Promise((resolve, reject) => {
	const outputPath = getOutputFilepath();
	mkdirp(path.dirname(outputPath), (err) =>
		!err ? resolve(fs.writeFile(outputPath, content)) : reject(`Something went wrong when creating the file: ${err}`));
});

const run = (args) => {
	return Parser.parseDirectory(Settings.source)
		.then(response => {
			return writeFile(response)
				.then(() => Logger.success(response));
		})
		.catch(error => Logger.error(error));
};

module.exports = {
	run,
};
