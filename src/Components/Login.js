import React from 'react';
import { Form, Container, Header, Menu, Segment } from 'semantic-ui-react'
import {Animated} from "react-animated-css";

const Login = ({name, handleLoginType, handleSubmit, activeMenuLogIn, handleSignInMenuTab, handleLoginPass, password, passwordConfirm, handleLoginPassConfirm}) => (


  <Segment style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '5vh', right: '5vw', left: '5vw', bottom: '5vh', padding: '5%'}}>
    <Header as='h2'>
      KNOWTR
    </Header>
    <Menu attached='top' tabular>
        <Menu.Item
          name='Sign In'
          active={activeMenuLogIn === 'Sign In'}
          onClick={handleSignInMenuTab} />
        <Menu.Item
          name='Register'
          active={activeMenuLogIn === 'Register'}
          onClick={handleSignInMenuTab}
          />
    </Menu>
    <Segment>
    <Animated animanimationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
      <Form onSubmit={handleSubmit}>
          <Form.Input type='text' placeholder='Name' name='name' value={name} onChange={handleLoginType} /><br/>
          <Form.Input type='password' placeholder='Password' name='password' value={password} onChange={handleLoginPass} /><br/>
          {activeMenuLogIn==='Register' &&<Form.Input type='password' placeholder='Confirm Password' name='passwordConfirm' value={passwordConfirm} onChange={handleLoginPassConfirm} />}
          <Form.Button content={activeMenuLogIn} />
      </Form>
      </Animated>
      </Segment>
  </Segment>



);

export default Login;
