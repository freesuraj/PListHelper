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

Creates a converted plist in the current directory
```
