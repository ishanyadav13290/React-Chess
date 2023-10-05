import React, { useContext } from 'react'
import "./Pieces.css"
import { Context } from '../../Context/Context';
import rules from '../../rules/rules';
import { generateCandidateMoves } from '../../Reducer/actions/move';
const Piece = ({rank,file,piece}) => {

  const {appState, dispatch} = useContext(Context)
  const {turn,position} = appState;
  const currentPosition = position[position.length-1]

  
  function dragStart(e){
    e.dataTransfer.effectAllowed = "move"; //removes plus icon on dragging
    e.dataTransfer.setData("text/plain",`${piece},${rank},${file}`) //sending piece, rank and file data using inbuild dataTransfer Props
    setTimeout(() => {
      e.target.style.display = 'none'
  },0)

  if(turn===piece[0]){
    const candidateMoves = rules.getRegularMoves({position:currentPosition,piece,rank,file})
    dispatch(generateCandidateMoves({candidateMoves})) //write candidate moves in reducer so boards can use
  }
  }

  function dragEnd(e){
    //to display piece again in case dropped outside
    e.target.style.display="block"
  }
  return (
    <div onDragEnd={dragEnd} className={`piece ${piece} p-${file}${rank}`} draggable onDragStart={dragStart}></div>
  )
}

export default Piece