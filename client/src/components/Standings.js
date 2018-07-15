import React from 'react'
export const Standings = ({standings})=>(
  
  <div className="col-md-12">
    <div>FIFA STANDINGS</div>
      {standings.map(standing=>{
        return (
          <div key={standing.username}>{standing.username} : {standing.score}</div>
        )
      })}
  </div>
)