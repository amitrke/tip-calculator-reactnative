# Easy Tip and Split Calculator

A modern, user-friendly mobile app for calculating tips and splitting bills. Built with React Native and Expo, this app helps you quickly calculate tips and divide bills among multiple people.

<a href='https://play.google.com/store/apps/details?id=com.subnext.tipcalcbillsplit&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img width=200 alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>
<a href="https://apps.apple.com/us/app/easy-tip-and-split-calculator/id1576452022"><img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred.png"></a>

[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/@amitrke/tip-calculator-reactnative)
![Build](https://github.com/amitrke/tip-calculator-reactnative/actions/workflows/expo-built.yml/badge.svg)
![Publish](https://github.com/amitrke/tip-calculator-reactnative/actions/workflows/expo-publish.yml/badge.svg)

[![devDependencies Status](https://david-dm.org/amitrke/tip-calculator-reactnative/dev-status.svg)](https://david-dm.org/amitrke/tip-calculator-reactnative?type=dev)
[![Dependencies Status](https://david-dm.org/amitrke/tip-calculator-reactnative/status.svg)](https://david-dm.org/amitrke/tip-calculator-reactnative)

## ✨ Features

- **Smart Tip Calculator**: Calculate tips based on bill amount and custom percentage
- **Bill Splitting**: Easily split bills among multiple people
- **Real-time Calculations**: Instant updates as you input values
- **Tipping Etiquette Guide**: Learn proper tipping practices for different countries
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Cross-Platform**: Works on iOS, Android, and Web
- **Intuitive UI**: Clean, modern interface with NativeBase components

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- pnpm (recommended) or npm
- Expo CLI

### Installing pnpm

If you don't have pnpm installed, you can install it using:

```bash
# Using npm
npm install -g pnpm

# Using Corepack (Node.js 16.17+)
corepack enable
corepack prepare pnpm@latest --activate

# Using standalone installer
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

**Why pnpm?**
- **Faster**: pnpm is generally faster than npm due to its efficient dependency resolution
- **Disk efficient**: Uses hard links to share dependencies across projects
- **Strict**: More strict dependency resolution prevents issues
- **Monorepo friendly**: Better support for monorepo setups

### Installation

1. Clone the repository:
```bash
git clone https://github.com/amitrke/tip-calculator-reactnative.git
cd tip-calculator-reactnative
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm start
# or
npm start
```

4. Run on your device:
   - **iOS**: Press `i` in the terminal or scan QR code with Camera app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal

## 📱 Usage

### Calculator Tab
1. Enter the bill amount
2. Set your desired tip percentage (default: 15%)
3. Specify number of people to split the bill
4. View calculated tip amount, total amount, and per-person cost

### Etiquette Tab
Learn proper tipping guidelines for:
- United States (15-20% standard)
- United Kingdom (10-15% when service charge not included)
- Australia (rounding up for good service)

## 🛠️ Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v5
- **UI Components**: NativeBase v3
- **Icons**: Expo Vector Icons
- **Styling**: Styled Components
- **Testing**: Jest with jest-expo
- **Version Management**: Standard Version
- **CI/CD**: GitHub Actions

## 📦 Build & Deployment

### Local Development
```bash
# Start development server
pnpm start
# or
npm start

# Run on specific platform
pnpm run android  # Android
pnpm run ios      # iOS
pnpm run web      # Web
# or
npm run android   # Android
npm run ios       # iOS
npm run web       # Web

# Run tests
pnpm test
# or
npm test
```

### Production Builds

#### Using Expo CLI
```bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios
```

#### Using EAS Build (Recommended)
```bash
# Install EAS CLI
pnpm add -g @expo/eas-cli
# or
npm install -g @expo/eas-cli

# Configure project
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

### Automated Versioning

This project uses [Standard Version](https://github.com/conventional-changelog/standard-version) for automated versioning:

```bash
# Install standard-version globally
pnpm add -g standard-version
# or
npm install -g standard-version

# Create new release
standard-version

# Create minor release
standard-version --release-as minor

# Create major release
standard-version --release-as major
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification
4. Commit your changes: `git commit -m 'feat: add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Development Setup

```bash
# Install dependencies
pnpm install
# or
npm install

# Install commitizen for conventional commits
pnpm add -g commitizen
# or
npm install -g commitizen

# Make commits using commitizen
git cz
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Expo Project](https://expo.dev/@amitrke/tip-calculator-reactnative)
- [Android Play Store Test](https://play.google.com/apps/internaltest/4699401688780736937)
- [Lessons Learned](https://amitrke.github.io/tip-calculator-reactnative/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- UI components by [NativeBase](https://nativebase.io/)
- Icons by [Expo Vector Icons](https://docs.expo.dev/guides/icons/)
- Automated versioning with [Standard Version](https://github.com/conventional-changelog/standard-version)
