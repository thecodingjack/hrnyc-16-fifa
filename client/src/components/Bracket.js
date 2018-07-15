import React from 'react';
export const Bracket = ()=>(
  <div className='col-md-12'>
    <h1>FIFA WORLD CUP 2018</h1>
    <main id="tournament">
      <ul className="round round-1">
        <li className="spacer">&nbsp;</li>
        
        <li className="game game-top">Uruguay <span>0</span></li>
        <li className="game game-spacer">&nbsp;</li>
        <li className="game game-bottom winner">France <span>2</span></li>

        <li className="spacer">&nbsp;</li>
        
        <li className="game game-top">Brazil <span>1</span></li>
        <li className="game game-spacer">&nbsp;</li>
        <li className="game game-bottom winner">Belgium <span>2</span></li>

        <li className="spacer">&nbsp;</li>
        
        <li className="game game-top">Russia<span>2 (3)</span></li>
        <li className="game game-spacer">&nbsp;</li>
        <li className="game game-bottom winner">Croatia <span>2 (4)</span></li>

        <li className="spacer">&nbsp;</li>
        
        <li className="game game-top">Sweden <span>0</span></li>
        <li className="game game-spacer">&nbsp;</li>
        <li className="game game-bottom winner">England<span>2</span></li>

        <li className="spacer">&nbsp;</li>
      </ul>
      <ul className="round round-2">
        <li className="spacer">&nbsp;</li>
        
        <li className="game game-top winner">France <span>1</span></li>
        <li className="game game-spacer">&nbsp;</li>
        <li className="game game-bottom ">Belgium <span>0</span></li>

        <li className="spacer">&nbsp;</li>
        
        <li className="game game-top winner">Crotia <span>2</span></li>
        <li className="game game-spacer">&nbsp;</li>
        <li className="game game-bottom ">England <span>1</span></li>

        <li className="spacer">&nbsp;</li>
        
      </ul>
      <ul className="round round-3">
        <li className="spacer">&nbsp;</li>
        
        <li className="game game-top">France <span>4</span></li>
        <li className="game game-spacer">&nbsp;</li>
        <li className="game game-bottom ">Croatia <span>2</span></li>

        <li className="spacer">&nbsp;</li>

      </ul>
      <ul className="round round-4">
        <li className="spacer">&nbsp;</li>
        <li className="game game-top winner">France</li>
        <li className="spacer">&nbsp;</li>
      </ul>		
    </main>
  </div>
)