import React, { Component, useState } from 'react';
import { Form, Icon, Input, Button, Checkbox,  Card  } from 'antd';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router';
import { useAuth } from "../../context/auth";
import Dropzone from 'react-dropzone';
import request from 'superagent';



function PublishPostForm (props) {
    let history = useHistory();
    const csrftoken = getCookie('csrftoken');



    const CSRFToken = () => {
        return (
            <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
        );
    };

  const [photoURL, setPhotoURL] = useState("");
  // const [isError, setIsError] = useState(false);
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const { setAuthTokens } = useAuth();
  const authTokens  = localStorage.getItem('tokens');
  const CLOUDINARY_UPLOAD_PRESET = 'du0lyoxs';
  const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/djyhwcsgz/upload';

  const axiosInstance = axios.create({
    headers: { Authorization: 'Token '+JSON.parse(authTokens) }
  });



  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].toString().replace(/^([\s]*)|([\s]*)$/g, "");
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

  function handleSubmit(e) {
      console.log('hi1');

      
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log("Token:");        
        console.log(authTokens);

    // const { authTokens } = useAuth();
    // event.preventDefault();
    const url = urlAndPort+'publishpost';
    const updateurl = urlAndPort+'updatepost';
    const header = {
        // "Content-Type":"application/json",
        // 'Access-Control-Allow-Origin':'http://localhost:8000',

        Authorization: "Token 4feb56ea16f0088db77274cceb952522c5261236",
        "X-CSRFToken": csrftoken

    };
    const data = {  name: values.Name,
                    content: values.content,
                    destinations: values.destinations,
                    travelTime: values.travelTime,
                    travelExpense: values.travelExpense,
                    photoURL: photoURL,
                }

    console.log(data);

    console.log(header);

    axiosInstance({
        method:'post',
        // header:header,
        url:url,
        data:data
        }) 

      .then(res => {
        console.log(res);
        console.log(res.data);
        history.push({
          pathname: '/posts/'
        })
      })
  }
        }).catch(e => {
            alert(this.showErrors(e.response.data.error));
          alert('Error!');
          setIsError(true);
        });
      }






  function onImageDrop(files){
    handleImageUpload(files[0]);

  }
 
  function handleImageUpload(file) {
    alert(file);
    console.log(file);


    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        setPhotoURL(response.body.secure_url);
        // this.setState({
        //   uploadedFileCloudinaryUrl: response.body.secure_url
        // });
      }
    });
  }

  // console.log(props.location);


    // const referer = '/' || props.location.state.referer;
    // // if (authTokens){
    // //   console.log(authTokens);
    // //   alert('Already logged in!');
    // //   return <Redirect to={referer} />;
      
    // // }
    
    // if (isLoggedIn) {
    //   return <Redirect to={referer} />;
    // }


    const { getFieldDecorator } = props.form;
    return (


      <Form onSubmit={handleSubmit} className="publish-post-form">
                  <CSRFToken />

        <Form.Item>
          {getFieldDecorator('Name', {
            rules: [{ required: true, message: 'Please input your post name!' }],
          })(
            <Input
              prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Title"
            />,
          )}
        </Form.Item>




        <Form.Item>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Please input your post content!' }],
        })(
          <Input
            prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Content"
          />,
        )}
      </Form.Item>


        <Form.Item>
          {getFieldDecorator('destinations', {
            rules: [{ required: true, message: 'Please input your DESTINATION!' }],
        })(
          <Input
            prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Destinations"
          />,
        )}
      </Form.Item>


        <Form.Item>
        {getFieldDecorator('travelTime', {
            rules: [{ required: true, message: 'Please input your travel time in days!' }],
        })(
          <Input
            prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="How many days"
          />,
        )}
      </Form.Item>


        <Form.Item>
        {getFieldDecorator('travelExpense', {
            rules: [{ required: true, message: 'Please input your travel expense in dollars!' }],
        })(
          <Input
            prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="How much in dollars"
          />,
        )}
      </Form.Item>
      <Card className='text-center' style={{ width: 300 }}>

      <Dropzone
        onDrop={onImageDrop.bind(this)}
        accept="image/*"
        multiple={false}>
          {({getRootProps, getInputProps}) => {
            return (
              <div
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {
                <p>Try dropping pic here, or click to select pic to upload.</p>
                }
              </div>
            )
        }}
      </Dropzone>
      </Card>




        <Form.Item>

          <div className='text-center'>

          <Button type="primary" htmlType="submit" className="login-form-button">
            Post this
          </Button> 
        <br />

          <Button type="primary" htmlType="submit" className="update-form-button">
            update this
          </Button> 
          
          </div>
        </Form.Item>
      </Form>
      );

  
        }



export default PublishPostForm;