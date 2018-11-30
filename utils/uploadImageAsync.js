import firebase from 'expo-firebase-app';

async function uploadImageAsync(uri, uploadUri, onProgress) {
  const onStateChanged = ({ bytesTransferred, totalBytes, state }) => {
    const progress = (bytesTransferred || 0) / totalBytes;
    console.log('State Change', state, progress);
    //Current upload state
    switch (state) {
      case 'running': // or 'running'
        console.log('ProfileImage: Upload is resumed');
        break;
      case 'success': // or 'running'
        console.log('ProfileImage: Upload is done');
        onProgress && onProgress(progress);
        break;
      default:
        console.log('ProfileImage: Unhandled state', state);
        break;
    }
  };

  return new Promise((res, rej) => {
    const unsubscribe = firebase
      .storage()
      .ref(uploadUri)
      .putFile(uri)
      .on(
        'state_changed',
        onStateChanged,
        error => {
          console.log("uploadPhoto: Error: Couldn't upload image");
          unsubscribe();
          rej(error);
        },
        uploadedFile => {
          console.log('uploadPhoto: Image uploaded!', uploadedFile);
          unsubscribe();
          const { downloadURL } = uploadedFile;
          res(downloadURL);
        },
      );
  });
}

export default uploadImageAsync;
