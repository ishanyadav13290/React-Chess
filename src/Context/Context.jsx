import { createContext, useReducer } from "react";
import { reducer } from "../Reducer/Reducer";
import { initGameState } from "../Reducer/AppConstants";

export const Context = createContext();

export default function ContextProvider({ children }) {

    const [appState,dispatch]=useReducer(reducer,initGameState)

    

  let value = {
    appState,
    dispatch
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}
