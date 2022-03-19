import * as Actions from '../actions';

const initialBoard = [
  [["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"]],
  [["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"],["0", "white"]],
  [["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"],["0", "white"],["0", "white"]],
  [["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"],["0", "white"],["0", "white"],["0", "white"]],
  [["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"],["0", "white"],["0", "white"],["0", "white"],["0", "white"]],
  [["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"],["0", "white"],["0", "white"],["0", "white"]],
  [["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"],["0", "white"],["0", "white"]],
  [["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"]],
  [["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"], ["0", "white"]]
  
]

let initialState = {
    board: initialBoard,
    currentSide: ["fish", "selected"],
    currentSelected: ["", ""],
    outOfPlay: [],
    blockers: new Set(["4,3", "4,4"]),
    turn:0,
    player1: [],
    player2: []
    
}

function game(state=initialState, action) {
  switch (action.type) {
    case "SET_BOARD":
      return {
        ...state,
        board: action.payload.board,
      }
    case "selectedAction":
      console.log('sd')
      return {
        ...state,
        board: action.payload.newBoard,
        currentSide: action.payload.newSide,
        currentSelected:[action.payload.rowIndex,action.payload.cellIndex]

        
      };
    case "CLEAR":
      return {
        ...state,
        board: action.payload.board,
        currentSide: ["fish", "selected"],
        currentSelected: ["",""],
      };

    default:
      return state;
  }
}


export default game;