import React, { useContext, useRef, useState } from 'react'
import "./Pieces.css"
import Piece from './Piece'
import { copyPosition, createPosition } from '../../Helper/helper'
import { Context } from '../../Context/Context'
import { clearCandidates, makeNewMove } from '../../Reducer/actions/move'

const Pieces = () => {
    // array of 8*8 for grid system
    // const [state,setState] = useState(createPosition())
    const ref = useRef()
    const  {appState, dispatch} = useContext(Context)
   
    
    const currentPosition = appState.position[appState.position.length-1] //to give the latest last position
    const calculateCoords = e => {
        const {top,left,width} = ref.current.getBoundingClientRect()
        const size = width / 8
        const y = Math.floor((e.clientX - left) / size) 
        const x = 7 - Math.floor((e.clientY - top) / size)

        return {x,y}
    }

    function drop(e){
        e.preventDefault()
        const newPosition = copyPosition(currentPosition) //to store the newly changed positions in the array
        const {x,y} = calculateCoords(e)
        const [p,rank,file] = e.dataTransfer.getData('text').split(',') //splitting into array to capture values
        // p=piece
        if(appState.candidateMoves?.find(m=>m[0]===x && m[1]===y)){ //checking if its a valid move or not
            // for en-passant capturing empty square
            // if piece is pawn and newPos at x,y is empty and x!== rank & y!==file 
            if(p.endsWith('p') && !newPosition[x][y] && x!== rank && y!==file){
                newPosition[rank][y]=''
            }
           
            newPosition[Number(rank)][Number(file)]=""
            newPosition[x][y]=p //filling the new piece in the new area
            dispatch(makeNewMove({newPosition})) //setting position array to newly changes array to display changes, also changing turns
        }

        dispatch(clearCandidates())

        
    }
    function dragOver(e){
        e.preventDefault()
    }

  return (
    <div ref={ref} className='pieces' onDrop={drop} onDragOver={dragOver}>
{currentPosition.map((r,rank)=>{
    return r.map((f,file)=>{
        return currentPosition[rank][file]?<Piece key={rank+'-'+file} rank={rank} file={file} piece={currentPosition[rank][file]} />:null
    })
})}
    </div>
  )
}

export default Pieces