import React from 'react';
import {  Card, Button } from 'semantic-ui-react'
// import ModalGen from './ModalGen'

const NoteCard = ({ handleDragLeave, currentUser, currentClassroom, note, users, handleSeeLiveNote, textBottomQuill, bottomQuill }) => {

  const foundUser = users.find(user=>{
    return user.id === note.user_id
  })

  return (
    <Card>
       <Card.Content>
         <Card.Header>{note.title}</Card.Header>
         <Card.Meta>{foundUser ? foundUser.username : currentUser.username}</Card.Meta>
       </Card.Content>
       <Card.Content extra style={{display: 'flex', justifyContent: 'center'}}>
       <Button id={note.id} onClick={handleSeeLiveNote}>Live View</Button>
       </Card.Content>
     </Card>
     );
   }


export default NoteCard;
