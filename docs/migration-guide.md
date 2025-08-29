# 🚀 Major Migration Guide: Expo SDK 42 → 53

## 📊 Migration Overview

Your project is currently on **Expo SDK 42** (2021) and needs to migrate to **Expo SDK 53** (2025). This is a **MAJOR migration** involving:

| Component | Current | Target | Change |
|-----------|---------|--------|--------|
| **Expo SDK** | 42.0.5 | 53.0.20 | +11 major versions |
| **React** | 16.13.1 | 19.1.1 | +3 major versions |
| **React Native** | 0.63.2 | 0.76+ | +13 minor versions |
| **TypeScript** | 4.0.8 | 5.9.2 | +1 major version |
| **React Navigation** | v5 | v7 | +2 major versions |

## ⚠️ Critical Warnings

### 🚨 **HIGH RISK MIGRATION**
- **Breaking Changes**: Major API changes across all libraries
- **Testing Required**: Extensive testing needed for all features
- **Time Intensive**: 2-4 weeks for safe migration
- **Backup Essential**: Create backups before starting

### 📋 **Prerequisites**
- [ ] **Backup your project** (Git branch + local copy)
- [ ] **Test current app thoroughly** on all platforms
- [ ] **Document custom modifications**
- [ ] **Plan rollback strategy**

---

## 📝 Step-by-Step Migration Guide

### Phase 1: Preparation (1-2 days)

#### 1.1 Create Migration Branch
```bash
git checkout -b migration/expo-sdk-53
git push -u origin migration/expo-sdk-53
```

#### 1.2 Install Latest Expo CLI
```bash
# Remove old version
pnpm remove -g @expo/cli

# Install latest
pnpm add -g @expo/cli

# Verify version
expo --version  # Should be 6.3.10+
```

#### 1.3 Update Node.js (Optional but Recommended)
```bash
# Check current version
node --version  # Should be 18+ for Expo SDK 53

# If needed, update Node.js to 18 LTS or 20 LTS
```

### Phase 2: Expo SDK Upgrade (3-5 days)

#### 2.1 Use Expo Upgrade Tool
```bash
# This is the safest way to upgrade Expo SDK
npx expo install --fix
```

If that doesn't work, try the upgrade assistant:
```bash
npx @expo/cli upgrade
```

#### 2.2 Manual SDK Upgrade (Alternative)
```bash
# Update Expo SDK
pnpm add expo@^53.0.0

# Update Expo modules
pnpm add expo-asset@^11.0.0
pnpm add expo-constants@^17.0.0
pnpm add expo-font@^13.0.0
pnpm add expo-linking@^7.0.0
pnpm add expo-splash-screen@^0.30.0
pnpm add expo-status-bar@^2.0.0
pnpm add expo-web-browser@^14.0.0
```

#### 2.3 Update React and React Native
```bash
# React 18+ (required for Expo SDK 53)
pnpm add react@^18.0.0
pnpm add react-dom@^18.0.0

# React Native will be updated automatically with Expo
```

#### 2.4 Update Development Dependencies
```bash
# TypeScript 5.x
pnpm add -D typescript@^5.0.0

# Babel
pnpm add -D @babel/core@^7.20.0

# Jest
pnpm add -D jest-expo@^53.0.0

# Type definitions
pnpm add -D @types/react@^18.0.0
pnpm add -D @types/react-native@^0.73.0
```

### Phase 3: Navigation Upgrade (2-3 days)

#### 3.1 Update React Navigation
```bash
# Remove old versions
pnpm remove @react-navigation/native
pnpm remove @react-navigation/stack
pnpm remove @react-navigation/bottom-tabs

# Install latest versions
pnpm add @react-navigation/native@^7.0.0
pnpm add @react-navigation/stack@^7.0.0
pnpm add @react-navigation/bottom-tabs@^7.0.0

# Required dependencies
pnpm add react-native-screens@^4.0.0
pnpm add react-native-safe-area-context@^5.0.0
```

#### 3.2 Update Navigation Code
Major breaking changes in React Navigation v7:

```typescript
// OLD (v5)
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// NEW (v7)
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Navigation container changes
<NavigationContainer theme={theme}> // OLD
<NavigationContainer> // NEW (theme moved to individual navigators)
```

### Phase 4: UI Library Updates (1-2 days)

#### 4.1 Update NativeBase (if using)
```bash
# NativeBase v3 → Latest
pnpm add native-base@^3.4.0

# Or migrate to newer alternatives:
# - gluestack-ui (NativeBase's successor)
# - React Native Paper
# - Tamagui
```

#### 4.2 Update Styled Components
```bash
pnpm add styled-components@^6.0.0
```

#### 4.3 Update Vector Icons
```bash
pnpm add @expo/vector-icons@^15.0.0
```

### Phase 5: Animation & Gesture Libraries (1-2 days)

#### 5.1 Update React Native Reanimated
```bash
# Major version bump: v2 → v4
pnpm add react-native-reanimated@^4.0.0
```

**Breaking Changes:**
- New animation API
- Different import syntax
- Updated hooks

#### 5.2 Update Gesture Handler
```bash
pnpm add react-native-gesture-handler@^2.0.0
```

### Phase 6: Configuration Updates (1 day)

#### 6.1 Update Babel Configuration
```javascript
// babel.config.js - May need updates
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Remove old plugin if present
      // 'react-native-reanimated/plugin', // OLD
      'react-native-reanimated/plugin', // NEW (different syntax)
    ],
  };
};
```

#### 6.2 Update Metro Configuration
Create/update `metro.config.js`:
```javascript
const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname);
```

#### 6.3 Update TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "jsx": "react-jsx", // NEW: Changed from "react"
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true
  },
  "extends": "expo/tsconfig.base" // NEW
}
```

### Phase 7: Code Migration (3-7 days)

#### 7.1 Fix Import Statements
```typescript
// OLD imports (React 16)
import React, { Component } from 'react';

// NEW imports (React 18)
import React from 'react';
import { Component } from 'react';
```

#### 7.2 Update Component Patterns
```typescript
// OLD (React 16)
class MyComponent extends Component {
  render() {
    return <div>Hello</div>;
  }
}

// NEW (React 18) - Functional components preferred
function MyComponent() {
  return <div>Hello</div>;
}
```

#### 7.3 Update Navigation Usage
```typescript
// OLD (React Navigation v5)
navigation.navigate('ScreenName', { param: value });

// NEW (React Navigation v7)
navigation.navigate('ScreenName', { param: value }); // Similar but check API changes
```

#### 7.4 Update Expo API Usage
```typescript
// OLD (Expo SDK 42)
import { Constants } from 'expo-constants';
const appVersion = Constants.manifest.version;

// NEW (Expo SDK 53)
import Constants from 'expo-constants';
const appVersion = Constants.expoConfig?.version;
```

### Phase 8: Testing & Validation (2-3 days)

#### 8.1 Run Tests
```bash
pnpm test
```

#### 8.2 Test on All Platforms
```bash
# iOS
pnpm run ios

# Android
pnpm run android

# Web
pnpm run web
```

#### 8.3 Manual Testing Checklist
- [ ] App launches without crashes
- [ ] Navigation works correctly
- [ ] All screens load properly
- [ ] User interactions work
- [ ] Dark/light mode works
- [ ] Performance is acceptable

### Phase 9: Build Testing (1-2 days)

#### 9.1 Test Development Builds
```bash
# Test Expo Go compatibility
pnpm start
```

#### 9.2 Test Production Builds
```bash
# Test Android build
eas build --platform android --profile development

# Test iOS build
eas build --platform ios --profile development
```

## 🔧 Common Issues & Solutions

### Issue 1: Metro Bundler Errors
```
Cannot find module 'babel-preset-expo'
```
**Solution:**
```bash
pnpm add -D babel-preset-expo
```

### Issue 2: TypeScript Errors
```
Property 'X' does not exist on type 'Y'
```
**Solution:** Update type definitions and check breaking changes in migration guides.

### Issue 3: Navigation Errors
```
navigation.navigate is not a function
```
**Solution:** Check React Navigation v7 migration guide for API changes.

### Issue 4: Reanimated Errors
```
Reanimated 2 API is different from v4
```
**Solution:** Follow Reanimated v4 migration guide.

## 📚 Resources & Documentation

### Official Migration Guides
- [Expo SDK 53 Upgrade Guide](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)
- [React Navigation v7 Migration](https://reactnavigation.org/docs/upgrading-from-5.x/)
- [React Native Reanimated v4 Migration](https://docs.swmansion.com/react-native-reanimated/docs/guides/migration-v3/)
- [React 18 Migration](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)

### Community Resources
- [Expo Forums](https://forums.expo.dev/)
- [React Native Community](https://reactnative.dev/community/support)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)

### Tools & Utilities
- [Expo Upgrade Helper](https://expo.dev/tools/upgrade-helper)
- [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/)
- [Renovate Bot](https://github.com/renovatebot/renovate) for automated updates

## 🚨 Rollback Plan

### If Migration Fails

1. **Immediate Rollback:**
   ```bash
   git checkout main  # or your original branch
   git branch -D migration/expo-sdk-53
   rm -rf node_modules
   pnpm install  # Reinstall original dependencies
   ```

2. **Partial Rollback:**
   - Keep working branch but revert specific changes
   - Use git bisect to find breaking changes

3. **Alternative Approach:**
   - Create new Expo project with latest SDK
   - Gradually migrate components and features

## ⏱️ Timeline Estimate

| Phase | Duration | Effort |
|-------|----------|--------|
| Preparation | 1-2 days | Low |
| Expo SDK Upgrade | 3-5 days | High |
| Navigation Upgrade | 2-3 days | Medium |
| UI Libraries | 1-2 days | Medium |
| Animations | 1-2 days | Medium |
| Configuration | 1 day | Low |
| Code Migration | 3-7 days | High |
| Testing | 2-3 days | Medium |
| Build Testing | 1-2 days | Medium |
| **Total** | **15-28 days** | **High** |

## 🎯 Success Criteria

- [ ] App builds successfully on all platforms
- [ ] All existing features work as expected
- [ ] No console errors or warnings
- [ ] Performance meets or exceeds previous version
- [ ] All tests pass
- [ ] CI/CD pipeline works with new versions

## 💡 Recommendations

### For Large Projects
1. **Consider incremental migration** instead of big bang
2. **Create feature flags** for new implementations
3. **Maintain both versions** temporarily if possible

### For Small Projects
1. **Full migration** is usually faster and cleaner
2. **Use Expo's upgrade tools** when possible
3. **Follow official migration guides** closely

### General Advice
1. **Don't rush** - Take time to understand breaking changes
2. **Test thoroughly** - Especially on real devices
3. **Have a rollback plan** - Always prepare for failures
4. **Consider professional help** - For complex enterprise apps

---

## 🚀 Next Steps

1. **Backup your project** immediately
2. **Review this guide** thoroughly
3. **Start with Phase 1** preparation
4. **Test each phase** before proceeding
5. **Ask questions** in Expo forums if stuck

**Remember**: This is a complex migration. Take it one step at a time and don't hesitate to ask for help!

*Last updated: August 29, 2025*
