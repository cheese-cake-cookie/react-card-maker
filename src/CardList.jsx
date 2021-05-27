import CardItem from './CardItem';
function CardList({ cards }) {
  return (
    <>
      <h1>CardList</h1>
      <ul>
        {cards.map((card, index) => (
          <CardItem card={card} key={index}></CardItem>
        ))}
      </ul>
    </>
  );
}

export default CardList;
