import React from 'react';
// import Classroom from '../Components/Classroom'
import { Accordion, Button, Segment } from 'semantic-ui-react'


const uuidv4 = require('uuid/v4')


const Classrooms = ({notes, classrooms, click}) => {

  const rootPanel = classrooms.map(classroom=>{
  const filteredNotes = notes.filter(note=>{
    return classroom.id === note.classroom_id
  })
//filter notes for the classroom
  const notePanels = filteredNotes.map(note=>{
    return {key: uuidv4(), title: note.title, content: {content: <Button data-id={note.id} onClick={click} >Edit Note</Button>} }
  })
//create array of objects for the note dropdowns
  const level1Content = (
    <Segment>
     Lecture Notes
     <Accordion.Accordion panels={notePanels} />
    </Segment>
  )
// put the notePanel array into an Accordion menu
  return { key: uuidv4(), title: classroom.name, content: { content: level1Content } }
//create a root panel for for each classroomname and return the object to map root panel
  })
//end classroom classpanel loop
//get uniqs only
  const uniqRootPanel = rootPanel.filter((obj, index, self) =>{
    return self.indexOf(obj) === index;
  })

  return (
    <Segment style={{height: '85vh', overflow: 'scroll', padding: '3px',margin: '2px'}}>
      <Accordion panels={uniqRootPanel} styled />
    </Segment>
  )
}
export default Classrooms;
