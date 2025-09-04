# Deployment

This document outlines the process for deploying the application to various platforms.

## Web Deployment

To deploy the web version of the application, you can build a static version and host it on any static hosting provider like Netlify, Vercel, or GitHub Pages.

1.  **Build the web application:**
    ```bash
    npx expo export:web
    ```
    This command will create a `web-build` directory with the static assets.

2.  **Deploy to a hosting provider:**
    -   Upload the contents of the `web-build` directory to your hosting provider.
    -   Configure the provider to serve the `index.html` file.

## Mobile Deployment (iOS and Android)

We use Expo Application Services (EAS) to build and deploy the application to the Apple App Store and Google Play Store.

### Prerequisites

-   [Install the EAS CLI](https://docs.expo.dev/build/eas-cli/):
    ```bash
    pnpm install -g eas-cli
    ```
-   [Login to your Expo account](https://docs.expo.dev/build/eas-cli/#login-to-your-expo-account):
    ```bash
    eas login
    ```

### Build the Application

1.  **Configure the build in `eas.json`:**
    If you don't have one, run `eas build:configure` to generate it. This file defines the build profiles for different environments (e.g., development, production).

2.  **Start the build:**
    -   For Android:
        ```bash
        eas build -p android --profile production
        ```
    -   For iOS:
        ```bash
        eas build -p ios --profile production
        ```

    The build will run on EAS servers. You can monitor the progress in your terminal or on the Expo website.

### Submit to the App Stores

Once the build is complete, you can submit it to the respective app stores.

1.  **Configure submissions in `eas.json`:**
    You can define submission profiles in `eas.json` to automate the submission process.

2.  **Start the submission:**
    -   For Android (Google Play Store):
        ```bash
        eas submit -p android
        ```
    -   For iOS (Apple App Store):
        ```bash
        eas submit -p ios
        ```

    The EAS CLI will guide you through the submission process.
