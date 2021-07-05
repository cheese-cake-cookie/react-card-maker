import CardItem from './CardItem';
function CardList({ cards, me, onSelect, onDelete }) {
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
                onDelete={onDelete}
              ></CardItem>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default CardList;
