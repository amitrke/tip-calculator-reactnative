# Fastlane UI Test Setup for Tip Calculator

## How Fastlane Takes Screenshots

Fastlane uses **UI tests** to navigate your app and capture screenshots at specific moments.

## iOS: Using XCUITest

### 1. Create UI Test File
Create `ios/TipCalculatorUITests/TipCalculatorUITests.swift`:

```swift
import XCTest

class TipCalculatorUITests: XCTestCase {

    override func setUpWithError() throws {
        continueAfterFailure = false
    }

    func testTakeScreenshots() throws {
        let app = XCUIApplication()
        app.launch()

        // Screenshot 1: Empty calculator
        snapshot("01CalculatorEmpty")

        // Navigate to bill input
        let billField = app.textFields["Bill Amount"]
        billField.tap()
        billField.typeText("100.00")

        // Screenshot 2: Bill entered
        snapshot("02CalculatorBillEntered")

        // Select 15% tip
        app.buttons["15%"].tap()
        snapshot("03Calculator15Percent")

        // Select 20% tip
        app.buttons["20%"].tap()
        snapshot("04Calculator20Percent")

        // Add person
        app.buttons["Plus"].tap()
        snapshot("05CalculatorSplit2People")

        // Add another person
        app.buttons["Plus"].tap()
        snapshot("06CalculatorSplit3People")
    }
}
```

### 2. Configure Fastlane Snapshot
In `fastlane/Fastfile`:

```ruby
platform :ios do
  desc "Take screenshots"
  lane :screenshots do
    snapshot(
      scheme: "TipCalculator",
      testplan: "ScreenshotTests",
      devices: ["iPhone 14", "iPhone 14 Pro Max"],
      languages: ["en-US"],
      clear_previous_screenshots: true
    )
  end
end
```

## Android: Using Espresso

### 1. Create UI Test File
Create `android/app/src/androidTest/java/com/subnext/tipcalcbillsplit/ScreenshotTest.kt`:

```kotlin
package com.subnext.tipcalcbillsplit

import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.uiautomator.UiDevice
import androidx.test.uiautomator.UiSelector
import tools.fastlane.screengrab.Screengrab
import tools.fastlane.screengrab.locale.LocaleTestRule
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class ScreenshotTest {

    @get:Rule
    val localeTestRule = LocaleTestRule()

    @Test
    fun testTakeScreenshots() {
        val device = UiDevice.getInstance(InstrumentationRegistry.getInstrumentation())

        // Screenshot 1: Empty calculator
        Screengrab.screenshot("01_calculator_empty")

        // Find and fill bill amount
        val billField = device.findObject(UiSelector().textContains("Bill Amount"))
        billField.click()
        billField.text = "100.00"

        // Screenshot 2: Bill entered
        Screengrab.screenshot("02_calculator_bill_entered")

        // Select 15% tip
        device.findObject(UiSelector().text("15%")).click()
        Screengrab.screenshot("03_calculator_15_percent")

        // Select 20% tip
        device.findObject(UiSelector().text("20%")).click()
        Screengrab.screenshot("04_calculator_20_percent")

        // Add person
        device.findObject(UiSelector().description("Plus")).click()
        Screengrab.screenshot("05_calculator_split_2_people")

        // Add another person
        device.findObject(UiSelector().description("Plus")).click()
        Screengrab.screenshot("06_calculator_split_3_people")
    }
}
```

### 2. Configure Fastlane Screengrab
In `fastlane/Fastfile`:

```ruby
platform :android do
  desc "Take screenshots"
  lane :screenshots do
    screengrab(
      app_apk_path: "android/app/build/outputs/apk/release/app-release.apk",
      tests_apk_path: "android/app/build/outputs/apk/androidTest/release/app-release-androidTest.apk",
      locales: ["en-US"],
      clear_previous_screenshots: true,
      app_package_name: "com.subnext.tipcalcbillsplit",
      test_instrumentation_runner: "androidx.test.runner.AndroidJUnitRunner"
    )
  end
end
```

## How It Works

### 1. **UI Test Navigation**
- Fastlane runs your UI tests on real devices/simulators
- Tests interact with your app just like a user would
- Each test method represents a screenshot scenario

### 2. **Screenshot Capture**
- Call `snapshot()` (iOS) or `Screengrab.screenshot()` (Android) at key moments
- Fastlane captures the screen with proper device frames
- Screenshots are saved with descriptive names

### 3. **Multi-Device Execution**
- Tests run on multiple device configurations
- Fastlane handles device setup and cleanup
- Generates screenshots for different screen sizes

### 4. **Element Identification**
- Uses accessibility labels (like we added to your React Native components)
- Falls back to text content or UI hierarchy
- Reliable element location for consistent screenshots

## Running the Tests

```bash
# iOS
fastlane ios screenshots

# Android
fastlane android screenshots
```

## Key Points

1. **UI Tests Drive Navigation**: Fastlane doesn't "know" the screens - your UI tests tell it what to do
2. **Accessibility Labels**: The `accessibilityLabel` props we added make element finding reliable
3. **Screenshot Timing**: You control exactly when screenshots are taken
4. **Device Frames**: Fastlane automatically adds professional device frames to screenshots

This approach ensures consistent, professional screenshots that meet app store requirements!
