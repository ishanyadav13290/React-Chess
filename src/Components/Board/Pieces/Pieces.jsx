import React from 'react'
import "./Pieces.css"
import Piece from './Piece'

const Pieces = () => {
    // array of 8*8 for grid system
    const position = new Array(8).fill("").map(x=>new Array(8).fill(''))
    position[0][0] = 'whiteRook'
    position[0][1] = 'whiteHorse'
    position[0][2] = 'whiteBishop'
    position[0][3] = 'whiteQueen'
    position[0][4] = 'whiteKing'
    position[0][5] = 'whiteBishop'
    position[0][6] = 'whiteHorse'
    position[0][7] = 'whiteRook'

    position[7][0] = 'blackRook'
    position[7][1] = 'blackHorse'
    position[7][2] = 'blackBishop'
    position[7][3] = 'blackQueen'
    position[7][4] = 'blackKing'
    position[7][5] = 'blackBishop'
    position[7][6] = 'blackHorse'
    position[7][7] = 'blackRook'
    for (let i = 0; i < 8; i++) {
        position[1][i] = "whitePawn";
        position[6][i] = "blackPawn"
    }
    

  return (
    <div className='pieces'>
{position.map((r,rank)=>{
    return r.map((f,file)=>{
        return position[rank][file]?<Piece key={rank+'-'+file} rank={rank} file={file} piece={position[rank][file]} />:null
    })
})}
    </div>
  )
}

export default Pieces