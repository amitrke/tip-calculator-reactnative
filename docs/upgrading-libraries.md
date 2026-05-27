# Upgrading Libraries (Expo / React Native)

This project is an **Expo** app (currently `expo ~53.x`) with **React Native** (`0.79.x`) and **React** (`19.x`). Because Expo tightly couples native dependency versions, **the safest way to upgrade is to upgrade Expo first**, then update other libraries.

## Quick rules

- **Prefer upgrading Expo SDK first** (it pins compatible `react`, `react-native`, and many native module versions).
- **Use a clean install** after upgrades (`node_modules` + lockfile hygiene).
- **Verify on all targets you ship**: Android + iOS (if applicable) + web.
- **Don’t fight Expo’s versioning**: use `expo install` for Expo-managed native modules.

## Before you start

1. Ensure your local environment is healthy:
   - Node.js is installed
   - Yarn is installed (this repo includes `yarn.lock`)
2. Create a branch.
3. Record the current versions:
   - `expo --version`
   - `node -v` / `yarn -v`

## 1) Upgrade the Expo SDK (recommended primary path)

Expo SDK upgrades are the “big” upgrades because they may change:
- `expo` version
- `react` / `react-native` versions
- native module compatibility

### Steps

1. Review Expo’s upgrade instructions for the target SDK:
   - Use the Expo CLI upgrade helper (preferred):
     - `npx expo-doctor`
     - `npx expo install --check` (checks compatible versions)

2. Perform the upgrade:
   - Start with:
     - `npx expo install expo@latest`
   - Or, if upgrading to a specific SDK line (example):
     - `npx expo install expo@~53.0.0`

3. Align Expo-managed dependencies:
   - Run:
     - `npx expo install --fix`
   - This updates dependencies to versions compatible with your Expo SDK.

4. Reinstall dependencies cleanly:
   - Stop Metro / dev servers
   - Delete `node_modules`
   - Keep the repo’s package manager consistent:
     - `yarn install`

### Notes for this repo

- `app.json` has `newArchEnabled: true`. Upgrades can change New Architecture defaults/requirements; validate Android and iOS builds after SDK changes.

## 2) Upgrade JavaScript-only libraries (safe, frequent)

These are libraries that do not ship native code (or don’t require native rebuilds in managed workflow).

### Suggested workflow

1. See what’s outdated:
   - `yarn outdated`

2. Upgrade conservatively:
   - Prefer minor/patch upgrades first.
   - For a single package:
     - `yarn add <package>@<version>`

3. After upgrades:
   - `yarn install`
   - `yarn start` and exercise the app

## 3) Upgrade native or Expo-native libraries (requires care)

Many packages in this repo are native (or may be):
- `react-native-gesture-handler`
- `react-native-reanimated`
- `react-native-screens`
- `react-native-safe-area-context`
- `react-native-svg`
- `expo-font`

### Use `expo install` for these

When a library is supported by Expo, use:
- `npx expo install <package>`

This chooses a version compatible with your Expo SDK.

### Reanimated specific note

`react-native-reanimated` upgrades sometimes require:
- Babel plugin configuration (usually already present in Expo templates)
- clearing caches / rebuilding native projects

If you see runtime errors after upgrading, first try:
- `npx expo start -c`

## 4) React Navigation upgrades

This repo uses React Navigation v6 packages:
- `@react-navigation/native`
- `@react-navigation/bottom-tabs`
- `@react-navigation/stack`

Guidelines:
- Upgrade related navigation packages together (keep major versions aligned).
- Re-run the app and validate:
  - tab navigation
  - deep links (if configured)
  - gestures/back handling

## 5) When you need to rebuild native projects

This repo includes `android/` and uses scripts like:
- `expo run:android`
- EAS builds (`eas build ...`)

After upgrades that touch native code, do one of:

- Local Android build:
  - `yarn android` (runs `expo run:android`)

- Local iOS build (macOS only):
  - `yarn ios`

- EAS preview build:
  - `yarn build:android:local` or `yarn build:android:cloud`

If local builds fail, the error is usually a version mismatch introduced by upgrading a native module outside Expo’s compatible range—re-run:
- `npx expo install --fix`

## 6) Verification checklist (do this every time)

- Start the app:
  - `yarn start`
- Clear Metro cache if anything is weird:
  - `npx expo start -c`
- Build/run Android:
  - `yarn android`
- If you maintain iOS:
  - `yarn ios`
- Run UI automation/screenshot flows (if relevant to your change):
  - `yarn maestro:test:android`
  - `yarn maestro:test:ios`
  - `yarn screenshots`

## 7) Troubleshooting

### “Version mismatch” / native module conflicts

- Run:
  - `npx expo install --check`
  - `npx expo install --fix`
- Avoid upgrading Expo-native libraries with `yarn add` to arbitrary versions.

### Metro / bundling / stale cache

- Clear cache:
  - `npx expo start -c`

### Android build failures after dependency changes

- Ensure you didn’t accidentally upgrade Gradle/AGP via unrelated changes.
- Prefer letting Expo/EAS manage native version constraints.

## 8) Recommended upgrade cadence

- Weekly or biweekly: JS-only libs (patch/minor)
- Monthly/quarterly: Expo SDK upgrades (after reading release notes)
- Before releases: run EAS builds and Maestro flows
