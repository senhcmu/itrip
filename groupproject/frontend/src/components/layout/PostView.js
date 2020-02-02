import React, { Component } from 'react'
import Post from '../components/Post';
import axios from 'axios';
import { Button, Card } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PublishPostForm from '../components/PublishPostForm';

class PostView extends Component {


  state = {
    post: []
  }

  componentDidMount() {
    
    console.log('enter send url!!!');
    const postId = this.props.match.params.postId;
    console.log(postId);
    console.log("post id");
    axios.get(urlAndPort+'api/posts/' + postId).then( res => {
      console.log(res.data);
      this.setState({
        post: res.data
      });
    });
    //alert(this.state.post.id);
  }

  handleDelete(event){
    
    //alert("ewr");
    const postId = this.props.match.params.postId;
    console.log("we are deleting the post");
    console.log(postId);
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + JSON.parse(localStorage.getItem("tokens"))
    };
    const data = {
      pk: postId,  
    }
    axios({
      method:'delete',
      url: urlAndPort+"api/deletepost",
      data: data
    })
    .then(res => {
      console.log("this post is deleted");
    })
  };


	render() {
    //alert(this.state.post.id);
		// return (

      // <Post data={this.state.Post} />
      return (
        <div>
          <Card title={this.state.post.name}>
  
          <p> Author :<Link to="/posts">{this.state.post.user}</Link> </p>
          <p> Travel time :{this.state.post.travelTime} days</p>
          <p> Travel Expense: ${this.state.post.travelExpense} </p>
            <p> Content: {this.state.post.content} </p>
            {/* <Card> */}
            <p> Photo: </p>
            
            <img
            width={272}
            alt="logo"
            src = {this.state.post.photoUrl === "" ? "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" : this.state.post.photoUrl}
          />
            {/* </Card> */}


            



          </Card>
          
          
          {/* <Link to={`/updatepost/${this.state.post.id}`}>
            <button type="primary">
                  Update!
            </button>
          </Link> */}
          <br />

            <button type="primary">
            <Link to={{pathname : "/updatepost", 
          state : {"post": this.state.post, "token": JSON.parse(localStorage.getItem("tokens"))
          }}}>
                  Update!
                  </Link>
            </button>

            <br />
            <br />

            <button type="danger" onClick={(e)=>this.handleDelete(e)}>Delete this</button>

        </div>
      );

	}
}

console.log('in PostDetailView!!!');



export default PostView;
  