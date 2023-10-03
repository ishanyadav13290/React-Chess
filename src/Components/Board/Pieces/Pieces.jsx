import React, { useRef, useState } from 'react'
import "./Pieces.css"
import Piece from './Piece'
import { copyPosititon, createPosition } from '../../../Helper/helper'

const Pieces = () => {
    // array of 8*8 for grid system
    const [state,setState] = useState(createPosition())
    const ref = useRef()
   
    
    const calculateCoords = e => {
        const {top,left,width} = ref.current.getBoundingClientRect()
        const size = width / 8
        const y = Math.floor((e.clientX - left) / size) 
        const x = 7 - Math.floor((e.clientY - top) / size)

        return {x,y}
    }

    function drop(e){
        e.preventDefault()
        const newPosition = copyPosititon(state)
        const {x,y} = calculateCoords(e)
        const [p,rank,file] = e.dataTransfer.getData('text').split(',')

        newPosition[rank][file]=""
        newPosition[x][y]=p
        
        setState(newPosition)
    }
    function dragOver(e){
        e.preventDefault()
    }

  return (
    <div ref={ref} className='pieces' onDrop={drop} onDragOver={dragOver}>
{state.map((r,rank)=>{
    return r.map((f,file)=>{
        return state[rank][file]?<Piece key={rank+'-'+file} rank={rank} file={file} piece={state[rank][file]} />:null
    })
})}
    </div>
  )
}

export default Pieces