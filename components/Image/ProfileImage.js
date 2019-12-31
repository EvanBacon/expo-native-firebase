import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { Component } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

import Settings from '../../constants/Settings';
import getPermissionAsync from '../../utils/getPermission';
import shrinkImageAsync from '../../utils/shrinkImageAsync';
import uploadImageAsync from '../../utils/uploadImageAsync';
import AvatarImage from './AvatarImage';

export default class ProfileImage extends React.Component {
  state = {
    image: null,
    isUploadingImage: false,
    progress: 0,
  };

  componentDidMount() {
    if (!this.state.image) this._getProfileImageAsync();
  }

  _getProfileImageAsync = async () => {
    const { storagePath } = this;
    if (!storagePath) return;

    try {
      const uri = await storage()
        .ref(storagePath)
        .getDownloadURL();
      this.setState({ image: uri });
    } catch ({ code, message }) {
      console.log('ProfileImage: Warn: ', message);
    }
  };

  _setNewPhoto = async uri => {
    if (!uri || uri === '') return;
    this.setState({ isUploadingImage: true, progress: 0, image: uri });
    const { uri: reducedImageUri } = await shrinkImageAsync(uri);
    try {
      await uploadImageAsync(
        reducedImageUri,
        this.storagePath,
        this._onProgressUpdated,
      );
    } catch ({ code, message }) {
      console.warn('ProfileImage: Error: ', message);
    } finally {
      this.setState({ isUploadingImage: false, progress: 0 });
    }
  };

  _onProgressUpdated = progress => this.setState({ progress });

  get storagePath() {
    const { currentUser } = this;
    if (!currentUser) return null;
    return `images/${this.currentUser.uid}/image.jpeg`;
  }

  get currentUser() {
    const { currentUser } = auth();
    if (!currentUser) {
      return;
    }
    return currentUser;
  }

  _takePictureAsync = async () => {
    const permission = await getPermissionAsync(Permissions.CAMERA);
    if (!permission) return;
    const { uri } = await ImagePicker.launchCameraAsync();
    return this._setNewPhoto(uri);
  };

  _selectPictureAsync = async () => {
    const permission = await getPermissionAsync(Permissions.CAMERA_ROLL);
    if (!permission) return;
    const { uri } = await ImagePicker.launchImageLibraryAsync();
    return this._setNewPhoto(uri);
  };

  onPress = () => {
    if (!this.currentUser) return;

    Alert.alert('Profile Picture', 'Select a new image', [
      {
        text: 'Camera',
        onPress: this._takePictureAsync,
      },
      {
        text: 'Library',
        onPress: this._selectPictureAsync,
      },
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPress}>
          <AvatarImage
            progress={this.state.progress}
            textStyle={styles.text}
            avatarStyle={styles.avatar}
            name={this.props.name}
            avatar={this.state.image}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Settings.avatarSize,
    minWidth: Settings.avatarSize,
  },
  text: { fontWeight: 'bold', fontSize: 48 },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: Settings.avatarSize / 2,
  },
});
