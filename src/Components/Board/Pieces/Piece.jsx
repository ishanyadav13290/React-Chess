import React from 'react'
import "./Pieces.css"
const Piece = ({rank,file,piece}) => {
  function dragStart(e){
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain",`${piece},${rank},${file}`)
    setTimeout(() => {
      e.target.style.display = 'none'
  },0)
  }

  function dragEnd(e){
    e.target.style.display="block"
  }
  return (
    <div onDragEnd={dragEnd} className={`piece ${piece} p-${file}${rank}`} draggable onDragStart={dragStart}></div>
  )
}

export default Piece