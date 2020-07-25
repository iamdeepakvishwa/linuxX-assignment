const monk = require('monk');
const db = monk('localhost/auth');

module.exports = db;