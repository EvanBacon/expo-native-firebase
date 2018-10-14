# expo-firebase example

Read more: **[Using Firebase In Expo](https://blog.expo.io/using-firebase-in-expo-e13844061832)**

This is a **detached ExpoKit** app with Expo Firebase modules installed. Tutorial below 👇👇👇

![Hey there](https://media.giphy.com/media/Wy6BauP5Ztlmu7zvs8/giphy.gif)

# Tutorial

 1. Create an Expo project
    * Download the Expo-CLI `npm i -g expo-cli`
    * Create a new project `expo init expo-firebase-example`
    * Select any template.
    * Enter the project `cd expo-firebase-example`
 2. Eject to **ExpoKit**
    * Run `expo eject`
    * Select the option: `ExpoKit: I'll create or log in with an Expo account to use React Native and the Expo SDK.`
    * Add a bundle ID. ex: `com.whoareyou.expofirebaseexample`
    * Add an Android Package. (usually the same as bundle ID) ex: `com.whoareyou.expofirebaseexample`
 3. Add **Expo-Firebase**
    * In the root directory of your project run: `yarn add expo-firebase-app` or `npm i expo-firebase-app`
    * Follow the setup guide for [`expo-firebase-app`](https://www.npmjs.com/package/expo-firebase-app)
 4. Use `expo-firebase`
    * In your `App.js` or anywhere in the js. Use **firebase** like `import firebase 'expo-firebase-app';`
 5. Add simple services
    * Use any other firebase services by following their setup instructions.
      * [`expo-firebase-app`](https://www.npmjs.com/package/expo-firebase-app)
      * [`expo-firebase-analytics`](https://www.npmjs.com/package/expo-firebase-analytics)
      * [`expo-firebase-database`](https://www.npmjs.com/package/expo-firebase-database)
      * [`expo-firebase-storage`](https://www.npmjs.com/package/expo-firebase-storage)
      * [`expo-firebase-firestore`](https://www.npmjs.com/package/expo-firebase-firestore)
      * [`expo-firebase-performance`](https://www.npmjs.com/package/expo-firebase-performance)
      * [`expo-firebase-auth`](https://www.npmjs.com/package/expo-firebase-auth)
      * [`expo-firebase-instance-id`](https://www.npmjs.com/package/expo-firebase-instance-id)
      * [`expo-firebase-remote-config`](https://www.npmjs.com/package/expo-firebase-remote-config)
      * [`expo-firebase-functions`](https://www.npmjs.com/package/expo-firebase-functions)
    * Remember to import the services before using them. ex: `import 'expo-firebase-database';`
 6. Setup advanced services, this will require that you add some extra native code. 
    * On iOS: 
      * [`AppDelegate.m`](https://github.com/EvanBacon/expo-native-firebase/blob/master/ios/demofirebasemodulesapp/AppDelegate.m)
      * [`Podfile`](https://github.com/EvanBacon/expo-native-firebase/blob/1e34866074390d8a8705646b152bdce77d335cb1/ios/Podfile#L71-L100)
    * On Android
      * [`settings.gradle`](https://github.com/EvanBacon/expo-native-firebase/blob/d8f9ada15d58a1c2c028bbc96c76a543dfd5302f/android/settings.gradle#L6-L49)
      * [`app/build.gradle`](https://github.com/EvanBacon/expo-native-firebase/blob/d8f9ada15d58a1c2c028bbc96c76a543dfd5302f/android/app/build.gradle#L188-L203)
      * [`app/src/main/AndroidManifest.xml`](https://github.com/EvanBacon/expo-native-firebase/blob/d8f9ada15d58a1c2c028bbc96c76a543dfd5302f/android/app/src/main/AndroidManifest.xml#L274-L286)
      * [`MainActivity.java`](https://github.com/EvanBacon/expo-native-firebase/blob/d8f9ada15d58a1c2c028bbc96c76a543dfd5302f/android/app/src/main/java/host/exp/exponent/MainActivity.java#L54-L75)
    * Complex libraries:
      * [`expo-firebase-crashlytics`](https://www.npmjs.com/package/expo-firebase-crashlytics)
      * [`expo-firebase-invites`](https://www.npmjs.com/package/expo-firebase-invites)
      * [`expo-firebase-links`](https://www.npmjs.com/package/expo-firebase-links)
      * [`expo-firebase-messaging`](https://www.npmjs.com/package/expo-firebase-messaging)
      * [`expo-firebase-notifications`](https://www.npmjs.com/package/expo-firebase-notifications)

* [`package.json`](https://github.com/EvanBacon/expo-native-firebase/blob/d8f9ada15d58a1c2c028bbc96c76a543dfd5302f/package.json#L15-L29)
* Importing all libs in JS: [`App.js`](https://github.com/EvanBacon/expo-native-firebase/blob/1c5785813e835ca7263289c96f71eb279d49e319/App.js#L4-L18)

# Bugs

* Dynamic Linking API requires a newer version of Google than is in `ExpoKit` by default.
* Dynamic Linking / Invites - inital URL is disabled.
   
