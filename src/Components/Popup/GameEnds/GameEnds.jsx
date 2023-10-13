import React, { useContext } from 'react'
import { Context } from '../../../Context/Context'
import { Status } from '../../../Reducer/AppConstants'
import { setupNewGame } from '../../../Reducer/actions/game'
import "./GameEnds.css"

const GameEnds = () => {
    const {appState:{status},dispatch} = useContext(Context)

    if(status===Status.ongoing || status === Status.promoting){
        return null
    }

    const isWin = status.endsWith('wins')
     const newGame = ()=>{
        dispatch(setupNewGame())
     }
  return (
   <div className={"popupInner popupInnerCenter"}>
    <h1>{isWin ? status : 'Draw'}</h1>
    <p>{!isWin && status}</p>
    <div className={`${status}`}></div>
    <button onClick={newGame}>New Game</button>
   </div>
  )
}

export default GameEnds