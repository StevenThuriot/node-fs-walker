[![node-fs-walker](https://cloud.githubusercontent.com/assets/544444/5549133/d1b80be4-8b82-11e4-9951-c1673b8d3e68.png)](https://github.com/StevenThuriot/node-fs-walker)
==============

Recursively walk through the filesystem, searching for files and directories, either async or synchronous while optionally filtering.

The walker will always respond with an [`fs_stats`](http://nodejs.org/api/fs.html#fs_class_fs_stats) instances, retrieved using lstat and decorated with extra properties:

- directory
- name
- fullname _(which is a concatenation of directory and name)_

#Installation
Install using npm:

```
npm install --save fs-walker
```

Then require:

```javascript
var walk = require('fs-walker');
```


#Usage

node-fs-walker comes in three flavours:

- Async
- Sync
- Events

The first two flavours both can walk through three options:

- files
- directories
- both

The third flavour has the following events defined, depending on the type found:

- file
- dir
- block
- character
- symbolic
- fifo
- socket
- unknown

##Initial 

The following samples all use this setup:

```javascript
var dir = process.cwd(),
    walk = require('fs-walker');
```

##Async

###Files

```javascript
walk(dir, function(stats) {
  console.log(stats.fullname);
});
```

_note: walk is a shortcut for walk.files, so the following works as well. This will make more sense in the other samples._

```javascript
walk.files(dir, function(stats) {
  console.log(stats.fullname);
});
```

###Directories

```javascript
walk.directories(dir, function(stats) {
  console.log(stats.fullname);
});
```

###Both

```javascript
walk.all(dir, function(stats) {
  console.log(stats.fullname);
});
```


##Sync

All the above handlers have a synchronous variant, which maps with the async callers.

- walk.sync or walk.files.sync
- walk.directories.sync
- walk.all.sync
 
These return an array of [`fs_stats`](http://nodejs.org/api/fs.html#fs_class_fs_stats) instances instead.

##Events

_note: Under the hood, the async walker will be used._

```javascript
var walker = new walk.Walker(dir);

walker.on('file', function(stats) {
        console.log('file event: %s', stats.fullname);
      })
      .on('dir', function(stats) {
        console.log('dir event: %s', stats.fullname);
      })
      .walk();
```


##Filters

It is possible to filter both files and directories. The filter also receives an [`fs_stats`](http://nodejs.org/api/fs.html#fs_class_fs_stats) instance.

The filter looks as follows:

```javascript
var filter = { 
  file: function(stats) {
    return /\.js$/i.test(stats.name);
  }, 
  directory: function(stats) {
    return stats.name !== 'node_modules';
  }
};
```

This filter will make it so that only files are returned that end in `.js` and will not be looking in the `node_modules` folder while walking the file-system.

It is possible to omit the `file`, `directory` or both filters, e.g.:

```javascript
var filter = { 
  directory: function(stats) {
    return stats.name !== 'node_modules';
  }
};
```

The filter handler is picked based on [`fs_stats`](http://nodejs.org/api/fs.html#fs_class_fs_stats)'s `isDirectory()`.
Using the filter is done by passing it as the second argument, as follows:

###Async

```javascript
walk(dir, filter, function(stats) {
    console.log(stats.fullname);
});
```

###Sync

```javascript
walk.sync(dir, filter).forEach(function(stats) {
    console.log(stats.fullname);
});
```

###Events

```javascript
var walker = new walk.Walker(dir);

walker.on('file', function(stats) {
        console.log('file event: %s', stats.fullname);
      })
      .on('dir', function(stats) {
        console.log('dir event: %s', stats.fullname);
      })
      .walk(filter);
```
