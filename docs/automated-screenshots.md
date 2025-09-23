# Automated Screenshots for Tip Calculator App

This document provides instructions on setting up automated screenshots for the Tip Calculator React Native app using Maestro and Fastlane for both iOS and Android platforms.

## Overview

Automated screenshots are essential for app store submissions and marketing materials. This guide covers two popular tools:

- **Maestro**: A mobile UI testing framework that can automate interactions and capture screenshots
- **Fastlane**: A tool that automates mobile app deployment, including screenshot generation

## Prerequisites

### General Requirements
- Node.js and npm/pnpm
- Expo CLI
- EAS CLI (`pnpm install -g eas-cli`)
- Xcode (for iOS development)
- Android Studio (for Android development)

### For Maestro
- Install Maestro CLI:
  ```bash
  curl -Ls "https://get.maestro.mobile.dev" | bash
  ```

### For Fastlane
- Install Fastlane:
  ```bash
  # macOS
  brew install fastlane

  # Or using Ruby
  gem install fastlane
  ```

## Project Setup

### 1. Build the App for Testing

Since this is an Expo app, you'll need to build native binaries for screenshot automation:

```bash
# Build for Android
eas build -p android --profile production

# Build for iOS
eas build -p ios --profile production
```

Download the built APKs/IPAs from the EAS dashboard.

### 2. Set Up Device/Emulator

For consistent screenshots, use the same device/emulator configuration:

- **Android**: Use Android Emulator with a specific device (e.g., Pixel 5 API 33)
- **iOS**: Use iOS Simulator with a specific device (e.g., iPhone 14)

## Using Maestro for Screenshots

Maestro is great for interactive screenshots that require UI interactions.

### Setup Maestro Project

1. Create a `maestro` directory in your project root:
   ```bash
   mkdir maestro
   ```

2. Create a flow file for the main calculator screen: `maestro/calculator_flow.yaml`

### Example Maestro Flow

```yaml
appId: com.subnext.tipcalcbillsplit  # Update with your actual app ID
---
- launchApp
- tapOn: "Bill Amount"
- inputText: "100.00"
- tapOn: "15%"  # Select tip percentage
- tapOn: "No. of People"
- tapOn: "+"  # Increase to 2 people
- takeScreenshot: calculator-filled
- tapOn: "20%"  # Change tip to 20%
- takeScreenshot: calculator-20-percent
```

### Running Maestro Tests

```bash
# For Android
maestro test maestro/ --platform android

# For iOS
maestro test maestro/ --platform ios
```

### Screenshot Output

Screenshots will be saved in the `maestro/screenshots` directory.

**Current Maestro Flow Coverage:**
- **Calculator Tab:** 7 screenshots (empty, bill input, tip percentages, bill splitting)
- **Etiquette Tab:** 1 screenshot (tipping information)
- **Privacy Tab:** 1 screenshot (privacy policy)
- **Final State:** 1 screenshot (return to calculator)
- **Total:** 10 comprehensive screenshots covering all app features

## Using Fastlane for Screenshots

Fastlane provides plugins specifically for screenshot generation.

### Setup Fastlane

1. Initialize Fastlane in your project:
   ```bash
   fastlane init
   ```

2. Install required plugins:
   ```bash
   fastlane add_plugin screengrab  # For Android
   fastlane add_plugin snapshot    # For iOS
   ```

### Configure Fastlane for Android

Create `fastlane/Fastfile` with Android screenshot configuration:

```ruby
platform :android do
  desc "Take screenshots"
  lane :screenshots do
    screengrab(
      app_apk_path: "path/to/your/app.apk",
      tests_apk_path: "path/to/your/test.apk",
      locales: ["en-US"],
      clear_previous_screenshots: true,
      app_package_name: "com.subnext.tipcalcbillsplit",
      test_instrumentation_runner: "androidx.test.runner.AndroidJUnitRunner"
    )
  end
end
```

### Configure Fastlane for iOS

Add iOS configuration to `fastlane/Fastfile`:

```ruby
platform :ios do
  desc "Take screenshots"
  lane :screenshots do
    snapshot(
      scheme: "YourAppScheme",
      devices: ["iPhone 14"],
      languages: ["en-US"],
      clear_previous_screenshots: true
    )
  end
end
```

### UI Test Setup for Fastlane

For Fastlane screenshots, you need UI tests that navigate the app and capture screenshots.

#### Android (Using Espresso)

Create `androidTest` directory and add test:

```kotlin
// ScreenshotTest.kt
@RunWith(AndroidJUnit4::class)
class ScreenshotTest {

    @get:Rule
    val activityRule = ActivityTestRule(MainActivity::class.java)

    @Test
    fun testTakeScreenshot() {
        // Navigate to calculator screen
        onView(withId(R.id.bill_input)).perform(typeText("50.00"))
        onView(withText("15%")).perform(click())

        // Take screenshot
        Screengrab.screenshot("calculator_filled")
    }
}
```

#### iOS (Using XCUITest)

Create UI test in Xcode:

```swift
// ScreenshotTest.swift
class ScreenshotTest: XCTestCase {

    func testTakeScreenshot() {
        let app = XCUIApplication()
        app.launch()

        // Navigate and fill calculator
        let billField = app.textFields["Bill Amount"]
        billField.tap()
        billField.typeText("75.00")

        let tipButton = app.buttons["20%"]
        tipButton.tap()

        // Take screenshot
        snapshot("CalculatorFilled")
    }
}
```

### Running Fastlane Screenshots

```bash
# Android
fastlane android screenshots

# iOS
fastlane ios screenshots
```

## Best Practices

### Screenshot Naming Convention
- Use descriptive names: `calculator-empty`, `calculator-filled`, `split-bill`
- Include device and locale in filenames when using multiple configurations

### Device Configurations
- Test on multiple screen sizes: phone, tablet
- Test different orientations: portrait, landscape
- Use consistent device settings (language, theme)

### Automation Tips
- Use stable element identifiers (accessibility IDs)
- Add delays between interactions for UI stability
- Clean up screenshots between runs
- Version control your test flows and configurations

### Integration with CI/CD
- Run screenshot tests on every release
- Store screenshots in cloud storage (AWS S3, Google Cloud Storage)
- Compare screenshots for visual regression testing

## Troubleshooting

### Common Issues

1. **App not launching**: Ensure correct app ID/bundle identifier
2. **Elements not found**: Use accessibility labels or IDs
3. **Screenshots not saving**: Check write permissions and output paths
4. **UI tests failing**: Update test selectors after UI changes

### Debugging Maestro
```bash
# Record interactions
maestro record

# View hierarchy
maestro hierarchy
```

### Debugging Fastlane
```bash
# Verbose output
fastlane android screenshots --verbose

# Clean and retry
fastlane android screenshots --clean
```

## Resources

- [Maestro Documentation](https://maestro.mobile.dev/)
- [Fastlane Documentation](https://docs.fastlane.tools/)
- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [Android Screengrab](https://docs.fastlane.tools/getting-started/android/setup/#screengrab)
- [iOS Snapshot](https://docs.fastlane.tools/getting-started/ios/screenshots/)</content>
<parameter name="filePath">/Users/amit/dev/source/tip-calculator-reactnative/docs/automated-screenshots.md
