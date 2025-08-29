# API Documentation

This document provides technical documentation for the Easy Tip and Split Calculator's internal APIs, components, and type definitions.

## 📋 Table of Contents

- [Type Definitions](#type-definitions)
- [Component APIs](#component-apis)
- [Hooks](#hooks)
- [Constants](#constants)
- [Utilities](#utilities)

## 📝 Type Definitions

### Core Data Types

#### `DataState`

The main state interface for the calculator functionality.

```typescript
interface DataState {
  /** The total bill amount before tip */
  billAmount: number;

  /** Tip percentage (0-40) */
  tipPct: number;

  /** Calculated tip amount */
  tipAmount: number;

  /** Total amount including tip */
  totalAmount: number;

  /** Number of people to split the bill */
  numberOfPeople: number;

  /** Amount each person should pay */
  eachPersonPays: number;
}
```

#### Usage Example
```tsx
const initialState: DataState = {
  billAmount: 0,
  tipPct: 15,
  tipAmount: 0,
  totalAmount: 0,
  numberOfPeople: 1,
  eachPersonPays: 0
};
```

### Navigation Types

#### `RootStackParamList`

```typescript
type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};
```

#### `BottomTabParamList`

```typescript
type BottomTabParamList = {
  Calculator: undefined;
  Etiquette: undefined;
};
```

#### `TabOneParamList` & `TabTwoParamList`

```typescript
type TabOneParamList = {
  TabOneScreen: undefined;
};

type TabTwoParamList = {
  TabTwoScreen: undefined;
};
```

## 🧩 Component APIs

### TabOneScreen (Calculator)

The main calculator screen component.

#### Props
```typescript
interface TabOneScreenProps {
  navigation?: any; // React Navigation prop
}
```

#### State
```typescript
class TabOneScreen extends React.Component<TabOneScreenProps, DataState> {
  // Inherits DataState interface
}
```

#### Methods

##### `updateCalculations(inputState: DataState): DataState`
Recalculates all derived values based on input state.

**Parameters:**
- `inputState`: Current state object

**Returns:** Updated state object with recalculated values

**Example:**
```tsx
const newState = this.updateCalculations({
  billAmount: 100,
  tipPct: 15,
  numberOfPeople: 2,
  // ... other fields
});
// Returns: { billAmount: 100, tipPct: 15, tipAmount: 15, totalAmount: 115, numberOfPeople: 2, eachPersonPays: 57.5 }
```

##### `updateBillAmount(amount: string): void`
Updates bill amount with validation.

**Parameters:**
- `amount`: String representation of bill amount

**Validation:**
- Converts to number (NaN → 0)
- Must be ≥ 0

##### `updateTipPct(tipPct: string): void`
Updates tip percentage with validation.

**Parameters:**
- `tipPct`: String representation of tip percentage

**Validation:**
- Converts to number (NaN → 0)
- Must be 0-40%

##### `updateNumPeople(numPeople: string): void`
Updates number of people with validation.

**Parameters:**
- `numPeople`: String representation of number of people

**Validation:**
- Converts to integer (NaN → 0)
- Must be ≥ 0 and < 40

### TabTwoScreen (Etiquette)

The tipping etiquette information screen.

#### Props
```typescript
interface TabTwoScreenProps {
  navigation?: any; // React Navigation prop
}
```

#### Features
- Displays tipping guidelines for different countries
- Static content with no interactive elements
- Responsive text layout

### TipRow Component

Reusable component for displaying tip calculation rows.

#### Props
```typescript
interface TipRowProps {
  /** Label text for the row */
  str: string;

  /** Whether the input should be read-only */
  readOnly: boolean;

  /** Callback function for value changes */
  onUpdate: any;

  /** Current state object */
  state: any;
}
```

#### Usage Example
```tsx
<TipRow
  str="Bill Amount"
  readOnly={false}
  onUpdate={this.updateBillAmount}
  state={this.state}
/>
```

## 🎣 Hooks

### useCachedResources

Custom hook for loading app resources.

#### Usage
```tsx
import useCachedResources from '../hooks/useCachedResources';

function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null; // Or loading screen
  }

  return <MainApp />;
}
```

#### Features
- Loads fonts and other assets
- Prevents app from rendering until resources are ready
- Handles loading errors gracefully

### useColorScheme

Hook for accessing the system's color scheme preference.

#### Usage
```tsx
import useColorScheme from '../hooks/useColorScheme';

function ThemedComponent() {
  const colorScheme = useColorScheme(); // 'light' | 'dark'

  return (
    <View style={colorScheme === 'dark' ? darkStyles : lightStyles}>
      <Text>Content</Text>
    </View>
  );
}
```

#### Return Values
- `'light'`: Light color scheme
- `'dark'`: Dark color scheme
- `null`: Unable to determine

## 🎨 Constants

### Colors

Color definitions for consistent theming.

```typescript
// constants/Colors.ts
const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    tint: '#2f95dc',
    tabIconDefault: '#ccc',
    tabIconSelected: '#2f95dc',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    tint: '#fff',
    tabIconDefault: '#ccc',
    tabIconSelected: '#fff',
  },
};
```

### Layout

Layout constants for consistent spacing and dimensions.

```typescript
// constants/Layout.ts
const Layout = {
  window: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  isSmallDevice: Dimensions.get('window').width < 375,
};
```

## 🛠️ Utilities

### Calculation Utilities

#### Tip Calculation Functions

```typescript
/**
 * Calculate tip amount
 */
export const calculateTip = (billAmount: number, tipPercentage: number): number => {
  return billAmount * (tipPercentage / 100);
};

/**
 * Calculate total amount
 */
export const calculateTotal = (billAmount: number, tipAmount: number): number => {
  return billAmount + tipAmount;
};

/**
 * Calculate per-person amount
 */
export const calculatePerPerson = (totalAmount: number, numberOfPeople: number): number => {
  return totalAmount / numberOfPeople;
};

/**
 * Validate numeric input
 */
export const validateNumericInput = (input: string, min: number = 0, max?: number): number => {
  const num = parseFloat(input);
  if (isNaN(num) || num < min) return min;
  if (max !== undefined && num > max) return max;
  return num;
};
```

### Formatting Utilities

```typescript
/**
 * Format currency amount
 */
export const formatCurrency = (amount: number, currency: string = '$'): string => {
  return `${currency}${amount.toFixed(2)}`;
};

/**
 * Format percentage
 */
export const formatPercentage = (percentage: number): string => {
  return `${percentage}%`;
};
```

## 🔧 Error Handling

### Input Validation

The app implements comprehensive input validation:

```typescript
// Example validation in component
private validateAndUpdateBillAmount = (amount: string) => {
  try {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount)) {
      console.warn('Invalid bill amount input');
      return;
    }

    if (numericAmount < 0) {
      console.warn('Bill amount cannot be negative');
      return;
    }

    this.updateBillAmount(amount);
  } catch (error) {
    console.error('Error updating bill amount:', error);
  }
};
```

### Error Boundaries

For production apps, consider implementing error boundaries:

```tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Calculator error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Text>Something went wrong with the calculator.</Text>;
    }

    return this.props.children;
  }
}
```

## 📊 Performance Considerations

### Component Optimization

```tsx
// Use React.memo for functional components
const OptimizedTipRow = React.memo(TipRow);

// Use PureComponent for class components
class OptimizedCalculator extends React.PureComponent {
  // Only re-renders when props/state actually change
}
```

### State Updates

```tsx
// Batch state updates for better performance
this.setState(prevState => ({
  ...prevState,
  tipAmount: newTipAmount,
  totalAmount: newTotalAmount,
  eachPersonPays: newPerPersonAmount
}));
```

## 🧪 Testing APIs

### Component Testing

```typescript
// __tests__/TabOneScreen-test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TabOneScreen from '../screens/TabOneScreen';

describe('TabOneScreen', () => {
  it('calculates tip correctly', () => {
    const { getByPlaceholderText, getByText } = render(<TabOneScreen />);

    const billInput = getByPlaceholderText('Bill Amount');
    fireEvent.changeText(billInput, '100');

    const tipInput = getByPlaceholderText('Tip Percent');
    fireEvent.changeText(tipInput, '15');

    expect(getByText('$15.00')).toBeTruthy(); // Tip amount
    expect(getByText('$115.00')).toBeTruthy(); // Total amount
  });
});
```

### Utility Testing

```typescript
// __tests__/calculations-test.js
import { calculateTip, calculateTotal, calculatePerPerson } from '../utils/calculations';

describe('Calculation Utilities', () => {
  test('calculateTip returns correct tip amount', () => {
    expect(calculateTip(100, 15)).toBe(15);
    expect(calculateTip(50, 20)).toBe(10);
  });

  test('calculateTotal returns correct total', () => {
    expect(calculateTotal(100, 15)).toBe(115);
    expect(calculateTotal(50, 10)).toBe(60);
  });

  test('calculatePerPerson splits correctly', () => {
    expect(calculatePerPerson(115, 2)).toBe(57.5);
    expect(calculatePerPerson(60, 3)).toBe(20);
  });
});
```

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Expo Documentation](https://docs.expo.dev/)
- [NativeBase Documentation](https://docs.nativebase.io/)

---

*API Version: 3.6.0 | Last Updated: August 29, 2025*
