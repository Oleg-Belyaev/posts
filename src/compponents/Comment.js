import React from 'react';
import './Post.css'

function Comment(props) {
  const [isActiveComment, setIsActiveComment] = React.useState(true);
  const [body, setBody] = React.useState(props.body);
  
  function handleDeleteClick () {
    props.onCommentDelete(props);
  }

  function handleChangeClick () {
    setIsActiveComment(false);
    setBody(props.body);
  }

  function handleBodyChange(e) {
    setBody(e.target.value);
  }

  function handleCancel () {
    setIsActiveComment(true);
    setBody(props.body);
  }

  function handleChangeSubmit (e) {
    e.preventDefault();
    return fetch(`https://my-json-server.typicode.com/Oleg-Belyaev/posts/comments/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body,
        id: props.id 
      })
    })
    .then(() => {
      setIsActiveComment(true);
    }) 
    .catch((err) => {
      console.log(err);
    });
  }
  
  return (
    <>
      <li key={props.id} className={`posts__item ${isActiveComment && 'post__item_inactive'} `}>
       <p className="posts__body">
         {body}
       </p>
       <button className="button element__button-remove" type="button" onClick={handleDeleteClick}></button>
       <button className="button" type="button" onClick={handleChangeClick}>Редактировать</button>
      </li>
      <form className={`posts__item ${!isActiveComment && 'post__item_inactive'} `} name="postChenge" onSubmit={handleChangeSubmit}>
        <fieldset className="popup__input-container">
          <div>
            <input type="text" className="posts__body" name="body" placeholder="Введите текст поста" required 
            minLength="2" maxLength="500" value={body} onChange={handleBodyChange}/>
          </div>
          <button type="submit" className="button" value="Сохранить">Сохранить</button>
          <button type="button" className="button" value="Отмена" onClick={handleCancel}>Отмена</button>
        </fieldset>
      </form>
    </>
  )
}

export default Comment;