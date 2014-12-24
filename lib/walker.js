'use strict';

var Walker = function (dir) {
    this.__dir = dir;
};

Walker.prototype.__proto__ = require("events").EventEmitter.prototype;

var walk = require('./hookup');

Walker.prototype.__getFileType = function (stats) {
    if (stats.isFile()) {
        return 'file';
    }

    if (stats.isDirectory()) {
        return 'dir';
    }

    if (stats.isBlockDevice()) {
        return 'block';
    }

    if (stats.isCharacterDevice()) {
        return 'character';
    }

    if (stats.isSymbolicLink()) {
        return 'symbolic';
    }

    if (stats.isFIFO()) {
        return 'fifo';
    }

    if (stats.isSocket()) {
        return 'socket';
    }

    return 'unknown';
}

Walker.prototype.walk = function (filter) {
    var self = this;
    var dir = self.__dir;

    walk.all(dir, filter, function (stats) {
        var type = self.__getFileType(stats);
        self.emit(type, stats);
    });

    return this;
}

module.exports = Walker;