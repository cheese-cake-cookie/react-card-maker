import CardItem from './CardItem';
function CardPreview({ selectedCard }) {
  return (
    <>
      <h1>CardPreview</h1>
      {!selectedCard ? (
        <>
          <p>make your awesom card</p>
          <CardItem></CardItem>
        </>
      ) : (
        <CardItem user={selectedCard}></CardItem>
      )}
    </>
  );
}

export default CardPreview;
