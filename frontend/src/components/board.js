import React,{useEffect} from "react";
import "../styles.css";
import { Hex } from "./hex"
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions"
const r = 100;
const isArrayInArray = (arr, item) => {
  var item_as_string = JSON.stringify(item);

  var contains = arr.some(function(ele){
    return JSON.stringify(ele) === item_as_string;
  });
  return contains;
}

function Board(){

  // dispatch(Actions.createBoard());
  useEffect(() => {
     Actions.createBoard();
  }, []);
  const board = useSelector((state) => state.game.board);
  

  const currentSelected = useSelector((state) => state.game.currentSelected);
  const blockers = useSelector((state) => state.game.blockers);
  const currentSide = useSelector((state) => state.game.currentSide);
  const gamePhase = useSelector((state) => state.game.gamePhase);
  const highlighted = useSelector((state) => state.game.highlightedPath);
  const playerInfo = useSelector((state) => state.game.playerInfo);
  const turnNumber = useSelector((state) => state.game.turn);
  // const id = useSelector((state) => state.game.SETUP_ID);

  const cellOnClick = (rowIndex, cellIndex, points) => {

    const playerTurn = turnNumber % playerInfo.length;
    // console.log(playerInfo);
    if (gamePhase === "setPlayerPieces" && isArrayInArray(blockers,`${rowIndex},${cellIndex}`) === false) { //set player pieces 

      Actions.addPlayerPiece(board, rowIndex, cellIndex, blockers, playerInfo, playerTurn, points);

    } else if (gamePhase === "selectPiecePhase") { //select pieces to move
      if (isArrayInArray(playerInfo[playerTurn][1],`${rowIndex},${cellIndex}`)) {
      

        if (rowIndex === currentSelected[0] && currentSelected[1] === cellIndex) {
          Actions.clearSelectionDispatch(board);
        
        } else {

          Actions.selectedAction(board, currentSide, rowIndex, cellIndex, blockers, currentSelected);

        }
      }
      
    } else if (gamePhase === "movePiecePhase") { //move selected pieces
      console.log('==========')
      if (rowIndex === currentSelected[0] && currentSelected[1] === cellIndex) {
          // clearSelectionDispatch();
          Actions.clearSelectionDispatch(board);
        
        } else if (currentSelected[0] !== "" && isArrayInArray(highlighted,[rowIndex,cellIndex])) {
          // console.log(currentSelected);
          Actions.movePlayerPiece(board,currentSelected, rowIndex, cellIndex,blockers,playerInfo,playerTurn,points);
      } else if (isArrayInArray(playerInfo[playerTurn][1], `${rowIndex},${cellIndex}`)) {
        console.log('----')
          Actions.selectedAction(board, currentSide, rowIndex, cellIndex, blockers, currentSelected);
        }

      
      }
    
      
    
    
  } 


  return (
    <div className="App" style={{ width: "1000px", marginTop: "35px" }}>

      <div>
        {board.map((row, rowIndex) => {
          return (
            <div
              style={{
                marginTop: "-14px",
                display: "flex",
                justifyContent: "center"
              }}
            >
              {row.map((cell, cellIndex) => (
                <Hex
                  id={`${rowIndex},${cellIndex}`}
                  side={cell[0]}
                  color={cell[1]}
                  test="23"
                  key={`${rowIndex},${cellIndex}`}
                  style={{ height: `${r}px`, width: `${r}px` }}
                  onClick={ ()=> cellOnClick(rowIndex,cellIndex,cell[2])}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Board;