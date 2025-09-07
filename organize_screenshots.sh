#!/bin/bash

# Screenshot Organizer for Google Play Store
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

echo "✅ Screenshots organized!"
echo ""
echo "📁 Directory structure created:"
echo "maestro/screenshots/screenshots/"
echo "├── en-US/"
echo "│   ├── phoneScreenshots/     <- Phone screenshots"
echo "│   ├── sevenInchScreenshots/ <- 7-inch tablet screenshots"
echo "│   └── tenInchScreenshots/   <- 10-inch tablet screenshots"
echo ""
echo "🚀 Ready for Google Play Store upload!"
echo "Run: fastlane android upload_screenshots"
