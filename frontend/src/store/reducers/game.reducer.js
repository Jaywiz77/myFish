import { act } from 'react-dom/test-utils';
import * as Actions from '../actions';

const initialBoard = [
  [["white", "white",0], ["white", "white",0], ["white", "white",0], ["white", "white",0], ["white", "white",0]],
  [["white", "white",0], ["white", "white",0], ["white", "white",0], ["player1", "white",0], ["white", "white",0],["white", "white",0]],
  [["white", "white",0], ["white", "white",0], ["white", "white",0], ["player2", "white",0], ["white", "white",0],["white", "white",0],["white", "white",0]],
  [["white", "white",0], ["white", "white",0], ["white", "white",0], ["player3", "white",0], ["white", "white",0],["white", "white",0],["white", "white",0],["white", "white",0]],
  [["white", "white",0], ["white", "white",0], ["white", "white",0], ["player4", "white",0], ["white", "white",0],["white", "white",0],["white", "white",0],["white", "white",0],["white", "white",0]],
  [["white", "white",0], ["white", "white",0], ["white", "white",0], ["white", "white",0], ["white", "white",0],["white", "white",0],["white", "white",0],["white", "white",0]],
  [["white", "white",0], ["white", "white",0], ["white", "white",0], ["white", "white",0], ["white", "white",0],["white", "white",0],["white", "white",0]],
  [["white", "white",0], ["white", "white",0], ["white", "white",0], ["white", "white",0], ["white", "white",0], ["white", "white",0]],
  [["white", "white",0], ["white", "white",0], ["white", "white",0], ["white", "white",0], ["white", "white",0]]
  
]

let initialState = {
    board: initialBoard,
    currentSide: "selected",
    currentSelected: ["", ""],
    outOfPlay: [],
    blockers: [],
    turn: 0,
    gamePhase: "setPlayerPieces",
    playerInfo:[], //[player,[pieces],points] [["player1",[],0,"id1","name1"],["player2",[],0,"id2","name2"],["player3",[],0,"id3","name3"],["player4",[],0,"id4","name4"]]
    highlightedPath:[],
    host: null
    
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
        currentSelected: [action.payload.rowIndex, action.payload.cellIndex],
        blockers: action.payload.blockers,
        playerPieces: action.payload.playerPieces,
        playerInfo:action.payload.playerInfo,
        turn: state.turn += 1
      }
    case "MOVE_PIECE":
      return {
        ...state,
        board: action.payload.newBoard,
        currentSelected: ["", ""],
        gamePhase: action.payload.nextPhase,
        blockers: action.payload.blockers,
        highlightedPath: [],
        playerPieces: action.payload.newPlayerPieces,
        turn:state.turn+=1
      }
    case "SELECTED_ACTION":
      return {
        ...state,
        board: action.payload.newBoard,
        currentSide: action.payload.highlight,  //css
        currentSelected: [action.payload.rowIndex, action.payload.cellIndex], //cell coordinate
        gamePhase: action.payload.nextPhase,
        highlightedPath:action.payload.cellToChange
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
        currentSelected: ["", ""],
        gamePhase: action.payload.nextPhase
      };
    case "CHANGE_PHASE":
      return {
        ...state,
        gamePhase:action.payload.newPhase
      }
    case "SKIP_TURN":
      return {
        ...state,
        turn: state.turn += 1
      }
    case "ADD_PLAYER":
      return {
        ...state,
        playerInfo: action.payload.playerInfo,
        host:state.host || action.payload.playerInfo[0][3]
      }
    case "SET_HOST":
      return {
        ...state,
        host:action.payload.host
      }
    case Actions.SYNC_STATE:
        return { ...action.game };
    default:
      return state;
  }
}


export default game;