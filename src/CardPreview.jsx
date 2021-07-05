import CardItem from './CardItem';
function CardPreview({ selectedCard, me, onDelete }) {
  const message = selectedCard ? 'check your input' : 'make your awesome card';

  return (
    <>
      <p>{message}</p>
      <>
        {me?.uid === selectedCard?.uid ? (
          <button onClick={() => onDelete(selectedCard)}>X</button>
        ) : null}
        <CardItem card={selectedCard} isPreview={true}></CardItem>
      </>
    </>
  );
}

export default CardPreview;
