import React from "react";
import { Form, Dropdown } from "semantic-ui-react";
import { Modal } from "antd";
const EditModal = props => {
  const times = [1, 2, 3];
  const timeMap = times.map(time => {
    return { text: `${time} minutes`, value: `${time}` };
  });
  // console.log('open x:');
  // console.log(props.x);

  // console.log('open y:');




  // console.log('open');
  // console.log(props.modalOpen);


  return (
    <div>
      <Modal 
      title={props.name}
      visible={props.modalOpen}
      onOk={props.handleClose}
      onCancel={props.handleClose}
      >
        {/* <Modal.Header>Edit Task</Modal.Header> */}
        {/* <Modal.Content> */}
          <a onClick={props.handleClose} className="ui right corner label">
            <i onClick={props.handleClose} className="delete icon" />
          </a>


          <Form id={props.name} onSubmit={props.handleSubmit}>
            
            
            <div className="field">
              {/* <label
                style={{
                  color: "#F4FAFF"
                }}
              > */}
                <p>Attraction Type: {props.attraction_type}</p>
                <p>Estimated Time: {props.time} HOURS</p>
                <p>Address: {props.address}</p>
                <p>Google Rating: {props.rating}</p>

                
                {/* Task Name */}
                {/* <input
                  onChange={props.handleChange}
                  type="text"
                  name="name"
                  value={props.name}
                /> */}

              {/* </label> */}
            </div>
            
            
            {/* <div className="field">
              <label style={{ color: "#F4FAFF" }}>Time</label>

              {/* <Dropdown
                placeholder="Select a Time"
                selection
                options={timeMap}
                onChange={props.handleSelect}
                name="time"
                value={props.time}
              /> */}
              
            {/* </div> */}



            {/* <div className="field">
              <button
                type="button"
                id={props.name}
                onClick={props.handleDelete}
                className="ui negative button"
              >
                Delete
              </button>
              <button className="ui button" type="submit">
                Submit
              </button>
            </div> */}
          </Form>
        {/* </Modal.Content> */}
      </Modal>
    </div>
  );
};

export default EditModal;
