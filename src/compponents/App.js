import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header';
import Posts from './Posts';
import Popup from './Popup';
import PostWithComments from './PostWithComments';
import './App.css';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [posts, setPosts] = useState();

  function handleAddPostClick() {
    setIsPopupOpen(true);
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  function handleAddPostSubmit(newPostData) {
    return fetch('https://my-json-server.typicode.com/Oleg-Belyaev/posts/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newPostData.title,
        body: newPostData.body,
        id: posts.length + 1 
      })
    })
    .then((res) => {
      return res.json();
    }).then((newPost) => {
    setPosts([...posts, newPost]);
    closePopup();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handlePostDelete(postDelete) {
    return fetch(`https://my-json-server.typicode.com/Oleg-Belyaev/posts/posts/${postDelete.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      const newPosts = posts.filter((p) => p.id !== postDelete.id);
      setPosts(newPosts);
    }) 
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    // получаем данные с сервера
    fetch('https://my-json-server.typicode.com/Oleg-Belyaev/posts/posts')
    .then((res) => {
      return res.json();
    }).then((parsedPosts) => {
      // форматируем данные и, используя setData, обновляем текущий стейт
      const posts = Object.values(parsedPosts);
      setPosts(posts);
    })
  }, []);

  return (
    <div className="App">
      <Header onAddPost={handleAddPostClick}/>
      <Popup isOpen={isPopupOpen} onClose={closePopup} onAddPost={handleAddPostSubmit}/>
        <Switch>
          <Route exact path="/">
            <Redirect to="/posts" />
          </Route>
          <Route exact path="/posts">
            <Posts posts={posts} onPostDelete={handlePostDelete}/>
          </Route>
          <Route exact path="/posts/:id">
            <PostWithComments posts={posts}/>
          </Route>
        </Switch>
    </div>
  );
}

export default App;
