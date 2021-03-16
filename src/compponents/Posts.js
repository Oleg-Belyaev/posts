import React from 'react';
import {Link} from 'react-router-dom';
import './Posts.css'

function Posts (props) {
  return (
    <>
      <ul className="posts">
        {props.posts && props.posts.map((post) => {
          return (
            <li key={post.id} className="posts__item">
              <Link to={`/posts/${post.id}`}>
                {post.title}
              </Link>
              <p className="posts__body">
                {post.body}
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Posts;