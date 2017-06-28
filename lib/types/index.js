const method = require("./method");

const allTypes = [
	method,
];

const getType = (input) => {
	if (!input) { return null; }
	const typeSearch = input.match(/@doxter[^\s\n]+/g);

	if (typeSearch) {
		const name = typeSearch[0];
		for (let type of allTypes) {
			if (type.name === name) {
				type.init(input);
				return type;
			}
		}
	}

	return null;
};

module.exports = {
	getType,
};
