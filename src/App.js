import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { firebaseAuth } from './firebase';
import Login from './Login';
import Main from './Main';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      user &&
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          photoURL: user.phoneNumber,
          email: user.email,
        });
    });
  });

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch(console.error);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main user={user} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
      {user && <button onClick={signOut}>logout</button>}
    </Router>
  );
}

export default App;
