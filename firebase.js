import RNFirebase from 'react-native-firebase';

const configure = () => {
  const debugging =
    global.isDebuggingInChrome ||
    __DEV__ ||
    process.env.NODE_ENV === `development`;
  const testingUID = null; // "some-url-you-use-for-testing";

  const configurationOptions = {
    debug: true, // debugging ? '*' : false,
    // debug: false
    errorOnMissingPlayServices: true,
    persistence: true,
  };

  const firebase = RNFirebase.initializeApp(configurationOptions);
  firebase.user = () => firebase.auth().currentUser || {};
  if (debugging) {
    firebase.uid = () => Settings.testingUID || firebase.user().uid;
  } else {
    firebase.uid = () => firebase.user().uid;
  }
  global.firebase = firebase;
  return firebase;
};

export default global.firebase || configure();
