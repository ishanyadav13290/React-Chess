import actionTypes from "./actionTypes"

export const reducer = (state,action)=>{
    switch (action.type){
        case actionTypes.newMove:{
            let {turn,position} = state
            turn = turn==="w"?"b":"w" //to change player turn
           position= [
            ...position,
            action.payload.newPosition
           ] //to store the history of positions (maybe to later use to undo)
            return {
                ...state,
                turn,
                position
            }
        }
        default: return state
    }
}