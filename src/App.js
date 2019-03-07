import React, { Component } from 'react';
import './App.css';
import NoteContainer from './Containers/NoteContainer';
import Classrooms from './Containers/Classrooms';
import { Row, Col } from 'react-materialize';
import LiveNotes from './Containers/LiveNotes';
import Header from './Components/Header'
import Login from './Components/Login'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { Segment, Dimmer } from 'semantic-ui-react'
import Welcome from './Components/Welcome'
// const BASEURL = 'http://localhost:3000/api/v1'
// const BASEURL = `https://notr-backend.herokuapp.com/api/v1`
const BASEURL = `http://${window.location.hostname}:3000/api/v1`

class App extends Component {
    state = {
      notes: [],
      users: [],
      classrooms: [],
      text: '',
      currentUser: {},
      currentNote: false,
      currentClassroom: {},
      userNotes: [],
      userClassrooms: {},
      activeItem: '',
      noteSize: 9,
      noteStatus: false,
      username: '',
      authenticated: false,
      editView: false,
      newClassroomFormBool: false,
      title: '',
      classroomNames: [],
      selectedClassroom: {},
      newClassRoomName: '',
      activeMenuLogIn: 'Sign In',
      searchType: '',
      bottomQuill: false,
      mainQuillHeight: 80,
      textBottomQuill: '',
      selectedClassNote: {},
      password: '',
      passwordConfirm: '',
      welcomeRender: false,
      active: false,
    }

//###################################################
//componentDidMount fetches all users, notes, and classrooms
    componentDidMount() {
      let token = localStorage.getItem('token')
      if (token){
        fetch(`${BASEURL}/curr_user`, {
          headers:
          {
            'Authorization':token
          }
        })
        .then(r=>r.json())
        .then(r=>{
            this.setState({
              authenticated: r.success,
              currentUser: r.user,
              userClassrooms: r.classrooms,
              userNotes: r.notes,
              password: '',
              username: '',
              notes: r.user.notes,
              users: r.users,
              classrooms: r.user.classrooms,
              welcomeRender: true,
              active: true
            },()=>{
              const classroomNames = this.state.userClassrooms.map(classroom=>{
                return { key: classroom.id, value: classroom.id, text: classroom.name }
              })
              this.setState({classroomNames})
              localStorage.setItem('token', r.token);
              })
            })
        }
    }//end if componentDidMount

//###################################################
//handles draging text from modal to simulate close click
      // handleDragLeave = (e) => {
      //   e.target.parentNode.parentNode.querySelector('.btn.waves-effect.waves-light.btn-flat.modal-action.modal-close').click()
      // }
      // handleWikiLeave = (e) => {
      //   document.querySelector('#note-header').click()
      // }
//###################################################
//controlling input to text editor
      noteEdit = (value) => {
          this.setState({ text: value },()=>{
            if (this.state.currentNote.id>0){
              fetch(`${BASEURL}/notes/${this.state.currentNote.id}`, {
              method: "PATCH",
              headers:
              {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
              },
              body: JSON.stringify({
                title: this.state.title,
                content: this.state.text,
                user_id: this.state.currentUser.id,
                classroom_id: this.state.currentNote.classroom_id
              })
            })
            // .then(r=>r.json())
            // .then(r=>this.editNote(r))
          }
        })
        }
//###################################################
//controlling click on an individual note button
      handleClick = e => {
        const currentNote = this.state.notes.find(note=>{
          return note.id === parseInt(e.target.dataset.id)
        })
        currentNote &&
        this.setState({currentNote},()=>{
          const currentClassroom = this.state.classrooms.find(classroom=>{
            return classroom.id === this.state.currentNote.classroom_id
          })
          this.setState({currentClassroom},()=>{
            this.setState({welcomeRender: false, text: this.state.currentNote.content, noteSize: 6, noteStatus: true, editView: true, newClassroomFormBool: false, title: this.state.currentNote.title, selectedClassroom: this.state.currentClassroom})
          })
        })
      }
//###################################################
//new note functionality
  newNote = (note) => {
    const foundNewNote = this.state.notes.find(anote=>{
      return anote.id === note.id
    })
    foundNewNote ||
    this.setState(prevState=>{
      return { notes: [...prevState.notes, note], userNotes: [...prevState.userNotes, note], text: '', title: '', selectedClassroom: {id: ''}}
    })
  }
//edit functionality
  editNote = (r) => {
    const classNotes = this.state.notes.filter(note=>{
      return note.classroom_id === this.state.currentClassroom.id
    })
    const noteToChange = classNotes.find(note=>{
      return note.id === r.id
    })
    if (noteToChange){
    if (this.state.currentUser.id === r.user_id){
        const newUserN = this.state.userNotes.map(userNote=>{
          if (userNote.id === r.id){
              return r
          } else {
              return userNote
          }
        })
        const newAllN = this.state.notes.map(anote=>{
          if (anote.id === r.id){
              return r
          } else {
              return anote
          }
        })
        this.setState({userNotes: newUserN, notes: newAllN},()=>{
          this.state.bottomQuill && this.state.selectedClassNote.id === r.id && this.setState({ textBottomQuill: r.content })
        })
      } else {
        const newAllN = this.state.notes.map(anote=>{
          if (anote.id === r.id){
              return r
          } else {
              return anote
          }
        })
        this.setState({notes: newAllN},()=>{
          this.state.bottomQuill && this.state.selectedClassNote.id === r.id && this.setState({ textBottomQuill: r.content })
        })
      }
    }
  }
//delete function
    deleteNote = (r) => {
      const newAllN = this.state.notes.filter(note => {
        return note.id !== r.id
      })
      const newUserN = this.state.userNotes.filter(note => {
        return note.id !== r.id
      })
      this.setState({
        notes: newAllN,
        userNotes: newUserN,
        text: '',
        currentNote: false,
        currentClassroom: {},
        activeItem: '',
        noteSize: 9,
        noteStatus: false,
        editView: false,
        newClassroomFormBool: false,
        title: '',
        selectedClassroom: {},
      })
    }
//###################################################
//handles clicks on the main menu
    handleMenuClick = (e, data) =>{
      this.setState({welcomeRender: false})
//##################################################################
//handling new note selection
    e.target.id === 'new-note' && this.setState({newClassroomFormBool: false, title: '', editView: true, noteStatus: false, text: '', currentNote: false, currentClassroom: {}, noteSize: 9, selectedClassroom: {id: ''}})
//##################################################################
//handling new classroom selection
    e.target.id === 'new-classroom' && this.setState({newClassroomFormBool: true, editView: false, noteStatus: false, text: '', currentNote: false, currentClassroom: {}})
//##################################################################
//handling logging out
    e.target.id === 'logout' && this.setState({
      text: '',
      currentUser: {},
      currentNote: false,
      currentClassroom: {},
      userNotes: [],
      userClassrooms: {},
      activeItem: '',
      noteSize: 9,
      noteStatus: false,
      username: '',
      authenticated: false,
      editView: false,
      newClassroomFormBool: false,
      title: '',
      classroomNames: [],
      selectedClassroom: {},
      newClassRoomName: '',
      activeMenuLogIn: 'Sign In',
      searchType: '',
      bottomQuill: false,
      mainQuillHeight: 80,
      textBottomQuill: '',
      selectedClassNote: {}
    },()=>{
      localStorage.removeItem('token');
    })
//##################################################################
// handling saving functionality
//new note
        if (e.target.id === 'save' && !this.state.currentNote) {
          fetch(`${BASEURL}/notes`, {
          method: "POST",
          headers:
          {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
          },
          body: JSON.stringify({
            title: this.state.title,
            content: this.state.text,
            user_id: this.state.currentUser.id,
            classroom_id: this.state.selectedClassroom.id
          })
        })
      // .then(r=>r.json())
      // .then(r=>{
      //      return this.newNote(r)
      //   })
//edit note
      } else if(e.target.id === 'save' && this.state.currentNote.id>0){
        fetch(`${BASEURL}/notes/${this.state.currentNote.id}`, {
        method: "PATCH",
        headers:
        {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        },
        body: JSON.stringify({
          title: this.state.title,
          content: this.state.text,
          user_id: this.state.currentUser.id,
          classroom_id: this.state.selectedClassroom.id
        })
      })
      // .then(r=>r.json())
      // .then(r=>{
      //     return this.editNote(r)
      // })
      }
//##################################################################
// handling delete functionality
    e.target.id === 'delete' && this.state.currentNote &&
    fetch(`${BASEURL}/notes/${this.state.currentNote.id}`, {
      method: 'DELETE'
    })
    // .then(r=>r.json())
    // .then(r=>{
    //     return this.deleteNote(r)
    // })
}//end of dropdown menu on click
//##################################################
//log in control and page rendering
      handleLoginType = e => {
        this.setState({username: e.target.value})
      }

      handleLoginPass = e =>{
        this.setState({password: e.target.value})
      }

      handleLoginPassConfirm = e =>{
        this.setState({passwordConfirm: e.target.value})
      }

      handleSubmit = e => {
        if (this.state.activeMenuLogIn === 'Sign In'){
        fetch(`${BASEURL}/login`, {
          method: 'POST',
          headers:
          {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })
      })
        .then(r=>r.json())
        .then(r=>{
          !r.success ?
          alert('Username/Password did not match, please try again') :
          this.setState({
            authenticated: r.success,
            currentUser: r.user,
            userClassrooms: r.classrooms,
            userNotes: r.notes,
            password: '',
            username: '',
            notes: r.user.notes,
            users: r.users,
            classrooms: r.user.classrooms,
            welcomeRender: true,
            active: true,
          },()=>{
            const classroomNames = this.state.userClassrooms.map(classroom=>{
              return { key: classroom.id, value: classroom.id, text: classroom.name }
            })
            this.setState({classroomNames})
            localStorage.setItem('token', r.token);
            })
          })
        } else if (this.state.activeMenuLogIn==='Register' && this.state.password === this.state.passwordConfirm){
          fetch(`${BASEURL}/register`, {
            method: 'POST',
            headers:
            {
              "Content-Type": 'application/json',
              "Accept": 'application/json'
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password
            })
          })
          .then(r=>r.json())
          .then(r=>{
            !r.success ?
            alert(r.errors) :
            this.setState({
              authenticated: r.success,
              currentUser: r.user,
              userClassrooms: r.classrooms,
              userNotes: r.notes,
              password: '',
              username: '',
              notes: r.user.notes,
              users: r.users,
              classrooms: r.user.classrooms,
              welcomeRender: true,
              active: true,
            },()=>{
              const classroomNames = this.state.userClassrooms.map(classroom=>{
                return { key: classroom.id, value: classroom.id, text: classroom.name }
              })
              this.setState({classroomNames})
              localStorage.setItem('token', r.token);
            },()=>{alert('Registered')})
          })
        }
      }//end of login/register handlesubmit
      //####################################################
// new classroom form
      newClassroomType = (e, {data}) =>{
        this.setState({newClassRoomName: e.target.value})
      }
// newClassRoomName
      handleNewClassRoom = e =>{
        e.preventDefault()
        fetch(`${BASEURL}/classrooms`, {
          method: "POST",
          headers:
          {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
          },
          body: JSON.stringify({
            name: this.state.newClassRoomName,
            user_id: this.state.currentUser.id
          })
        })
        .then(r=>r.json())
        .then(res=> {
          const classroom = res.classroom
          const note = res.note
          const foundClass = this.state.classrooms.find(aclass=>{
            return aclass.id === classroom.id
          })
          const foundUserClass =  this.state.userClassrooms.find(aclass=>{
            return aclass.id === classroom.id
          })
//classroom does not exist for anyone
          if (!foundClass){
          this.setState(prevState=>{
            return {
              classrooms: [...prevState.classrooms, classroom],
              userClassrooms: [...prevState.userClassrooms, classroom],
              notes: [...prevState.notes, note],
              userNotes: [...prevState.userNotes, note]
              }
          },()=>{
            const classroomNames = this.state.userClassrooms.map(classroom=>{
              return { key: classroom.id, value: classroom.id, text: classroom.name }
            })
            this.setState({classroomNames})
          })
        }
//classroom exists but not for user
        else if (foundClass && !foundUserClass) {
          this.setState(prevState=>{
            return {userClassrooms: [...prevState.userClassrooms, classroom], classrooms: [...prevState.classrooms, classroom], notes: [...prevState.notes, note], userNotes: [...prevState.userNotes, note]}
          },()=>{
            alert(`Someone already created ${classroom.name}, but it has been added to your classrooms!`)
            const classroomNames = this.state.userClassrooms.map(classroom=>{
              return { key: classroom.id, value: classroom.id, text: classroom.name }
            })
            this.setState({classroomNames})
            })
          }
//classroom exists and already is a user classroom
        else {
          alert('You already have that classroom in your classrooms!')
        }
      })
    }


//####################################################
//handle new note
  handleTitleChange = e =>{
    this.setState({title: e.target.value})
  }

  handleClassSelect = (e, {value})=>{
    const selectedClassroom = this.state.classrooms.find(classroom=>{
      return classroom.id === value
    })
    this.setState({selectedClassroom, noteSize: 6, noteStatus: true, editView: true, currentClassroom: selectedClassroom})
  }


  handleSignInMenuTab = (e, { name }) => {
    this.setState({ activeMenuLogIn: name })
  }

//#######################################################
//handle searching


  handleSearchType = e => {
    this.setState({searchType: e.target.value})
  }

//######################################################
//handleSeeLiveNote

 handleTags = (note) => {
  if (note.content.match(/<.*?>/i) && note.content.match(/&nbsp;/)){
      return note.content.replace(/<.*?>/gi, ' ').replace(/&nbsp;/gi, '')
  }  else if (note.content.match(/<.*?>/i)){
    return note.content.replace(/<.*?>/gi, ' ')
  } else if (note.content.match(/&nbsp;/)){
    return note.content.replace(/&nbsp;/gi, '')
  }
}
handleSeeLiveNote = e => {
  const selectedClassNote = this.state.notes.find(note=>{
    return note.id === parseInt(e.target.id)
  })
  const autSaveTimer = () =>{

  }
  this.setState(prevState=>{
    return {bottomQuill: !prevState.bottomQuill}},()=>{
      this.state.bottomQuill ? this.setState({mainQuillHeight: 30, textBottomQuill: selectedClassNote.content, selectedClassNote}) : this.setState({mainQuillHeight: 80, textBottomQuill: '', selectedClassNote: {}})
    })
  }
//#######################################################
//noteEditBottomQuill

  noteEditBottomQuill = value => {
    this.setState({ textBottomQuill: value })
  }

//#######################################################
//handle
  handleReceive = (res) => {
    if (res.request === 'new'){
      return this.newNote(res.note)
    } else if (res.request === 'edit') {
      return this.editNote(res.note)
    }else if (res.request === 'delete') {
      return this.deleteNote(res.note)
    }
  }
//#######################################################
  //  classNotes = () => {
  //   return this.state.notes.filter(note=>{
  //     return note.classroom_id === currentClassroom.id
  //   })
  // }
//######################################################
//popuptour

  handleMenuClickSim = e =>{
    this.setState({active:false},()=>{
      document.getElementById('menu-dropdown').click()
    })
  }

    render() {
      return (
        <div>
        <ActionCableConsumer
          channel={{channel: 'NewNoteChannel'}}
          onReceived={(res)=>{
            this.handleReceive(res)
          }}
        >
        </ActionCableConsumer>
          {
          !this.state.authenticated &&
            <Row>
              <Col s={12}>
                <Login
                name={this.state.username}
                handleLoginPass={this.handleLoginPass}
                password={this.state.password}
                handleLoginPassConfirm={this.handleLoginPassConfirm}
                passwordConfirm={this.state.passwordConfirm}
                handleSignInMenuTab={this.handleSignInMenuTab}
                activeMenuLogIn={this.state.activeMenuLogIn}
                handleLoginType={this.handleLoginType}
                handleSubmit={this.handleSubmit}
                />
              </Col>
            </Row>
          }
        {
          this.state.authenticated &&
          <Dimmer.Dimmable as={Segment} dimmed={this.state.active}>
            <Row style={{paddingLeft: '3%', paddingRight: '3%'}}>
              <Row>
                <Header
                handleWikiLeave={this.handleWikiLeave}
                handleSearchType={this.handleSearchType}
                searchType={this.state.searchType}
                currentUserID={this.state.currentUserID}
                handleMenuClick={this.handleMenuClick}
                />
              </Row>
              <Row>
                <Col s={3} >
                  <Classrooms
                  click={this.handleClick}
                  classrooms={this.state.userClassrooms}
                  notes={this.state.userNotes}
                  />
                </Col>
                <Col s={this.state.noteSize} >
                  <NoteContainer
                  noteEditBottomQuill={this.noteEditBottomQuill}
                  textBottomQuill={this.state.textBottomQuill}
                  bottomQuill={this.state.bottomQuill}
                  mainQuillHeight={this.state.mainQuillHeight}
                  selectedClassroom={this.state.selectedClassroom}
                  editView={this.state.editView}
                  newClassroomFormBool={this.state.newClassroomFormBool}
                  newClassroomType={this.newClassroomType}
                  newClassRoomName={this.state.newClassRoomName}
                  handleNewClassRoom={this.handleNewClassRoom}
                  activeItem={this.state.activeItem}
                  noteEdit={this.noteEdit}
                  text={this.state.text}
                  title={this.state.title}
                  handleTitleChange={this.handleTitleChange}
                  classroomNames={this.state.classroomNames}
                  handleClassSelect={this.handleClassSelect}
                  welcomeRender={this.state.welcomeRender}
                  handleMenuClickSim={this.handleMenuClickSim}
                  />
                </Col>
                {this.state.editView && this.state.noteStatus &&
                <h4 align='center'>Classroom: {this.state.currentClassroom.name}</h4>}
                {this.state.editView && this.state.noteStatus &&
                <Col s={3} >
                  <LiveNotes
                  bottomQuill={this.state.bottomQuill}
                  textBottomQuill={this.state.textBottomQuill}
                  handleSeeLiveNote={this.handleSeeLiveNote}
                  currentClassroom={this.state.currentClassroom}
                  users={this.state.users}
                  notes={this.state.notes}
                  currentUser={this.state.currentUser}
                  handleDragLeave={this.handleDragLeave}
                  />
                </Col>
              }
            </Row>
          </Row>
          <Dimmer active={this.state.active}>
          <Welcome handleMenuClickSim={this.handleMenuClickSim}/>
          </Dimmer>
          </Dimmer.Dimmable>

        }
          {
          this.state.authenticated &&
          <Row>
            <Col s={12}>
              <Segment>
                <h6>by: JoshSea 2019</h6>
                <a href='https://www.github.com/josh-sea' target='_blank' rel="noopener noreferrer">GitHub</a>
              </Segment>
            </Col>
          </Row>}
      </div>
    );
  }
}

export default App;
