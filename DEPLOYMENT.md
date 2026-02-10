# Deployment Guide - Shofyou Lite

This guide covers deploying the Shofyou Lite mobile app to the App Store and Google Play Store.

## Prerequisites

1. **Expo Account**: Create a free account at https://expo.dev
2. **EAS CLI**: Install the EAS CLI globally
   ```bash
   npm install -g eas-cli
   ```
3. **Login to EAS**:
   ```bash
   eas login
   ```

## Initial Setup

### 1. Configure EAS Build

Initialize EAS in your project:
```bash
eas build:configure
```

This creates an `eas.json` file with build configurations.

### 2. Update App Identifiers

Ensure the following are set in `app.json`:
- iOS: `bundleIdentifier` (e.g., `com.shofyou.lite`)
- Android: `package` (e.g., `com.shofyou.lite`)

## Building for iOS

### Requirements
- Apple Developer Account ($99/year)
- App Store Connect access

### Steps

1. **Create iOS Build**:
   ```bash
   eas build --platform ios
   ```

2. **Choose Build Type**:
   - Development build (for testing)
   - Preview build (for TestFlight)
   - Production build (for App Store)

3. **Submit to App Store**:
   ```bash
   eas submit --platform ios
   ```

### App Store Configuration

Create an app listing in App Store Connect with:
- **App Name**: Shofyou Lite
- **Bundle ID**: com.shofyou.lite
- **Category**: Social Networking
- **Age Rating**: 12+ (social media content)
- **Privacy Policy**: Link to shofyou.com privacy policy
- **Support URL**: Link to shofyou.com support

### Required Screenshots
Prepare screenshots for:
- 6.7" iPhone (1290 x 2796)
- 6.5" iPhone (1242 x 2688)
- 5.5" iPhone (1242 x 2208)
- 12.9" iPad Pro (2048 x 2732)

## Building for Android

### Requirements
- Google Play Developer Account ($25 one-time fee)
- Google Play Console access

### Steps

1. **Create Android Build**:
   ```bash
   eas build --platform android
   ```

2. **Choose Build Type**:
   - APK (for local testing)
   - AAB (for Play Store - recommended)

3. **Submit to Play Store**:
   ```bash
   eas submit --platform android
   ```

### Play Store Configuration

Create an app listing in Google Play Console with:
- **App Name**: Shofyou Lite
- **Package Name**: com.shofyou.lite
- **Category**: Social
- **Content Rating**: Complete questionnaire (likely Teen or Everyone)
- **Privacy Policy**: Link to shofyou.com privacy policy
- **Target Audience**: 13+

### Required Assets
Prepare the following:
- Feature Graphic (1024 x 500)
- Screenshots (minimum 2, up to 8)
- App Icon (512 x 512)
- Video (optional, YouTube link)

## Over-The-Air (OTA) Updates

Expo supports instant updates without app store approval for JavaScript changes.

### Enable OTA Updates

1. **Install EAS Update**:
   ```bash
   npx expo install expo-updates
   ```

2. **Configure in app.json**:
   ```json
   {
     "expo": {
       "updates": {
         "url": "https://u.expo.dev/[your-project-id]"
       }
     }
   }
   ```

3. **Publish Updates**:
   ```bash
   eas update --branch production
   ```

### When to Use OTA vs Store Updates

**Use OTA for**:
- Bug fixes
- UI tweaks
- Content updates
- JavaScript code changes

**Use Store Updates for**:
- Native code changes
- New permissions
- Major features
- Version updates

## App Store Guidelines

### iOS App Review Guidelines
Key points to address:
- Explain the app is a native wrapper for the website
- Provide a demo account if login is required
- Ensure app doesn't just mirror website (add native features)
- Follow Apple's design guidelines

### Google Play Policies
Key requirements:
- Comply with User Data policy
- Implement proper permissions
- Follow content policy guidelines
- Provide clear privacy disclosures

## Performance Optimization

### Reduce Bundle Size

1. **Remove unused dependencies**:
   ```bash
   npx expo install --fix
   ```

2. **Enable Hermes** (JavaScript engine):
   Already enabled in this project via `newArchEnabled: true`

3. **Optimize assets**:
   - Compress images
   - Use WebP format where possible
   - Remove unused fonts

### App Size Targets
- iOS: Aim for < 50MB download size
- Android: Aim for < 30MB download size

Current optimizations:
- Using WebView (lightweight)
- Minimal native dependencies
- On-demand asset loading

## Testing

### Development Testing

1. **Install Expo Go**:
   - Download from App Store/Play Store

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```

3. **Scan QR Code** with Expo Go

### TestFlight (iOS) / Internal Testing (Android)

1. **Create Preview Build**:
   ```bash
   eas build --profile preview --platform ios
   # or
   eas build --profile preview --platform android
   ```

2. **Invite Testers**:
   - iOS: Via TestFlight
   - Android: Via Play Console Internal Testing

## Monitoring

### Analytics
Consider adding:
- Firebase Analytics
- Sentry (error tracking)
- App Center (crash reporting)

### Performance Monitoring
- Monitor app launch time
- Track WebView load performance
- Monitor crash-free users percentage

## Troubleshooting

### Build Failures

**iOS Code Signing Issues**:
```bash
eas credentials
```
Then select "iOS" → "Production" → "Manage credentials"

**Android Keystore Issues**:
```bash
eas credentials
```
Then select "Android" → "Production" → "Manage credentials"

### Submission Rejections

**iOS Common Issues**:
- Missing privacy descriptions
- Incomplete metadata
- Design guideline violations
- Performance issues

**Android Common Issues**:
- Missing content rating
- Privacy policy issues
- Permissions not justified
- Target API level requirements

## Post-Launch

### Monitor Reviews
- Respond to user feedback
- Track crash reports
- Monitor performance metrics

### Update Strategy
- Weekly OTA updates for minor fixes
- Monthly store updates for features
- Emergency updates for critical issues

### Marketing
- Submit to app review sites
- Share on social media
- Email existing Shofyou users
- Create launch blog post

## Resources

- **Expo Documentation**: https://docs.expo.dev
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **EAS Submit**: https://docs.expo.dev/submit/introduction/
- **App Store Guidelines**: https://developer.apple.com/app-store/review/guidelines/
- **Play Store Policies**: https://play.google.com/about/developer-content-policy/

## Support

For deployment issues:
- Expo Forums: https://forums.expo.dev
- Expo Discord: https://chat.expo.dev
- GitHub Issues: Create an issue in this repository

---

Built with Expo EAS
