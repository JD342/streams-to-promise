const Promise = require('any-promise');
const promiseStream = require('stream-to-promise');

module.exports = all;
module.exports.all = all;
module.exports.race = race;

function all(...streams) {
    return Promise.all(streams.map(promiseStream));
}

function race(...streams) {
    return Promise.race(streams.map(promiseStream));
}
