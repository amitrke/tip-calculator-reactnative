# Troubleshooting Guide

This guide helps you resolve common issues when developing and deploying the Easy Tip and Split Calculator app.

## 📋 Table of Contents

- [Development Issues](#development-issues)
- [Build Issues](#build-issues)
- [Runtime Issues](#runtime-issues)
- [Testing Issues](#testing-issues)
- [Deployment Issues](#deployment-issues)
- [Performance Issues](#performance-issues)

## 💻 Development Issues

### Expo CLI Issues

#### "expo start" not working

**Symptoms:**
- Command not found
- Port already in use
- Metro bundler fails to start

**Solutions:**

1. **Reinstall Expo CLI:**
   ```bash
   pnpm remove -g @expo/cli
   pnpm add -g @expo/cli
   # or
   npm uninstall -g @expo/cli
   npm install -g @expo/cli
   ```

2. **Clear cache:**
   ```bash
   expo start --clear
   ```

3. **Check port availability:**
   ```bash
   # Kill process on port 19000-19006
   npx kill-port 19000 19001 19002 19003 19004 19005 19006
   ```

4. **Reset Metro bundler:**
   ```bash
   # Delete node_modules and reinstall
   rm -rf node_modules
   pnpm install
   # or
   npm install

   # Clear Expo cache
   expo r -c
   ```

#### Expo Go not connecting

**Symptoms:**
- QR code not scanning
- "Network timeout" error
- Unable to load app

**Solutions:**

1. **Check network:**
   - Ensure device and computer are on same WiFi
   - Disable VPN if active
   - Try different network

2. **Restart Expo:**
   ```bash
   # Stop current process (Ctrl+C)
   # Clear cache and restart
   expo start --clear
   ```

3. **Check firewall:**
   - Allow Expo through firewall
   - Try with firewall disabled temporarily

### Code Issues

#### TypeScript Errors

**Common errors:**

1. **Cannot find module:**
   ```typescript
   // Error: Cannot find module './components/Button'
   import Button from './components/Button';
   ```
   **Solution:** Check file path and extension

2. **Type errors:**
   ```typescript
   // Error: Type 'string' is not assignable to type 'number'
   const amount: number = "100";
   ```
   **Solution:** Add proper type conversion
   ```typescript
   const amount: number = parseFloat("100") || 0;
   ```

#### Component Not Rendering

**Symptoms:**
- Blank screen
- Component not appearing
- Layout issues

**Debug steps:**

1. **Check console logs:**
   ```typescript
   console.log('Component rendered');
   ```

2. **Verify component export:**
   ```typescript
   // Correct
   export default function MyComponent() { ... }

   // Incorrect
   function MyComponent() { ... }
   ```

3. **Check styling:**
   ```typescript
   // Add debug styles
   style={{ borderWidth: 1, borderColor: 'red' }}
   ```

## 🔨 Build Issues

### EAS Build Failures

#### iOS Build Issues

**"Code signing failed"**

**Solutions:**
1. **Check provisioning profile:**
   ```bash
   eas build:configure
   ```

2. **Verify bundle identifier:**
   - Ensure it matches App Store Connect
   - Check `app.json` configuration

3. **Renew certificates:**
   - Use EAS CLI to manage certificates
   - Or renew manually in Apple Developer Console

#### Android Build Issues

**"Build failed with unknown error"**

**Solutions:**
1. **Check build logs:**
   ```bash
   eas build:list
   eas build:view <build-id>
   ```

2. **Clear build cache:**
   ```bash
   eas build --clear-cache
   ```

3. **Update build tools:**
   ```bash
   # Check for updates
   npm outdated
   npm update
   ```

### Local Build Issues

#### Gradle Build Failures

**Symptoms:**
- Android build fails
- Gradle sync issues
- Dependency resolution errors

**Solutions:**

1. **Clean Gradle:**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

2. **Clear Gradle cache:**
   ```bash
   rm -rf ~/.gradle/caches
   ```

3. **Update dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

## ⚠️ Runtime Issues

### App Crashes

#### On App Start

**Symptoms:**
- App crashes immediately
- White screen of death
- Error boundaries triggered

**Debug steps:**

1. **Check device logs:**
   ```bash
   # iOS
   npx react-native log-ios

   # Android
   npx react-native log-android
   ```

2. **Enable remote debugging:**
   - Shake device → "Debug Remote JS"
   - Check browser console for errors

3. **Check for null/undefined:**
   ```typescript
   // Add null checks
   if (!this.state || !this.state.billAmount) {
     return <Text>Loading...</Text>;
   }
   ```

#### Calculation Errors

**Symptoms:**
- Incorrect tip calculations
- NaN values displayed
- Division by zero errors

**Solutions:**

1. **Add input validation:**
   ```typescript
   private updateBillAmount(amount: string) {
     const numAmount = parseFloat(amount);
     if (isNaN(numAmount) || numAmount < 0) {
       console.warn('Invalid bill amount');
       return;
     }
     // Continue with valid input
   }
   ```

2. **Handle edge cases:**
   ```typescript
   // Prevent division by zero
   if (this.state.numberOfPeople === 0) {
     this.setState({ numberOfPeople: 1 });
   }
   ```

### UI Issues

#### Layout Problems

**Symptoms:**
- Components not positioned correctly
- Text overflow
- Responsive design issues

**Solutions:**

1. **Check Dimensions:**
   ```typescript
   import { Dimensions } from 'react-native';
   const { width, height } = Dimensions.get('window');
   ```

2. **Use flexbox properly:**
   ```typescript
   // Correct flex usage
   style={{
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
   }}
   ```

3. **Test on different screen sizes:**
   - Use Expo's device preview
   - Test on physical devices

## 🧪 Testing Issues

### Jest Test Failures

#### Tests not running

**Solutions:**

1. **Check Jest configuration:**
   ```json
   {
     "jest": {
       "preset": "jest-expo"
     }
   }
   ```

2. **Clear Jest cache:**
   ```bash
   npx jest --clearCache
   ```

3. **Check test files:**
   ```bash
   # Run specific test
   pnpm test -- __tests__/ComponentName-test.js
   # or
   npm test -- __tests__/ComponentName-test.js
   ```

#### Async test issues

**Solutions:**

1. **Use async/await:**
   ```typescript
   it('should calculate tip', async () => {
     const result = await calculateTip(100, 15);
     expect(result).toBe(15);
   });
   ```

2. **Mock async operations:**
   ```typescript
   jest.mock('react-native', () => ({
     // Mock implementations
   }));
   ```

### Component Testing

#### Enzyme/React Testing Library Issues

**Common problems:**

1. **Component not found:**
   ```typescript
   // Check import paths
   import { render } from '@testing-library/react-native';
   ```

2. **State not updating:**
   ```typescript
   // Use act() for state updates
   import { act } from '@testing-library/react-native';

   act(() => {
     fireEvent.changeText(input, '100');
   });
   ```

## 🚀 Deployment Issues

### App Store Rejections

#### Common Rejection Reasons

**Guideline 2.1 - App Completeness**

**Issue:** App crashes on launch
**Solution:**
- Test thoroughly on TestFlight
- Check crash logs in App Store Connect
- Fix any runtime errors

**Guideline 4.2 - Minimum Functionality**

**Issue:** App doesn't provide enough functionality
**Solution:**
- Ensure all advertised features work
- Add more content if needed
- Improve user experience

#### Metadata Issues

**Missing screenshots:**
- Provide screenshots for all device sizes
- Update screenshots when UI changes
- Follow Apple's screenshot guidelines

**Incorrect app description:**
- Ensure description matches actual functionality
- Update keywords for better discoverability
- Include privacy policy link

### Google Play Issues

#### APK/AAB Upload Failures

**Solutions:**

1. **Check version codes:**
   ```json
   // Ensure versionCode is incremented
   {
     "android": {
       "versionCode": 420030700  // Increment this
     }
   }
   ```

2. **Verify package name:**
   - Must match Play Console
   - Unique across all apps

3. **Check target SDK:**
   ```json
   // Update to latest
   {
     "android": {
       "config": {
         "googleMobileAdsAppId": "..."
       }
     }
   }
   ```

## ⚡ Performance Issues

### Slow App Performance

#### JavaScript Thread Issues

**Symptoms:**
- UI freezing
- Slow calculations
- Delayed interactions

**Solutions:**

1. **Optimize calculations:**
   ```typescript
   // Use useMemo for expensive calculations
   const tipAmount = useMemo(() => {
     return billAmount * tipPct / 100;
   }, [billAmount, tipPct]);
   ```

2. **Debounce user input:**
   ```typescript
   const debouncedUpdate = useCallback(
     debounce((value) => {
       // Update state
     }, 300),
     []
   );
   ```

#### Memory Issues

**Symptoms:**
- App becoming unresponsive
- High memory usage
- Frequent crashes

**Solutions:**

1. **Clean up subscriptions:**
   ```typescript
   useEffect(() => {
     const subscription = someSubscription;
     return () => subscription.unsubscribe();
   }, []);
   ```

2. **Optimize images:**
   - Use appropriate image sizes
   - Implement image caching
   - Use WebP format when possible

### Bundle Size Issues

#### Large Bundle Size

**Solutions:**

1. **Analyze bundle:**
   ```bash
   npx react-native-bundle-visualizer
   ```

2. **Remove unused dependencies:**
   ```bash
   npx depcheck
   ```

3. **Code splitting:**
   ```typescript
   // Lazy load screens
   const LazyScreen = lazy(() => import('./screens/Screen'));
   ```

## 🔍 Debugging Tools

### Development Tools

1. **React DevTools:**
   ```bash
   pnpm add -g react-devtools
   # or
   npm install -g react-devtools
   ```

2. **Flipper:**
   - Facebook's debugging platform
   - Network inspection
   - Layout debugging

3. **Expo DevTools:**
   - Built-in Expo debugging
   - Element inspector
   - Performance monitor

### Logging

#### Effective Logging

```typescript
// Debug logging
if (__DEV__) {
  console.log('Debug info:', data);
}

// Error logging
try {
  // Risky operation
} catch (error) {
  console.error('Operation failed:', error);
  // Report to error tracking service
}
```

#### Remote Logging

```typescript
// Use a logging service
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'your-dsn',
  enableInExpoDevelopment: true,
});
```

## 📞 Getting Help

### Community Support

- [Expo Forums](https://forums.expo.dev/)
- [React Native Community](https://reactnative.dev/community/support)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)
- [GitHub Issues](https://github.com/amitrke/tip-calculator-reactnative/issues)

### Professional Support

- [Expo Support](https://expo.dev/support)
- [React Native Consulting](https://reactnative.dev/support)
- [App Store Developer Support](https://developer.apple.com/support/)

### Reporting Issues

When reporting issues, include:

1. **Environment details:**
   - OS version
   - Node.js version
   - Expo CLI version
   - Device/emulator info

2. **Steps to reproduce:**
   - Clear step-by-step instructions
   - Expected vs actual behavior

3. **Error logs:**
   - Console output
   - Stack traces
   - Screenshots

4. **Code snippets:**
   - Relevant code sections
   - Configuration files

---

*Last updated: August 29, 2025*
