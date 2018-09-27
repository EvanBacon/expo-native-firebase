import { dispatch } from '@rematch/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  static navigationOptions = { title: 'Auth' };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.text}
          onPress={() => dispatch.user.signInAnonymously()}
        >
          Login Here
        </Text>
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
    padding: 24,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
