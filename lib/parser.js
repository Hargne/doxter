const path = require('path');
const fs = require('fs');
const Types = require('./types/index');
const Logger = require('./logger');

/**
 * Returns all block comments from a given input string
 */
const findAllBlockComments = (string) => string.match(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g);

const createHtml = (input) => {
	let output = '<html><head><title>Documentation</title><style>.section { padding: 1rem; }.param { padding: 0.5rem; }</style></head><body>';
	if (input) {
		for (let parts of input) {
			if (parts) {
				for (let section of parts) {
					if (section) {
						output += '<div class="section">';
						output += `<div>${section.name}</div>`;
						if (section.content) {
							for (param of section.content.data) {
								output += '<div class="param">';
								if (param.name) { output += `<div>Name: ${param.name}</div>` }
								if (param.type) { output += `<div>Type: ${param.type}</div>` }
								if (param.description) { output += `<div>Description: ${param.description}</div>` }
								output += '</div>';
							}
						}
						output += '</div>';
					}
				}
			}
		}
	}
	output += '</body><html>';
	return output;
};

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
			.then(result => resolve(createHtml(result)))
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

				if (type) {
					Logger.debug(type.content);
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
