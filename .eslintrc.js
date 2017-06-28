var path = require('path');
module.exports = {
  "rules": {
	  "indent": [2, "tab", { "SwitchCase": 1, "VariableDeclarator": 1 }],
	  "max-len": [2, 150],
	  "no-tabs": "off",
	  "import/no-extraneous-dependencies": "off",
	  "import/no-unresolved": "off",
	  "arrow-parens": "off",
	  "no-plusplus": "off",
	  "no-mixed-operators": "off",
	  "new-cap": "off"
  },
  "parserOptions": {
	  "ecmaVersion": 6
  },
};
