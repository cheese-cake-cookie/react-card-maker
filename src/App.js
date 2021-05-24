import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import { firebaseAuth } from './firebase';

import Header from './Header';
import Login from './Login';
import Main from './Main';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch(console.error);
  };

  const getUser = useCallback(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      user &&
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        });
    });
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Router>
      <Header user={user} signOut={signOut}></Header>
      <Switch>
        <Route exact path="/">
          <Main user={user} />
        </Route>
        <Route path="/login">
          <Login user={user} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
