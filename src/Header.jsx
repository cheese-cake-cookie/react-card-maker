import styles from './Header.module.css';

function Header({ me, signOut }) {
  if (!me) return <p>plz login</p>;

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
