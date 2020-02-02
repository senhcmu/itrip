import React, { Component } from 'react';
import ScheduleTable from '../components/Schedule';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';




class ScheduleView extends Component {

	state = {
		days:[]
	}




	handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        axios.get(urlAndPort+'autoplanner/?destination='+values.destination+"&days="+values.days)
        .then( res => {
          this.setState({
            days: res.days,
          });

        });
    }
});
}







	render() {
		const { getFieldDecorator } = this.props.form;
		return (
		<div>

		<Form onSubmit={this.handleSubmit} className="autoplanner-form">
        <Form.Item>
          {getFieldDecorator('destination', {
            rules: [{ required: true, message: 'Please input your destination!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('days', {
            rules: [{ required: true, message: 'Please input your days!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        </Form>






      <ScheduleTable />

      </div>


			);
	}
}



export default ScheduleView;
 