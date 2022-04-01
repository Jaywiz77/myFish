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
    gamePhase: "waitingPhase",
    playerInfo:[], //[player,[pieces],points,id,name]
    highlightedPath:[],
    host: null,
    startBtn: false,
    playerWithoutMove: [],
    radius:100,
    
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
        playerInfo:action.payload.playerInfo,
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
        gamePhase: action.payload.newPhase,
        startBtn:true
      }
    case "SKIP_TURN":
      return {
        ...state,
        turn: state.turn += 1
      }
    case "ADD_PLAYER":
      return {
        ...state,
        playerInfo: [...state.playerInfo, action.payload.player],
        host:state.host || action.payload.player[3]
      }
    case Actions.SETUP_ID:
      return {
        ...state,
        host: state.host || action.id
      }
    case Actions.SYNC_STATE:
        return { ...action.game };
    case Actions.PLAYER_LEFT:
      console.log(state.playerInfo);
      return {
        ...state,
        playerInfo: state.playerInfo.filter(function (e) { return e[3] !== action.id })
      }
    case "DISABLE_STARTBTN":
      return {
        ...state,
        startBtn:true
      }
    case "ADD_PLAYERWITHOUTMOVE":
      return {
        ...state,
        playerWithoutMove:[...state.playerWithoutMove,action.payload.player]
      }
    case "SET_NEW_GAME":
      return {
        ...state,
        board: action.payload.board,
        currentSide: "selected",
        currentSelected: ["", ""],
        gamePhase: action.payload.newPhase,
        outOfPlay: [],
        blockers: [],
        turn: 0,
        playerInfo:action.payload.newPlayerInfo,
        highlightedPath:[],
        playerWithoutMove:[]

      }
    default:
      return state;
  }
}


export default game;