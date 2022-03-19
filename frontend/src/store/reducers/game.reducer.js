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
    blockers: new Set(["4,3","4,4"]),
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
      return {
        ...state,
        board: Actions.selectedAction(
          state.board,
          action.payload.cellToChange,
          state.currentSide[1],
        ),
        currentSide: Actions.changeSide([action.payload.rowIndex,action.payload.cellIndex],state.currentSelected),
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