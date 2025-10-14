# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Easy Tip and Split Calculator is a React Native app built with Expo that helps users calculate tips and split bills. The app includes three main tabs: Calculator (main functionality), Etiquette (tipping information for different countries), and Privacy Policy.

**Tech Stack:**
- React Native with Expo (v53)
- TypeScript with strict mode
- GluestackUI for components
- React Navigation (bottom tabs + stack)
- Lucide React Native for icons

**Bundle Identifiers:**
- iOS: `com.subnext.tipcalcbillsplit`
- Android: `com.subnext.tipcalcbillsplit`

## Common Development Commands

### Running the App
```bash
yarn start              # Start Expo dev server
yarn android            # Run on Android
yarn ios               # Run on iOS
yarn web               # Run on web
```

### Building
```bash
# Local builds (development/testing)
yarn build:android:local    # Android APK (preview profile)
yarn build:ios:local        # iOS app (preview profile, macOS only)
yarn build:all:local        # Both platforms

# Production cloud builds (App Store ready)
yarn build:android:cloud    # Android for Google Play
yarn build:ios:cloud        # iOS for App Store
yarn build:all:cloud        # Both platforms
```

### Testing & Screenshots
```bash
# Maestro UI testing
yarn maestro:studio              # Interactive testing studio
yarn maestro:test:android        # Run Android tests
yarn maestro:test:ios            # Run iOS tests
yarn screenshots                 # Generate screenshots (all tabs)
yarn organize:screenshots        # Organize screenshots for app stores

# Fastlane (Google Play uploads)
fastlane android upload_screenshots    # Upload screenshots only
fastlane android upload_all            # Upload APK + screenshots
fastlane android build_and_upload      # Full workflow
```

### Release Management
```bash
yarn release-it         # Interactive release workflow
```

## Architecture & Code Structure

### Navigation Hierarchy
```
App (GluestackUIProvider)
└── Navigation (NavigationContainer)
    └── RootNavigator (Stack)
        └── BottomTabNavigator
            ├── Calculator Tab → TabOneNavigator (Stack) → TabOneScreen
            ├── Etiquette Tab → TabTwoNavigator (Stack) → TabTwoScreen
            └── Privacy Tab → PrivacyNavigator (Stack) → PrivacyPolicyScreen
```

**Key Files:**
- `App.tsx` - Root component with GluestackUI provider
- `index.ts` - Entry point, registers root component
- `navigation/index.tsx` - Navigation container and root stack navigator
- `navigation/BottomTabNavigator.tsx` - Bottom tab navigator with three tabs, each wrapped in stack navigator
- `screens/TabOneScreen.tsx` - Main calculator logic (bill, tip %, split calculation)
- `screens/TabTwoScreen.tsx` - Tipping etiquette information
- `screens/PrivacyPolicyScreen.tsx` - Privacy policy
- `components/HermesDetector.tsx` - Utility component

### Calculator Logic (TabOneScreen.tsx)
The calculator uses React hooks for state management:
- **State:** `billAmount` (string), `tipPct` (number, default 15), `numberOfPeople` (number, default 1)
- **Calculations:** Use `useMemo` to compute `tipAmount`, `totalAmount`, `eachPersonPays`
- **UI Components:** GluestackUI components (Input, Button, Slider, etc.)
- **Predefined tip percentages:** 10%, 15%, 20%, 25%
- **Slider range:** 0-50% with 1% step increments

### Testing & Automation

**Maestro Flows:**
- Location: `maestro/calculator_flow.yaml`
- Covers all three tabs with 10+ screenshots
- App ID: `com.subnext.tipcalcbillsplit`
- Flow: Calculator (empty → bill entry → tip selection → split) → Etiquette → Privacy
- Screenshots saved to `maestro/screenshots/`

**Fastlane Configuration:**
- Platform: Android only (configured)
- Location: `fastlane/Fastfile`, `fastlane/Appfile`
- Package name: `com.subnext.tipcalcbillsplit`
- Screenshots organized by device type: `phoneScreenshots/`, `tabletScreenshots/`, `largeTabletScreenshots/`
- Requires `GOOGLE_PLAY_JSON_KEY_FILE` environment variable

### Build Configuration

**EAS Build (eas.json):**
- **development:** Internal distribution, simulator builds, development client enabled
- **preview:** Internal distribution, Release build, auto-increment version (local builds)
- **production:** Store distribution, Release build, auto-increment version (cloud builds)

**App Configuration (app.json):**
- Display name: "Easy Tip and Split Calculator"
- Slug: `tip-calculator-reactnative`
- New Architecture: Enabled
- iOS: Supports tablet, no encryption export compliance needed
- Android: Edge-to-edge enabled, adaptive icon configured

### Environment & Dependencies

**TypeScript:**
- Extends `expo/tsconfig.base`
- Strict mode enabled
- Excludes `Archive/` directory

**Key Dependencies:**
- React 19.0.0, React Native 0.79.5
- Expo SDK ~53.0.22
- GluestackUI for theming and components
- React Navigation v6 for navigation
- Lucide React Native for icons

## Documentation

Comprehensive documentation is available in the `docs/` directory:
- `automated-screenshots.md` - Maestro and Fastlane screenshot setup
- `google-play-setup.md` - Google Play Store configuration
- `deployment.md` - Deployment workflows
- `contributing.md` - Contribution guidelines
- Additional guides for Fastlane and UI testing

## Git Workflow

**Branches:**
- `main` - Production branch (use for PRs)
- `develop` - Development branch (current working branch)

**Current Status:** Clean working tree
