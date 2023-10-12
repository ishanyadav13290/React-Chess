import { Status } from "./AppConstants"
import actionTypes from "./actionTypes"

export const reducer = (state,action)=>{
    switch (action.type){
        case actionTypes.newMove:{
            let {turn,position} = state
            
           position= [
            ...position,
            action.payload.newPosition
           ] //to store the history of positions (maybe to later use to undo)
           turn = turn==="w"?"b":"w" //to change player turn 
           return {
                ...state,
                turn,
                position
            }
        }
        case actionTypes.generateCandidateMoves:{
            return {
                ...state,
                candidateMoves:action.payload.candidateMoves
            }
        }
        case actionTypes.clearCandidateMoves:{
            return {
                ...state,
                candidateMoves:[]
            }
        }
        case actionTypes.promotionOpen:{
            return {
                ...state,
                status:Status.promoting,
                promotionSquare:{...action.payload}
            }
        }
        case actionTypes.promotionClose:{
            return {
                ...state,
                status:Status.ongoing,
                promotionSquare:null
            }
        }
        case actionTypes.canCastle:{
            let {turn,castleDirection} = state
            castleDirection[turn] = action.payload
            return {
                ...state,
                castleDirection
            }
        }
        case actionTypes.stalemate:{
            return {
                ...state,
                status:Status.stalemate,
            }
        }
        case actionTypes.insufficientMaterial:{
            return {
                ...state,
                status:Status.insufficient
            }
        }
        case actionTypes.newGame:{
            return {
                ...action.payload
            }
        }
        
        default: return state
    }
}