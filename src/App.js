import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import { firebaseAuth, firebaseDatabase } from './firebase';

import Header from './Header';
import Login from './Login';
import Main from './Main';
import CardPreview from './CardPreview';
import CardMaker from './CardMaker';
import CardList from './CardList';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
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
    const getCardList = () => {
      let cards = [];
      const cardsRef = firebaseDatabase.ref('cards');

      cardsRef.on('value', (snapshot) => {
        const data = snapshot.val();

        cards = !data ? cards : cards.push(data);

        setCards(cards);
      });
    };

    getCardList();
  }, []);

  if (isLoading) return <p>loading</p>;
  return (
    <Router>
      <Header me={me} signOut={signOut}></Header>
      <Switch>
        <Route exact path="/">
          <Main me={me}>
            <CardPreview selectedCard={selectedCard}></CardPreview>
            <CardMaker selectedCard={selectedCard}></CardMaker>
            <CardList cards={cards}></CardList>
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
