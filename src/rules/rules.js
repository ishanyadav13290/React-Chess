import { getKnightMoves, getRookMoves } from "./getMoves"

const rules ={

    getRegularMoves: function({position,piece,rank,file}){
        if(piece.endsWith('n'))return getKnightMoves({position,rank,file})
        if(piece.endsWith('r')) return getRookMoves({position,piece,rank,file})
    }

}

export default rules