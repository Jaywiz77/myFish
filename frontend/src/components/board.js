import React,{useEffect} from "react";
import "../styles.css";
import { Hex } from "./hex"
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions"
const r = 100;


function Board(){
  const dispatch = useDispatch();
  // dispatch(Actions.createBoard());
  useEffect(() => {
     Actions.createBoard();
  }, []);
  const board = useSelector((state) => state.game.board);
  

  const currentSelected = useSelector((state) => state.game.currentSelected);
  const blockers = useSelector((state) => state.game.blockers);
  const currentSide = useSelector((state) => state.game.currentSide);
  const gamePhase = useSelector((state) => state.game.gamePhase);

  const cellOnClick = (rowIndex, cellIndex, cell) => {
    console.log("current", gamePhase);
    
    
      
    
    if (gamePhase === "setPlayerPieces") {
      Actions.addPlayerPiece(board, "player1", rowIndex, cellIndex,blockers);
      // dispatch(Actions.addBlockers(blockers, rowIndex, cellIndex));
      //asd
      console.log("setplayer");
    } else if (gamePhase === "selectPiecePhase") {
      console.log("setpiece")
      if (new Set(blockers).has(`${rowIndex},${cellIndex}`)) {
      
        //need simplify
        if (rowIndex === currentSelected[0] && currentSelected[1] === cellIndex) {
          // clearSelectionDispatch();
          Actions.clearSelectionDispatch(board);
          // console.log("elseuf");
        
        } else {

          Actions.selectedAction(board, currentSide, rowIndex, cellIndex, blockers, currentSelected);
          // console.log("else");

        }
      }
      
    } else if (gamePhase === "movePiecePhase") {
        console.log("movee")
        if (currentSelected[0] !== "") {
          console.log(currentSelected);
          Actions.movePlayerPiece(board, "player1",currentSelected, rowIndex, cellIndex,blockers);
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
                  onClick={ ()=> cellOnClick(rowIndex,cellIndex,cell)}
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