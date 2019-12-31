<h1 align="center">

<p align="center">
  <img src="https://media.giphy.com/media/Wy6BauP5Ztlmu7zvs8/giphy.gif"/>
</p>

    Expo Firebase 🔥

**Bare-Workflow** with Native Firebase Tutorial / Boiler Plate
</h1>

# 📔 Posts

[Follow me on Twitter](https://twitter.com/baconbrix) for updates on native Firebase changes coming to Expo.

Deprecated: **[~~Using Firebase In Expo~~](https://blog.expo.io/using-firebase-in-expo-e13844061832)**

# 📖 Tutorial

This tutorial is targeted at **Expo v36** and `react-native-firebase` v6.

## Project Setup

- Create a new [**Bare-workflow** project](https://docs.expo.io/versions/v36.0.0/bare/exploring-bare-workflow/)
  - Native Firebase isn't supported in the custom Expo workflow yet.
- Ensure your `ios/Podfile` has the following lines:
  ```rb
  # At the top of the file
  require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'
  require_relative '../node_modules/react-native-unimodules/cocoapods'

  # ...

  # Automatically detect installed unimodules
  use_unimodules!

  # The community version of use_unimodules (used for react-native-firebase)
  use_native_modules!
  ```
- Setup React Native firebase for iOS: [guide](https://invertase.io/oss/react-native-firebase/quick-start/ios-firebase-credentials)
- Setup React Native firebase for Android: [guide](https://invertase.io/oss/react-native-firebase/quick-start/android-firebase-credentials)

# 💻 Usage

Now you should be able to use all of React Native Firebase with Expo Unimodules. You can run this project in the client with `expo start` but the native code for Firebase won't be available, so it won't work as expected.

# 🍎 Guides

> Note: These aren't great guides 😅

## Sign-In with Facebook

- Install the packages:
  - Install the Firebase auth package with `yarn add @react-native-firebase/auth`
  - Install the native package with `expo install expo-facebook` or `yarn add expo-facebook`
  - Then run `cd ios && pod install`
  - Start the project again with `npx react-native run-ios`
- Setup the project in your Facebook developer console: [Guide](https://docs.expo.io/versions/v36.0.0/sdk/facebook/#configuration)
- Go to the Firebase console and open the "Auth" tab, then toggle the Facebook authentication and fill in the values with your FB auth credentials.
- Now you can use the following to authenticate with Facebook:

```js
// Import a firebase auth package
import auth from '@react-native-firebase/auth';
// Import the universal Facebook package
import * as Facebook from 'expo-facebook';
import { Alert } from 'react-native';

async function signInAsync() {
  try {
    // Setup the app
    await Facebook.initializeAsync('YOUR_ID')

    // Open the Facebook redirect...
    const {
      type,
      token,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });

    if (type === 'success') {
      // create a new firebase credential with the token
      const credential = auth.FacebookAuthProvider.credential(token);
      // login with credential
      await auth().signInWithCredential(credential);
      // Get the user's name using Facebook's Graph API
      // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    } else {
      // type === 'cancel'
      // The user cancelled, usually you'll do nothing but sometimes you might want to post this to your analytics
    }
  } catch ({ message }) {
    Alert.alert(message);
  }
}
```

## Uploading Images

- Install the packages:
  - Install the Firebase auth package with `yarn add @react-native-firebase/storage`
  - Install the native permissions package with `expo install expo-permissions` or `yarn add expo-permissions`
  - Install the native media package with `expo install expo-image-picker` or `yarn add expo-image-picker`
  - Optionally: I like to reduce the size of my images to save money on server charges. You can do that by installing `expo install expo-image-manipulator`
  - Then run `cd ios && pod install`
  - Start the project again with `npx react-native run-ios`
- All of the relevant code for uploading, downloading, checking permissions, etc.. can be found in the [Profile Image Component](./components/ProfileImage.js) (Please open an issue if you require more information about this process!)

# 📝 Notes

- `react-native-firebase` v6 doesn't support Notifications.

# 🎬 Video Tutorials

> 🚨 Deprecated: These videos are for `ExpoKit` and not the **Bare-Workflow**, you can still watch them if you wanna see me being awkward though 😅

I put together some videos that you may find helpful 💙 Give them a like if they helped you at all 😇

<div style="text-align:center; display:flex; flex-wrap:wrap; justify-content:space-around;">
    <div>
        <a href="https://www.youtube.com/watch?v=XYTKeFVy7xg">
            <img width="350" src="https://img.youtube.com/vi/XYTKeFVy7xg/0.jpg" alt="iOS setup">
        </a>
        <a href="https://www.youtube.com/watch?v=VtxBNM8NIO4">
            <img width="350" src="https://img.youtube.com/vi/VtxBNM8NIO4/0.jpg" alt="Android setup">
        </a>
    </div>
    <div>
        <a href="https://www.youtube.com/watch?v=pbHlXa3sCPw">
            <img width="350" src="https://img.youtube.com/vi/pbHlXa3sCPw/0.jpg" alt="Android Messages">
        </a>
        <a href="https://www.youtube.com/watch?v=61u3vZFerb0">
            <img width="350" src="https://img.youtube.com/vi/61u3vZFerb0/0.jpg" alt="iOS Messages">
        </a>
    </div>
</div>
