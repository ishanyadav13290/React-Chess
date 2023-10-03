import React from 'react'
import "./Pieces.css"
const Piece = ({rank,file,piece}) => {
  function dragStart(e){
    e.dataTransfer.effectAllowed = "move"; //removes plus icon on dragging
    e.dataTransfer.setData("text/plain",`${piece},${rank},${file}`) //sending piece, rank and file data using inbuild dataTransfer Props
    setTimeout(() => {
      e.target.style.display = 'none'
  },0)
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