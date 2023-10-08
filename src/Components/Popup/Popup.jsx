import React, { useContext } from 'react'
import { PromotionBox } from './PromotionBox/PromotionBox'
import "./popup.css"
import { Context } from '../../Context/Context'
import { Status } from '../../Reducer/AppConstants'
import { closePopup } from '../../Reducer/actions/popup'
const Popup = () => {

    const {appState,dispatch} = useContext(Context)

    if(appState.status===Status.ongoing){
        return null
    }

    const onClosePopup=()=>{
      dispatch(closePopup())
    }
  return (
    <div className='popup'>
        <PromotionBox onClosePopup={onClosePopup} />
    </div>
  )
}

export default Popup