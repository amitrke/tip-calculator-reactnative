# Deployment Guide

This guide covers the deployment process for the Easy Tip and Split Calculator app to both iOS App Store and Google Play Store.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Build Configuration](#build-configuration)
- [iOS Deployment](#ios-deployment)
- [Android Deployment](#android-deployment)
- [Automated Deployment](#automated-deployment)
- [Version Management](#version-management)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

### Required Accounts
- [Apple Developer Program](https://developer.apple.com/programs/) ($99/year)
- [Google Play Console](https://play.google.com/console/) (one-time $25 fee)
- [Expo Account](https://expo.dev/)

### Development Tools
- Node.js (v14+)
- pnpm (recommended) or npm
- Expo CLI (`pnpm add -g @expo/cli` or `npm install -g @expo/cli`)
- EAS CLI (`pnpm add -g @expo/eas-cli` or `npm install -g @expo/eas-cli`)
- Git

### App Store Setup
- iOS Bundle ID: `com.subnext.tipcalcbillsplit`
- Android Package Name: `com.subnext.tipcalcbillsplit`

## 🌍 Environment Setup

### 1. Configure EAS Build

```bash
# Login to Expo
expo login

# Configure EAS for your project
eas build:configure

# Select your Apple account for iOS
# Select your Google Service Account for Android
```

### 2. Environment Variables

Create environment files for different environments:

```bash
# .env.production
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_ENVIRONMENT=production

# .env.staging
EXPO_PUBLIC_API_URL=https://staging-api.example.com
EXPO_PUBLIC_ENVIRONMENT=staging
```

### 3. EAS Build Configuration

Create `eas.json` in your project root:

```json
{
  "build": {
    "production": {
      "channel": "production",
      "env": {
        "EXPO_PUBLIC_ENVIRONMENT": "production"
      }
    },
    "staging": {
      "channel": "staging",
      "env": {
        "EXPO_PUBLIC_ENVIRONMENT": "staging"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "your-app-store-connect-app-id"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account-key.json",
        "track": "internal"
      }
    }
  }
}
```

## ⚙️ Build Configuration

### App Configuration (`app.json`)

```json
{
  "expo": {
    "name": "Easy Tip and Split Calculator",
    "slug": "tip-calculator-reactnative",
    "version": "3.6.0",
    "ios": {
      "bundleIdentifier": "com.subnext.tipcalcbillsplit",
      "buildNumber": "3.6.0"
    },
    "android": {
      "package": "com.subnext.tipcalcbillsplit",
      "versionCode": 420030600
    }
  }
}
```

### Version Numbering

- **iOS**: `buildNumber` (string, e.g., "3.6.0")
- **Android**: `versionCode` (integer, e.g., 420030600)
  - Format: `4` + `2` + `003` + `0600`
  - `4` = major version (4)
  - `2` = minor version (2)
  - `003` = patch version (3)
  - `0600` = build number (600)

## 🍎 iOS Deployment

### Method 1: EAS Build + Submit (Recommended)

```bash
# Build for iOS
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios --profile production
```

### Method 2: Manual Process

#### 1. Build with EAS

```bash
eas build --platform ios
```

#### 2. Download and Upload to App Store Connect

1. Download the `.ipa` file from EAS build
2. Go to [App Store Connect](https://appstoreconnect.apple.com/)
3. Create a new version or update existing
4. Upload the `.ipa` file
5. Fill in version information, screenshots, and metadata
6. Submit for review

### App Store Connect Setup

#### Required Assets
- App Icon (1024x1024px)
- Screenshots (various sizes)
- App Description
- Keywords
- Support URL
- Privacy Policy URL

#### TestFlight
```bash
# Submit to TestFlight
eas submit --platform ios --profile production
```

## 🤖 Android Deployment

### Method 1: EAS Build + Submit (Recommended)

```bash
# Build for Android
eas build --platform android --profile production

# Submit to Google Play
eas submit --platform android --profile production
```

### Method 2: Manual Process

#### 1. Build with EAS

```bash
eas build --platform android
```

#### 2. Upload to Google Play Console

1. Download the `.aab` file from EAS build
2. Go to [Google Play Console](https://play.google.com/console/)
3. Create a new release
4. Upload the `.aab` file
5. Fill in release notes
6. Set rollout percentage
7. Publish

### Google Play Setup

#### Required Assets
- App Icon (512x512px)
- Feature Graphic (1024x500px)
- Screenshots (various sizes)
- App Description
- Short Description
- Privacy Policy

#### Internal Testing
```bash
# Submit to internal test track
eas submit --platform android --profile production
```

## 🚀 Automated Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy
on:
  push:
    branches: [ main ]
  release:
    types: [ published ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: latest

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Install Expo CLI
        run: pnpm add -g @expo/cli

      - name: Install EAS CLI
        run: pnpm add -g @expo/eas-cli

      - name: Login to Expo
        run: expo login -u ${{ secrets.EXPO_USERNAME }} -p ${{ secrets.EXPO_PASSWORD }}

      - name: Build for Android
        run: eas build --platform android --profile production --non-interactive

      - name: Build for iOS
        run: eas build --platform ios --profile production --non-interactive

      - name: Submit to App Stores
        run: |
          eas submit --platform android --profile production --non-interactive
          eas submit --platform ios --profile production --non-interactive
```

### Required Secrets

Add these to your GitHub repository secrets:
- `EXPO_USERNAME`: Your Expo username
- `EXPO_PASSWORD`: Your Expo password
- `EXPO_APPLE_ID`: Apple ID for iOS submission
- `EXPO_APPLE_PASSWORD`: Apple app-specific password

## 📦 Version Management

### Automated Versioning with Standard Version

```bash
# Install standard-version
pnpm add -g standard-version
# or
npm install -g standard-version

# Create patch release
standard-version

# Create minor release
standard-version --release-as minor

# Create major release
standard-version --release-as major

# Preview changes
standard-version --dry-run
```

### Manual Version Updates

Update version in `app.json`:

```json
{
  "expo": {
    "version": "3.7.0",
    "ios": {
      "buildNumber": "3.7.0"
    },
    "android": {
      "versionCode": 420030700
    }
  }
}
```

## 🔧 Troubleshooting

### Common iOS Issues

#### Build Failures
```bash
# Clear build cache
expo build:ios --clear-cache

# Check build logs
eas build:list
eas build:view <build-id>
```

#### App Store Rejections
- Ensure all screenshots are up to date
- Check for any missing privacy policy
- Verify app description matches functionality
- Test on multiple devices

### Common Android Issues

#### Build Failures
```bash
# Clear build cache
expo build:android --clear-cache

# Check for Google Services
# Ensure google-services.json is properly configured
```

#### Play Store Rejections
- Update target SDK version regularly
- Ensure proper privacy policy
- Test on various Android versions
- Check for any missing permissions

### EAS CLI Issues

#### Authentication Problems
```bash
# Logout and login again
eas logout
eas login

# Check account
eas whoami
```

#### Build Queue Issues
```bash
# Check build status
eas build:list

# Cancel pending builds
eas build:cancel <build-id>
```

### Network Issues

#### Timeout Errors
```bash
# Increase timeout
EXPO_TIMEOUT=300000 eas build --platform ios

# Use different region
EXPO_BUILD_REGION=us-west-1 eas build --platform ios
```

## 📊 Monitoring & Analytics

### App Store Analytics
- Monitor download trends
- Track user reviews and ratings
- Analyze crash reports
- Review performance metrics

### Tools
- [App Store Connect Analytics](https://appstoreconnect.apple.com/)
- [Google Play Console Statistics](https://play.google.com/console/)
- [Firebase Crashlytics](https://firebase.google.com/products/crashlytics)
- [Expo Application Services](https://expo.dev/eas)

## 📞 Support

### Getting Help
- [Expo Documentation](https://docs.expo.dev/)
- [EAS Documentation](https://docs.expo.dev/eas/)
- [Apple Developer Forums](https://developer.apple.com/forums/)
- [Google Play Help](https://support.google.com/googleplay/)

### Contact Information
- For build issues: Check Expo status page
- For app review issues: Contact respective app stores
- For technical issues: Create GitHub issues

---

*Last updated: August 29, 2025*
