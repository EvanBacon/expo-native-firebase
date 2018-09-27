import firebase from 'expo-firebase-app';
import { Alert } from 'react-native';

const user = {
  state: null,
  reducers: {
    update: (state, props) => ({ ...state, ...props }),
    set: (state, props) => props,
    clear: () => null,
  },
  effects: {
    logoutAsync: async (props, { players }) => {
      try {
        await firebase.auth().signOut();
      } catch ({ message }) {
        console.log('ERROR: user.logoutAsync: ', message);
        Alert.alert(message);
      }
    },
    signInAnonymously: () => {
      try {
        firebase.auth().signInAnonymouslyAndRetrieveData();
      } catch ({ message }) {
        console.log('Error: user.signInAnonymously', message);
        Alert.alert(message);
      }
    },
  },
};
export default user;
