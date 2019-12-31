import Constants from 'expo-constants';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Logout from '../components/Button/Logout';
import ProfileImage from '../components/Image/ProfileImage';
import dispatch from '../rematch/dispatch';

export default class HomeScreen extends Component {
  static navigationOptions = { title: 'Home' };

  render() {
    return (
      <View style={styles.container}>
        <ProfileImage name={Constants.deviceName} />
        <Text
          style={styles.text}
          onPress={() => {
          
          }}
        >
          Start Demo
        </Text>

        <Logout onPress={() => dispatch().user.logoutAsync()} />
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
