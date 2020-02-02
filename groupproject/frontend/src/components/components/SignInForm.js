import React, { Component, useState } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router';
import { useAuth } from "../../context/auth";
import checkRole  from "../CheckManager";
// import { useRole } from "../../context/role";



function NormalLoginForm (props) {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const { authTokens } = useAuth();
  // const { setRole } = useRole();

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const url = urlAndPort+'login/';
        const data = {
          "username": values.username,
          "password": values.password
        };
        axios({
          method:'post',
          url:url,
          data:data
        }).then( res => {

          if (res.status === 200 && res.data.is_success === true) {
            setAuthTokens(res.data.token);
            // setLoggedIn(true);
            localStorage.setItem("isLoggedIn", JSON.stringify(true));
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("nickname", res.data.nickname);

            // alert('not enetr');
            checkRole(res.data.token);
            // alert('after enter!');
            // localStorage.getItem("role", JSON.stringify(true));
            window.location.reload('#layout');



          } else {
            alert('Invalid account or password!');
            setIsError(true);
          }
        }).catch(e => {
          alert('Invalid account or password!');
          setIsError(true);
        });
      }

    });
  }



    const referer = '/' || props.location.state.referer;
    
    if (isLoggedIn) {
      return <Redirect to={referer} />;
    }


    const { getFieldDecorator } = props.form;
    return (

      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>

        <Form.Item>
          {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })
          (<Checkbox>Remember me</Checkbox>)} */}
{/* 
          <a className="login-form-forgot" href="">
            Forgot password
          </a> */}

          <div className='text-center'>

          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button> Or 
          <a href="/signup"> register now!</a>
          </div>
        </Form.Item>
      </Form>
      );

  
        }


export default NormalLoginForm;