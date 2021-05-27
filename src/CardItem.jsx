import styles from './CardItem.module.css';
const THEME = {
  blue: {
    bgColor: 'hsla(222, 89%, 55%, 100%)',
    shadowColor: 'hsla(222, 89%, 45%, 100%)',
    color: '#fff',
  },
};

function CardItem({ user }) {
  const cardStyle = {
    backgroundColor: THEME['blue'].bgColor,
    boxShadow: `2px 2px 5px 1px ${THEME['blue'].shadowColor}`,
    color: THEME['blue'].color,
  };
  const cardImageStyle = {
    backgroundImage: `url('${user.image}')`,
  };

  return (
    <div className={styles.card__item} style={cardStyle}>
      <div className={styles.card__container}>
        <div className={styles.card__wrap}>
          <div className={styles.image}>
            <div className={styles.user__image} style={cardImageStyle}></div>
          </div>
          <section className={styles.user}>
            <h1 className={styles.user__name}>{user.name}</h1>
            <p className={styles.user__company}>{user.company}</p>
            <hr />
            <p className={styles.user__position}>{user.position}</p>
            <p className={styles.user__email}>{user.email}</p>
            <p className={styles.user__paragraph}>{user.paragraph}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
