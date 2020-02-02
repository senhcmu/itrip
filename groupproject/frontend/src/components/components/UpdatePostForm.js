import React, { Component, useState } from 'react';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router';
import { useAuth } from "../../context/auth";
import getCookie from "../../context/cookies";
import Dropzone from 'react-dropzone';
import request from 'superagent';



function NormalUpdateForm (props) {
  let history = useHistory();


  const [photoURL, setPhotoURL] = useState(props.data.post.photoURL);

  const csrftoken = getCookie('csrftoken');
  console.log(getCookie('csrftoken'))
  console.log(props.data);
  console.log("token");
  const postId = props.data.post.id;
  const postContent = props.data.post.content;
  const postName = props.data.post.name;
  const postPhotoURL = props.data.post.postPhotoURL;
  const postTravelTime = props.data.post.travelTime;
  const postTravelExpense = props.data.post.travelExpense;
  const postDestinations = props.data.post.destinations;
  const authTokens = props.data.token;
  console.log(authTokens);
  console.log("are we in the normal update form");

  const CLOUDINARY_UPLOAD_PRESET = 'du0lyoxs';
  const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/djyhwcsgz/upload';

  const CSRFToken = () => {
    return (
      <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
  };


  
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();
  

  // create an axios instance
  const axiosInstance = axios.create({
    headers: { Authorization: 'Token ' + authTokens }
  });



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
      }
    });
  }



  function handleSubmit(e) {
      console.log('hi');

      
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log("Token:");        
        console.log(authTokens);

        // const { authTokens } = useAuth();
        // event.preventDefault();
        const url = urlAndPort+'updatepost' + postId;
        const header = {
        // "Content-Type":"application/json",
        // 'Access-Control-Allow-Origin':'http://localhost:8000',

        Authorization: "Token "+authTokens
        // "X-CSRFToken": csrftoken

      };
      const data = {  
        pk:postId,
        name: values.Name,
                    content: values.content,
                    destinations: values.destinations,
                    travelTime: values.travelTime,
                    travelExpense: values.travelExpense,
                    photoURL: photoURL,
                }
    console.log(data);
    console.log(header);
    

    axiosInstance({
        method:'put',
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
        // return <Redirect to='/posts/' />
      })
  }
        }).catch(e => {
            alert(this.showErrors(e.response.data.error));
          alert('Error!');
          setIsError(true);
        });
      }


    const { getFieldDecorator } = props.form;
    return (


      <Form onSubmit={handleSubmit} className="update-post-form">
                  <CSRFToken />

        <Form.Item>
          {getFieldDecorator('Name', {
            initialValue: postName,
            rules: [{ required: true, message: 'Please input your post name!' }],
          })(
            <Input
              prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={postName}
            />,
          )}
        </Form.Item>


        <Form.Item>
          {getFieldDecorator('content', {
            initialValue: postContent,
            rules: [{ required: true, message: 'Please input your post content!' }],
        })(
          <Input
            prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder={postContent}
          />,
        )}
      </Form.Item>


        <Form.Item>
          {getFieldDecorator('destinations', {
            initialValue: postDestinations,
            rules: [{ required: true, message: 'Please input your DESTINATION!' }],
        })(
          <Input
            prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder={postDestinations}
          />,
        )}
      </Form.Item>


        <Form.Item>
        {getFieldDecorator('travelTime', {
            initialValue: postTravelTime,
            rules: [{ required: true, message: 'Please input your travel time in days!' }],
        })(
          <Input
            prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder={postTravelTime}
          />,
        )}
      </Form.Item>


        <Form.Item>
        {getFieldDecorator('travelExpense', {
            initialValue: postTravelExpense,
            rules: [{ required: true, message: 'Please input your travel expense in dollars!' }],
        })(
          <Input
            prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder={postTravelExpense}
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
                <p>Try dropping your new pic here, or click to select pic to upload.</p>
                }
              </div>
            )
        }}
      </Dropzone>
      </Card>




        <Form.Item>

          <div className='text-center'>

          <Button type="primary" htmlType="submit" className="login-form-button">
            Update this
          </Button>
          
          </div>
        </Form.Item>
      </Form>
      );

  
        }




export default NormalUpdateForm;