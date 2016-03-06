// ConfigKeys.swift
//
// Created by plistparser ( https://github.com/freesuraj/plisthelper )
// Created at Sun Mar 06 2016 21:56:51

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
