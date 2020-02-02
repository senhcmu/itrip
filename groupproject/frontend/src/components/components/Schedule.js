import React, { Component } from 'react';
import { List, Typography } from 'antd';






const ScheduleTable = (props) => {
  return (


  <div>
    <h2 style={{ marginBottom: 16 }}>Autoplanner</h2>


    <List
    itemLayout="horizontal"
    size="small"
    dataSource={props.data}


    renderItem={item => (



      <List.Item
      header={<div>item.day</div>}
      bordered
      dataSource={data1}
      style={{ width: 200}}

      renderItem={item => (
        <List.Item>
          {item.attrations}
          {item.time}
          {item.address}
          {item.start}
          {item.end}
        </List.Item>
      )}
      />

      )}
      />



  </div>




  )

}



export default ScheduleTable;


