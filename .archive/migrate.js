#!/usr/bin/env node

/**
 * Expo SDK Migration Helper Script
 * This script helps with the initial steps of migrating from Expo SDK 42 to 53
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Expo SDK Migration Helper');
console.log('===========================\n');

// Check current Expo version
try {
  const currentVersion = execSync('npx expo --version', { encoding: 'utf8' }).trim();
  console.log(`📦 Current Expo CLI version: ${currentVersion}`);

  if (!currentVersion.includes('6.')) {
    console.log('⚠️  Expo CLI is outdated. Installing latest version...\n');

    try {
      execSync('pnpm remove -g @expo/cli', { stdio: 'inherit' });
      execSync('pnpm add -g @expo/cli', { stdio: 'inherit' });
      console.log('✅ Expo CLI updated successfully!\n');
    } catch (error) {
      console.error('❌ Failed to update Expo CLI. Please run manually:');
      console.error('   pnpm remove -g @expo/cli && pnpm add -g @expo/cli\n');
    }
  }
} catch (error) {
  console.log('⚠️  Expo CLI not found. Installing...\n');
  try {
    execSync('pnpm add -g @expo/cli', { stdio: 'inherit' });
    console.log('✅ Expo CLI installed successfully!\n');
  } catch (error) {
    console.error('❌ Failed to install Expo CLI. Please install manually.\n');
  }
}

// Check Node.js version
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`📦 Node.js version: ${nodeVersion}`);

  const majorVersion = parseInt(nodeVersion.split('.')[0].replace('v', ''));
  if (majorVersion < 18) {
    console.log('⚠️  Node.js version is too old. Expo SDK 53 requires Node.js 18+');
    console.log('   Please update Node.js to version 18 or higher.\n');
  } else {
    console.log('✅ Node.js version is compatible!\n');
  }
} catch (error) {
  console.error('❌ Could not check Node.js version.\n');
}

// Check current package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const currentExpoVersion = packageJson.dependencies?.expo || 'Not found';

  console.log(`📦 Current Expo SDK version in package.json: ${currentExpoVersion}`);

  if (currentExpoVersion.includes('42.')) {
    console.log('🎯 Ready for migration from Expo SDK 42 to 53!\n');
  } else if (currentExpoVersion.includes('53.')) {
    console.log('✅ Already on Expo SDK 53 or higher!\n');
  } else {
    console.log('⚠️  Current Expo version might need updating.\n');
  }
} else {
  console.error('❌ package.json not found in current directory.\n');
}

console.log('📋 Next Steps:');
console.log('1. Review the migration guide: docs/migration-guide.md');
console.log('2. Create a backup branch: git checkout -b backup/before-migration');
console.log('3. Start migration: Follow Phase 1 in the migration guide');
console.log('4. Run tests after each phase');
console.log('\n🔗 Useful commands:');
console.log('   pnpm outdated              # Check outdated packages');
console.log('   npx expo install --fix     # Auto-fix Expo dependencies');
console.log('   npx @expo/cli upgrade      # Interactive upgrade assistant');
console.log('\n📚 Resources:');
console.log('   Migration Guide: docs/migration-guide.md');
console.log('   Expo Docs: https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/');
console.log('   React Navigation: https://reactnavigation.org/docs/upgrading-from-5.x/');

console.log('\n✨ Happy migrating! 🚀');
