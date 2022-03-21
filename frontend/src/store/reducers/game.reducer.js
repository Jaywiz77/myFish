import { act } from 'react-dom/test-utils';
import * as Actions from '../actions';

const initialBoard = [
  [["white", "white"], ["white", "white"], ["white", "white"], ["white", "white"], ["white", "white"]],
  [["white", "white"], ["white", "white"], ["white", "white"], ["player1", "white"], ["white", "white"],["white", "white"]],
  [["white", "white"], ["white", "white"], ["white", "white"], ["player2", "white"], ["white", "white"],["white", "white"],["white", "white"]],
  [["white", "white"], ["white", "white"], ["white", "white"], ["player3", "white"], ["white", "white"],["white", "white"],["white", "white"],["white", "white"]],
  [["white", "white"], ["white", "white"], ["white", "white"], ["player4", "white"], ["white", "white"],["white", "white"],["white", "white"],["white", "white"],["white", "white"]],
  [["white", "white"], ["white", "white"], ["white", "white"], ["white", "white"], ["white", "white"],["white", "white"],["white", "white"],["white", "white"]],
  [["white", "white"], ["white", "white"], ["white", "white"], ["white", "white"], ["white", "white"],["white", "white"],["white", "white"]],
  [["white", "white"], ["white", "white"], ["white", "white"], ["white", "white"], ["white", "white"], ["white", "white"]],
  [["white", "white"], ["white", "white"], ["white", "white"], ["white", "white"], ["white", "white"]]
  
]

let initialState = {
    board: initialBoard,
    currentSide: "selected",
    currentSelected: ["", ""],
    outOfPlay: [],
    blockers: new Set([]),
  turn: 0,
    gamePhase:"setPlayerPieces",
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
        case "SET_PIECE":
      return {
        ...state,
        board: action.payload.newBoard,
        currentSelected:[action.payload.rowIndex,action.payload.cellIndex]
      }
    case "SELECTED_ACTION":
      return {
        ...state,
        board: action.payload.newBoard,
        currentSide: action.payload.highlight,  //css
        currentSelected:[action.payload.rowIndex,action.payload.cellIndex] //cell coordinate
      };
    case "SET_BLOCKER":
      return {
        ...state,
        blockers: action.payload.blockers
      }
    case "CLEAR":
      return {
        ...state,
        board: action.payload.board,
        currentSide:  "selected",
        currentSelected: ["",""],
      };
    case "CHANGE_PHASE":
      return {
        ...state,
        gamePhase:action.payload.newPhase
      }

    default:
      return state;
  }
}


export default game;