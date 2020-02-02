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


const Followings = (props) => {

  return (
      <div className="followings">



  <List
    header={<div><h2>Followings</h2></div>}
    footer={
        <div>
          <b>iTrip Presents</b>
        </div>
      }
    
    itemLayout="vertical"
    size="large"
    // pagination={{
    //   onChange: page => {
    //     console.log(page);
    //   },
    //   pageSize: 3,
    // }}
    dataSource={props.data}
    renderItem={item => (
      <List.Item
        key={item.id}
        actions={[
            <a href={`/profile/${item.name}`}>{item.name}</a>,
        ]}
      >

        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        />
      </List.Item>
    )}
  />
  </div>

  )
}
console.log("followe!");

export default Followings;

