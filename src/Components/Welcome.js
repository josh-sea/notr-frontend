import React from 'react';
import { Container, Segment, Button, Header } from 'semantic-ui-react'

const align =  {
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex'
}


const Welcome = ({handleMenuClickSim}) => (

  <Container>
    <Segment>
      <Header as='h4'>
        Welcome to Notr! The note app focused on helping you create and share notes with your classmates...
      </Header>
      <Header as='h6'>
        <p>As a new user, you can create a new classroom, these look a lot like regular old note folders, but these should represent an entire class.</p>
        <p>For example... </p>
        <p style={align}>Organic Chemistry</p>
        <p style={align}>-or-</p>
        <p style={align}>Under Water Basket Weaving</p>
        <br/>
        <p>To the left, your list of your classrooms will appear, if you have any current classes. You can add as many classes as you want and as may notes as you want to each classroom.</p>
        <p>The menu allows you to create a new classroom or note, to save your changes, delete notes and to logout.</p>
        <p></p>
        <p>To get started, create a new classroom using the top menu (use the 'Start' button to get started).</p>
        <p>BONUS: If you view a fellowclassmates note who is currently editing, you will see the changes everytime they save their notes and everytime you save your notes they will see it too!</p>
        <p>BONUS BONUS: A wikipedia search has been added to the top right, feel free to use wikipedia to add to your notes!</p>
      </Header>
        <div style={align}><Button onClick={handleMenuClickSim}>Start</Button></div>
        <div id='editor'></div>
    </Segment>
  </Container>
);

export default Welcome;


// <p>Once you have created a new classroom, you can fill it with lecture notes! Each note should ideally be a single lecture. But you can do whatever you want.</p>
// <p>When you create a new classroom you will get an empty note you can edit.</p>
