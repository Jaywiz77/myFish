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

  const cellOnClick = (rowIndex, cellIndex, side) => {

    //need simplify
    if (rowIndex === currentSelected[0] && currentSelected[1] === cellIndex) {
        // clearSelectionDispatch();
      Actions.clearSelectionDispatch(board);
      // console.log(currentSelected);
    
    } else {
      Actions.selectedAction(board,currentSide[1],rowIndex, cellIndex,blockers,currentSelected);  

      // console.log(currentSelected);
    }
  } 





  //clear path selection highlight
  const clearSelectionDispatch = () => {

    dispatch({
      type: "clear"
    })
  }
  const addImage = () => {
    
  }


  // calculatePath(4, 5);

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