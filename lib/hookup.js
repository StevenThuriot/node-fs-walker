'use strict';

var path = require('path'),
    fs = require('fs'),
    createFilter = require('./filter');


var createMethod = function (type, async) {

    var caller = require('./' + type);

    if (async === false) {
        caller = caller.sync;

        return function (dir, filter) {
            filter = createFilter(filter);
            return caller(dir, filter, []);
        };
    }

    return function (dir, filter, callback) {
        if (typeof filter === 'function') {
            callback = filter;
            filter = undefined;
        }

        if (!callback) throw new Error('A callback needs to be defined.');
        filter = createFilter(filter);
        return caller(dir, filter, callback);
    };
};


module.exports = createMethod('files', true);;


module.exports.files = module.exports;
module.exports.files.sync = createMethod('files', false);


module.exports.directories = createMethod('directories', true);
module.exports.directories.sync = createMethod('directories', false);


module.exports.all = createMethod('all', true);
module.exports.all.sync = createMethod('all', false);