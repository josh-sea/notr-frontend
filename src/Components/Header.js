import React from 'react';
import { Dropdown, Menu, Icon, Input } from 'semantic-ui-react'
import  { Modal } from 'react-materialize'
import Iframe from 'react-iframe'


const Header = ({handleMenuClick, handleSearchType, handleWikiLeave, searchType}) => (


  <div style={{background: '#333'}}>
  <Menu attached='top' inverted >

    <Dropdown item icon='setting' simple>
      <Dropdown.Menu>
        <Dropdown.Item>
          <Icon name='dropdown' />
            <span className='text'id='new'>New...</span>
              <Dropdown.Menu>
               <Dropdown.Item onClick={handleMenuClick} id='new-classroom'>New Classroom...</Dropdown.Item>
               <Dropdown.Item onClick={handleMenuClick} id='new-note'>New Note...</Dropdown.Item>
              </Dropdown.Menu>
        </Dropdown.Item>
        <Dropdown.Item onClick={handleMenuClick} id='save'>Save...</Dropdown.Item>
        <Dropdown.Item onClick={handleMenuClick} id='delete'>Delete...</Dropdown.Item>
        <Dropdown.Item onClick={handleMenuClick} id='logout'>Logout...</Dropdown.Item>
        <Dropdown.Divider />
      </Dropdown.Menu>
    </Dropdown>
    <Menu.Item header id='note-header'>Notr</Menu.Item>


    <Menu.Menu position='right'>
    <div className='ui right aligned category search item'>
      <div className='ui transparent icon input'>
          <Modal
            id='wiki-searchbox'
            header={`Wikipedia Search: ${searchType}`}
            bottomSheet
            trigger={<Input style={{marginRight: '20%'}} onChange={handleSearchType} value={searchType} type='text' placeholder='Search Wikipedia...' />}>
            <Iframe url={`https://en.wikipedia.org/wiki/${searchType}`}
                    onDragLeave={handleWikiLeave}
                    width="100vw"
                    height="50vh"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    allowFullScreen/>
            </Modal>
            </div>
            </div>
    </Menu.Menu>
  </Menu>
  </div>
);

export default Header;

// <Dropdown.Header>Export</Dropdown.Header>
// <Dropdown.Item onClick={handleMenuClick} id='share'>Share</Dropdown.Item>
