import React from 'react'
export const Standings = ({standings})=>(
  
  <div className="col-md-12">
    <div>FIFA STANDINGS</div>
      {/* <button onClick={handleClick()}>Click Me</button> */}
      {standings.map(standing=>{
        return (
          <div key={standing.username}>{standing.username} : {standing.score}</div>
        )
      })}
  </div>
)