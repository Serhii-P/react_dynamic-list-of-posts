import React from 'react';
import './Comments.css'

function Comments({ comment }) {

return   (
<li className="comment">
    <h3>{comment.name}</h3>
<a  href={`mailto:${comment.email}`}>{comment.email}</a>
<p>{comment.body}</p>
  </li>
  )

 

}

export default Comments;