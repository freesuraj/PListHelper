//
//  PListHelperTests.swift
//  PListHelperTests
//
//  Created by Suraj Pathak on 2/3/16.
//  Copyright © 2016 Suraj Pathak. All rights reserved.
//

import XCTest
@testable import PListHelper

class PListHelperTests: XCTestCase {
    
    let configManager = ConfigManager(configFileName: "AppConfig")
    
    override func setUp() {
        super.setUp()
    }
    
    override func tearDown() {
        super.tearDown()
    }
    func testLevel1String() {
        let actual = configManager.valueForKeyPath("Author") as! String
        XCTAssertEqual("PropetyGuru Pte Ltd", actual)
    }
    func testLevel3String() {
        let actual = configManager.valueForKeyPath("AppInfo.AppName.id") as! String
        XCTAssertEqual("Rumah", actual)
    }
    func testLevel4String() {
        let actual = configManager.valueForKeyPath("NewLaunches.ApiPath.list.default") as! String
        XCTAssertEqual("/v2/developerprojects/list", actual)
    }
    func testLevel3Dictionary() {
        let actual = configManager.valueForKeyPath("NewLaunches.Enabled") as! [String: Bool]
        let expected = ["default" : true, "sg": false, "my": true]
        XCTAssertEqual(expected, actual)
    }
    func testLevel4Array() {
        let actual = configManager.valueForKeyPath("NewLaunches.Filter.PriceArray.sg") as! [Int]
        let expected = [50000, 100000, 200000, 500000]
        XCTAssertEqual(expected, actual)
    }
    // MARK: Enum Constants
    func testKeyPath() {
        XCTAssertEqual(ConfigKeys.Author.keyPath(), "Author")
        XCTAssertEqual(ConfigKeys.AppInfo_AppIcon.keyPath(), "AppInfo.AppIcon")
    }
    
}
