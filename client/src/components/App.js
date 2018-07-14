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
    this.handleLogin = this.handleLogin.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleJoinPool = this.handleJoinPool.bind(this)
    this.handleSubmitBracket = this.handleSubmitBracket.bind(this)
    this.getPools = this.getPools.bind(this)
    this.getStandings = this.getStandings.bind(this)
  }

  handleSignUp(username,password,history){
    fetch("/users",{
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

  handleLogin(username,password,history){
    fetch("/login",{
      method: 'POST',
      body: JSON.stringify({username,password})
    })
    .then(response => response.json())
    .then(data => {
      if(!data.length) {
        alert("invalid Email/Password")
      }else{
        console.log({data})
        this.setState({username})
        history.goBack()
      }
    })
  }

  handleAdd(poolName){
    fetch("/pools",{
      method: 'POST',
      body: JSON.stringify({poolName})
    })
    .then(response => response.json())
    .then(data => {
      this.getPools(pools=>this.setState({pools}))
      alert("Pool added!")
    })
  }

  handleJoinPool(username,poolName){
    this.setState({poolName})
    fetch("/userPools",{
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
    fetch("/userBrackets",{
      method: 'POST',
      body: JSON.stringify(mBody)
    })
    .then(response => response.json())
    .then(data => {
      console.log("SUBMITBRACKET", data)
    })
  }

  getPools(cb){
    fetch("/pools",{
      method: 'GET'
    })
    .then(response => response.json())
    .then(pools => cb(pools))
  }

  getUserPools(cb){
    fetch(`/userPoolsList/?username=${this.state.username}`,{
      method: 'GET'
    })
    .then(response => response.json())
    .then(pools => cb(pools))
  }

  getStandings(poolName,cb){
    console.log({poolName})
    fetch(`/fifa/?poolName=${poolName}`,{
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
          <div className="col-md-12">Hi, {this.state.username} </div>
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
          <Route path="/login" render={({history})=>(
            <Login mHistory={history} onLogin={this.handleLogin}/>
          )}/>
          <Route path="/signUp" render={({history})=>(
            <SignUp mHistory={history} onSignUp={this.handleSignUp}/>
          )}/>
        </div>
      </Router>
    )
  }
}