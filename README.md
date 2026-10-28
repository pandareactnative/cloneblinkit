# Blinkit home UI clone

A React Native recreation of Blinkit's festive home screen. Includes the All and Diwali storefronts, product/category rails, sticky search, Order Again, saved items, location confirmation and a working cart. Layouts, text, prices, banners, icons and decorations are built in code; individual product and category visuals are bundled locally.

Follow [@pandathedeveloper](https://www.instagram.com/pandathedeveloper/) on Instagram for more React Native UI clones.

## Run locally

Use Node **22.22.2** (`nvm use`) and npm. iOS needs Xcode and CocoaPods. Android needs Android Studio, SDK 37, Build Tools 37.0.0, JDK 17 and NDK 27.1.12297006. The Android debug signing key is generated locally.

```sh
npm ci
cd ios && pod install && cd ..
npm start
```

In another terminal, with a simulator or emulator open:

```sh
npm run ios
# or
npm run android
```

Checks: `npm test -- --runInBand`, `npm run typecheck`, `npm run lint`.

Screens and their styles live in `src/Screens`. Shared components, sample data, navigation, state and styles have their own folders. No API keys or backend are required. Cart and saved items last for the current session; one sample cart item is included to match the reference. Orders, payments, microphone recording and print uploads are not connected.

The existing native app registration, splash screen and icon are intentionally retained in this iteration. This is an independent UI study, not an official Blinkit app. Brand names and reference imagery belong to their respective owners.
