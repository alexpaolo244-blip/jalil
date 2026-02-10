# Shofyou Lite - High-Performance Social Network Mobile App

A lightweight, high-performance React Native (Expo) mobile application that provides a native wrapper for the Shofyou social network (https://shofyou.com).

## Features

### Core Performance Features
- **Ultra-Fast Loading**: Advanced caching strategies with instant shell loading
- **Native Progress Bar**: Slim loading indicator (#2196F3) during navigation
- **Hardware Acceleration**: Optimized WebView for smooth video playback (Reels)
- **Edge-to-Edge Layout**: Full screen immersive experience
- **Lightweight**: Optimized for minimal app size

### Advanced Functionality
- **File Upload Bridge**: Native gallery/camera picker integration
  - Multiple image selection support
  - Large video file handling
  - Seamless integration with website upload functionality

- **Smart In-App Browser**: External links open in:
  - Chrome Custom Tabs (Android)
  - Safari View Controller (iOS)
  - Clean close button for easy navigation

- **Anti-Accidental Refresh**: Pull-to-refresh disabled for smooth scrolling
  - Especially important for Reels/Video sections

- **Network Management**:
  - Beautiful offline screen with retry functionality
  - Automatic network status monitoring
  - Graceful handling of connectivity issues

- **Deep Linking**: Direct handling of shofyou.com URLs
  - Open app directly from web links
  - Seamless navigation between web and app

## Tech Stack

- **Framework**: Expo SDK 54 with React Native
- **Navigation**: Expo Router
- **WebView**: react-native-webview (13.15.0)
- **Network Detection**: @react-native-community/netinfo
- **File Uploads**: expo-image-picker
- **In-App Browser**: expo-web-browser

## Project Structure

```
├── app/
│   ├── _layout.tsx          # Root layout with framework initialization
│   ├── index.tsx            # Main app screen with WebView
│   └── +not-found.tsx       # 404 error page
├── components/
│   ├── ShofyouWebView.tsx   # Main WebView component with all features
│   ├── ProgressBar.tsx      # Native-style progress indicator
│   └── OfflineScreen.tsx    # Offline error screen with retry
├── hooks/
│   ├── useNetworkStatus.ts  # Network connectivity detection
│   └── useFrameworkReady.ts # Framework initialization hook
└── assets/
    └── images/              # App icons and splash screens
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build:web
```

## Development

### Running on iOS Simulator
```bash
# Press 'i' in the terminal after starting dev server
npm run dev
```

### Running on Android Emulator
```bash
# Press 'a' in the terminal after starting dev server
npm run dev
```

### Running on Physical Device
1. Install Expo Go on your device
2. Scan the QR code shown in the terminal
3. The app will load on your device

## Building for Production

### iOS (requires macOS)
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

## Configuration

### Deep Linking
The app is configured to handle the following URLs:
- `https://shofyou.com/*`
- `https://www.shofyou.com/*`
- `shofyou://` (custom scheme)

### Permissions
Required permissions are automatically configured:
- Camera access (for photo/video uploads)
- Photo library access (for media uploads)
- Internet access
- Network state monitoring

## Key Features Implementation

### 1. File Upload Bridge
When users click upload buttons on the website, the app:
1. Intercepts the file input click
2. Opens native gallery/camera picker
3. Handles multiple selections
4. Supports large video files (up to 5 minutes)
5. Sends selected files back to the web interface

### 2. External Link Handling
All links not pointing to shofyou.com:
1. Are intercepted before loading
2. Open in a native browser view
3. Maintain app context
4. Provide easy return to app

### 3. Network Status
The app continuously monitors network status and:
1. Shows offline screen when disconnected
2. Provides retry functionality
3. Automatically resumes when connection restored

### 4. Progress Indication
A slim progress bar at the top:
1. Shows during page loading
2. Animates smoothly using native animation
3. Disappears when loading completes
4. Uses brand color (#2196F3)

## Performance Optimizations

- **Caching**: `LOAD_CACHE_ELSE_NETWORK` strategy
- **Hardware Acceleration**: Enabled on Android
- **Cookie Management**: Enabled for session persistence
- **DOM Storage**: Enabled for better performance
- **Inline Media**: Allowed for smooth video playback
- **No Pull-to-Refresh**: Prevents accidental interruptions

## Browser Compatibility

The app uses native browser components:
- **iOS**: SFSafariViewController
- **Android**: Chrome Custom Tabs
- **Fallback**: In-app WebView for unsupported platforms

## Troubleshooting

### File Uploads Not Working
1. Check camera/gallery permissions in device settings
2. Ensure expo-image-picker is properly installed
3. Test on a physical device (simulators may have limitations)

### External Links Not Opening
1. Verify expo-web-browser is installed
2. Check internet connectivity
3. Ensure the URL is not a shofyou.com domain

### Deep Links Not Working
1. Verify app is properly installed
2. Check the URL scheme in app.json
3. Test with the correct URL format

## License

Copyright © 2024 Shofyou. All rights reserved.

## Support

For issues or questions, please contact the Shofyou development team.

---

Built with ❤️ using Expo and React Native
