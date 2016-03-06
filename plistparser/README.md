[![NPM version][npm-image]][npm-url]
[![Twitter](https://img.shields.io/badge/twitter-@iosCook-blue.svg?style=flat)](http://twitter.com/iosCook)

#### plist parser

Helps to parse plist for country specific configuration

#### Usage
```
Usage: plistparser [options]

  A command line tool to parse plist

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -n, --name [path]        Path of the input plist file
    -c, --country [country]  name of country, if not specified uses default

Example
     $ plistparser -n path/to/plist/file.plist -c sg

Creates a converted plist and a swift file with keypath constants in the current directory
```

### Screenshots
![output_plist](https://github.com/freesuraj/plisthelper/blob/master/assets/screenshots/output_plist.png?raw=true)

![output_swift](https://github.com/freesuraj/plisthelper/blob/master/assets/screenshots/output_swift.png?raw=true)


[npm-url]: https://npmjs.org/package/plistparser
[npm-image]: https://img.shields.io/npm/v/plistparser.svg
