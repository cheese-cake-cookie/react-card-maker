import CardItem from './CardItem';
function CardList({ cards }) {
  return (
    <>
      <ul>
        {cards.map((card, index) => (
          <CardItem card={card} key={index}></CardItem>
        ))}
      </ul>
    </>
  );
}

export default CardList;
