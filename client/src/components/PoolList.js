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
      <div className="col-md-12">
        {this.props.pools && this.props.pools.map(pool=>(
          <div onClick={()=>this.props.joinPool(this.props.username,pool.poolName)}>
            <Link to="/pool">{pool.poolName}</Link>
          </div>
        ))}
      </div>
    )
  }
}