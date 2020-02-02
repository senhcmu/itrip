import React from "react";
import EventContainer from "../components/EventContainer";

const EventList = props => {

  const { events } = props;
  console.log('12');
  console.log(events);
  return events.map((event,key) => 
      <EventContainer 
        key={key}
        name={event.name}
        address={event.address}
        start_time={event.start_time}
        time={event.time}
        x={event.x}
        y={event.y}
        end_time={event.end_time}
        attraction_type={event.attraction_type}
        rating={event.rating}
        handleDelete={props.handleDelete}
        activeModal={props.activeModal}
        modalOpen={props.modalOpen}
        modalClose={props.modalClose}
    />
    
    )
  
};

export default EventList;
