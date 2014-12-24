'use strict';

var walk = require('./walk');

var walkAll = function (dir, filter, callback) {
    walk(dir, function (stats) {
        if (stats.isDirectory() && filter.directory(stats) === true) {
            callback(stats);
            walkAll(stats.fullname, filter, callback);
        } else if (filter.file(stats) === true) {
            callback(stats);
        }
    });
};

var walkAllSync = function (dir, filter, list) {
    return walk.sync(dir, list, function (stats) {
        if (stats.isDirectory() && filter.directory(stats) === true) {
            list.push(stats);
            list = walkAllSync(stats.fullname, filter, list);
        } else if (filter.file(stats) === true) {
            list.push(stats);
        }
    });
};


module.exports = walkAll;
module.exports.sync = walkAllSync;