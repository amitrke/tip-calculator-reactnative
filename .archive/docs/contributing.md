# Contributing to Easy Tip and Split Calculator

Thank you for your interest in contributing to the Easy Tip and Split Calculator! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Code Style](#code-style)
- [Documentation](#documentation)

## 🤝 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm (recommended) or npm
- Git
- Expo CLI (`pnpm add -g @expo/cli` or `npm install -g @expo/cli`)
- iOS Simulator (macOS) or Android Studio (all platforms)

### Setup

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/tip-calculator-reactnative.git
   cd tip-calculator-reactnative
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```

4. **Install development tools**:
   ```bash
   pnpm add -g commitizen standard-version
   # or
   npm install -g commitizen standard-version
   ```
5. **Start development**:
   ```bash
   npm start
   ```

## 🔄 Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
# Create and switch to new branch
git checkout -b feature/your-feature-name

# Or create from develop branch
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Write clear, focused commits
- Test your changes thoroughly
- Update documentation if needed
- Follow the existing code style

### 3. Test Your Changes

```bash
# Run tests
npm test

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

### 4. Commit Your Changes

Use conventional commit format:

```bash
# Stage your changes
git add .

# Use commitizen for proper commit format
git cz

# Or manually format commit
git commit -m "feat: add new feature description"
```

## 📝 Commit Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Commit Types

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat: add dark mode toggle
fix: correct tip calculation for zero bill amount
docs: update installation instructions
style: format code with prettier
refactor: simplify state management logic
test: add unit tests for calculator component
chore: update dependencies
```

## 🔍 Pull Request Process

### 1. Prepare Your PR

- Ensure your branch is up to date with `develop`
- Run all tests and ensure they pass
- Update documentation if needed
- Write a clear PR description

### 2. Create Pull Request

1. Go to the repository on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill out the PR template:
   - **Title**: Clear, descriptive title
   - **Description**: What changes were made and why
   - **Screenshots**: If UI changes were made
   - **Testing**: How the changes were tested

### 3. PR Review Process

- Maintainers will review your PR
- Address any feedback or requested changes
- Once approved, your PR will be merged
- Your branch may be deleted after merging

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for new features
- Update tests when fixing bugs
- Ensure all tests pass before submitting PR
- Aim for good test coverage

### Test Structure

```
__tests__/
├── components/
│   └── ComponentName-test.js
├── screens/
│   └── ScreenName-test.js
└── utils/
    └── utilityFunction-test.js
```

## 💅 Code Style

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### React Native Specific

- Use functional components with hooks when possible
- Follow React Native performance best practices
- Use appropriate component types (View, Text, etc.)
- Handle platform-specific code properly

### Example

```tsx
interface CalculatorProps {
  initialAmount?: number;
  onAmountChange?: (amount: number) => void;
}

/**
 * Calculator component for tip calculations
 */
const Calculator: React.FC<CalculatorProps> = ({
  initialAmount = 0,
  onAmountChange
}) => {
  const [amount, setAmount] = useState<number>(initialAmount);

  const handleAmountChange = useCallback((newAmount: number) => {
    setAmount(newAmount);
    onAmountChange?.(newAmount);
  }, [onAmountChange]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bill Amount</Text>
      <TextInput
        style={styles.input}
        value={amount.toString()}
        onChangeText={(text) => handleAmountChange(parseFloat(text) || 0)}
        keyboardType="numeric"
      />
    </View>
  );
};
```

## 📚 Documentation

### Updating Documentation

- Update README.md for significant changes
- Update docs/ for technical documentation
- Add code comments for complex logic
- Update API documentation

### Documentation Structure

```
docs/
├── index.md              # Main documentation
├── contributing.md       # This file
├── api.md               # API documentation
├── deployment.md        # Deployment guide
└── troubleshooting.md   # Common issues and solutions
```

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Step-by-step instructions
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, device, app version
6. **Screenshots/Logs**: If applicable

### Feature Requests

For feature requests, please include:

1. **Description**: What feature you'd like
2. **Use Case**: Why this feature would be useful
3. **Implementation Ideas**: If you have suggestions
4. **Mockups**: If applicable

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Documentation**: Check docs/ folder first
- **Expo Forums**: For Expo-specific questions

## 🎉 Recognition

Contributors will be recognized in:
- GitHub repository contributors list
- CHANGELOG.md for significant contributions
- Release notes for major features

Thank you for contributing to the Easy Tip and Split Calculator! 🚀
