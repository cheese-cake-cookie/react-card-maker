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
import styles from './App.module.css';

class Card {
  constructor() {
    this.id = null;
    this.name = '';
    this.company = '';
    this.position = '';
    this.email = '';
    this.paragraph = '';
    this.bgColor = '';
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
    // @TODO insert or update
    if (!selectedCard.id) {
      const cardsRef = firebaseDatabase.ref().child('cards');
      const newCardRef = cardsRef.push();
      selectedCard.id = newCardRef.key;
      newCardRef.set({ ...selectedCard, uid: me.uid });
    } else {
      let updates = {};
      updates['/cards/' + selectedCard.id] = selectedCard;
      firebaseDatabase.ref().update(updates);
    }
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
      const cardsRef = firebaseDatabase.ref('cards');

      cardsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        let cards = [];

        if (!data) {
          return;
        }

        for (const [key, value] of Object.entries(data)) {
          cards[key] = value;
        }

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
            <section className={styles.cardPreviewSection}>
              <h1>CardPreview</h1>
              <CardPreview selectedCard={selectedCard}></CardPreview>
              {!selectedCard && (
                <button className={styles.button} onClick={createCard}>
                  Create new Card
                </button>
              )}
            </section>
            <section className={styles.cardEditSection}>
              <section className="card-maker">
                <h1>CardMaker</h1>
                {!selectedCard ? (
                  <p>
                    create new card 버튼을 클릭해서 새로운 카드를 만들거나
                    <br /> 편집할 카드를 선택해주세요
                  </p>
                ) : (
                  <CardMaker
                    selectedCard={selectedCard}
                    onChange={updateCard}
                    onCancel={() => setSelectedCard(null)}
                    onSave={saveChange}
                  ></CardMaker>
                )}
              </section>
              <section className="card-list">
                <h1>CardList</h1>
                <CardList
                  cards={cards}
                  me={me}
                  onSelect={setSelectedCard}
                ></CardList>
              </section>
            </section>
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
