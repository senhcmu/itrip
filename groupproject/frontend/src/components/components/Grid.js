import React from "react";
import DayList from "./DayList";
import EventList from "../components/EventList";

const Grid = props => {

  const ulStyle = {
    display: 'inline'

  };

  const { currentUser } = props;


  const eventslist = currentUser.plan.map((events,key) =>
  <div key={key}
  style={{
    width: "300px",
    minWidth: "250px",
    borderLeft: "solid",
    borderColor: "RGBa(61, 61, 61,.3)",
    borderTopRightRadius: "20px",
    borderTopLeftRadius: "20px",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    display:'inline-block'
  }}
>

  <div
        className="ui top attached one item inverted menu"
        style={{
          borderTopRightRadius: "20px",
          borderTopLeftRadius: "20px"

        }}
      >
        <div
          className="item"
          style={{
            backgroundColor: "#313131",
            color: "#F4FAFF",
            borderTopRightRadius: "20px",
            borderTopLeftRadius: "20px"
          }}
        >
          <div className="text-center">
          <p>     {key+1}  day</p>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "70vh",
          width: "auto"
        }}
      >
        <div className="ui column grid container">


          <ul>
          <div className="ten wide column">
            <DayList />
          </div>


          <div className="six wide column" style={{
            display:'inline-block',
            position: "relative"
          }}>
            

          <EventList 
              key={key}
              events={events}
              // update={props.update}
              handleDelete={props.handleDelete}
              activeModal={props.activeModal}
              modalOpen={props.modalOpen}
              modalClose={props.modalClose}
            />

           
          
          </div>
          </ul>

        </div>
      </div>
      </div>

            
          );

  // console.log('this is hard');
  // console.log(currentUser.plan);
  // console.log(eventslist);


  return (
    <ul>

      { eventslist }


    </ul>
  );
};

export default Grid;
