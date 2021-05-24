import styles from './Header.module.css';

function Header({ user, signOut }) {
  console.log(user);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>hello</h1>
      {user ? (
        <button className={styles.button__logout} onClick={signOut}>
          logout
        </button>
      ) : (
        'plz login'
      )}
    </header>
  );
}

export default Header;
