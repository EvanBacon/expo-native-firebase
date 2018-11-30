import React from 'react';
import { AppRegistry } from 'react-native';

import firebase from 'expo-firebase-app';

import Navigation from './navigation';

import bgMessaging from './bgMessaging';

import Gate from './rematch/Gate';
import { dispatch } from '@rematch/core';
import NavigationService from './navigation/NavigationService';
import { Permissions } from 'expo';

console.ignoredYellowBox = ['Require', 'Class', 'Warning'];

export default class App extends React.Component {
  state = { isReady: true };
  async componentDidMount() {
    this._setupNotifications();
    this.unsubFromAuthState = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        NavigationService.navigate('Auth');
      } else {
        NavigationService.navigate('App');
      }
    });
  }

  _setupNotifications = async () => {
    let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      throw new Error('ERR: Need permission for notifications');
    }

    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(notification => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        console.log('onNotificationDisplayed', notification);
      });
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        // Process your notification as required
        console.log('onNotification', notification);
      });
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
        console.log('onNotificationOpened', notificationOpen);
      });

    this.messageListener = firebase.messaging().onMessage(message => {
      // Process your message as required
      console.log('onMessage', message);
    });
    this.onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh(fcmToken => {
        // Process your token as required
        console.log('onTokenRefresh', fcmToken);
      });

    // expo-firebase-notifications: 1.0.0-rc.5
    const initial = await firebase.notifications().getInitialNotification();
    if (initial) {
      const { notification, action } = initial;
      console.log('Got Initial Notification:', { notification, action });
    }

    /*
     * You can have either Links or Invites, but you can't observe both at the same time.
     * (Invites basically observes both)
     */

    // const deepLink = await firebase.links().getInitialLink();
    // if (deepLink) {
    //   // Do something linky...
    //   console.log('Got Initial Link:', { deepLink });
    // }

    const invite = await firebase.invites().getInitialInvitation();
    if (invite) {
      const { deepLink, invitationId } = invite;
      console.log('Got Initial Invite:', { deepLink, invitationId });
    }
  };

  componentWillUnmount() {
    this.unsubFromAuthState();
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
    this.messageListener();
  }

  render() {
    return (
      <Gate>
        <Navigation />
      </Gate>
    );
  }
}

// New task registration
AppRegistry.registerHeadlessTask(
  'EXFirebaseBackgroundMessage',
  () => bgMessaging,
);
