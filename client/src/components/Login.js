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

  handleEmailInput(e){
    this.setState({'email':e.target.value})
  }

  handlePasswordInput(e){
    this.setState({'password':e.target.value})
  }

  render(){
    return(
      <div>
        <form className='col-md-12'>
          <div className='row'>
            <FormGroup className='col-md-4' controlId="email">
              <ControlLabel>Email</ControlLabel>
              <FormControl 
                id="email"
                type="email"
                label="Email"
                value={this.state.email}
                placeholder="Enter email"
                onChange={(e)=>this.handleEmailInput(e)}/>
            </FormGroup>
          </div>
          <div className='row'>
            <FormGroup className='col-md-4'controlId="password">
              <ControlLabel>Password</ControlLabel>
              <FormControl 
                id="password"
                type="password"
                label="Password"
                value={this.state.password}
                placeholder="Enter password"
                onChange={(e)=>this.handlePasswordInput(e)}/>
            </FormGroup>
          </div>
          <Button onClick={()=>{
            this.props.onLogin(this.state.email,this.state.password,this.props.mHistory)}
            }>Submit</Button> 
        </form>
      </div>
    )
  }
}
