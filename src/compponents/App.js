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
