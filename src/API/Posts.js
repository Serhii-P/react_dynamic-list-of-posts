import React from 'react';
import Users from './Users';
import Comments from './Comments';
import './Posts.css'

function Posts({ posts }) {
return <div className="post-list">
  {posts.map((post) =>  (
    <div className="post">
    <h2 className="post-title">{post.title}</h2>
    <p className="post-text">{post.body}</p>

 <Users key={post.id} post={post} />

 <ul className="comment-list">
{post.comments.map(comment => { 

return <Comments key={comment.id} comment={comment} />

})}

</ul>


    </div>
  
  )
  )}
  </div>
}


export default Posts;