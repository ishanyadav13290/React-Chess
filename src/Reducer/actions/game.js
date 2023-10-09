import actionTypes from "../actionTypes"

export const updateCastling = direction =>{
    return {
        type:actionTypes.canCastle,
        payload:direction
    }
}