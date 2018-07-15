import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class PoolList extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return (
      <div className="col-md-12" style={{marginTop:"16px"}}>
        {this.props.pools && this.props.pools.map(pool=>(
          // <div onClick={()=>this.props.joinPool(this.props.username,pool.poolName)}>
          //   <Link to="/pool">{pool.poolName}</Link>
          // </div>
          <div className="card col-md-4">
            <img className="card-img-top" src="../public/icons/fifa18.jpg"></img>
            <div className="card-body">
              <h5 className="h2">{pool.poolName}</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <Link to="pool" className="btn btn-primary" style={{marginBottom:"16px"}} onClick={()=>this.props.joinPool(this.props.username,pool.poolName)}>Join pool!</Link>
            </div>
          </div>
          
        ))}
      </div>
    )
  }
}