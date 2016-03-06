//
//  ConfigFile.swift
//  PListHelper
//
//  Created by Suraj Pathak on 2/3/16.
//  Copyright © 2016 Suraj Pathak. All rights reserved.
//

import Foundation

class ConfigManager: NSObject {
    static let globalManager = ConfigManager()
    
    func valueForConfigKey(configKey: ConfigKeys) -> AnyObject? {
        return valueForKeyPath(configKey.keyPath())
    }
    
    override func valueForKeyPath(keyPath: String) -> AnyObject? {
        guard let path = NSBundle.mainBundle().pathForResource("AppConfig", ofType: "plist"),
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
