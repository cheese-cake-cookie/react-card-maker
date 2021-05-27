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
  const [me, setMe] = useState(null);

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        setMe(null);
      })
      .catch(console.error);
  };

  const getMe = useCallback(() => {
    firebaseAuth.onAuthStateChanged((me) => {
      me &&
        setMe({
          uid: me.uid,
          displayName: me.displayName,
          email: me.email,
        });

      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getMe();
  }, [getMe]);

  return isLoading ? (
    <span>loading...</span>
  ) : (
    <Router>
      <Header me={me} signOut={signOut}></Header>
      <Switch>
        <Route exact path="/">
          <Main me={me}>
            <CardMaker></CardMaker>
            <CardPreview></CardPreview>
          </Main>
        </Route>
        <Route path="/login">
          <Login me={me} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
