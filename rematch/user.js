import firebase from 'expo-firebase-app';
import { Alert } from 'react-native';
import { Constants } from 'expo-constants';
import { statics as FirebaseAuth } from 'expo-firebase-auth';
const { FacebookAuthProvider } = FirebaseAuth;

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
    signInWithFacebook: async () => {
      try {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync(
          Constants.manifest.facebookAppId,
        );
        if (type === 'success') {
          // create a new firebase credential with the token
          const credential = FacebookAuthProvider.credential(token);
          // login with credential
          await firebase.auth().signInWithCredential(credential);
          // Get the user's name using Facebook's Graph API
          // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        } else {
          // type === 'cancel'
        }
      } catch ({ message }) {
        alert(message);
      }
    },
  },
};
export default user;
