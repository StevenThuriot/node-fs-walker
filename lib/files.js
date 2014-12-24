'use strict';

var walk = require('./walk');

var walkFiles = function (dir, filter, callback) {
    walk(dir, function (stats) {
        if (stats.isDirectory()) {
            if (filter.directory(stats) === true) {
                walkFiles(stats.fullname, filter, callback);
            }
        } else if (filter.file(stats) === true) {
            callback(stats);
        }
    });
};

var walkFilesSync = function (dir, filter, list) {
    return walk.sync(dir, list, function (stats) {
        if (stats.isDirectory()) {
            if (filter.directory(stats) === true) {
                list = walkFilesSync(stats.fullname, filter, list);
            }
        } else if (filter.file(stats) === true) {
            list.push(stats);
        }
    });
};

module.exports = walkFiles;
module.exports.sync = walkFilesSync;