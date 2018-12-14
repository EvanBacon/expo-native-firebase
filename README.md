<h1 align="center">

<p align="center">
  <img src="https://media.giphy.com/media/Wy6BauP5Ztlmu7zvs8/giphy.gif"/>
</p>

    Expo Firebase 🔥

**ExpoKit** with Native Firebase Tutorial / Boiler Plate
</h1>

# 📔 Posts

Follow exposition for updates on `expo-firebase`

**[Using Firebase In Expo](https://blog.expo.io/using-firebase-in-expo-e13844061832)**

# 📖 Tutorial

This tutorial is targeted at **Expo v31** and `expo-firebase-* 1.0.0-rc.5`

## Project Setup

Simply create an Expo project. In the future we hope to make these very simple to use outside of ExpoKit. 

> No one likes lock-in, especially the Expo team 😘 but native code is a big mess, so it's taking it's sweet time 😭

* Download the Expo-CLI `npm i -g expo-cli`
* Create a new project `expo init expo-firebase-example`
* Select any template.
* Enter the project `cd expo-firebase-example`

## Upgrade to ExpoKit! 🔥

This would be a good time to commit your code in git 😀

> If you have a native Firebase project setup already, make sure the bundle ID / Android Package you are about to enter, match what is in your project 🧡

* In your root directory (in the termminal) run: `expo eject`
* Select the option: `ExpoKit: I'll create or log in with an Expo account to use React Native and the Expo SDK.`
* Add a bundle ID. ex: `com.whoareyou.expofirebaseexample`
* Add an Android Package. (usually the same as bundle ID) ex: `com.whoareyou.expofirebaseexample`

## JS Setup

Simply install the services you want to use in your project.

### JS Setup Examples

#### I want Firestore

```sh
yarn add expo-firebase-firestore
```

#### I WANT IT ALL 😈🤤

I usually do this, then remove stuff later...

```sh
yarn add expo-firebase-storage expo-firebase-analytics expo-firebase-app expo-firebase-auth expo-firebase-crashlytics expo-firebase-database expo-firebase-firestore expo-firebase-functions expo-firebase-instance-id expo-firebase-invites expo-firebase-links expo-firebase-messaging expo-firebase-notifications expo-firebase-performance expo-firebase-remote-config
```

## iOS Setup 

First, drag your **`GoogleService-Info.plist`** into your XCode project.

Then if your app has `Google Sign-In` or `expo-firebase-invites` installed, you will need to copy your Firebase **`REVERSE_CLIENT_ID`** in to a new URL Scheme.

![Setup URL Type in Expo Firebase](https://github.com/EvanBacon/expo-native-firebase/blob/master/demo/ExpoFirebaseUrlTypeSetup.png?raw=true)


Time to write some Objective-C! 

> Writing native code sucks, hopefully in the future we can find a way to just link this. Please message me if you have troubles setting this up 🧡

[**`ios/**/AppDelegate.m`**](https://github.com/EvanBacon/expo-native-firebase/blob/master/ios/demofirebasemodulesapp/AppDelegate.m)

```objc      

// At the top of the file:

#if __has_include(<EXFirebaseNotifications/EXFirebaseNotifications.h>)
#import <EXFirebaseNotifications/EXFirebaseNotifications.h>
#endif

#if __has_include(<EXFirebaseMessaging/EXFirebaseMessaging.h>)
#import <EXFirebaseMessaging/EXFirebaseMessaging.h>
#endif
#if __has_include(<EXFirebaseLinks/EXFirebaseLinks.h>)
#if __has_include(<EXFirebaseInvites/EXFirebaseInvites.h>)
#import <EXFirebaseInvites/EXFirebaseInvites.h>
#else
#import <EXFirebaseLinks/EXFirebaseLinks.h>
#endif
#endif

#if __has_include(<FirebaseCore/FIRApp.h>)
#import <FirebaseCore/FIROptions.h>
#import <FirebaseCore/FIRApp.h>
#endif

#if __has_include(<FirebaseDatabase/FIRDatabase.h>)
#import <FirebaseDatabase/FIRDatabase.h>
#endif

static NSString *const EXLinkingUrlScheme = @"";

// Later...

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#if __has_include(<FirebaseCore/FIRApp.h>)
    // If the app contains the GoogleService-Info.plist then use it.
    if ([FIROptions defaultOptions] != nil) {
#if __has_include(<EXFirebaseLinks/EXFirebaseLinks.h>)
        if (![EXLinkingUrlScheme isEqualToString:@""]) {
            [FIROptions defaultOptions].deepLinkURLScheme = EXLinkingUrlScheme;
        }
#endif
        [FIRApp configure];
#if __has_include(<EXFirebaseDatabase/EXFirebaseDatabase.h>)
        [FIRDatabase database].persistenceEnabled = YES;
#endif
#if __has_include(<EXFirebaseNotifications/EXFirebaseNotifications.h>)
        [EXFirebaseNotifications configure];
#endif
    }
#endif

    _window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    _window.backgroundColor = [UIColor whiteColor];
    [[ExpoKit sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];
    _rootViewController = [ExpoKit sharedInstance].rootViewController;
    _window.rootViewController = _rootViewController;

    [_window makeKeyAndVisible];
    
    return YES;
}

#pragma mark - Handling URLs

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
    id annotation = options[UIApplicationOpenURLOptionsAnnotationKey];
    NSString *sourceApplication = options[UIApplicationOpenURLOptionsSourceApplicationKey];
#if __has_include(<EXFirebaseLinks/EXFirebaseLinks.h>)
#if __has_include(<EXFirebaseInvites/EXFirebaseInvites.h>)
    if ([[EXFirebaseInvites instance] application:app openURL:url options:options]) {
        return YES;
    }
#else
    if ([[EXFirebaseLinks instance] application:app openURL:url options:options]) {
        return YES;
    }
#endif
#endif
    return [[ExpoKit sharedInstance] application:app openURL:url sourceApplication:sourceApplication annotation:annotation];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
#if __has_include(<EXFirebaseLinks/EXFirebaseLinks.h>)
#if __has_include(<EXFirebaseInvites/EXFirebaseInvites.h>)
    if ([[EXFirebaseInvites instance] application:application continueUserActivity:userActivity restorationHandler:restorationHandler]) {
      return YES;
    }
#else
    if ([[EXFirebaseLinks instance] application:application continueUserActivity:userActivity restorationHandler:restorationHandler]) {
      return YES;
    }
#endif
#endif
    return [[ExpoKit sharedInstance] application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
     #if __has_include(<EXFirebaseMessaging/EXFirebaseMessaging.h>)
         #if __has_include(<EXFirebaseNotifications/EXFirebaseNotifications.h>)
            [[EXFirebaseNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
         #else
            [[EXFirebaseMessaging instance] didReceiveRemoteNotification:userInfo];
         #endif
     #endif
}
```

**`ios/Podfile`**

```rb
# Bacon: Start Custom Modules (Firebase)
pod 'EXFirebaseApp', 
  path: '../node_modules/expo-firebase-app/ios'
pod 'EXFirebaseAnalytics', 
  path: '../node_modules/expo-firebase-analytics/ios'
pod 'EXFirebaseAuth', 
  path: '../node_modules/expo-firebase-auth/ios'
pod 'EXFirebaseCrashlytics',
  path: '../node_modules/expo-firebase-crashlytics/ios'
pod 'EXFirebaseDatabase',
  path: '../node_modules/expo-firebase-database/ios'
pod 'EXFirebaseFirestore',
  path: '../node_modules/expo-firebase-firestore/ios'
pod 'EXFirebaseFunctions',
  path: '../node_modules/expo-firebase-functions/ios'
pod 'EXFirebaseInstanceID',
  path: '../node_modules/expo-firebase-instance-id/ios'
pod 'EXFirebaseLinks',
  path: '../node_modules/expo-firebase-links/ios'
pod 'EXFirebaseInvites',
  path: '../node_modules/expo-firebase-invites/ios'
pod 'EXFirebaseMessaging',
  path: '../node_modules/expo-firebase-messaging/ios'
pod 'EXFirebaseNotifications',
  path: '../node_modules/expo-firebase-notifications/ios'
pod 'EXFirebasePerformance',
  path: '../node_modules/expo-firebase-performance/ios'
pod 'EXFirebaseRemoteConfig',
  path: '../node_modules/expo-firebase-remote-config/ios'
pod 'EXFirebaseStorage',
  path: '../node_modules/expo-firebase-storage/ios'
# Bacon: End Custom Modules
```

## Android Setup

First, copy & paste the contents of your **`google-services.json`** into the Expo generated version located at: **`android/app/google-services.json`**

**`android/settings.gradle`**

```gradle

include ':app'
 def modulesDir = new File(rootDir, "../node_modules")
 def includeUniversalModule = { name ->
  include ":$name"
  project(":$name").projectDir = new File(modulesDir, "$name/android")
}
 [
    'expo-core',
    'expo-firebase-app',
    'expo-firebase-analytics',
    'expo-firebase-auth',
    'expo-firebase-crashlytics',
    'expo-firebase-database',
    'expo-firebase-firestore',
    'expo-firebase-functions',
    'expo-firebase-instance-id',
    'expo-firebase-invites',
    'expo-firebase-links',
    'expo-firebase-messaging',
    'expo-firebase-notifications',
    'expo-firebase-performance',
    'expo-firebase-remote-config',
    'expo-firebase-storage'  ,
].forEach({ moduleName -> includeUniversalModule(moduleName) })

```

**`android/app/build.gradle`**

```gradle

dependencies {

  // ...

  api project(':expo-core')
  api project(':expo-firebase-analytics')
  api project(':expo-firebase-app')
  api project(':expo-firebase-auth')
  api project(':expo-firebase-crashlytics')
  api project(':expo-firebase-database')
  api project(':expo-firebase-firestore')
  api project(':expo-firebase-functions')
  api project(':expo-firebase-instance-id')
  api project(':expo-firebase-invites')
  api project(':expo-firebase-links')
  api project(':expo-firebase-messaging')
  api project(':expo-firebase-notifications')
  api project(':expo-firebase-performance')
  api project(':expo-firebase-remote-config')
  api project(':expo-firebase-storage')  
}
```

**`android/app/src/main/AndroidManifest.xml`**

```xml
<!-- FCM -->
<service
  android:name="expo.modules.firebase.messaging.EXFirebaseMessagingService">
  <intent-filter>
    <action android:name="com.google.firebase.MESSAGING_EVENT"/>
  </intent-filter>
</service>
<meta-data
  android:name="com.google.firebase.messaging.default_notification_icon"
  android:resource="@drawable/shell_notification_icon" />
<meta-data
  android:name="com.google.firebase.messaging.default_notification_color"
  android:resource="@color/colorAccent" />
<service
  android:name=".fcm.FcmRegistrationIntentService"
  android:exported="false">
</service>
 <!-- Expo Firebase Instance ID -->
<service android:name="expo.modules.firebase.messaging.EXFirebaseInstanceIdService">
    <intent-filter>
        <action android:name="com.google.firebase.INSTANCE_ID_EVENT"/>
    </intent-filter>
</service>
<!-- Expo Firebase Background Messages -->
<service android:name="expo.modules.firebase.messaging.FirebaseBackgroundMessagingService" />
```


**`android/app/src/main/java/host/exp/MainActivity.java`**

```java

// At the top of the file

import expo.modules.firebase.analytics.FirebaseAnalyticsPackage;
import expo.modules.firebase.app.FirebaseAppPackage;
import expo.modules.firebase.auth.FirebaseAuthPackage;
import expo.modules.firebase.fabric.crashlytics.FirebaseCrashlyticsPackage;
import expo.modules.firebase.database.FirebaseDatabasePackage;
import expo.modules.firebase.firestore.FirebaseFirestorePackage;
import expo.modules.firebase.functions.FirebaseFunctionsPackage;
import expo.modules.firebase.instanceid.FirebaseInstanceIDPackage;
import expo.modules.firebase.invites.FirebaseInvitesPackage;
import expo.modules.firebase.links.FirebaseLinksPackage;
import expo.modules.firebase.messaging.FirebaseMessagingPackage;
import expo.modules.firebase.notifications.FirebaseNotificationsPackage;
import expo.modules.firebase.performance.FirebasePerformancePackage;
import expo.modules.firebase.remoteconfig.FirebaseRemoteConfigPackage;
import expo.modules.firebase.storage.FirebaseStoragePackage;

// Later...

@Override
public List<Package> expoPackages() {
  // Here you can add your own packages.
  return Arrays.<Package>asList(
          new FirebaseAppPackage(),
          new FirebaseAnalyticsPackage(),
          new FirebaseAuthPackage(),
          new FirebaseCrashlyticsPackage(),
          new FirebaseDatabasePackage(),
          new FirebaseFirestorePackage(),
          new FirebaseFunctionsPackage(),
          new FirebaseInstanceIDPackage(),
          new FirebaseInvitesPackage(),
          new FirebaseLinksPackage(),
          new FirebaseMessagingPackage(),
          new FirebaseNotificationsPackage(),
          new FirebasePerformancePackage(),
          new FirebaseRemoteConfigPackage(),
          new FirebaseStoragePackage()
  );
}

```

# 💻 Usage

After you are all setup, use the library anywhere like so:

```js
import firebase from 'expo-firebase-app'
```

## Using Services

My day-1 users know that in pre rc.5, you needed to import the services before using them:

```js
// ❌
import 'expo-firebase-database';

firebase.database()
```

But now in `1.0.0-rc.5` and greater, you can just use the service directly, and `expo-firebase` will attempt to auto import the library. If the library isn't installed properly you'll get a (hopefully) helpful error message.

```js
// ✅
firebase.database()
```

## Using Types

`expo-firebase` is based on RNFirebase, and in RNFirebase you can use types like so:

```js
// ❌
const notification = new Firebase.notifications.Notification();
```

But I've removed this as it doesn't play nicely with TypeScript, so now you should import your types from their library. This will create a much better dev experience and help a ton with debugging.

```js
// ✅
import { Notification } from 'expo-firebase-notifications';

const notification = new Notification();
```

# ⭐️ Upgrading

Because expo-firebase is still in RC (Not officially stable) you should expect breaking changes / improvements.

When upgrading, you should check back here to see if the `AppDelegate`, or `AndroidManifest` code has changed. So far it's changed every time 🙃

## JS Upgrade

```sh
yarn; yarn upgrade
```

## iOS Upgrade

```sh
cd ios; pod install
```

## Android Upgrade

```sh
cd android; ./gradlew build
```

# 📚 Libraries

Crafted with care ☺️

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
* [`expo-firebase-crashlytics`](https://www.npmjs.com/package/expo-firebase-crashlytics)
* [`expo-firebase-invites`](https://www.npmjs.com/package/expo-firebase-invites)
* [`expo-firebase-links`](https://www.npmjs.com/package/expo-firebase-links)
* [`expo-firebase-messaging`](https://www.npmjs.com/package/expo-firebase-messaging)
* [`expo-firebase-notifications`](https://www.npmjs.com/package/expo-firebase-notifications)

# 🎬 Video Tutorials

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

# 📝 TODO

* Add a unified package which makes setup easier.
* Background Tasks aren't in Expo yet: [Background Tasks PR](https://github.com/expo/expo/pull/2338). After this is merged we can complete all of the Notification features.
* Fix require cycles in `expo-firebase-database`, `expo-firebase-storage`, & `expo-firebase-firestore`. You can ignore these with:
```js
console.ignoreYellowBox = ["...start of the warning"];
```
* Make the experimental Notification features offical!
* Expand `EXFaceDetector` and turn it into **`firebase.vision()`**
* [Subscribe to the youtube channel 😉](https://www.youtube.com/c/exposition?sub_confirmation=1)
* Document how to use the experimental notification features on iOS.
* Stars help me know what to focus 🌟
