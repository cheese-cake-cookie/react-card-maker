import CardItem from './CardItem';
function CardList({ cards }) {
  const ids = Object.keys(cards);
  return (
    <>
      <ul>
        {ids.map((id) => {
          return (
            <li>
              <CardItem card={cards[id]} key={id}></CardItem>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default CardList;
