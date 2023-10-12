import { initGameState } from "../AppConstants"
import actionTypes from "../actionTypes"

export const updateCastling = direction =>{
    return {
        type:actionTypes.canCastle,
        payload:direction
    }
}
export const detectStalemate = () =>{
    return {
        type:actionTypes.stalemate,
    }
}
export const detectInsufficientMaterial = () =>{
    return {
        type:actionTypes.insufficientMaterial,
    }
}
export const setupNewGame = () =>{
    return {
        type:actionTypes.newGame,
        payload:initGameState
    }
}