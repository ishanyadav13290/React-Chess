import actionTypes from "../actionTypes"

export const makeNewMove =({newPosition})=>{
    return {
        type : actionTypes.newMove,
        payload:{newPosition}
    }
}
export const generateCandidateMoves =({candidateMoves})=>{
    return {
        type : actionTypes.generateCandidateMoves,
        payload:{candidateMoves}
    }
}
export const clearCandidates =()=>{
    return {
        type : actionTypes.clearCandidateMoves,
    }
}