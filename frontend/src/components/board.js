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

  const cellOnClick = (rowIndex, cellIndex, side) => {
    console.log(board);
    if (gamePhase === "setPlayerPieces") {
      dispatch(Actions.addPlayerPiece(board, "player1", rowIndex, cellIndex));
      dispatch(Actions.addBlockers(blockers, rowIndex, cellIndex));
      //asd
      // console.log("set");
    }

    //need simplify
    else if (rowIndex === currentSelected[0] && currentSelected[1] === cellIndex) {
        // clearSelectionDispatch();
      Actions.clearSelectionDispatch(board);
      // console.log("elseuf");
    
    } else {

      Actions.selectedAction(board,currentSide,rowIndex, cellIndex,blockers,currentSelected);  
      // console.log("else");

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
              {row.map((side, cellIndex) => (
                <Hex
                  id={`${rowIndex},${cellIndex}`}
                  side={side[0]}
                  color={side[1]}
                  test="23"
                  key={`${rowIndex},${cellIndex}`}
                  style={{ height: `${r}px`, width: `${r}px` }}
                  onClick={ ()=> cellOnClick(rowIndex,cellIndex,side)}
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