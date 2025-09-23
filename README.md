# Tip Calculator React Native App

This is a React Native appli## Automated Testing & Screenshots

### Maestro (UI Testing & Screenshots)
```bash
# Run tests
yarn maestro:test

# Android only
yarn maestro:test:android

# iOS only
yarn maestro:test:ios

# Take screenshots (recommended for screenshot generation)
yarn maestro:screenshots
# or
yarn screenshots
```

### Fastlane (App Store Uploads)
```bash
# Upload screenshots to Google Play Store
fastlane android upload_screenshots

# Upload APK + screenshots
fastlane android upload_all

# Build, screenshot, and upload everything
fastlane android build_and_upload
```

For detailed setup instructions, see:
- [`docs/automated-screenshots.md`](docs/automated-screenshots.md) - Screenshot generation
- [`docs/google-play-setup.md`](docs/google-play-setup.md) - Google Play Store uploadspo that functions as a tip calculator. It also provides information about tipping etiquette in different countries.

## Features

*   **Tip Calculator:**
    *   Calculate the tip amount based on the bill amount and tip percentage.
    *   Calculate the total amount (bill + tip).
    *   Split the bill among a number of people and calculate the amount each person pays.
*   **Tipping Etiquette:**
    *   Provides information about tipping customs in the United States, United Kingdom, and Australia.

## Tech Stack

*   React Native
*   Expo
*   TypeScript
*   NativeBase for UI components
*   React Navigation for navigation

## App Structure

The app has a tab-based navigation with two tabs:

*   **Calculator:** This is the main screen of the app where the user can perform tip calculations.
*   **Etiquette:** This screen provides information about tipping etiquette.

## How to Run the App

1.  Install dependencies: `yarn install`
2.  Start the app: `yarn start`

This will open the Expo developer tools in your browser. You can then run the app on an Android or iOS simulator, or on a physical device using the Expo Go app.

## Building for Production

### Quick Local Builds (Development/Testing)
```bash
# Android APK
yarn build:android:local

# iOS App (macOS only)
yarn build:ios:local

# Both platforms
yarn build:all:local
```

### Production Cloud Builds (App Store Ready)
```bash
# Android APK for Google Play
yarn build:android:cloud

# iOS App for App Store
yarn build:ios:cloud

# Both platforms
yarn build:all:cloud
```

For detailed build information, see [`docs/build-scripts.md`](docs/build-scripts.md).

## Automated Testing & Screenshots

### Maestro (UI Testing & Screenshots)
```bash
# Run tests
yarn maestro:test

# Android only
yarn maestro:test:android

# iOS only
yarn maestro:test:ios

# Take screenshots (recommended)
yarn maestro:screenshots
# or
yarn screenshots
```

For more information about automated screenshots, see [`docs/automated-screenshots.md`](docs/automated-screenshots.md).
