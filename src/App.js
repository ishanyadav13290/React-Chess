import { useReducer } from 'react';
import './App.css';
import Board from './Components/Board/Board';
import { reducer } from './Reducer/Reducer';

function App() {

  return (
    <div className="App">
    <Board />
    </div>
  );
}

export default App;
