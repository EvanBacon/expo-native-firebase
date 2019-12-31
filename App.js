import auth from '@react-native-firebase/auth';
import React from 'react';

import Navigation from './navigation';
import NavigationService from './navigation/NavigationService';
import Gate from './rematch/Gate';

export default class App extends React.Component {  
  componentDidMount() {
    this.unsubFromAuthState = auth().onAuthStateChanged(user => {
      if (!user) {
        NavigationService.navigate('Auth');
      } else {
        NavigationService.navigate('App');
      }
    });
  }

  componentWillUnmount() {
    this.unsubFromAuthState();
  }

  render() {
    return (
      <Gate>
        <Navigation />
      </Gate>
    );
  }
}