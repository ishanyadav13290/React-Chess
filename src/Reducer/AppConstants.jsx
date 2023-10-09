import { createPosition } from "../Helper/helper";

export const Status={
    'ongoing':"Ongoing",
    'promoting':"Promoting",
    'white':'White wins',
    'black':'Black wins'

}
export const initGameState={
    position:[createPosition()],
    turn:"w",
    candidateMoves:[],
    status:Status.ongoing,
    promotionSquare:null,
    castleDirection:{
        w:'both',
        b:'both'
    }
}