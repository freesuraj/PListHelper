var plist = require('plist');
var fs = require('fs')
var output = plist.parse(fs.readFileSync('AppConfig.plist', 'utf8'));
console.log('plist -> json')
console.log(JSON.stringify(output))
console.log('json -> plist')
console.log(plist.build(output));
