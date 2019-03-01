import React from 'react';
import { Button, Card, Header, Image, Icon, Modal } from 'semantic-ui-react'

const ModalGen = ({handleOpen, modalOpen, handleClose, handleDragLeave, note}) => (


  <Modal
    style={{padding: '10%'}}
    id={`data-id=${note.id}`}
    trigger={<Button onClick={handleOpen} basic color = 'green'>See Notes</Button>}
    open={modalOpen}
    onClose={handleClose}
    basic
    size='fullscreen'
  >
    <Header icon='sticky note outline' content='Users Notes' />
    <Modal.Content>
    <p onDragLeave={handleDragLeave}>
    {note.content}
    </p>
    </Modal.Content>
    <Modal.Actions>
      <Button id='close-note-modal' color='green' onClick={handleClose} inverted>
        <Icon name='checkmark' /> Done
      </Button>
    </Modal.Actions>
  </Modal>


);

export default ModalGen;
