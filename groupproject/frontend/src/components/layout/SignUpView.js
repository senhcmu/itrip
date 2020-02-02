import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';


const WrappedSignUpForm = Form.create({ name: 'signup' })(SignUpForm);

class SignUpView extends Component {



	render() {
		return (
			
      <WrappedSignUpForm />


			);
	}
}



export default SignUpView;
 