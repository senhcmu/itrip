import React, { Component } from 'react'
import Posts from '../components/Posts';
import axios from 'axios';
import { Link } from 'react-router-dom';


const listData = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}


class PostListView extends Component {


  state = {
    Posts: []
  }

  componentDidMount() {
    console.log('enter send url!!!');
    axios.get(urlAndPort+'api/posts/').then( res => {
      this.setState({
        Posts: res.data.results
      });
      console.log(res.data.results);
    });


  }

	render() {
		return (
      <div>
        <h2>Posts from Community</h2>
        <p>You can create post, like or dislike other's post here</p>
        <Posts data={this.state.Posts} />
        <h2> <Link to="/createpost/">Create a post</Link></h2>
      </div>
			);
	}
}

console.log('in PostLiseView!!!');



export default PostListView;
 