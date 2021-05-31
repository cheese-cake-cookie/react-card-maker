function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.src = URL.createObjectURL(file);
    image.onload = () => {
      const base64URL = imageToBase64Encode(image);
      return resolve(base64URL);
    };

    image.onerror = (err) => {
      return reject(err);
    };
  });
}

function imageToBase64Encode(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalWidth;

  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

  return canvas.toDataURL('image/jpeg', 0.8);
}

function CardMaker({ selectedCard, onChange, onSave, onCancel }) {
  const handleFormInput = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleImageFile = (e) => {
    fileToBase64(e.target.files[0])
      .then((image) => {
        onChange('image', image);
      })
      .catch(alert);
  };

  return (
    <>
      <form>
        <label htmlFor="image">image</label>
        <input
          id="image"
          type="file"
          onChange={handleImageFile}
          accept="image/*"
        />
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
