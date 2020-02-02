import React from 'react';
import { List, Avatar, Icon, Rate } from 'antd';

const IconText = ({ type, text }) => (
  <span>
	  <Icon type={type} style={{ marginRight: 8 }} />
	  {text}
  </span>
);


const Hotels = (props) => {
  return (

  <List
    header={<div><h2>Hottest Hotels</h2></div>}
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
          <Rate disabled defaultValue={item.google_rating} />
        ]}
        // extra={
        //   <img
        //     width={272}
        //     alt="logo"
        //     src={item.photo}
        //   />
        // }
      >
        <List.Item.Meta
          title={<a href={item.href}>{ item.name }</a>}
          description={ item.address }
        />
      </List.Item>
    )}
  />

  )
}

export default Hotels;

