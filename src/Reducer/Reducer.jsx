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
        default: return state
    }
}