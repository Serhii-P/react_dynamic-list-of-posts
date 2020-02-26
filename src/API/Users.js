import React from 'react';

function Users({ post }) {
    return <div>
    <p><strong>{post.users.name}</strong></p>
    <a href={`mailto:${post.users.email}`}>{post.users.email}</a>
<p>
<span><strong>city:</strong>{` ${post.users.address.city}; `}</span>
<span><strong>street:</strong>{` ${post.users.address.street}; `}</span>
<span><strong>suite:</strong>{` ${post.users.address.suite}; `}</span>
<span><strong>zip-code:</strong>{` ${post.users.address.zipcode}.`}</span>
</p>
</div>
}

export default Users;
