import React, { Component } from "react";
// import AppointmentFormContainer from "./AppointmentFormContainer";
import {  Modal } from "semantic-ui-react";
import { Button, Input, Icon, Tooltip, Form } from "antd";
import axios from 'axios';
import Grid from "./Grid";
import { Redirect, browserHistory } from 'react-router';
import AutoplannerForm from "./AutoplannerForm";
// export const history = createHashHistory();





const WrappedAutoplannerForm = Form.create({ name: 'autoplanner_form' })(AutoplannerForm);
const plannerFlag = localStorage.getItem('plannerFlag');
// let history = useHistory();

class Planner extends Component {




  state = {
    active: null
          };




  

  setPlan = props => {
    console.log('yes');
    console.log(props);
    console.log('i will win');

    this.setState({
                currentUser: props,
              }
              );

  }
  setFlag = props => {
    // console.log('yes');
    // console.log(props);
    // console.log('i will win');

    this.setState({
                flag: true
              }
              );

  }

  goBackBtn = () => {
    console.log(this.props);
    this.props.props.history.push({
      pathname: '/autoplanner'
    })

  }



  handleClose = e => {
    this.setState({ active: null });
  };

  render() {
    console.log(this.props.currentUser.plan);
    return (
      <div className="ui column stackable grid container">
        <h2>AUTOPLANNER</h2>

        <div className="twelve wide column">
          <Grid
            handleClick={this.handleClick}
            currentUser={this.props.currentUser}
            handleDelete={this.props.handleDelete}
            activeModal={this.props.activeModal}
            modalOpen={this.state.modalOpen}
            modalClose={this.props.modalClose}
          />
        </div>
        <div className='text-center'>

        <Button
        type="primary" 
        onClick={this.goBackBtn}>
          GO BACK
        </Button>
        </div>

      </div>
    );
  }
}

export default Planner;
