const Settings = require('./settings');
const Logger = require('./logger');
const Parser = require('./parser');

const run = (args) => {
    return Parser.parseDirectory(Settings.source)
    .then(response => Logger.debug(response))
    .catch(error => Logger.error(error));
};

module.exports = {
	run,
};
