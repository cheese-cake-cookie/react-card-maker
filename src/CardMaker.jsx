import styles from './CardMaker.module.css';

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
  const canvasSize = Math.min(image.naturalWidth, image.naturalHeight);
  let startX = 0;
  let startY = 0;

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  if (image.naturalWidth > image.naturalHeight) {
    startX = ((image.naturalWidth - image.naturalHeight) / 2) * -1;
  }

  if (image.naturalWidth < image.naturalHeight) {
    startY = ((image.naturalHeight - image.naturalWidth) / 2) * -1;
  }

  ctx.drawImage(image, startX, startY, image.naturalWidth, image.naturalHeight);

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

  const saveChanges = (e) => {
    try {
      if (!selectedCard.image) {
        throw Error('이미지를 업로드해주세요.');
      }

      if (!selectedCard.name || !selectedCard.name.trim()) {
        throw Error('이름을 입력해주세요.');
      }

      if (!selectedCard.company || !selectedCard.company.trim()) {
        throw Error('회사 혹은 소속을 입력해주세요.');
      }

      if (!selectedCard.position || !selectedCard.position.trim()) {
        throw Error('직책 / 직급을 입력해주세요.');
      }

      if (!selectedCard.email || !selectedCard.email.trim()) {
        throw Error('이메일을 입력해주세요.');
      }

      e.preventDefault();
      onSave();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <form className={styles.cardMaker__form}>
        <label htmlFor="image">image</label>
        <input
          id="image"
          type="file"
          onChange={handleImageFile}
          accept="image/*"
          required
        />
        <label htmlFor="name">name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Input your name at here"
          required
          value={selectedCard.name}
          onInput={handleFormInput}
        />
        <label htmlFor="company">company</label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Input your company at here"
          required
          value={selectedCard.company}
          onInput={handleFormInput}
        />
        <label htmlFor="position">position</label>
        <input
          id="position"
          name="position"
          type="text"
          placeholder="Input your position at here"
          required
          value={selectedCard.position}
          onInput={handleFormInput}
        />
        <label htmlFor="email">email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Input your email at here"
          required
          value={selectedCard.email}
          onInput={handleFormInput}
        />
        <label htmlFor="paragraph">paragraph</label>
        <input
          id="paragraph"
          name="paragraph"
          type="text"
          placeholder="Input your paragraph at here"
          value={selectedCard.paragraph}
          onInput={handleFormInput}
        />
        <label htmlFor="bgColor">메인 컬러</label>
        <input
          id="bgColor"
          name="bgColor"
          type="color"
          value={selectedCard.bgColor}
          onChange={handleFormInput}
        />
        <div className={styles.actions}>
          <button onClick={onCancel}>cancel</button>
          <button onClick={saveChanges}>
            {!selectedCard?.id ? 'save' : 'edit'}
          </button>
        </div>
      </form>
    </>
  );
}

export default CardMaker;
