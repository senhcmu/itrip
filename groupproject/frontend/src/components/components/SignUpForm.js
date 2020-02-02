
import React, { Component, useState } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router';
import { useAuth } from "../../context/auth";
import checkRole  from "../CheckManager";


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;



// const [isLoggedIn, setLoggedIn] = useState(false);
// const [isError, setIsError] = useState(false);
// const [userName, setUserName] = useState("");
// const [password, setPassword] = useState("");
// const { setAuthTokens } = useAuth();

function SignUpForm (props) {


  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const { setAuthTokens } = useAuth();
  const { authTokens } = useAuth();

  
  function handleSubmit (e) {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);



        const url = urlAndPort+'register/';
        const data = {
          "username": values.username,
          "password": values.password,
          "password2": values.confirm,
          "nickname": values.nickname
        };
        console.log(url);
        console.log(data);


        axios({
          method: 'post',
          url: url,
          data: data
        }
          ).then( res => {
            console.log(res.data);
            if (res.status === 200 && res.data.is_success === true) {
              setAuthTokens(res.data.token);
              console.log(authTokens);
              setLoggedIn(true);

              localStorage.setItem("isLoggedIn", JSON.stringify(true));
              localStorage.setItem("username", res.data.username);
              localStorage.setItem("nickname", res.data.nickname);
  
              alert('not enetr');
              checkRole(res.data.token);
              alert('after enter!');
              // localStorage.getItem("role", JSON.stringify(true));
              window.location.reload('#layout');

            } else {
              console.log('HI');
              alert('Sorry, this account has been taken or input invalid!');
              setIsError(true);

            }
          }).catch(e => {
            setIsError(true);
          });
      }
    });
  };

  function handleConfirmBlur (e){
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);

  };

  function compareToFirstPassword (rule, value, callback) {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  function validateToNextPassword (rule, value, callback){
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  function handleWebsiteChange (value){
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    setAutoCompleteResult(autoCompleteResult);
  };


    const { getFieldDecorator } = props.form;
    // const { autoCompleteResult } = useState;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    if (isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="USERNAME">
          {getFieldDecorator('username', {
            rules: [
              {
                type: 'string',
                message: 'The input is not valid username!',
              },
              {
                required: true,
                message: 'Please input your username!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="PASSWORD" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="CONFIRM PASSWORD" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              NICKNAME&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input />)}
        </Form.Item>



        {/* <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>,
          )}
        </Form.Item> */}

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  
}


export default SignUpForm;