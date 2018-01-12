# expo-native-firebase

A detached Expo v24 project with react-native-firebase added. 

> This is not a npm package

**This is the prophecy PR: https://github.com/facebook/react-native/pull/11573**

Once it lands, __Blob support__ will be a part of React Native and Expo. 
At that point you can upload files to Firebase Storage... 
Until then, here is a [detached ExpoKit](https://docs.expo.io/versions/latest/guides/detach.html#content) project with [Firebase integration](https://rnfirebase.io/docs/v3.2.x/getting-started) for both Android and iOS.

The two dopest frameworks for native app development combined!! 🔥💙

The API for react-native-firebase is very similar if not exactly the same as the web implementation. 
Eventually when Blob support is added, you should be able to move your code back into a full Expo app pretty painlessly! 😇


### Notice

The following will not be available even with Blob Support:
* Analytics [(Because of Google Analytics)](https://www.npmjs.com/package/expo-analytics)
* Phone Auth
* Crash Reporting
* Crashlytics
* Dynamic Links
* Invites
* Remote Config
* Performance Monitoring


> Expo FileSystem prevents external libs from reading local files, so use CameraRoll to retrieve photos! 


### The need: 

* https://forums.expo.io/t/firebase-in-expo/46
* https://forums.expo.io/t/re-imagepicker-base64-to-firebase-storage-problem/1498
* https://forums.expo.io/t/upload-image-to-firebase-storage/3887
* https://forums.expo.io/t/anyone-figure-out-firebase-storage-before-i-switch-to-s3/5706
* https://forums.expo.io/t/expo-and-uploading-image-blobs/227/23
* https://forums.expo.io/t/fresh-detached-expo-rnfirebase-not-running-on-android/3670
* https://forums.expo.io/t/imagepicker-base64-option-not-working/2654
* https://forums.expo.io/t/expo-audio-file-upload-from-local/3513
* https://forums.expo.io/t/any-update-for-blob-in-sdk-21/3290/7
* https://forums.expo.io/t/how-do-i-upload-an-image-to-firebase-using-imagepicker-in-expo/1008/8
* https://forums.expo.io/t/uploading-images-without-react-native-fetch-blob/981
* https://forums.expo.io/t/thanks-to-expo-please-check-two-issues/2791
* https://forums.expo.io/t/firebase-upload-on-android-phone/2141
* https://forums.expo.io/t/reading-camera-generated-file/2787
* https://forums.expo.io/t/open-when-an-expo-firebase-firestore-platform/4126/7
* https://forums.expo.io/t/how-to-integrate-filesystem-with-imagepicker/5132/3
* https://forums.expo.io/t/general-question-about-expokit/371/3
* https://forums.expo.io/t/detached-app-crashes-on-imagepicker/318/7
* https://expo.canny.io/feature-requests/p/full-native-firebase-integration
* https://expo.canny.io/feature-requests/p/adding-react-native-firebase-to-expo
* https://expo.canny.io/feature-requests/p/phone-number-auth-with-firebase
* https://expo.canny.io/feature-requests/p/support-for-firebase-dynamic-links
* https://expo.canny.io/feature-requests/p/firebase-sms-authentication
* https://expo.canny.io/feature-requests/p/full-support-for-firebase-sdk
* https://expo.canny.io/feature-requests/p/push-notification-dashboard--analytics-integration
* https://expo.canny.io/feature-requests/p/react-native-firebase
* https://github.com/aaronksaunders/expo-rn-firebase-image-upload/blob/master/README.md
* https://stackoverflow.com/questions/42956250/get-download-url-from-file-uploaded-with-cloud-functions-for-firebase
* https://expo.canny.io/feature-requests/p/blob-support



## How to recreate this template
Video tutorial will be coming soon to an expo enabled device near you!
Until then here is a little explaination of how I put this together.
It took ~5 hours 😮 but I'm not as good at coding as you are 😅❤️

```
exp init
```
Give your app a name (firetest is mine) & choose a template (I went with blank)!

```
cd firetest
```

open the project in your favorite IDE, I use VSCode

open your `app.json` and add the following keys:
`expo.ios.bundleIdentifier: "com.yourcompany.yourappname"`
`expo.android.package: "com.yourcompany.yourappname"`

> Note: This would be a good time to commit your project 😄

### Detaching
This is very scary, but it's all part of growing up!

```
exp:detach
```

Then add [`react-native-firebase`](https://rnfirebase.io/docs/v3.2.x/getting-started)
```
yarn add react-native-firebase
```

If you are cool like me, you probably don't have the react-native-cli.
You need it now, so download it like this:
```
npm i -g react-native-cli
```

Now we can use it to link up react-native-firebase with our ios and android projects
```
react-native link react-native-firebase
```

### Setup the firebase project
You could checkout [this setup tutorial](https://rnfirebase.io/docs/v3.2.x/installation/initial-setup), but I found it to be pretty confusing! Mine isn't any better, and theirs has pictures, so this tutorial is basically is the worst. 😅 😭

[Go to the firebase place and make a new app](https://console.firebase.google.com/)

Give it a cool name and continue.

You should be looking at a page with three icon buttons on it, if you don't know what these are I would recommend throwing your computer away.

Click the iOS or Android one (you can pick the other one later 😍)

Follow their little modal thing, remember to use the same bundleIdentifier / package that you entered into the app.json earlier.

Download the `GoogleService-Info.plist` (iOS) or `google-services.json` (Android)

Then skip adding all that code they recommend. 
In android it's almost all there already (💙 Expo) and in iOS I'll just walk you through it.

### iOS Setup
This one is pretty easy (sorry android users... Write Google a letter or something 💌)

Go into your `/ios` directory
```
cd ios
```

Open the Podfile in an IDE (don't use a text editor because it will mess up the quotes 🤢)

```ruby
pod 'GLog',
    :podspec => "../node_modules/react-native/third-party-podspecs/GLog.podspec",
    :inhibit_warnings => true
    
# Add the pods after this GLog thing 
  
pod 'Firebase/Core'
pod 'Firebase/Database'
pod 'Firebase/Auth'
pod 'Firebase/Firestore'
pod 'Firebase/Messaging'
pod 'Firebase/Crash'
pod 'Firebase/DynamicLinks'
pod 'Firebase/RemoteConfig'
pod 'Firebase/Storage'
pod 'Firebase/Performance'

# Whoa there, don't add any pods after this post_install (you can, but just be warned!)

post_install do |installer|
```

Now you can install the pods...

> Cocoapods are like NPM but for schlubbs who native code
> For more info [watch this tutorial](https://www.youtube.com/watch?v=lm1d2Pe1Mqw) I made when I was a schlubb! 🙃
> Give it a dislike! 😄 👎

In the `/ios` directory run this:
```
pod install
```

Open the `.xcworkspace` file (the white one) from now on. **DO NOT USE THE BLUE ONE**

Now verify that you have the correct code in your AppDelegate (This is the part I said I'd walk you through 😜)

**`AppDelegate.m`**
```
#import "AppDelegate.h"
#import "ExpoKit.h"
#import "EXViewController.h"
#import <Firebase.h> /// Import this thing
//@import Firebase; /// Google recommends you use this, but Evan doesn’t! 

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [FIRApp configure]; /// Add this at the beginning of the function
 … 
  return YES;
}
```

And then drag the `GoogleService-Info.plist` into your project (I recommend putting it by the `info.plist`)
Check the box "Copy Bundle Resources" and continue.

Now the last thing you need to do for iOS is go back into terminal, go into your projects root directory and start the expo project!

```
exp start
```

With the Expo project running you can build and run your iOS app, you should see the Expo experience! 🎉🎉🎉

Now go out there and create the next Snapchat! 😍

### Android Setup

Ok here we go... 😩

Go grab the `google-services.json` you downloaded when you made the Android Expo app you made in the firebase console when you clicked the green button with the bug robot icon. (I'm over explaining because I don't want to restructure the tutorial (I'm very lazy))

Now you cannot just take this json and move it into your `expo-app-name/android/app/`. 
Because there is already one there! 
So now we merge the two! Basically just favor the Expo keys instead of the firebase keys...


Now open the `android/app/build.gradle`, scroll down to the dependencies, and add this:
```
  compile "com.google.android.gms:play-services-base:9.8.0" /// This one should already be here

  compile "com.google.firebase:firebase-core:9.8.0"
  compile "com.google.firebase:firebase-analytics:9.8.0"
  compile "com.google.firebase:firebase-auth:9.8.0"
  compile "com.google.firebase:firebase-messaging:9.8.0"
  compile "com.google.firebase:firebase-crash:9.8.0"
  compile "com.google.firebase:firebase-database:9.8.0"
  compile "com.google.firebase:firebase-invites:9.8.0"
  compile "com.google.firebase:firebase-config:9.8.0"
  compile "com.google.firebase:firebase-storage:9.8.0"
  
```

I had a problem running version 11.6.0 of firebase stuff, so for right now we are just going to downgrade! 
Anywhere you see a `11.6.0`, drop that sucka down to `9.8.0`.

Only downside is this prevents you from using the coolest lib (Firestore) and some other random lib (Performance)

Again make sure the expo app is running **before** you run the project (this is because expo saves the link in the code before it bundles it onto the device)

Now go ahead and run the project!! 🎉 ( most likely you will have errors, open an issue, spam my twitter @baconbrix ) 🤷‍♀️

This should be enough to get things going, if you have some more problems here are a few things you can try:

* In the `android/app/build.gradle`, replace `apt` with `annotationProcessor`, remove the apt plugin

* At the top of `android/app/build.gradle`, in the android object, after the `compileSdkVersion` you can add `flavorDimensions 'default'`


### Conclusion

At this point if your computer isn't on fire 🔥 you should feel pretty proud! 
We at Expo are actively working on finding a solution to integrating this. There are many little things that prevent these two libraries from fitting together perfectly, and then there are lots of people who don't want all the extra code in their non-firebase project! 

Best place for questions -> [forums.expo.io](https://forums.expo.io/)


