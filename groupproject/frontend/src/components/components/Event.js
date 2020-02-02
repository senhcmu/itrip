import React from "react";
import Draggable from "react-draggable";
import { Button } from  'semantic-ui-react';
import EditModal from "./EditModal";

const Event = props => {
  // console.log('hello');
  // console.log(props.name);
  // console.log(props.time);
  // console.log(props.modalOpen);

  const height = `${props.time * 47}px`;

  return (
    <Draggable
    disabled={true}
      onStop={props.handleStop}
      bounds={{
        left: props.leftBounds,
        right: props.rightBounds,
        top: props.topBounds,
        bottom: props.bottomBounds
      }}
      grid={[300, 47]}
      id={props.id}
    >
      <div
        id={props.id}
        style={{
          position: "absolute",
          top: `${props.y}px`,
          left: `${props.x}px`
        }}
      >
        <Button
          className={props.attraction_type}
          onClick={props.buttonDoubleClick}
          id={props.id}
          style={{
            margin: "1px",
            width: "150px",
            height: `${height}`
          }}
        >
          {props.name}
        </Button>

        <EditModal
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
          handleSelect={props.handleSelect}
          handleDelete={props.handleDelete}
          handleClose={props.handleClose}
          id={props.id}
          name={props.name}
          address={props.address}
          start_time={props.start_time}
          end_time={props.end_time}
          attraction_type={props.attraction_type} 
          rating={props.rating}
          x={props.x}
          y={props.y}
          day={props.day}
          time={props.time}
          modalOpen={props.modalOpen}
          modalClose={props.modalClose}
        />
      </div>
    </Draggable>
  );
};

export default Event;
