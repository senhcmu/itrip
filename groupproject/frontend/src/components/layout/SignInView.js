import React, { Component } from 'react';
import NormalLoginForm from '../components/SignInForm';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';


const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

class SignInView extends Component {



	render() {
		return (

      <WrappedNormalLoginForm />


			);
	}
}



// console.log('signin!!!');
export default SignInView;
 