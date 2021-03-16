import React from 'react';
import {Link} from 'react-router-dom';
import './Post.css'

function Post(props) {
  const [isActivePost, setIsActivePost] = React.useState(true);
  const [title, setTitle] = React.useState(props.title);
  const [body, setBody] = React.useState(props.body);
  
  function handleDeleteClick () {
    props.onPostDelete(props);
  }

  function handleChangeClick () {
    setIsActivePost(false);
    setTitle(props.title);
    setBody(props.body);
  }

  function handleTitleChenge(e) {
    setTitle(e.target.value);
  }

  function handleBodyChange(e) {
    setBody(e.target.value);
  }

  function handleChangeSubmit (e) {
    e.preventDefault();

    return fetch(`https://my-json-server.typicode.com/Oleg-Belyaev/posts/posts/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        body,
        id: props.id 
      })
    })
    .then(() => {
      setIsActivePost(true);
    }) 
    .catch((err) => {
      console.log(err);
    });
  }
  
  return (
    <>
      <li key={props.id} className={`posts__item ${isActivePost && 'post__item_inactive'} `}>
       <Link to={`/posts/${props.id}`}>
         {title}
       </Link>
       <p className="posts__body">
         {body}
       </p>
       <button className="button element__button-remove" type="button" onClick={handleDeleteClick}></button>
       <button className="button" type="button" onClick={handleChangeClick}>Редактировать</button>
      </li>
      <form className={`posts__item ${!isActivePost && 'post__item_inactive'} `} name="postChenge" onSubmit={handleChangeSubmit}>
        <fieldset className="popup__input-container">
          <div>
            <input type="text" className="posts__body" name="title" placeholder="Введите название" required 
            minLength="2" maxLength="40" value={title} onChange={handleTitleChenge}/>
          </div>
          <div>
            <input type="text" className="posts__body" name="body" placeholder="Введите текст поста" required 
            minLength="2" maxLength="500" value={body} onChange={handleBodyChange}/>
          </div>
          <button type="submit" className="button" value="Сохранить">Сохранить</button>
        </fieldset>
      </form>
    </>
  )
}

export default Post;