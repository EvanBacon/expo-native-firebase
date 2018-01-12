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


