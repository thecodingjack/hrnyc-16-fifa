import React from 'react'
import {FieldGroup,Checkbox,FormControl,FormGroup,ControlLabel,Button} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <form className='col-md-12'>
        <div className='row'>
          <FormGroup className='col-md-4' controlId="email">
            <ControlLabel>Email</ControlLabel>
            <FormControl 
              id="email"
              type="email"
              label="Email"
              placeholder="Enter email"/>
          </FormGroup>
        </div>
        <div className='row'>
          <FormGroup className='col-md-4'controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl 
              id="password"
              type="text"
              label="Password"
              placeholder="Enter password"/>
          </FormGroup>
        </div>
        <Button>Submit</Button> 
      </form>
    )
  }
}
