import { firebaseInstance, firebaseAuth } from './firebase';
import styles from './Login.module.css';

function Login() {
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
      <h1>Welcome to My Awesome App</h1>
      <button onClick={signInWithGithub}>github</button>
      <button onClick={signInWithGoogle}>google</button>
    </div>
  );
}

export default Login;
