import React from 'react'
import { getCharacter } from '../../Features/Features'
import "./Board.css"
import { Files, Ranks } from './Coordinates/Coordinates'

const Board = () => {
    const ranks = Array(8).fill().map((x,i)=>8-i)
    const files = Array(8).fill().map((x,i)=>getCharacter(i))

    function getClassName(i,j){
        let c='tile'
        c+= (i+j)%2 ===0?'Light':'Dark'
        return c
    }
  return (
    <div className={"board"}>
    <Ranks ranks={ranks} />
        <div className="tiles">
            {ranks.map((rank,i)=>
               files.map((file,j)=>{
                        return <div className={getClassName(i,j)+" tile"} key={file+"-"+rank}><span className='coordinate'>{rank}{file}</span></div>
                })
            )}
        </div>
    <Files files={files} />
    </div>
  )
}

export default Board