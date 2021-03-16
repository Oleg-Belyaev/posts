import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import './PostWithComments.css';
import {useParams, Link} from 'react-router-dom';

function PostWithComments (props) {
  let {posts} = props;
  let {id} = useParams();
  id = id - 1;
  const [comments, setComments] = useState();
  const [body, setBody] = React.useState('');

  function handleBodyChange(e) {
    setBody(e.target.value);
  }

  function handleAddSubmit (e) {
    e.preventDefault();
    fetch('https://my-json-server.typicode.com/Oleg-Belyaev/posts/comments')
      .then((res) => {
      return res.json();
    })
      .then((parsedComments) => {
        const commentId = parsedComments.length + 1;
        fetch('https://my-json-server.typicode.com/Oleg-Belyaev/posts/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            body,
            id: commentId,
            postId: id + 1
          })
        })
        .then((res) => {
          return res.json();
        }).then((newComments) => {
          setComments([...comments, newComments]);
          setBody('');
        })
        .catch((err) => {
          console.log(err);
        });
    }) 
  }

  useEffect(() => {
    // получаем данные с сервера
      fetch(`https://my-json-server.typicode.com/Oleg-Belyaev/posts/comments?postId=${id + 1}`)
      .then((res) => {
      return res.json();
      }).then((parsedComments) => {
      // форматируем данные и, используя setData, обновляем текущий стейт
      const comments = Object.values(parsedComments);
      setComments(comments);
      })
  }, [id]);

  function handleCommentDelete (commentDelete) {
    return fetch(`https://my-json-server.typicode.com/Oleg-Belyaev/posts/comments/${commentDelete.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      const newComments = comments.filter((c) => c.id !== commentDelete.id);
      setComments(newComments);
    }) 
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="post">
      {
        posts && 
          <div>
            <h3>{posts[id].title}</h3>
            <p>{posts[id].body}</p>
          </div>
      }
      <div>
        <h3>Комментарии</h3>
        <ul>
        {comments && comments.map((comment) => {
          return <Comment {...comment} key={comment.id} onCommentDelete={handleCommentDelete}/>
        }
        )}
        </ul>
        <form name="commentAdd" onSubmit={handleAddSubmit}>
          <fieldset>
            <div>
              <input type="text" name="body" placeholder="Введите комментарий" required 
              minLength="2" maxLength="500" value={body} onChange={handleBodyChange}/>
            </div>
            <button type="submit" className="button" value="Отправить">Отправить</button>
          </fieldset>
        </form>
      </div>
      <Link to="/posts">
        К списку постов
      </Link>
    </div>
  );
}

export default PostWithComments;