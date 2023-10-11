import React, { useContext } from 'react'
import { getCharacter } from '../../Features/Features'
import "./Board.css"
import { Files, Ranks } from './Coordinates/Coordinates'
import Pieces from '../Pieces/Pieces'
import { Context } from '../../Context/Context'
import Popup from '../Popup/Popup'
import rules from '../../rules/rules'
import { getKingPosition } from '../../rules/getMoves'
import { PromotionBox } from '../Popup/PromotionBox/PromotionBox'
import GameEnds from '../Popup/GameEnds/GameEnds'

const Board = () => {
    const ranks = Array(8).fill().map((x,i)=>8-i)
    const files = Array(8).fill().map((x,i)=>getCharacter(i+1))

    const {appState} = useContext(Context)
    const position = appState.position[appState.position.length-1]

    const isChecked = (()=>{
    const isInCheck=  rules.isPlayerInCheck({
        positionAfterMove:position,
        player:appState.turn
      })
      if(isInCheck){
        return getKingPosition(position,appState.turn)
      }
      return null
    })() //to run only once
    const getClassName = (i,j) => {
      let c='tile'
        c+= (i+j)%2 ===0?'Dark':'Light'
      if (appState.candidateMoves?.find(m => m[0] === i && m[1] === j)){
          if (position[i][j])
              c+= ' attacking'
          else 
              c+= ' highlight'
      }

      if(isChecked && isChecked[0]===i && isChecked[1]===j){
        c+= ' checked'
      }

      return c
  }
  return (
    <div className={"board"}>
    <Ranks ranks={ranks} />
        <div className="tiles">
            {ranks.map((rank,i)=>
               files.map((file,j)=>{
                        return <div className={getClassName(7-i,j)+" tile"} key={file+"-"+rank}><span className='coordinate'>{rank}{file}</span></div>
                })
            )}
        </div>
        <Pieces />

        <Popup >
          <PromotionBox />
          <GameEnds />
        </Popup>
    <Files files={files} />
    </div>
  )
}

export default Board