const monk = require('monk');
const db = monk('mongodb://localhost/linuxX');

module.exports = db;