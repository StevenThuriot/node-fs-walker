'use strict';

var defaultFilter = {
    file: function () {
        return true;
    },
    directory: function () {
        return true;
    }
};

module.exports = function (filter) {
    filter = filter || {};

    if (!filter.hasOwnProperty('file')) {
        filter.file = defaultFilter.file;
    }

    if (!filter.hasOwnProperty('directory')) {
        filter.directory = defaultFilter.directory;
    }

    return filter;
};