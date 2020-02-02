import React, { Component, useState } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router';
import { useAuth } from "../../context/auth";



const AutoplannerForm = (props) => {
  let history = useHistory();


  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
          var shuffleFlag = false;
          if (values.shuffle){
            shuffleFlag = true;
          }

        const url = urlAndPort+'api/autoplanner/?destination='+ values.destination +'&days='+values.days + '&shuffle='+shuffleFlag;
        // console.log(values.destination);
        // console.log(values.days);
        // console.log(values);
        // console.log(url);
      axios({
        method: 'get',
        url: url
      }
        ).then( res => {
          if (res.status === 200 && res.data.is_success === true) {
            console.log(url);
          
            const plan = {plan:res.data.plan};
            history.push({
              pathname: '/autoplanner/detail',
              state: { currentUser: plan }
            })

            
        
          } else if ( res.status === 200 && res.data.is_success === false) {
            alert('Input is incorrect or we dont have this city in our database right now\n\nPlease go to attraction page search for it first!');
            setIsError(true);
          } else {
            alert('Input is incorrect or we dont have this city in our database right now\n\nPlease go to attraction page search for it first!');
            setIsError(true);

          }
        });
      }

    });
  }


    const { getFieldDecorator } = props.form;

    return (
      <Form onSubmit={handleSubmit} className="autoplanner-form">
        <Form.Item>
          {getFieldDecorator('destination', {
            rules: [{ required: true, message: 'Please input your destination!' }],
          })(
            <Input
              prefix={<Icon type="car" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Destination"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('days', {
            rules: [{ required: true, message: 'Please input your travel days!' }],
          })(
            <Input
              prefix={<Icon type="clock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Days"
            />,
          )}
        </Form.Item>

        <Form.Item>
        {getFieldDecorator('shuffle', {
            valuePropName: 'checked',
            initialValue: false,
          })
          (<Checkbox>Shuffle</Checkbox>)}


          <div className='text-center'>

          <Button 
          type="primary" 
          htmlType='submit'>
            SEARCH
          </Button>

          </div>
        </Form.Item>
      </Form>
      );

  
        }


export default AutoplannerForm;