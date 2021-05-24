import { useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { firebaseInstance, firebaseAuth } from './firebase';
import styles from './Login.module.css';

function Login() {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const historyCallback = useCallback(() => {
    history.replace(from);
  }, [history, from]);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      user && historyCallback();
    });
  });

  const signInWithGithub = () => {
    const provider = new firebaseInstance.auth.GithubAuthProvider();
    provider.addScope('repo');

    firebaseAuth
      .signInWithPopup(provider)
      .then(console.log)
      .catch(console.error);
  };
  const signInWithGoogle = () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    firebaseAuth.languageCode = 'ko';
    firebaseAuth
      .signInWithPopup(provider)
      .then(console.log)
      .catch(console.error);
  };

  return (
    <div className={styles.login__container}>
      <div className={styles.login__wrap}>
        <h1 className={styles.title}>
          Sign in and make your custom card at here!
        </h1>
        <section className={styles.actions}>
          <button className={styles.button__github} onClick={signInWithGithub}>
            github
          </button>
          <button className={styles.button__google} onClick={signInWithGoogle}>
            google
          </button>
        </section>
      </div>
    </div>
  );
}

export default Login;
