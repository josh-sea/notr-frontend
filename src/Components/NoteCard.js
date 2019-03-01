import React from 'react';
import {  Card, Button } from 'semantic-ui-react'
// import ModalGen from './ModalGen'

const NoteCard = ({ handleDragLeave, currentClassroom, note, users, handleSeeLiveNote, textBottomQuill, bottomQuill }) => {

  const foundUser = users.find(user=>{
    return user.id === note.user_id
  })
  
  return (
    <Card>
       <Card.Content>
         <Card.Header>{note.title}</Card.Header>
         <Card.Meta>{foundUser.username}</Card.Meta>
       </Card.Content>
       <Card.Content extra style={{display: 'flex', justifyContent: 'center'}}>
       <Button id={note.id} onClick={handleSeeLiveNote}>Toggle View</Button>
       </Card.Content>
     </Card>
     );
   }


export default NoteCard;

// <Modal
// header={note.title}
// fixedFooter
// trigger={<Button className='green'>View Note</Button>}>
// <p onDragLeave={handleDragLeave} >{handleTags()}</p>
// </Modal>
