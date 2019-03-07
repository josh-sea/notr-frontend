import React from 'react';
import ReactQuill from 'react-quill';
// import lifecycle from 'react-pure-lifecycle';
import { Animated } from "react-animated-css";
import { Segment, Form } from 'semantic-ui-react'

//
// const methods = {
//   componentDidMount(props) {
//   console.log('I mounted! Here are my props: ', props);
//
// }
// };

const ShowNote = ({text, noteEdit, title, classroomNames, handleTitleChange, handleClassSelect, selectedClassroom, bottomQuill, mainQuillHeight, noteEditBottomQuill, textBottomQuill}) => {

  return (

    <Animated animationIn="fadeIn" animationOut="flipOutY" isVisible={true}>
      <Segment inverted>
        <Form.Group>
          <Form.Dropdown placeholder='Select Classroom' label='Search Your Classrooms' scrolling search fluid options={classroomNames} onChange={handleClassSelect} value={selectedClassroom.id}/><br/>
          <Form.Input placeholder='Note Title...' value={title} onChange={handleTitleChange}/>
        </Form.Group>
      </Segment>
      <div style={{height: `${mainQuillHeight}vh`}}>
        <ReactQuill id='quill' theme='snow' value={text} onChange={noteEdit} style={{height: '80%'}}/>
      </div>
      {bottomQuill && <div style={{height: '30vh'}}>
        <ReactQuill id='bottom-quill' theme='snow'  value={textBottomQuill} onChange={noteEditBottomQuill} style={{height: '80%'}}/>
      </div>}
    </Animated>
    );
}

// export default lifecycle(methods)(ShowNote);
export default ShowNote;
