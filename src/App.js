import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import { firebaseAuth } from './firebase';

import Header from './Header';
import Login from './Login';
import Main from './Main';
import CardPreview from './CardPreview';
import CardMaker from './CardMaker';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
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

      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return isLoading ? (
    <span>loading...</span>
  ) : (
    <Router>
      <Header user={user} signOut={signOut}></Header>
      <Switch>
        <Route exact path="/">
          <Main user={user}>
            <CardMaker></CardMaker>
            <CardPreview></CardPreview>
          </Main>
        </Route>
        <Route path="/login">
          <Login user={user} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
