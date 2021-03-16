import React from 'react';
import Post from './Post';
import './Posts.css'

function Posts (props) {

  return (
    <>
      <ul className="posts">
        {props.posts && props.posts.map((post) => {
          return <Post {...post} key={post.id} onPostDelete={props.onPostDelete}/>
        }
      )}
      </ul>
    </>
  )
}

export default Posts;