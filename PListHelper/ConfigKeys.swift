//
//  ConfigConstants.swift
//  PListHelper
//
//  Created by Suraj Pathak on 6/3/16.
//  Copyright © 2016 Suraj Pathak. All rights reserved.
//

import Foundation

enum ConfigKeys: String {
    case Author
    case AppInfo
    case AppInfo_AppName
    case AppInfo_AppIcon
    
    func keyPath() -> String {
        return self.rawValue.stringByReplacingOccurrencesOfString("_", withString: ".")
    }
}