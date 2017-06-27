const App = require('./app');

const create = (args) => {
    return App.run(args);
};

module.exports = { create };
