'use strict';

var walk = require('./walk');

var walkDirectories = function (dir, filter, callback) {
    walk(dir, function (stats) {
        if (stats.isDirectory() && filter.directory(stats) === true) {
            callback(stats);
            walkDirectories(stats.fullname, filter, callback);
        }
    });
};

var walkDirectoriesSync = function (dir, filter, list) {
    return walk.sync(dir, list, function (stats) {
        if (stats.isDirectory() && filter.directory(stats) === true) {
            list.push(stats);
            list = walkDirectoriesSync(stats.fullname, filter, list);
        }
    });
};

module.exports = walkDirectories;
module.exports.sync = walkDirectoriesSync;