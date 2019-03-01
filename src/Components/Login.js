import React from 'react';
import { Form, Container, Header, Menu, Segment } from 'semantic-ui-react'
import {Animated} from "react-animated-css";

const Login = ({name, handleLoginType, handleSubmit, activeMenuLogIn, handleSignInMenuTab}) => (


<div style={{height: '100%', width: '100%'}}>
  <Container style={{position: 'absolute', top: '30vh', bottom: '30vh', left: '10vw', right: '10vw'}}>
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
    <Header as='h2'>Welcome!</Header>
    <Animated animanimationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
      <Form onSubmit={handleSubmit}>
          <Form.Input placeholder='Name' name='name' value={name} onChange={handleLoginType} /><br/>
            <Form.Button content={activeMenuLogIn} />
      </Form>
      </Animated>
      </Segment>
  </Container>
</div>



);

export default Login;
