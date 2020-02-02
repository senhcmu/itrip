import React from 'react';
import { List, Avatar, Icon, Rate } from 'antd';

const IconText = ({ type, text }) => (
  <span>
	  <Icon type={type} style={{ marginRight: 8 }} />
	  {text}
  </span>
);


const HotAttractions = (props) => {

  return (

  <List
    header={<div>
      <h2>Top Attractions</h2>
      <p>Here are the attractions with the highest scores in our database from the world.</p>
      <p>With more searching, our database will grow!</p>
      </div>}
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
          <Rate disabled defaultValue={item.google_rating} />,
          <IconText type="star-o" text={ item.google_rating } key="list-vertical-message" />,
          <IconText type="compass-o" text={ item.destination } key="list-vertical-star-o" />
          
        ]}
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

export default HotAttractions;

