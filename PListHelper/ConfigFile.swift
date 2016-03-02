//
//  ConfigFile.swift
//  PListHelper
//
//  Created by Suraj Pathak on 2/3/16.
//  Copyright © 2016 Suraj Pathak. All rights reserved.
//

import Foundation

class ConfigManager: NSObject {
    static var globalManager: ConfigManager {
        struct Static {
            static let instance: ConfigManager = ConfigManager()
        }
        Static.instance.updateConfig()
        return Static.instance
    }
    
    private var configs: [Config] = []
    
    func updateConfig() {
        configs = [
            Config(_key: "LocalDebug", _value: true),
            Config(_key: "PGPOI.Google_Api", _value: "AlzaSy"),
            Config(_key: "PGPOI.Google_Api_Debug", _value: "ldajkAkk"),
            Config(_key: "PGPOI.SupportedTypes", _value: ["Transportation_TrainOnly", "Medical", "Food", "School"]),
            Config(_key: "PGPOI.Feature_Landmark", _value: [
            	["Name": "Changi Airport", "lat": 1.2, "long": 103.3],
            	["Name": "Raffles Place", "lat": 1.2, "long": 103.3],
            	["Name": "Orchard Road", "lat": 1.2, "long": 103.3]]),
            Config(_locale: "sg", _key: "HomePage.Sections", _value: ["lastSearch", "lastViewed", "featuredProjects"]),
            Config(_locale: "th", _key: "HomePage.Sections", _value: ["lastSearch", "featuredProjects"]),
            Config(_key: "HomePage.Sections", _value: ["lastSearch", "lastViewed", "shortListed"])
        ]
    }
    
    func configForKey(key: String, locale: String) -> AnyObject {
        return ""
    }
}

class Config: NSObject {
    let locale: String
    let key: String
    let value: AnyObject
    
    init(_locale: String? = "default", _key: String, _value: AnyObject) {
        if let loc = _locale {
            locale = loc
        } else {
            locale = "default"
        }
        key = _key
        value = _value
    }
}

