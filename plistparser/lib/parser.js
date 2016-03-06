var plist = require('plist');
var type = require('type-of')
var dateFormat = require('dateformat')
var multiline = require('multiline')
var fs = require('fs')
var path = require('path')

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
  // Generate country specific .plist file
  var newPlistPath = path.join(userdir, path.basename(file,'.plist') + '_' + _country + '.plist')
  createNewPlist(newPlistPath)
  // Generate ConfigKeys.swift file
  var newKeynameFile = path.join(userdir, 'ConfigKeys.swift')
  createNewConstantFile(newKeynameFile)
}

function createNewPlist(newPlistPath) {
  for (var key in keysAndValues) {
    setDataByEvaluation(key,keysAndValues[key])
  }
  var plistText = plist.build(result)
  fs.writeFile(newPlistPath, plistText, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
}

function createNewConstantFile(newKeynameFile) {
  var wstream = fs.createWriteStream(newKeynameFile);
  var header = multiline(function() {/*
// ConfigKeys.swift
//
// Created by plistparser ( https://github.com/freesuraj/plisthelper )
*/})
  var functionValue = multiline(function() {/*
   func keyPath() -> String {
      return self.rawValue.stringByReplacingOccurrencesOfString("_", withString: ".")
   }
  */})
 var configManager = multiline(function() {/*
class ConfigManager: NSObject {
   let plistConfigName: String

   required init(configFileName: String) {
       plistConfigName = configFileName
   }

   func valueForConfigKey(configKey: ConfigKeys) -> AnyObject? {
       return valueForKeyPath(configKey.keyPath())
   }

   override func valueForKeyPath(keyPath: String) -> AnyObject? {
       guard let path = NSBundle.mainBundle().pathForResource(plistConfigName, ofType: "plist"),
       let dictionary = NSDictionary(contentsOfFile: path) else {
           return nil
       }
       return valueForKeyPath(keyPath, inDictionary: dictionary)
   }

   private func valueForKeyPath(keypath: String, inDictionary dictionary: NSDictionary) -> AnyObject? {
       let keys = keypath.componentsSeparatedByString(".")
       var currentDictionary = dictionary
       for (index, aKey) in keys.enumerate() {
           if index == keys.count - 1 {
               return currentDictionary.valueForKey(aKey)
           }
           guard let dict = currentDictionary.valueForKey(aKey) as? NSDictionary else {
               return nil
           }
           currentDictionary = dict
       }
       return nil
   }
}
   */})
  wstream.write(header);

  wstream.write('\n// Created at ' + dateFormat()+'\n\n')
  wstream.write('import Foundation\n\n');
  wstream.write('enum ConfigKeys: String { \n\n');
  for (var key in keysAndValues) {
    var keyName = key.split('.').join('_')
    wstream.write('   case '+ keyName + '\n')
  }
  wstream.write('\n'+functionValue)
  wstream.write('\n} \n\n');
  wstream.write(configManager)
  wstream.end();
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
