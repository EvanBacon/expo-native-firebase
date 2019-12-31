import React from 'react';

import AppNavigator from './AppNavigator';
import analytics from '@react-native-firebase/analytics';
import NavigationService from './NavigationService';

// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export default () => (
  <AppNavigator
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }}
    onNavigationStateChange={(prevState, currentState) => {
      const currentScreen = getActiveRouteName(currentState);
      const prevScreen = getActiveRouteName(prevState);
      if (prevScreen !== currentScreen) {
        console.log('New Screen', currentScreen);
        analytics().setCurrentScreen(currentScreen);
      }
    }}
  />
);
