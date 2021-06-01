import CardItem from './CardItem';
function CardPreview({ selectedCard }) {
  const message = selectedCard ? 'check your input' : 'make your awesome card';
  return (
    <>
      <p>{message}</p>
      {!selectedCard ? (
        <>
          <CardItem></CardItem>
        </>
      ) : (
        <CardItem card={selectedCard}></CardItem>
      )}
    </>
  );
}

export default CardPreview;
