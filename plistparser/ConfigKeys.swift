// ConfigKeys.swift
//
// Created by plistparser ( https://github.com/freesuraj/plisthelper )
// Created at Sun Mar 06 2016 22:40:53

import Foundation

enum ConfigKeys: String { 

   case AppInfo_AppName
   case AppInfo_AppIcon
   case NewLaunches_Enabled
   case NewLaunches_ApiPath_constants
   case NewLaunches_ApiPath_list
   case NewLaunches_ApiPath_featured
   case NewLaunches_Filter_YearArray
   case NewLaunches_Filter_PriceArray
   case NewLaunches_Filter_Districts

   func keyPath() -> String {
      return self.rawValue.stringByReplacingOccurrencesOfString("_", withString: ".")
   }
} 

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