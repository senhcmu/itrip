import React, { Component, useState } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router';
import { useAuth } from "../../context/auth";



function ManagerGeneratorForm (props) {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const authTokens = JSON.parse(localStorage.getItem('tokens'));

  function handleClick(e) {
    e.preventDefault();
    // console.log('Received values of form: ', values);
    // alert(authTokens);
    const url = urlAndPort+'autoRegister/';
    const data = {
        "token": authTokens
    };
    console.log(data);
    axios({
        method:'post',
        url:url,
        data:data
    }).then( res => {
      console.log(res.data);


        if (res.status === 200 && res.data.is_success === true) {
            alert(`Account:   ${res.data.username}\nPassword:   ${res.data.password}`);

        } else if (res.status === 200 && res.data.is_success === false) {


        setIsError(true);
        } else {
            alert('Error!');
            setIsError(true);

        }
    }).catch(e => {
        alert('Error!');
        setIsError(true);
    });
      
  }

  // console.log(props.location);


    const referer = '/' || props.location.state.referer;
    // if (authTokens){
    //   console.log(authTokens);
    //   alert('Already logged in!');
    //   return <Redirect to={referer} />;
      
    // }
    
    if (isLoggedIn) {
      return <Redirect to={referer} />;
    }


    return (

      <div className='text-center'>
          <Button type="primary" onClick={handleClick} className="manager-generator-button">
            Generate Manager Account
          </Button>
          </div>
      );

  
        }


export default ManagerGeneratorForm;