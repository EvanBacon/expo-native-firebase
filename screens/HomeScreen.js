import { dispatch } from '@rematch/core';
import { Constants } from 'expo-constants';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import ProfileImage from '../components/Image/ProfileImage';
import Logout from '../components/Button/Logout';

console.ignoredYellowBox = ['Uns'];
export default class HomeScreen extends Component {
  static navigationOptions = { title: 'Home' };

  render() {
    return (
      <View style={styles.container}>
        <ProfileImage name={Constants.deviceName} />
        <Text style={styles.text}>TODO: Add stuff here :)</Text>

        <Logout onPress={() => dispatch.user.logoutAsync()} />
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
  text: {
    textAlign: 'center',
    padding: 16,
  },
});
