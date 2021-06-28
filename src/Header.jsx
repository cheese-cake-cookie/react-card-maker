import styles from './Header.module.css';

function Header({ signOut }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>hello</h1>
      <button className={styles.button__logout} onClick={signOut}>
        logout
      </button>
    </header>
  );
}

export default Header;
