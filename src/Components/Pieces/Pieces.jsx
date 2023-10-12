import React, { useContext, useRef } from 'react'
import "./Pieces.css"
import Piece from './Piece'
import { Context } from '../../Context/Context'
import { clearCandidates, makeNewMove } from '../../Reducer/actions/move'
import rules from '../../rules/rules'
import { openPromotion } from '../../Reducer/actions/popup'
import { getCastleDirections } from '../../rules/getMoves'
import { detectStalemate, updateCastling,detectInsufficientMaterial } from '../../Reducer/actions/game'

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

    const openPromotionBox = ({rank,file,x,y})=>{
        dispatch(openPromotion({
            rank:Number(rank),
            file:Number(rank),
            x,
            y
        }))
    }

    const updateCastlingState =({piece,rank,file})=>{

        
        const direction = getCastleDirections({
            castleDirection:appState.castleDirection,
            piece,rank,file
        })
        if(direction){
            dispatch(updateCastling(direction))
        }
    }
    const  move = e =>{
        const {x,y} = calculateCoords(e)
        const [piece,rank,file] = e.dataTransfer.getData('text').split(',') //splitting into array to capture values
        if(appState.candidateMoves?.find(m=>m[0]===x && m[1]===y)){ //checking if its a valid move or not
            const opponent = piece.startsWith('b')?'w':'b'
            const castleDirection = appState.castleDirection[`${piece.startsWith('b')?'w':'b'}`]
            
            if((piece==='wp' && x===7) || (piece==='bp' && x===0)){
                openPromotionBox({rank,file,x,y})
                return
            }
            if(piece.endsWith('r') || piece.endsWith('k')){
                updateCastlingState({piece,rank,file})
            }
            const newPosition = rules.performMove({
                position:currentPosition,
                piece,rank,file,
                x,y
            }) //to store the newly changed positions in the array
            dispatch(makeNewMove({newPosition})) //setting position array to newly changes array to display changes, also changing turns
            if (rules.insufficientMaterial(newPosition))
                dispatch(detectInsufficientMaterial())
            else if (rules.isStalemate(newPosition,opponent,castleDirection)){
                dispatch(detectStalemate())
            }
        }
        dispatch(clearCandidates())
    }

    function drop(e){
        e.preventDefault()
        move(e)
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