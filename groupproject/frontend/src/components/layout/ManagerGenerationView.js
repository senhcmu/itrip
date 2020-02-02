import React, { Component } from 'react';
import ManagerGeneratorForm from '../components/ManagerGenerator';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';


const WrappedManagerGenerationForm = Form.create({ name: 'manager_generator' })(ManagerGeneratorForm);

class ManagerGenerationView extends Component {



	render() {
		return (

      <WrappedManagerGenerationForm />


			);
	}
}



console.log('signin!!!');
export default ManagerGenerationView;
 