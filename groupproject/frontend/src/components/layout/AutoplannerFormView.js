import React, { Component } from "react";
// import AppointmentFormContainer from "./AppointmentFormContainer";
import {  Modal } from "semantic-ui-react";
import { Button, Input, Icon, Tooltip, Form } from "antd";
import axios from 'axios';
import Grid from "../components/Grid";
import AutoplannerForm from "../components/AutoplannerForm";



const WrappedAutoplannerForm = Form.create({ name: 'autoplanner_form' })(AutoplannerForm);

class AutoplannerFormView extends Component {


  state = {
    active: null,
    // flag: false,
    currentUser: {
            plan: [],
        }
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
      localStorage.setItem('plannerFlag',JSON.stringify());
      // window.location.reload('#hhh');
  }



  handleClose = e => {
    this.setState({ active: null });
  };

  render() {

    return (
      <div className="ui column stackable grid container">
        <h2>AUTOPLANNER</h2>
        <p>Here, we can provide customized travel plan based on your choice. By default, the point of interest with highest rating will be scheduled in the morning.</p>
        <p>However, we provide the shuffle function to make a random schedule.</p>
        <br/>
        <br/>


        
        <WrappedAutoplannerForm
            />

      </div>
    );
  }
}

export default AutoplannerFormView;
