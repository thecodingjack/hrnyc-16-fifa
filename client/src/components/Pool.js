import React from 'react';
import { Standings } from './Standings.js';
import {FieldGroup,Checkbox,FormControl,FormGroup,ControlLabel,Button} from 'react-bootstrap';

export default class Pool extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      // "brackets": [//matchid,teama,teamB,goalA,goalB,winnerID
        1:[1,1,2,0,0,0],
        2:[2,3,4,0,0,0],
        3:[3,5,6,0,0,0],
        4:[4,7,8,0,0,0],
        5:[5,0,0,0,0,0],
        6:[6,0,0,0,0,0],
        7:[7,0,0,0,0,0] 
    }
  }
  
  hasUserStarted(poolName,username){
    fetch(`http://127.0.0.1:3000/userPools/?poolName=${poolName}&username=${username}`,{
      method: 'GET',
    })
    .then(response => response.json())
    .then(({isPlaying}) => {
      console.log(isPlaying)
      this.setState({isPlaying})
    })
  }

  handleScoreInput(matchID,teamAB,goal){
    let newState = [...this.state[matchID]];
      if(teamAB){
        newState[3] = + goal
      }else{
        newState[4] = + goal
      }
      this.setState({
        [matchID]: newState
      })
  }

  handleWinnerInput(matchID,winnerID,nextMatchID,AB){
    let newState = [...this.state[matchID]];
    if(matchID == 7){
      newState[5] = + winnerID;
      this.setState({
        [matchID]: newState
      })
    }else{
      let nextMatch = [...this.state[nextMatchID]];
      newState[5] = + winnerID;
      if(AB){
        nextMatch[1] = + winnerID;
      }else{
        nextMatch[2] = + winnerID;
      }
      this.setState({
        [matchID]: newState,
        [nextMatchID]: nextMatch
      })
    }
  }

  componentDidMount(){
    this.hasUserStarted(this.props.poolName,this.props.username)
  }

  render(){
    return(
      <div className="col-md-12">
        <div>Welcome to the {this.props.poolName}</div>
        <Standings standings={this.props.standings}/>
        {this.state.isPlaying
        ? <div>Good luck!</div> 
        :<div>
          <div>
    <h1>JOIN FIFA WORLD CUP 2018</h1>
    <main id="tournament">
      <ul className="round round-1">
        <li className="spacer">&nbsp;</li>
        
        <li className="game game-top">Uruguay <input style={{float:'right',maxWidth:'30px',marginRight:'8px', color:"black"}} id="score1a" type="text" placeholder="0" onChange={(e) => {this.handleScoreInput(1,0,e.target.value)}}></input></li>
        <li className="game game-spacer">&nbsp;</li>
        <li className="game game-bottom winner">France <input style={{float:'right',maxWidth:'30px',marginRight:'8px', color:"black"}} id="score1b" type="text" placeholder="0" onChange={(e) => {this.handleScoreInput(1,1,e.target.value)}}></input></li>

        <li className="spacer">&nbsp;</li>
        
        <li className="game game-top">Brazil <input style={{float:'right',maxWidth:'30px',marginRight:'8px', color:"black"}} id="score2a" type="text" placeholder="0" onChange={(e) => {this.handleScoreInput(2,0,e.target.value)}}></input></li>
        <li className="game game-spacer">&nbsp;</li>
        <li className="game game-bottom winner">Belgium <input style={{float:'right',maxWidth:'30px',marginRight:'8px', color:"black"}} id="score2b" type="text" placeholder="0" onChange={(e) => {this.handleScoreInput(2,1,e.target.value)}}></input></li>

        <li className="spacer">&nbsp;</li>
        
        <li className="game game-top">Russia <input style={{float:'right',maxWidth:'30px',marginRight:'8px', color:"black"}} id="score3a" type="text" placeholder="0" onChange={(e) => {this.handleScoreInput(3,0,e.target.value)}}></input></li>
        <li className="game game-spacer">&nbsp;</li>
        <li className="game game-bottom winner">Croatia <input style={{float:'right',maxWidth:'30px',marginRight:'8px', color:"black"}} id="score3b" type="text" placeholder="0" onChange={(e) => {this.handleScoreInput(3,1,e.target.value)}}></input></li>

        <li className="spacer">&nbsp;</li>
        
        <li className="game game-top">Sweden <input style={{float:'right',maxWidth:'30px',marginRight:'8px', color:"black"}} id="score4a" type="text" placeholder="0" onChange={(e) => {this.handleScoreInput(4,0,e.target.value)}}></input></li>
        <li className="game game-spacer">&nbsp;</li>
        <li className="game game-bottom winner">England <input style={{float:'right',maxWidth:'30px',marginRight:'8px', color:"black"}} id="score4b" type="text" placeholder="0" onChange={(e) => {this.handleScoreInput(4,1,e.target.value)}}></input></li>

        <li className="spacer">&nbsp;</li>
      </ul>
      <ul className="round round-2">
        <li className="spacer">&nbsp;</li>
        
        <li className="game game-top winner">
          <select style={{color:"black"}} id="winner1" onChange={(e)=>this.handleWinnerInput(1,e.target.value,5,0)}>
            <option selected value="0" disabled>Winner</option>
            <option value="1">Uruguay</option>
            <option value="2">France</option>
          </select>
          <input style={{float:'right',maxWidth:'30px',marginRight:'8px', color:"black"}} id="score5a" type="text" placeholder="0" onChange={(e) => {this.handleScoreInput(5,0,e.target.value)}}></input></li>
        <li className="game game-spacer">&nbsp;</li>
        <li className="game game-bottom ">
          <select style={{color:"black"}} id="winner2" onChange={(e)=>this.handleWinnerInput(2,e.target.value,5,1)}>
            <option selected value="0" disabled>Winner</option>
            <option value="3">Brazil</option>
            <option value="4">Belgium</option>
          </select>
          <input style={{float:'right',maxWidth:'30px',marginRight:'8px', color:"black"}} id="score5b" type="text" placeholder="0" onChange={(e) => {this.handleScoreInput(5,1,e.target.value)}}></input></li>

        <li className="spacer">&nbsp;</li>
        
        <li className="game game-top winner">
          <select style={{color:"black"}} id="winner3" onChange={(e)=>this.handleWinnerInput(3,e.target.value,6,0)}>
            <option selected value="0" disabled>Winner</option>
            <option value="5">Russia</option>
            <option value="6">Croatia</option>
          </select>
          <input style={{float:'right',maxWidth:'30px',marginRight:'8px', color:"black" }} id="score6a" type="text" placeholder="0" onChange={(e) => {this.handleScoreInput(6,0,e.target.value)}}></input></li>
        <li className="game game-spacer">&nbsp;</li>
        <li className="game game-bottom ">
          <select style={{color:"black"}} id="winner4" onChange={(e)=>this.handleWinnerInput(4,e.target.value,6,1)}>
            <option selected value="0" disabled>Winner</option>
            <option value="7">Sweden</option>
            <option value="8">England</option>
          </select>
          <input style={{float:'right',maxWidth:'30px',marginRight:'8px', color:"black"}} id="score6b" type="text" placeholder="0" onChange={(e) => {this.handleScoreInput(6,1,e.target.value)}}></input></li>

        <li className="spacer">&nbsp;</li>
        
      </ul>
      <ul className="round round-3">
        <li className="spacer">&nbsp;</li>
        
        <li className="game game-top">
        <select style={{color:"black"}} id="winner5" onChange={(e)=>this.handleWinnerInput(5,e.target.value,7,0)}>
            <option selected value="0" disabled>Winner</option>
            <option value="1">Uruguay</option>
            <option value="2">France</option>
            <option value="3">Brazil</option>
            <option value="4">Belgium</option>
          </select>
          <input style={{float:'right',maxWidth:'30px',marginRight:'8px', color:"black"}} id="score7a" type="text" placeholder="0" onChange={(e) => {this.handleScoreInput(7,0,e.target.value)}}></input></li>
        <li className="game game-spacer">&nbsp;</li>
        <li className="game game-bottom ">
          <select style={{color:"black"}} id="winner6" onChange={(e)=>this.handleWinnerInput(6,e.target.value,7,1)}>
            <option selected value="0" disabled>Winner</option> 
            <option value="5">Russia</option>
            <option value="6">Croatia</option>
            <option value="7">Sweden</option>
            <option value="8">England</option>
          </select>
          <input style={{float:'right',maxWidth:'30px',marginRight:'8px', color:"black"}} id="score7b" type="text" placeholder="0" onChange={(e) => {this.handleScoreInput(7,1,e.target.value)}}></input></li>

        <li className="spacer">&nbsp;</li>

      </ul>
      <ul className="round round-4">
        <li className="spacer">&nbsp;</li>
        
        <li className="game game-top winner">
          <select style={{color:"black"}} id="winner7" onChange={(e)=>this.handleWinnerInput(7,e.target.value)}>
            <option selected value="0" disabled>Winner</option>
            <option value="1">Uruguay</option>
            <option value="2">France</option>
            <option value="3">Brazil</option>
            <option value="4">Belgium</option>
            <option value="5">Russia</option>
            <option value="6">Croatia</option>
            <option value="7">Sweden</option>
            <option value="8">England</option>
          </select>
          <button style={{float:'right',marginRight:"16px", color:"black"}} onClick={()=>{
            this.props.handleSubmitBracket(this.state)
          }}>Done!</button>
        </li>

        
        <li className="spacer">&nbsp;</li>
      </ul>		
    </main>
  </div>
        </div>
        }
        
      </div>
    )
  }
}