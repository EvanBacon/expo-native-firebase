import auth from '@react-native-firebase/auth';
import * as Facebook from 'expo-facebook';
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
        await auth().signOut();
      } catch ({ message }) {
        console.log('ERROR: user.logoutAsync: ', message);
        Alert.alert(message);
      }
    },
    signInAnonymously: () => {
      try {
        auth().signInAnonymously();
      } catch ({ message }) {
        console.log('Error: user.signInAnonymously', message);
        Alert.alert(message);
      }
    },
    signInWithFacebook: async () => {

      
      try {
        await Facebook.initializeAsync('1918195841818851')

        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
     
        if (type === 'success') {
          // create a new firebase credential with the token
          const credential = auth.FacebookAuthProvider.credential(token);
          // login with credential
          await auth().signInWithCredential(credential);
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
