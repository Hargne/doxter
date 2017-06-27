const path = require('path');
const fs = require('fs');
const types = require('./types');
const Logger = require('./logger');

const getCommentBlocks = (input) => {
	return input.match(/\/\*\*\n?(.+?)\n?(?:\s*)?\*\//g);
};

const getBlockType = (block) => {
	const search = block.match(/@doxter[^\s\n]+/gm);
	if (search.length > 0) {
		if (types.includes(search[0])) {
			return types[types.indexOf(search[0])];
		}
	}
	return false;
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
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
});

const parseFile = (filepath) => new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, content) => {
        if (err) { return reject(`Something went wrong reading the file: '${err}'`); }
		Logger.debug(`File: ${filepath}`);
        const sections = [];
        const commentBlocks = getCommentBlocks(content);

        if (commentBlocks) {
            for (let commentBlock of commentBlocks) {
				Logger.debug(`Comment Block: ${commentBlock}`);
                const blockType = getBlockType(commentBlock);
				Logger.debug(`Comment Block Type: ${blockType}`);
                if (blockType) {
                    sections.push(blockType);
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
	getCommentBlocks,
	getBlockType,
	parseDirectory,
	parseFile
};
