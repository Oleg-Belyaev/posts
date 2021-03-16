import React from 'react';
import './Popup.css';

function Popup(props) {
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');

  function handleTitleChenge(e) {
    setTitle(e.target.value);
  }

  function handleBodyChange(e) {
    setBody(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();

    props.onAddPost({
      title,
      body
    })
    setTitle('');
    setBody('');
  }
  return (
    <section className={`popup ${props.isOpen && 'popup_opened'}`}>
    <div className="popup__overlay" onClick={props.onClose}></div>
    <form className="popup__container" name="posts" onSubmit={handleSubmit}>
      <button className="popup__close" type="button" onClick={props.onClose}></button>
      <h2 className="popup__title">Добавить пост</h2>
      <fieldset className="popup__input-container">
        <div className="popup__field">
          <input type="text" className="popup__item" name="title" placeholder="Введите название" required 
          minLength="2" maxLength="40" value={title} onChange={handleTitleChenge}/>
        </div>
        <div className="popup__field">
          <input type="text" className="popup__item" name="body" placeholder="Введите текст поста" required 
          minLength="2" maxLength="500" value={body} onChange={handleBodyChange}/>
        </div>
        <button type="submit" className="popup__submit" value="Сохранить">Сохранить</button>
      </fieldset>
    </form>
  </section>
  )
}

export default Popup;