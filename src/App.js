import { firebaseInstance, firebaseAuth } from './firebase';
import Login from './Login';
import './App.css';

// Initialize Firebase
firebaseAuth.onAuthStateChanged((user) => {
  if (user) {
    console.log('already signin', user);
  } else {
    console.log('not signin');
  }
});

function App() {
  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        console.log('signout');
      })
      .catch(console.error);
  };

  const signInWithGithub = () => {
    const provider = new firebaseInstance.auth.GithubAuthProvider();
    provider.addScope('repo');

    firebaseAuth
      .signInWithPopup(provider)
      .then(console.log)
      .catch(console.error);
  };

  const signInWithGoogle = () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    firebaseAuth.languageCode = 'ko';
    firebaseAuth
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
