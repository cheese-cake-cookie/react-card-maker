import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'react-card-maker.firebaseapp.com',
  databaseURL: 'https://react-card-maker-default-rtdb.firebaseio.com',
  projectId: 'react-card-maker',
  storageBucket: 'react-card-maker.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const firebaseAuth = firebase.auth();
