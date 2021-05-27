import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import { firebaseAuth, firebaseDatabase } from './firebase';

import Header from './Header';
import Login from './Login';
import Main from './Main';
import CardPreview from './CardPreview';
import CardMaker from './CardMaker';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
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

  useEffect(() => {
    const getUsers = () => {
      const usersRef = firebaseDatabase.ref('users');

      usersRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (!data) return;

        setUsers(users.concat(data));
      });
    };

    getUsers();
  }, []);

  return isLoading ? (
    <span>loading...</span>
  ) : (
    <Router>
      <Header me={me} signOut={signOut}></Header>
      <Switch>
        <Route exact path="/">
          <Main me={me}>
            <CardMaker></CardMaker>
            <CardPreview users={users}></CardPreview>
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
