import styles from './Header.module.css';

function Header({ me, signOut }) {
  console.log(me);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>hello</h1>
      {me ? (
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
