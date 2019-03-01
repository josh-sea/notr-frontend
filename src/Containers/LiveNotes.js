import React from 'react';
import NoteCard from '../Components/NoteCard'
import { Card } from 'semantic-ui-react'
import { Animated } from 'react-animated-css'
const uuidv4 = require('uuid/v4')

const LiveNotes = ({users, notes, currentClassroom, handleDragLeave, handleSeeLiveNote, checkNotes, textBottomQuill, bottomQuill}) => {

const classNotes = notes.filter(note=>{
  return note.classroom_id === currentClassroom.id
})
const renderNotes = classNotes.map(note=>{
  return   <NoteCard key={uuidv4()} users={users} note={note} currentClassroom={currentClassroom} handleDragLeave={handleDragLeave} handleSeeLiveNote={handleSeeLiveNote} textBottomQuill={textBottomQuill} bottomQuill={bottomQuill} />
})//end of note map

  return (
    <Animated animationIn="rotateInDownRight" animationOut="flipOutY" isVisible={true}>
      <Card.Group style={{height: '80vh', overflow: 'scroll', display: 'flex',  justifyContent:'center', alignItems:'top'}}>
      {renderNotes}
      </Card.Group>
    </Animated>
);
}
// <NoteCard handleOpen={handleOpen} notes={notes} handleDragLeave={handleDragLeave} modalOpen={modalOpen} handleClose={handleClose}/>

export default LiveNotes;
