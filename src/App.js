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

  useEffect(() => {
    const getMe = () => {
      firebaseAuth.onAuthStateChanged((me) => {
        me &&
          setMe({
            uid: me.uid,
            displayName: me.displayName,
            email: me.email,
          });

        setIsLoading(false);
      });
    };
    getMe();
  }, []);

  useEffect(() => {
    const getUser = () => {
      let users = [];
      const usersRef = firebaseDatabase.ref('users');

      usersRef.on('value', (snapshot) => {
        const data = snapshot.val();

        users = !data ? users : users.push(data);

        setUsers(users);
      });
    };

    getUser();
  }, []);

  if (isLoading) return <p>loading</p>;
  return (
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
