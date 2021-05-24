import { useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { firebaseAuth } from './firebase';
import styles from './Main.module.css';

function Main({ children, ...rest }) {
  const history = useHistory();
  const location = useLocation();
  const getUser = useCallback(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        return history.push({
          pathname: '/login',
          state: { from: location },
        });
      }
    });
  }, [history, location]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return <h1>main</h1>;
}

export default Main;
