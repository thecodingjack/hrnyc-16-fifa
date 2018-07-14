import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Bracket } from './Bracket.js';
import { Header } from './Header.js';

import AddPool from './AddPool.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import PoolList from './PoolList.js';
import Pool from './Pool.js';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      standings: [],
      username: 'anonymous'
    }
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleJoinPool = this.handleJoinPool.bind(this)
    this.handleSubmitBracket = this.handleSubmitBracket.bind(this)
    this.getPools = this.getPools.bind(this)
    this.getStandings = this.getStandings.bind(this)
  }

  handleSignUp(username,password,history){
    fetch("https://serieux-saucisson-19708.herokuapp.com/users",{
      method: 'POST',
      body: JSON.stringify({username,password})
    })
    .then(response => response.json())
    .then(data => {
      if(data.errno) {
        alert("invalid Email/Password")
      }else{
        this.setState({username})
        history.goBack()
      }
    })
  }

  handleAdd(poolName){
    fetch("https://serieux-saucisson-19708.herokuapp.com/pools",{
      method: 'POST',
      body: JSON.stringify({poolName})
    })
    .then(response => response.json())
    .then(data => {
      this.getPools(pools=>this.setState({pools}))
      alert("Pool added!")
    })
  }

  // handleShowPool(poolName){
  //   fetch(`https://serieux-saucisson-19708.herokuapp.com/userPools/?poolName=${poolName}`,{
  //     method: 'GET',
  //   })
  //   .then(response => response.json())
  //   .then(players => {
  //     this.setState({players,poolName})
  //   })
  // }


  handleJoinPool(username,poolName){
    this.setState({poolName})
    fetch("https://serieux-saucisson-19708.herokuapp.com/userPools",{
      method: 'POST',
      body: JSON.stringify({username,poolName})
    })
    .then(response => response.json())
    .then(data => {
      console.log("JOINPOOL", data)
      this.getStandings(poolName,(standings)=>{
        this.setState({standings})
      })
    })
  }

  handleSubmitBracket(bracket){
    let mBody = {"poolName":this.state.poolName,"username":this.state.username,bracket}
    console.log("MBODY",mBody)
    fetch("https://serieux-saucisson-19708.herokuapp.com/userBrackets",{
      method: 'POST',
      body: JSON.stringify(mBody)
    })
    .then(response => response.json())
    .then(data => {
      console.log("SUBMITBRACKET", data)
    })
  }

  getPools(cb){
    fetch("https://serieux-saucisson-19708.herokuapp.com/pools",{
      method: 'GET'
    })
    .then(response => response.json())
    .then(pools => cb(pools))
  }

  getUserPools(cb){
    fetch(`https://serieux-saucisson-19708.herokuapp.com/userPoolsList/?username=${this.state.username}`,{
      method: 'GET'
    })
    .then(response => response.json())
    .then(pools => cb(pools))
  }

  getStandings(poolName,cb){
    console.log({poolName})
    fetch(`https://serieux-saucisson-19708.herokuapp.com/fifa/?poolName=${poolName}`,{
      method: 'GET'
    })
    .then(response => response.json())
    .then(standings => cb(standings))
  }

  componentDidMount(){
    this.getPools((pools)=>this.setState({pools}))
    this.getUserPools((userPools)=>this.setState({userPools}))
  }

  render(){
    return (
      <Router>
        <div>
          <Header/>
          <div>Hi, {this.state.username} </div>
          <Route path="/" exact render={()=>(
            <div>
            <Bracket/>
            <h1 className="col-md-12">Your Pools</h1>
            <PoolList username={this.state.username} joinPool={this.handleJoinPool} pools={this.state.userPools}/>
            </div>
          )}/>
          <Route path="/create" render={()=>(
            <AddPool handleAdd={this.handleAdd}/>
          )}/>
          <Route path="/pools" render={()=>(
            <PoolList username={this.state.username} joinPool={this.handleJoinPool} pools={this.state.pools}/>
          )}/>
          <Route path="/pool" render={()=>(
            <Pool standings={this.state.standings} username={this.state.username} poolName={this.state.poolName} handleSubmitBracket={this.handleSubmitBracket}/>
          )}/>
          <Route path="/login" render={()=>(
            <Login/>
          )}/>
          <Route path="/signUp" render={({history})=>(
            <SignUp mHistory={history} onSignUp={this.handleSignUp}/>
          )}/>
        </div>
      </Router>
    )
  }
}