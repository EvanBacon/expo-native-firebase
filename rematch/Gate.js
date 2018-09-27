import { init } from '@rematch/core';
import createRematchPersist, { getPersistor } from '@rematch/persist';
import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import * as models from './models';

const persistPlugin = createRematchPersist({
  storage: AsyncStorage,
});

export const store = init({
  models,
  plugins: [persistPlugin],
});

const persistor = getPersistor();
class Gate extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>{this.props.children}</PersistGate>
      </Provider>
    );
  }
}

export default Gate;
