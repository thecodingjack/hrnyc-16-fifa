import React from 'react'
import {FieldGroup,Checkbox,FormControl,FormGroup,ControlLabel,Button} from 'react-bootstrap'

export default class AddPool extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    return (
      <form className='col-md-12'>
        <div className='row'>
          <FormGroup className='col-md-4' controlId="poolName">
            <ControlLabel>Pool Name</ControlLabel>
            <FormControl 
              id="poolName"
              type="text"
              label="Pool Name"
              placeholder="Enter a name for your pool"
              inputRef={(ref) => {this.poolName = ref}}/>
          </FormGroup>
        </div>
        <Button onClick={()=>{this.props.handleAdd(this.poolName.value)}}>Create Pool !</Button> 
      </form>
    )
  }
}