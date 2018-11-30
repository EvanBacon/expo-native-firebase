import { dispatch } from '@rematch/core';
import { Constants } from 'expo-constants';
import { Permissions } from 'expo-permissions';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import firebase from 'expo-firebase-app';
import ProfileImage from '../components/Image/ProfileImage';
import Logout from '../components/Button/Logout';
import { Notification } from 'expo-firebase-notifications';
export default class HomeScreen extends Component {
  static navigationOptions = { title: 'Home' };

  render() {
    return (
      <View style={styles.container}>
        <ProfileImage name={Constants.deviceName} />
        <Text
          style={styles.text}
          onPress={() => {
            const notification = new Notification()
              .setNotificationId('some-notification')
              .setTitle('OMG Notification!')
              .setBody('Firebase RC.5')
              .setData({
                key1: 'value1',
                key2: 'value2',
              })
              .ios.setBadge(Math.round(Date.now() % 400));

            // const date = new Date();
            // date.setSeconds(date.getSeconds() + 10);
            // firebase.notifications().scheduleNotification(notification, {
            //   fireDate: date.getTime(),
            // });

            firebase.notifications().displayNotification(notification);

            /*
            // Experimental location notifications
            await Permissions.askAsync(Permissions.LOCATION);
            firebase.notifications().nativeModule.displayNotification({
              ...notification.build(),
              repeats: true,
              location: {
                center: {
                  lat: 37.458644,
                  lon: -122.132255,
                },
                radius: 400 * 0.3048,
                id: 'ParkByMyHouse',
              },
            });
            */
          }}
        >
          Start Demo
        </Text>

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
