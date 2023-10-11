import { initGameState } from "../AppConstants"
import actionTypes from "../actionTypes"

export const updateCastling = direction =>{
    return {
        type:actionTypes.canCastle,
        payload:direction
    }
}
export const detectStalemate = direction =>{
    return {
        type:actionTypes.stalemate,
    }
}
export const setupNewGame = direction =>{
    return {
        type:actionTypes.newGame,
        payload:initGameState
    }
}