import React, { Component } from 'react';
import NormalLoginForm from '../components/SignInForm';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import Planner from "../components/Planner";



class PlannerView extends Component {
	state = {
    modalOpen: false,
    currentUser: {
      plan: [],
  }
  };
  onEscape = e => {
    if (e.key === "Escape") {
      this.modalClose();
    }
  };


    retrievePlan = plan => {
    const prevState = this.state.auth.currentUser.plan.slice();
    prevState.push(plan);
    this.setState({
      auth: {
        currentUser: { ...this.state.auth.currentUser, plan: prevState }
      }
    });
    if (prevState.length === 1) {
      this.setState({ modalOpen: true });
    }
  };


  componentDidMount() {
    console.log(this.props.location.state.currentUser);
    this.setState({
      currentUser: this.props.location.state.currentUser
    });

}




  handleDelete = id => {
    api.appointments.deleteAppointment(id);
    const prevState = this.state.auth.currentUser.days.slice();
    const newState = prevState.filter(a => a.id.toString() !== id);
    this.setState({
      auth: {
        currentUser: { ...this.state.auth.currentUser, appointments: newState }
      }
    });
  };



	render() {
		return (

      <Planner
        props={this.props}

      	style={{ height: "100vh" }}
        handleChange={this.handleChange}
        retrievePlan={this.retrievePlan}
        handleDelete={this.handleDelete}
        modalOpen={this.state.modalOpen}
        handleOpen={this.handleOpen}
        modalClose={this.modalClose}
        currentUser={this.state.currentUser}

      />


			);
	}
}



export default PlannerView;
 