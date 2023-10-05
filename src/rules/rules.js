import { getRookMoves } from "./getMoves"

const rules ={
    getRegularMoves: function({position,piece,rank,file}){
        return getRookMoves({position,piece,rank,file})
    }
}

export default rules