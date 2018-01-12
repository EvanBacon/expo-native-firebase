import React from 'react';
import { StyleSheet, Platform, Text, View, CameraRoll } from 'react-native';

import AssetUtils from 'expo-asset-utils';
import firebase from 'react-native-firebase';
import Expo from 'expo';

function setScreenName(name) {
  const { OS } = Platform;
  if (OS === 'android') {
    firebase.analytics().setCurrentScreen(name, 'MainActivity');
  } else {
    firebase.analytics().setCurrentScreen(name, 'EXViewController');
  }
}

async function basicImageUpload(uri, uploadUri) {
  try {
    await firebase
      .storage()
      .ref(uploadUri)
      .putFile(uri);
  } catch (error) {
    console.error(error);
  }
}

async function advancedImageUpload(uri, uploadUri) {
  return new Promise((res, rej) => {
    const unsubscribe = firebase
      .storage()
      .ref(uploadUri)
      .putFile(uri)
      .on(
        'state_changed',
        nState => {
          const {
            metadata,
            bytesTransferred,
            downloadUrl,
            ref,
            task,
            totalBytes,
            state,
          } = nState;

          const progress = (bytesTransferred || 0) / totalBytes;
          console.log('State Change', progress);
          //Current upload state

          switch (state) {
            case 'running': // or 'running'
              console.log('Upload is resumed');
              // resumed && resumed();
              break;
            case 'success': // or 'running'
              console.log('Upload is done');
              // var _progress = (bytesTransferred / totalBytes);
              // onProgress && onProgress(_progress);
              break;
          }
        },
        err => {
          //Error
          console.log("Error: Couldn't upload image");
          console.error(err);
          unsubscribe();
          rej(err);
        },
        uploadedFile => {
          //Success
          // console.log('Image uploaded!', uploadedFile);
          unsubscribe();
          res(uploadedFile);
        },
      );
  });
}

//// Go crazy: https://rnfirebase.io/docs/v3.2.x/getting-started

export default class App extends React.Component {
  state = {
    uid: null,
  };
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    } else {
      this.startDoingStuff();
    }
  };

  startDoingStuff = async () => {
    const uid = firebase.auth().currentUser.uid;
    this.setState({ uid });

    this.doAnalyticsStuff(uid);
    this.doStorageStuff();
  };

  doAnalyticsStuff = uid => {
    firebase.analytics().setAnalyticsCollectionEnabled(true); // This is default I think...
    firebase.analytics().setUserId(uid);
    firebase.analytics().setUserProperty('least_favorite_actor', 'Ben Affleck');

    setScreenName('Home');
  };

  doStorageStuff = async () => {
    const imageUri = await this.getImageFromGallery();
    const uploadUri = 'images/image.png';
    // basicImageUpload(imageUri, uploadUri)
    // advancedImageUpload(imageUri, uploadUri);
  };

  getImageFromGallery = async () => {
    const { status } = await Expo.Permissions.askAsync(
      Expo.Permissions.CAMERA_ROLL,
    );
    if (status !== 'granted') {
      alert('failed to get library asset, please enable and restart demo');
      return;
    }

    const { edges } = await CameraRoll.getPhotos({ first: 1 });
    const assetLibraryImage = edges.map(
      ({ node: { image, timestamp } }, index) => image.uri,
    )[0];

    return assetLibraryImage;
  };

  async componentDidMount() {
    this.observeAuth();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.uid || 'loading...'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
