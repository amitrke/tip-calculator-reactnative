# Maestro Configuration for Tip Calculator App

This directory contains Maestro flows for automated testing and screenshot generation.

## Files:
- `calculator_flow.yaml`: Main flow for testing the calculator functionality and taking screenshots
- `run_maestro_tests.sh`: Shell script to run tests easily
- `.maestro/config.yaml`: Maestro configuration file

## Setup:

### 1. Install Maestro CLI:
```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

### 2. Build the app:
```bash
# For Android
eas build -p android --profile production

# For iOS
eas build -p ios --profile production
```

### 3. Install the built app on your device/emulator

## Running Tests:

### Using npm scripts:
```bash
# Run on Android (default)
npm run maestro:test

# Run on Android explicitly
npm run maestro:test:android

# Run on iOS
npm run maestro:test:ios

# Take screenshots (recommended for screenshot generation)
npm run maestro:screenshots
# or
npm run screenshots
```

### Using the shell script directly:
```bash
# Run all flows
./maestro/run_maestro_tests.sh

# Run specific flow
./maestro/run_maestro_tests.sh android calculator_flow.yaml

# Run on iOS
./maestro/run_maestro_tests.sh ios
```

### Using Maestro CLI directly:
```bash
# Run all flows
maestro test .

# Run specific flow
maestro test calculator_flow.yaml

# Run on Android
maestro test . --platform android

# Run on iOS
maestro test . --platform ios
```

## Screenshots:
Screenshots will be saved in `maestro/screenshots/` directory with timestamps.

## Flow Description:
The calculator flow tests:
1. Empty calculator screen
2. Bill amount input (accessibilityLabel: "Bill Amount")
3. Different tip percentages (accessibilityLabel: "15%", "20%", "25%")
4. Bill splitting with multiple people (accessibilityLabel: "Plus", "Minus")
5. Etiquette screen (tipping information)
6. Privacy screen (privacy policy)
7. Return to calculator (final state)

## Generated Screenshots:
- `calculator-empty.png` - Initial calculator screen
- `calculator-bill-entered.png` - After entering bill amount
- `calculator-15-percent.png` - 15% tip selected
- `calculator-20-percent.png` - 20% tip selected
- `calculator-split-2-people.png` - Split between 2 people
- `calculator-split-3-people.png` - Split between 3 people
- `calculator-25-percent-3-people.png` - 25% tip with 3 people
- `etiquette-screen.png` - Tipping etiquette information
- `privacy-screen.png` - Privacy policy screen
- `calculator-final.png` - Final calculator state

**Total:** 10 high-quality screenshots covering all app features

## CI/CD:
A GitHub Actions workflow is set up to run Maestro tests on every push and pull request. See `.github/workflows/maestro-tests.yml` for details.
