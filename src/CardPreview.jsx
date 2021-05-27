import CardItem from './CardItem';
function CardPreview({ users }) {
  if (!users) {
    return <p>make first card</p>;
  }

  return (
    <>
      <h1>CardPreview</h1>
      {users.map((user, index) => (
        <CardItem user={user} key={index}></CardItem>
      ))}
    </>
  );
}

export default CardPreview;
