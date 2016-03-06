var plist = require('plist');
var fs = require('fs')
var path = require('path')
var type = require('type-of')
// var result = plist.parse(fs.readFileSync('AppConfig.plist', 'utf8'));
var country = "sg"
var keysAndValues = {}
const userdir = process.cwd()
const exec = require('child_process').exec
// console.log(result.AppInfo.AppName.id)
// console.log(JSON.stringify(result) + "\n")
// console.log('json -> plist')
// console.log(plist.build(output));
// console.log(type(result.AppInfo.AppName))

function iterateJson(keys, output, country) {
  var allKeys = Object.keys(output)
  var countryKey = defaultKey(output, country)
  if(countryKey != null) {
      allKeys = [countryKey]
  }
  for(var i in allKeys) {
    var attributename = allKeys[i]
    var json = output
    var key = attributename
    var value = hasKey(json, country)
    if(value != null) {
      // console.log(keys.join('.') + ':' + JSON.stringify(value))
      keysAndValues[keys.join('.')] = value
    } else {
      while (type(json[key]) == 'object') {
          json = json[key]
          var copiedKeys = keys.concat()
          copiedKeys.push(key)
          iterateJson(copiedKeys, json, country)
      }
    }
  }
}

function defaultKey(json, country) {
  var finalValue = null
  for (var key in json) {
    if (key == 'default') {
      finalValue = 'default'
    } else if (key == country) {
      return country
    }
  }
  return finalValue;
}

function hasKey(json, country) {
  var finalValue = null
  for (var key in json) {
    if (key == 'default') {
      finalValue = json[key]
    } else if (key == country) {
      return json[country]
    }
  }
  return finalValue;
}

exports.parsePlist = function(file, _country) {
  result = plist.parse(fs.readFileSync(file, 'utf8'));
  country = _country
  iterateJson([], result, country)
  createNewPlist()
  var plistText = plist.build(result)
  var newPlistPath = path.join(userdir, path.basename(file,'.plist') + '_' + _country + '.plist')
  fs.writeFile(newPlistPath, plistText, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
}

// iterateJson([], result, country)
// createNewPlist()
// printNewPlist(true)

function createNewPlist() {
  for (var key in keysAndValues) {
    setDataByEvaluation(key,keysAndValues[key])
  }
}

function setDataByEvaluation(path, value) {
    eval("result." + path + "= value;")
}

function setDataByRecursion(key,val,obj) {
  if (!obj) obj = result; //outside (non-recursive) call, use "result" as our base object
  var ka = key.split(/\./); //split the key by the dots
  if (ka.length < 2) {
    obj[ka[0]] = val; //only one part (no dots) in key, just set value
  } else {
    if (!obj[ka[0]]) obj[ka[0]] = {}; //create our "new" base obj if it doesn't exist
    obj = obj[ka.shift()]; //remove the new "base" obj from string array, and hold actual object for recursive call
    setDataByRecursion(ka.join("."),val,obj); //join the remaining parts back up with dots, and recursively set data on our new "base" obj
  }
}

function printNewPlist(hasPlist) {
  if(!hasPlist) console.log(JSON.stringify(result))
  else console.log(plist.build(result));
}
