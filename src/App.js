import firebase from 'firebase/app';
import 'firebase/auth';
import Login from './Login';
import './App.css';

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
firebase.initializeApp(firebaseConfig);

function App() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('already signin', user);
    } else {
      console.log('not signin');
    }
  });

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('signout');
      })
      .catch(console.error);
  };

  const signInWithGithub = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(console.log)
      .catch(console.error);
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().languageCode = 'ko';
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(console.log)
      .catch(console.error);
  };

  return (
    <div className="App">
      <button onClick={signInWithGoogle}>google login</button>
      <button onClick={signInWithGithub}>github login</button>
      <button onClick={signOut}>logout</button>
      card maker
      <Login></Login>
    </div>
  );
}

export default App;
