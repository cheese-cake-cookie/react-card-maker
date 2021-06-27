import CardItem from './CardItem';
function CardList({ cards, me }) {
  const ids = Object.keys(cards);
  return (
    <>
      <ul>
        {ids.map((id) => {
          return (
            <li>
              <CardItem card={cards[id]} me={me} key={id}></CardItem>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default CardList;
