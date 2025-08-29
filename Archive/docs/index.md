# Easy Tip and Split Calculator - Documentation

Welcome to the documentation for the Easy Tip and Split Calculator app! This comprehensive guide covers everything from development lessons learned to technical implementation details.

## 📱 About the App

The Easy Tip and Split Calculator is a modern React Native application built with Expo that helps users calculate tips and split bills efficiently. The app features a clean, intuitive interface with support for both light and dark modes.

### Key Features

- **Smart Calculations**: Real-time tip and total calculations
- **Bill Splitting**: Split bills among multiple people
- **Tipping Guidelines**: Country-specific etiquette information
- **Cross-Platform**: iOS, Android, and Web support
- **Modern UI**: NativeBase components with responsive design

## 🏗️ Architecture & Technology

### Tech Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | React Native | SDK 42 |
| Build Tool | Expo | ^42.0.0 |
| Navigation | React Navigation | 5.x |
| UI Library | NativeBase | 3.1.0 |
| State Management | React Component State | - |
| Styling | Styled Components | ^5.3.0 |
| Testing | Jest | - |
| CI/CD | GitHub Actions | - |

### Project Structure

```
tip-calculator-reactnative/
├── assets/                 # Images, fonts, icons
├── components/            # Reusable UI components
│   ├── TipRow.tsx        # Tip calculation row component
│   ├── StyledText.tsx    # Styled text components
│   └── Themed.tsx        # Theme wrapper components
├── constants/            # App constants (colors, layout)
├── hooks/                # Custom React hooks
├── navigation/           # Navigation configuration
├── screens/              # Main app screens
│   ├── TabOneScreen.tsx # Calculator screen
│   └── TabTwoScreen.tsx # Etiquette screen
├── docs/                 # Documentation
└── types.tsx            # TypeScript type definitions
```

## 🚀 Development Journey & Lessons Learned

### Expo Development Experience

Expo has revolutionized React Native development by providing a managed workflow that eliminates many of the complexities of native development.

#### Key Benefits
- **Rapid Prototyping**: Quick setup and development cycle
- **Managed Workflow**: No need to configure native projects
- **Cloud Builds**: Remote build service for iOS and Android
- **Expo Go**: Instant testing on physical devices
- **OTA Updates**: Push updates without app store releases

#### Online Editor Learning
Expo's [Snack](https://snack.expo.dev/) online editor was instrumental in learning React Native basics without local environment setup. This allowed for:
- Quick experimentation with components
- Understanding React Native APIs
- Testing UI layouts and interactions
- Learning Expo-specific features

### Build Pipeline Challenges

#### Version Management Issues
Early development revealed version synchronization challenges between platforms:

**Problem**: Manual version updates often led to inconsistencies between iOS and Android builds, causing deployment failures.

**Solution**: Implemented [Standard Version](https://github.com/conventional-changelog/standard-version) for automated semantic versioning.

```yaml
# GitHub Actions workflow example
- run: npm install
- run: ./node_modules/.bin/standard-version --release-as minor
- run: expo build:android --no-wait
- run: expo build:ios --no-wait
```

```bash
# Install standard-version
pnpm add -g standard-version
# or
npm install -g standard-version

# Create new release
standard-version

# Create minor release
standard-version --release-as minor
```

#### Build Time Optimization
- **Parallel Builds**: Use `--no-wait` flag for concurrent iOS/Android builds
- **Incremental Builds**: Expo's build service caches dependencies
- **Prebuild Optimization**: Configure `expo prebuild` for custom native code

### UI/UX Development

#### NativeBase Integration
Choosing NativeBase v3 provided:
- Consistent design system
- Dark/light mode support
- Responsive components
- Accessibility features

```tsx
// Theme configuration with system color mode
const theme = extendTheme({
  config: {
    useSystemColorMode: true
  }
});
```

#### Responsive Design
- Used flexbox layouts for cross-platform compatibility
- Implemented responsive font sizes and spacing
- Added keyboard dismissal for better mobile UX

### State Management

#### Component State Pattern
The app uses React component state for simplicity:

```tsx
interface DataState {
  billAmount: number;
  tipPct: number;
  tipAmount: number;
  totalAmount: number;
  numberOfPeople: number;
  eachPersonPays: number;
}
```

**Benefits**:
- Simple and predictable
- No external dependencies
- Easy to debug
- Suitable for app complexity

### Testing Strategy

#### Jest Configuration
```json
{
  "jest": {
    "preset": "jest-expo"
  }
}
```

#### Test Coverage
- Component rendering tests
- Calculation logic tests
- Navigation tests
- Snapshot tests for UI components

## 🔧 Technical Implementation

### Calculator Logic

The core calculation engine handles real-time updates:

```typescript
private updateCalculations(inputState: DataState): DataState {
  const resultState = { ...inputState };
  resultState.tipAmount = resultState.billAmount * resultState.tipPct / 100;
  resultState.totalAmount = resultState.billAmount + resultState.tipAmount;
  resultState.eachPersonPays = resultState.totalAmount / resultState.numberOfPeople;
  return resultState;
}
```

### Input Validation

Robust input handling prevents invalid states:
- Numeric validation for amounts
- Range limits (tip: 0-40%, people: 1-40)
- NaN handling with fallbacks
- Real-time calculation updates

### Navigation Structure

```tsx
// Bottom tab navigation
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

// Stack navigators for each tab
const TabOneStack = createStackNavigator<TabOneParamList>();
const TabTwoStack = createStackNavigator<TabTwoParamList>();
```

## 📱 Deployment & Distribution

### App Store Deployment

#### iOS App Store
1. Build with EAS: `eas build --platform ios`
2. TestFlight distribution for beta testing
3. App Store Connect submission
4. Bundle identifier: `com.subnext.tipcalcbillsplit`

#### Google Play Store
1. Build with EAS: `eas build --platform android`
2. Internal testing track for beta releases
3. Production track for public releases
4. Package name: `com.subnext.tipcalcbillsplit`

### CI/CD Pipeline

GitHub Actions automates the entire release process:

```yaml
name: Build and Deploy
on:
  push:
    branches: [ main, develop ]
  release:
    types: [ published ]

jobs:
  build:
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

## 🎯 Best Practices Implemented

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- Conventional commits

### Performance
- Optimized re-renders with PureComponent
- Efficient state updates
- Minimal bundle size through tree shaking
- Fast refresh for development

### Accessibility
- Screen reader support
- High contrast colors
- Touch target sizing
- Keyboard navigation

## 🚧 Known Limitations & Future Improvements

### Current Limitations
- **Bundle Size**: Larger than pure React Native apps
- **Build Dependencies**: Reliance on Expo's build service
- **Native Features**: Limited access to device APIs
- **Screenshot Automation**: No Fastlane integration

### Planned Enhancements
- [ ] Advanced splitting options (custom percentages per person)
- [ ] Tip history and favorites
- [ ] Currency conversion
- [ ] Receipt scanning with OCR
- [ ] Social features (split with friends)
- [ ] Offline functionality
- [ ] Widget support

## 📚 Resources & References

### Official Documentation
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [NativeBase Documentation](https://docs.nativebase.io/)
- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)

### Development Tools
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Standard Version](https://github.com/conventional-changelog/standard-version)
- [pnpm Documentation](https://pnpm.io/)

### Migration Guides
- [pnpm Migration Guide](./pnpm-migration.md) - Complete guide for switching from npm to pnpm

### Community Resources
- [Expo Forums](https://forums.expo.dev/)
- [React Native Community](https://reactnative.dev/community/support)
- [NativeBase Community](https://github.com/GeekyAnts/NativeBase/discussions)

---

*This documentation is continuously updated as the project evolves. Contributions and feedback are welcome!*