import React, { Component } from 'react';
import NormalUpdateForm from '../components/UpdatePostForm'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';


const WrappedNormalUpdateForm = Form.create({ name: 'update-post-form' })(NormalUpdateForm);

class UpdatePostView extends Component {



	render() {
    // console.log(this.props.location);
		return (

      <WrappedNormalUpdateForm data={this.props.location.state}/>


			);
	}
}



console.log('update form!!!');
export default UpdatePostView;
