import React from 'react';
import { Form, Segment } from 'semantic-ui-react'

const NewClassroomForm = ({newClassroomType, newClassRoomName, handleNewClassRoom}) => (



<Segment inverted>
  <Form onSubmit={handleNewClassRoom}>
      <Form.Input placeholder='Name' name='name' value={newClassRoomName} onChange={newClassroomType} /><br/>
      <Form.Button content='Submit'/>
  </Form>
  </Segment>

);

export default NewClassroomForm;
