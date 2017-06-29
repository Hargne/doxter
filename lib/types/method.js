let content = {};

const getData = (input) => {
	const regex = /@param\s+(\{(.*?)\})\s(\S+)\s('(?:\\.|[^'\\])*')?/g;
	let match = regex.exec(input);
	const result = [];
	while (match != null) {
		result.push({
			type: match[2] || null,
			name: match[3] || null,
			description: match[4] || null,
		});
		match = regex.exec(input);
	}
	return result || null;
};

const init = (blockComment) => {
	content.data = getData(blockComment);
};

module.exports = {
	name: '@doxterMethod',
	content,
	init,
};
