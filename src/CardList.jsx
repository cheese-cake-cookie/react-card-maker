import CardItem from './CardItem';
function CardList({ cards, me, onSelect }) {
  const ids = Object.keys(cards);

  return (
    <>
      <ul>
        {ids.map((id) => {
          return (
            <li>
              <CardItem
                card={cards[id]}
                me={me}
                key={id}
                onSelect={onSelect}
              ></CardItem>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default CardList;
