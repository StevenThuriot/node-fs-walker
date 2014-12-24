'use strict';

var path = require('path'),
    fs = require('fs');

var populateStats = function (stats, dir, file, fullname) {
    stats.directory = dir;
    stats.name = file;
    stats.fullname = fullname;
}

var walk = function (dir, callback) {
    fs.readdir(dir, function (err, files) {
        if (err) throw err;

        files.forEach(function (file) {
            var fullname = path.join(dir, file);
            fs.lstat(fullname, function (err, stats) {
                if (err) throw err;

                populateStats(stats, dir, file, fullname);
                callback(stats);
            });
        });
    });
};

var walkSync = function (dir, list, callback) {
    var files = fs.readdirSync(dir);

    files.forEach(function (file) {
        var fullname = path.join(dir, file);
        var stats = fs.lstatSync(fullname);

        populateStats(stats, dir, file, fullname);
        callback(stats);
    });

    return list;
};



module.exports = walk;
module.exports.sync = walkSync;