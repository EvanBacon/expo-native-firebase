import { init } from '@rematch/core';
import React from 'react';
import { Provider } from 'react-redux';

import * as models from './models';

export const store = init({
  models,
});

global.__rematch_store = store;
global.__rematch_dispatch = store.dispatch;

class Gate extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    );
  }
}

export default Gate;
