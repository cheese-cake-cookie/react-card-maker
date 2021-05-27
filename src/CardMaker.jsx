function CardMaker({ selectedCard, onChange, onSave, onCancel }) {
  const handleFormInput = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <>
      <form>
        <label htmlFor="image">image</label>
        <input id="image" type="file" />
        <label htmlFor="name">name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Input your name at here"
          required
          onInput={handleFormInput}
        />
        <label htmlFor="company">company</label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Input your company at here"
          required
          onInput={handleFormInput}
        />
        <label htmlFor="position">position</label>
        <input
          id="position"
          name="position"
          type="text"
          placeholder="Input your position at here"
          required
          onInput={handleFormInput}
        />
        <label htmlFor="email">email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Input your email at here"
          required
          onInput={handleFormInput}
        />
        <label htmlFor="paragraph">paragraph</label>
        <input
          id="paragraph"
          name="paragraph"
          type="text"
          placeholder="Input your paragraph at here"
          onInput={handleFormInput}
        />
        <button onClick={onCancel}>cancel</button>
        <button>{!selectedCard?.id ? 'save' : 'edit'}</button>
      </form>
    </>
  );
}

export default CardMaker;
