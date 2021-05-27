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

class Card {
  constructor() {
    this.id = null;
    this.name = '';
    this.company = '';
    this.position = '';
    this.email = '';
    this.paragraph = '';
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [me, setMe] = useState(null);

  const createCard = () => {
    const card = new Card();

    setSelectedCard(card);
  };

  const updateCard = (key, value) => {
    const updateCard = { ...selectedCard };
    updateCard[key] = value;

    setSelectedCard(updateCard);
  };

  const saveChange = () => {
    // @TODO insert data to firebase
  };

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
            <h1>CardPreview</h1>
            <CardPreview selectedCard={selectedCard}></CardPreview>
            {!selectedCard && (
              <button onClick={createCard}>Create new Card</button>
            )}
            <h1>CardMaker</h1>
            {selectedCard && (
              <CardMaker
                selectedCard={selectedCard}
                onChange={updateCard}
                onCancel={() => setSelectedCard(null)}
                onSave={saveChange}
              ></CardMaker>
            )}
            <h1>CardList</h1>
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
