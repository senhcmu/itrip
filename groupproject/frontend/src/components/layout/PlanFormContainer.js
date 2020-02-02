import React,{ Component } from "react";
import PlanForm from "../components/PlanForm";
import api from "../services/api";
import { Message } from "semantic-ui-react";

class PlanFormContainer extends Component {
  state = {
    destination: "",
    days: "",
    errorMessage: null
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Since dropdowns work differently in Semantic, I need to use a separate handleSelect
  handleSelect = (e, value) => {
    this.setState({ [value.name]: value.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.destination === "" || this.state.days === "") {
      this.handleError();
    } else {



      api.appointments.newAppointment(
          this.state.destination,
          this.state.days,
          this.props.currentUser.id
        )




      
        .then(this.props.createAppointment)
        .then(
          this.setState({
            destination: "",
            days: "",
            errorMessage: ""
          })
        );
    }
  };

  handleError = e => {
    this.setState({
      errorMessage: (
        <Message
          error
          header="Error"
          content="Make sure you enter a destination and a number of days!"
        />
      )
    });
  };

  render() {
    return (
      <div
        className="ui raised segment"
        style={{
          backgroundColor: "#404E5C",
          position: "absolute",
          right: "-250px",
          width: "30vw"
        }}
      >

        <a onClick={this.props.handleClose} className="ui right corner label">
          <i onClick={this.props.handleClose} className="delete icon" />
        </a>


        <PlanForm
          destination={this.state.destination}
          days={this.state.days}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleSelect={this.handleSelect}
          errorMessage={this.state.errorMessage}
        />
      </div>
    );
  }
}

export default PlanFormContainer;
