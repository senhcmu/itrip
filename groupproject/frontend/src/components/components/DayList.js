import React from "react";
import Time from "./Time";
import TimeList from "../../../TimeList";
import { Table } from "semantic-ui-react";

const DayList = props => {
  const start = TimeList.indexOf("9:00");
  const end = TimeList.indexOf("20:00");
  const timeSlice = TimeList.slice(start, end + 1);
  const time = timeSlice.map((time, index) => {


    return (
      <tbody key={index}>
        <tr>
          <Time time={time} />
        </tr>
      </tbody>
    );
  });

  return (
    <Table
      compact
      striped
      inverted
      style={{
        border: "solid",
        borderColor: "white",
        borderSize: "1px"
      }}
    >
      <thead>
        <tr className="center aligned" />
      </thead>
      {time}
    </Table>
  );
};

export default DayList;
