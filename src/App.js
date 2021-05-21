import { firebaseAuth } from './firebase';
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

  return (
    <div className="App">
      <button onClick={signOut}>logout</button>
      card maker
      <Login></Login>
    </div>
  );
}

export default App;
