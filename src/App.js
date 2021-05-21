import { useState, useEffect } from 'react';
import { firebaseAuth } from './firebase';
import Login from './Login';
import './App.css';

function App() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      user?.displayName ? setUserName(user.displayName) : setUserName(null);
    });
  }, []);

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
      {userName}
      <Login></Login>
    </div>
  );
}

export default App;
