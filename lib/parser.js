const path = require('path');
const fs = require('fs');
const Types = require('./types/index');
const Logger = require('./logger');

/**
 * Returns all block comments from a given input string
 */
const findAllBlockComments = (string) => string.match(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g);

const parseDirectory = (directoryPath) => new Promise((resolve, reject) => {
	fs.readdir(directoryPath, (err, files) => {
		if (err) { return reject(err); }

		Logger.debug(`Directory: ${directoryPath}`);

		const promises = [];
		files.forEach((file, index) => {
			const filepath = path.join(directoryPath, file);
			promises.push(parseFile(filepath));
		});
		return Promise.all(promises)
			.then(result => resolve(result))
			.catch(err => reject(err));
	});
});

const parseFile = (filepath) => new Promise((resolve, reject) => {
	fs.readFile(filepath, 'utf8', (err, content) => {
		if (err) { return reject(`Something went wrong reading the file: '${err}'`); }

		Logger.debug(`File: ${filepath}`);

		const sections = [];
		const blockComments = findAllBlockComments(content);

		if (blockComments) {
			for (let blockComment of blockComments) {
				const type = Types.getType(blockComment);

				Logger.debug(`Comment Block: ${blockComment}`);
				Logger.debug(`Block Comment Type: ${type}`);

				if (type) {
					sections.push(type);
				}
				Logger.debug(`-`);
			}
		}

		const result = sections.length > 0 ? sections : null;

		Logger.debug(`////`);

		resolve(result);
	});
});

module.exports = {
	findAllBlockComments,
	parseDirectory,
	parseFile
};
