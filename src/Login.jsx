import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { firebaseInstance, firebaseAuth } from './firebase';
import styles from './Login.module.css';

function Login({ user }) {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      return history.push({
        pathname: '/',
        state: { from: location },
      });
    }
  }, [history, user, location]);

  const signInWithGithub = () => {
    const provider = new firebaseInstance.auth.GithubAuthProvider();
    provider.addScope('repo');

    firebaseAuth
      .signInWithPopup(provider)
      // .then(console.log)
      .catch(console.error);
  };

  const signInWithGoogle = () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    firebaseAuth.languageCode = 'ko';
    firebaseAuth
      .signInWithPopup(provider)
      // .then(console.log)
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
