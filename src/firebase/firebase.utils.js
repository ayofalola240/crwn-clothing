import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAengTy-idIm7oHDkoNVQZK_gae9Vf4PT8",
  authDomain: "crwn-db-98691.firebaseapp.com",
  databaseURL: "https://crwn-db-98691.firebaseio.com",
  projectId: "crwn-db-98691",
  storageBucket: "crwn-db-98691.appspot.com",
  messagingSenderId: "337021852919",
  appId: "1:337021852919:web:46ef66f139d07763e147f2",
  measurementId: "G-Y0QDSPWEM7"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
