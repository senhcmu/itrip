import React from 'react';
import { List, Avatar, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


const Posts = (props) => {

  return (



  <List
    header={<div><h2>Posts</h2></div>}
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={props.data}
    renderItem={item => (
      <List.Item
        key={item.id} 
        actions={[
          <Button type="default" icon="like-o" onClick={ event => {
            axios({
              method: "put",
              url: urlAndPort+"api/like/",
              data: {
                "pk": item.id,
                "user_token": JSON.parse(localStorage.getItem("tokens")),
              }
            }).then( res => {window.location.reload(res.data["is_success"]);} );
          }
        } >{ item.likes }</Button>,
        <Button type="default" icon="dislike-o" onClick={ event => {
          axios({
            method: "put",
            url: urlAndPort+"api/dislike/",
            data: {
              "pk": item.id,
              "user_token": JSON.parse(localStorage.getItem("tokens")),
            }
          }).then( res => {window.location.reload(res.data["is_success"]);} );
        }
      } >{ item.dislikes }</Button>,
          //<Link to={{pathname : "/profile", state : {profileUsername: item.author}}}>{item.author}</Link>,
          <a href={`/profile/${item.author}`}>{item.author}</a>
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src = {item.photoURL === "" ? "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" : item.photoURL}
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href={`/post/${item.id}`}>{item.name}</a>}
          description={item.publishTime}
        />
        {item.content}
      </List.Item>
    )}
  />

  )
}

export default Posts;

