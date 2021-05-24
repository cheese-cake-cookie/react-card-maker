import { useHistory } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import styles from './Main.module.css';

function Main({ user }) {
  const history = useHistory();
  const redirectToLogin = useCallback(() => {
    history.replace({ pathname: '/login' });
  }, [history]);

  useEffect(() => {
    if (!user) return redirectToLogin();
  }, [user, redirectToLogin]);

  return <h2>HOME</h2>;
}

export default Main;
