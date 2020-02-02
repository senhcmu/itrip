import React from "react";
import { Button, Form, Dropdown } from "semantic-ui-react";

const PlanForm = props => {
  const times = [1, 2, 3];
  const timeMap = times.map(time => {
    return { text: `${time} hours`, value: `${time}` };
  });

  return (

    <Form error onSubmit={props.handleSubmit}>
      <div className="field">
        <label
          style={{
            color: "#F4FAFF"
          }}
        >
          Destination Name
          <input
            onChange={props.handleChange}
            type="text"
            name="destination"
            value={props.destination}
          />
        </label>
      </div>

      <div className="field">
        <label
          style={{
            color: "#F4FAFF"
          }}
        >
          Travel Days
          <input
            onChange={props.handleChange}
            type="text"
            name="days"
            value={props.days}
          />
        </label>
      </div>



      <div className="field">
        <Button type="submit">Submit</Button>
      </div>
      {props.errorMessage}
    </Form>
  );
};

export default PlanForm;
