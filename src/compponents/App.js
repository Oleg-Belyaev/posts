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

  // useEffect(() => {
  //   // получаем данные с сервера
  //   fetch('https://api.nomoreparties.co/emoji-critic-rus')
  //   .then((res) => {
  //     return res.json();
  //   }).then((parsedReviews) => {
  //     // форматируем данные и, используя setData, обновляем текущий стейт
  //     const reviews = Object.values(parsedReviews);
  //     setReviews(reviews);
  //   })
  // }, []);

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
