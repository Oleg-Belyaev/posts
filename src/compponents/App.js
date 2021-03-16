import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Header from './Header';
import Posts from './Posts';
import './App.css';

function App() {

  const [posts, setPosts] = useState();

  function handleAddPostClick() {
    console.log(true);
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
        <Switch>
          <Route exact path="/">
            <Redirect to="/posts" />
          </Route>
          <Route exact path="/posts">
            <Posts posts={posts}/>
          </Route>
          {/* <Route exact path="/posts/:id">
            <Post posts={posts}/>
          </Route> */}
        </Switch>
    </div>
  );
}

export default App;
