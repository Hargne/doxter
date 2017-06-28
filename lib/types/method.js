const data = {};

const getAllParams = (input) => {
	const regex = /@param\s+(\{(.*?)\})/g;
	let match = regex.exec(input);
	const res = [];
	while (match != null) {
		res.push(match[1]);
		match = regex.exec(input);
	}
	return res || null;
};

const init = (blockComment) => {
	data.params = getAllParams(blockComment);
};

module.exports = {
	name: '@doxterMethod',
	data,
	init,
};
