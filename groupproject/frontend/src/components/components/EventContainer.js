import React, { Component } from "react";
import Event from "../components/Event";

class EventContainer extends Component {
  state = {
    
    name: 0,
    address: 0,
    start_time: 0,
    end_time: 0,
    attraction_type: 0, 
    rating: 0,
    modalOpen: false,
    time: 0,
    x:0,
    y:0,
    day:0,
    // update:false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Since dropdowns work differently in Semantic, I need to use a separate handleSelect
  handleSelect = (e, value) => {
    this.setState({ [value.name]: value.value });
  };


  handleDoubleClick = () => {
    // console.log('12312132312321');
    this.setState({ modalOpen: true });
  };

  componentDidMount() {
    console.log('final:');
    console.log(this.props.y);
    this.setState({

      name: this.props.name,
      x: this.props.x,
      y: this.props.y,
      address: this.props.address,
      start_time: this.props.start_time,
      end_time: this.props.end_time,
      time: this.props.time,
      attraction_type: this.props.attraction_type, 
      rating: this.props.rating,
      day: this.props.day,
      modalOpen: this.props.modalOpen,
      update: this.props.update
    });
  }



  handleDoubleClick = () => {
    this.setState({ modalOpen: true });
  };
  
  handleSubmit = e => {
    api.appointments.updateAppointment(
      e.target.id,
      this.state.name,
      this.state.duration,
      this.state.difficulty
    );
    this.setState({ modalOpen: false });
  };




  // fires when user stops dragging an item.
  handleStop = (event, dragElement) => {
    //the location of the element in the window
    const winY = dragElement.node.firstChild.getBoundingClientRect().y;
    const winX = dragElement.node.firstChild.getBoundingClientRect().x;
    // the amount that the user has scrolled
    // const scroll =
    //   dragElement.node.parentElement.parentElement.parentElement.parentElement
    //     .scrollTop;
    const y = winY - 87;

    const x = winX - 87;
    // rounds x coord so user cannot permanantly lose a task
    // const x = this.state.x + dragElement.x > -127.5 ? 0 : -255;
    // api.appointments.updateAppointmentLocation(
    //   dragElement.node.firstChild.id,
    //   x,
    //   y
    // );
  };

  handleClose = () => {
    // console.log('close!');
    this.setState({
      name: this.props.name,
      address: this.props.address,
      start_time: this.props.start_time,
      end_time: this.props.end_time,
      time: this.props.time,
      attraction_type: this.props.attraction_type, 
      rating: this.props.rating,
      day: this.props.day,
      modalOpen: false
    });
  };

  onDelete = event => {
    this.setState({ modalOpen: false });

    this.props.handleDelete(event.target.name);
  };

  render() {


    console.log(this.state.update);
    console.log(this.state.name);
    console.log('x:',this.state.x);
    console.log('y:',this.state.y);
    // right and left bounds make sure users can't move tasks off the board
    // if (this.state.x > 1200){
    //   this.state.x=this.state.x-1200}

    // }else{

    // }
    // if(){

    // }else{

    // // }
    // const leftBounds = this.state.x-550;
    // // const leftBounds = 255 + this.state.x;
    // const rightBounds = this.state.x+50;
    // const topBounds = -this.state.y + 230;
    // const bottomBounds = -this.state.time * 47 + 564;



    const leftBounds = -this.state.x +550;
    // const leftBounds = 255 + this.state.x;
    const rightBounds =  -this.state.x+1150;
    const topBounds = -this.state.y + 230;
    const bottomBounds = -this.state.y + 745;

    // const leftBounds = -this.state.x +550;
    // // const leftBounds = 255 + this.state.x;
    // const rightBounds =  -this.state.x+1150;
    // const topBounds = -this.state.y + 230;
    // const bottomBounds = -this.state.y + 745;

    // const leftBounds = this.state.x === -0 ? -255 : 0;
    // // const leftBounds = 255 + this.state.x;
    // const rightBounds = this.state.x === -255 ? 255 : 0;
    // const topBounds = -this.state.y + 230;
    // const bottomBounds = -this.state.time * 47 + 564;

    return (
      <Event
        handleStop={this.handleStop}

        name={this.props.name}
        address={this.props.address}
        start_time={this.props.start_time}
        end_time={this.props.end_time}
        attraction_type={this.props.attraction_type} 
        rating={this.props.rating}
        day={this.props.day}
        time={this.props.time}
        x = {this.state.x}
        y = {this.state.y}

        modalOpen={this.state.modalOpen}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleSelect={this.handleSelect}
        handleDelete={this.onDelete}
        handleClose={this.handleClose}
        leftBounds={leftBounds}
        rightBounds={rightBounds}
        topBounds={topBounds}
        bottomBounds={bottomBounds}
        activeModal={this.props.activeModal}
        buttonDoubleClick={this.handleDoubleClick}
        modalClose={this.props.modalClose}
      />
    );
  }
}

export default EventContainer;
