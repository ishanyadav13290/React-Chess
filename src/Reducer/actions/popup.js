import actionTypes from "../actionTypes"

export const openPromotion = ({rank,file,x,y})=>{
    return{
        type:actionTypes.promotionOpen,
        payload:{rank,file,x,y}
    }
}
export const closePopup = ()=>{
    return{
        type:actionTypes.promotionClose
    }
}