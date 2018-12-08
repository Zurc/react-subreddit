import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Link = styled.a`
  color: #333;
  cursor: pointer;
  text-decoration: none;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #f8f8f8;
  border: 1px solid #ddd;
  border-bottom: ${props => props.lastone ? '1px solid #ddd' : '0'};
`;


const Score = styled.span`
  background: #888;
  color: #ededed;
  font-size: 0.7rem;
  padding: 4px 8px;
  border: 1px solid #eee;
  border-radius: 10px;
  margin: 0 8px;
  box-shadow: inset 0px 1px 2px #000;
`;

const Author = styled.p`
  margin-right: 8px;
  font-weight: 400;
  font-size: 0.8rem;
  color: #777;
`;

const Title = styled.span`
  padding: 8px;
  width: 100%;
`;

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
    const postLen = this.state.posts.length
    
    return (
      <div>
        <h1>Reddit /r/reactjs feed articles</h1>
        <ul>
        {
          this.state.posts.map((post, i) => (
            <Link href={post.url} key={post.id} target="_blank">
              <ListItem lastone={ postLen === i+1 ? true : false}>
                <Score>{ post.score }</Score>
                <Author>{ post.author } </Author>
                <Title>{post.title}</Title>
              </ListItem>
            </Link>
          ))
        }
        </ul>
      </div>
    );
  }
}

export default Reddit;
