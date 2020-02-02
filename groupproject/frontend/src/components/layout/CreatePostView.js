import React, { Component } from 'react';
import CreatePostForm from '../components/PublishPostForm';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import axios from 'axios';


const WrappedPublishPostForm = Form.create({ name: 'publish-post-form' })(CreatePostForm);

class CreatePostView extends Component {



	render() {
		return (

      <WrappedPublishPostForm />





			);
	}
}



// console.log('signin!!!');
export default CreatePostView;
 