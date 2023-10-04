import actionTypes from "../actionTypes"

export const makeNewMove =({newPosition})=>{
    return {
        type : actionTypes.newMove,
        payload:{newPosition}
    }
}