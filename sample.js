var walk = require('./index'),
    util = require('util');


var filter = {
    file: function (stats) {
        //console.log('File: %s', util.inspect(stats));  
        return /\.js$/i.test(stats.name);
    },
    directory: function (stats) {
        //console.log('Directory: %s', util.inspect(stats));
        return stats.name !== 'node_modules';
    }
};

var walker = new walk.Walker(process.cwd());

walker.on('file', function (stats) {
    console.log('file event: %s', stats.fullname);
})
    .on('dir', function (stats) {
        console.log('dir event: %s', stats.fullname);
    }).walk(filter);

walker.on('file', function (stats) {
    console.log('file event: %s', stats.fullname);
})
    .on('dir', function (stats) {
        console.log('dir event: %s', stats.fullname);
    }).walk();


walk(process.cwd(), function (stats) {
    console.log(stats.fullname);
});

walk.sync(process.cwd()).forEach(function (stats) {
    console.log(stats.fullname);
});

console.log('Async files:');
walk(process.cwd(), filter, function (stats) {
    console.log(stats.fullname);
});

console.log('Sync files:');
walk.sync(process.cwd(), filter).forEach(function (stats) {
    console.log(stats.fullname);
});

//Is the same as the above
console.log('Async files:');
walk.files(process.cwd(), filter, function (stats) {
    console.log(stats.fullname);
});

console.log('Sync files:');
walk.files.sync(process.cwd(), filter).forEach(function (stats) {
    console.log(stats.fullname);
});



console.log('Async directories:');
walk.directories(process.cwd(), filter, function (stats) {
    console.log(stats.fullname);
});

console.log('Sync directories:');
walk.directories.sync(process.cwd(), filter).forEach(function (stats) {
    console.log(stats.fullname);
});



console.log('Async all:');
walk.all(process.cwd(), filter, function (stats) {
    console.log(stats.fullname);
});

console.log('Sync all:');
walk.all.sync(process.cwd(), filter).forEach(function (stats) {
    console.log(stats.fullname);
});