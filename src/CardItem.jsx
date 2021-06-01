import styles from './CardItem.module.css';
const THEME = {
  blue: {
    bgColor: 'hsla(222, 89%, 55%, 100%)',
    shadowColor: 'hsla(222, 89%, 45%, 100%)',
    color: '#fff',
  },
};

function CardItem({ card }) {
  const cardStyle = {
    backgroundColor: THEME['blue'].bgColor,
    boxShadow: `2px 2px 5px 1px ${THEME['blue'].shadowColor}`,
    color: THEME['blue'].color,
  };

  const cardImageStyle = {
    backgroundImage: `url('${card?.image}')`,
  };

  return (
    <div className={styles.card__item} style={cardStyle}>
      <div className={styles.card__container}>
        <div className={styles.card__wrap}>
          <div className={styles.image}>
            <div className={styles.card__image} style={cardImageStyle}></div>
          </div>
          <section className={styles.card}>
            <h1 className={styles.card__name}>{card?.name}</h1>
            <p className={styles.card__company}>{card?.company}</p>
            <hr />
            <p className={styles.card__position}>{card?.position}</p>
            <p className={styles.card__email}>{card?.email}</p>
            <p className={styles.card__paragraph}>{card?.paragraph}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
