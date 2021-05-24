import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './Main.module.css';

function Main({ children, user, ...rest }) {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      return history.push({
        pathname: '/login',
        state: { from: location },
      });
    }
  }, [history, user, location]);

  return <h1>HELLO </h1>;
}

export default Main;
