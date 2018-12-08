import React, { Component } from 'react';
import axios from 'axios';

class Reddit extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get(`https://www.reddit.com/r/reactjs.json`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data)
        this.setState({ posts });
      })
  }

  render() {
    return (
      <div>
        <h1>Bring data from reddit /r/reactjs API</h1>
        <ul>
        {
          this.state.posts.map(post => (
            <li key={post.id}>
              <a href={post.url} target="_blank"> {post.title} </a>
              <p>{ post.author } >>>> score: { post.score }</p>
            </li>
          ))
        }
        </ul>
      </div>
    );
  }
}

export default Reddit;
