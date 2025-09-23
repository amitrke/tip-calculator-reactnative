#!/bin/bash

# Screen# Copy to Fastlane metadata directory for direct upload (only 8 screenshots for Google Play Store limit)
echo "🚀 Copying to Fastlane metadata directory..."
cp maestro/screenshots/screenshots/en-US/phoneScreenshots/calculator-empty.png fastlane/metadata/android/en-US/images/phoneScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/phoneScreenshots/calculator-bill-entered.png fastlane/metadata/android/en-US/images/phoneScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/phoneScreenshots/calculator-15-percent.png fastlane/metadata/android/en-US/images/phoneScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/phoneScreenshots/calculator-20-percent.png fastlane/metadata/android/en-US/images/phoneScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/phoneScreenshots/calculator-split-2-people.png fastlane/metadata/android/en-US/images/phoneScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/phoneScreenshots/calculator-split-3-people.png fastlane/metadata/android/en-US/images/phoneScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/phoneScreenshots/calculator-final.png fastlane/metadata/android/en-US/images/phoneScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/phoneScreenshots/etiquette-screen.png fastlane/metadata/android/en-US/images/phoneScreenshots/ 2>/dev/null || true

echo "✅ Screenshots organized!"
echo ""
echo "📁 Directory structure created:"
echo "maestro/screenshots/screenshots/"
echo "├── en-US/"
echo "│   ├── phoneScreenshots/     <- Phone screenshots"
echo "│   ├── sevenInchScreenshots/ <- 7-inch tablet screenshots"
echo "│   └── tenInchScreenshots/   <- 10-inch tablet screenshots"
echo ""
echo "🚀 Screenshots copied to Fastlane metadata directory!"
echo "fastlane/metadata/android/en-US/images/"
echo "├── phoneScreenshots/         <- Phone screenshots"
echo "├── tabletScreenshots/        <- 7-inch tablet screenshots"
echo "└── largeTabletScreenshots/  <- 10-inch tablet screenshots"
echo ""
echo "🎯 Ready for Google Play Store upload!"
echo "Run: fastlane android upload_screenshots"Organizer for Google Play Store
# This script organizes Maestro screenshots into the proper directory structure

echo "🎯 Organizing screenshots for Google Play Store..."

# Create directory structure
mkdir -p maestro/screenshots/screenshots/en-US/phoneScreenshots
mkdir -p maestro/screenshots/screenshots/en-US/sevenInchScreenshots
mkdir -p maestro/screenshots/screenshots/en-US/tenInchScreenshots

# Move screenshots to phone directory (most common)
echo "📱 Moving screenshots to phone directory..."
mv maestro/screenshots/screenshots/*.png maestro/screenshots/screenshots/en-US/phoneScreenshots/ 2>/dev/null || true

# Copy to other sizes (you can replace with device-specific screenshots later)
echo "📋 Copying to tablet directories..."
cp maestro/screenshots/screenshots/en-US/phoneScreenshots/*.png maestro/screenshots/screenshots/en-US/sevenInchScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/phoneScreenshots/*.png maestro/screenshots/screenshots/en-US/tenInchScreenshots/ 2>/dev/null || true

# Copy to Fastlane metadata directory for direct upload
echo "� Copying to Fastlane metadata directory..."
cp maestro/screenshots/screenshots/en-US/phoneScreenshots/*.png fastlane/metadata/android/en-US/images/phoneScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/sevenInchScreenshots/calculator-empty.png fastlane/metadata/android/en-US/images/tabletScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/sevenInchScreenshots/calculator-bill-entered.png fastlane/metadata/android/en-US/images/tabletScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/sevenInchScreenshots/calculator-15-percent.png fastlane/metadata/android/en-US/images/tabletScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/sevenInchScreenshots/calculator-20-percent.png fastlane/metadata/android/en-US/images/tabletScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/sevenInchScreenshots/calculator-split-2-people.png fastlane/metadata/android/en-US/images/tabletScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/sevenInchScreenshots/calculator-split-3-people.png fastlane/metadata/android/en-US/images/tabletScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/sevenInchScreenshots/calculator-final.png fastlane/metadata/android/en-US/images/tabletScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/sevenInchScreenshots/etiquette-screen.png fastlane/metadata/android/en-US/images/tabletScreenshots/ 2>/dev/null || true

cp maestro/screenshots/screenshots/en-US/tenInchScreenshots/calculator-empty.png fastlane/metadata/android/en-US/images/largeTabletScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/tenInchScreenshots/calculator-bill-entered.png fastlane/metadata/android/en-US/images/largeTabletScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/tenInchScreenshots/calculator-15-percent.png fastlane/metadata/android/en-US/images/largeTabletScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/tenInchScreenshots/calculator-20-percent.png fastlane/metadata/android/en-US/images/largeTabletScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/tenInchScreenshots/calculator-split-2-people.png fastlane/metadata/android/en-US/images/largeTabletScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/tenInchScreenshots/calculator-split-3-people.png fastlane/metadata/android/en-US/images/largeTabletScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/tenInchScreenshots/calculator-final.png fastlane/metadata/android/en-US/images/largeTabletScreenshots/ 2>/dev/null || true
cp maestro/screenshots/screenshots/en-US/tenInchScreenshots/etiquette-screen.png fastlane/metadata/android/en-US/images/largeTabletScreenshots/ 2>/dev/null || true
