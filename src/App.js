import React, { Component } from 'react';
import './App.css';

import Posts from './API/Posts';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

class App extends Component {
  state ={
    posts: [],
    originalPosts: [],
    isLoading: false,
    hasError: false,
    isLoaded: false,
    inputValue: '',
  };

  loadData = async() => {
    this.setState({
      isLoading: true
    })

    try {
      const [dataPosts, dataComments, dataUsers] = await Promise.all([
        fetch(`${BASE_URL}/posts`),
        fetch(`${BASE_URL}/comments`),
        fetch(`${BASE_URL}/users`)
      ]);
      
      const posts = await dataPosts.json();
      const comments = await dataComments.json();
      const users = await dataUsers.json();

    

const preparedPosts = posts.map(post => ({
  ...post,
  users: users.find(user => user.id === post.userId),
  comments: comments.filter(comment => comment.postId === post.id),

}))
//console.log(preparedPosts)


  this.setState({
    posts: preparedPosts,
    originalPosts: preparedPosts,
    hasError: false,
    isLoaded: true
  })
 }

 catch(error) {
   this.setState({
     erorr: error.message,
  //   isLoading: false,
      hasError: true
   })
   console.log(error)
 }

 finally {
this.setState({
 isLoading: false 
})
 }
}

handleInputFilter = (event) => {
  const { originalPosts } = this.state;
  const { value } = event.target;

  this.setState({
    inputValue: value,
    posts: [...originalPosts].filter(post => (
      post.title.includes(value) || post.body.includes(value)
    )),
    // originalPosts: [],
  });
};

handleResetPosts = () => {
  this.setState(prevState => ({
 inputValue:'',
    posts: prevState.originalPosts,
   }));
}

  render() {
    const { posts, isLoading, hasError, inputValue, isLoaded } = this.state;
    
return (
<div className='app'>
  {isLoaded ? (
    <>
    <h1 className="title">Dynamic List of Posts</h1>
    <p>Posts: {posts.length}</p>
    <input
      type="text"
      onChange={this.handleInputFilter}
      name="search-input"
      placeholder="Search..."
      value={inputValue}
      className="filter__input"
    />
    <button type="button" onClick={this.handleResetPosts}>Reset</button>
        <Posts posts={posts} key={posts.id} />
    </>
  ) : (
    <>
      <p className="message">
        {hasError ? 'Error occured!!!' : 'Load Posts'}
      </p>
      <button type="button" className="message-button" onClick={this.loadData}>
        {isLoading ? 'Loading...' : hasError ? 'Try Again' : 'Load'}
      </button>
    </>
  )}
  </div>
)

  }
}

export default App;
