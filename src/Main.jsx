import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './Main.module.css';

function Main({ children, me, ...rest }) {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!me) {
      return history.push({
        pathname: '/login',
        state: { from: location },
      });
    }
  }, [history, me, location]);

  return <>{children}</>;
}

export default Main;
