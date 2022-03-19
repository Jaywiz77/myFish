import React,{useEffect} from "react";
import "../styles.css";
import { Hex } from "./hex"
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions"
const r = 100;
const rowsLengthList = [5, 6, 7, 8, 9, 8, 7, 6, 5];
const height = rowsLengthList.length - 1;



function Board(){
  const dispatch = useDispatch();
  // dispatch(Actions.createBoard());
  useEffect(() => {
     dispatch(Actions.createBoard());
  }, []);



  const board = useSelector((state) => state.game.board);
  

  const currentSelected = useSelector((state) => state.game.currentSelected);
  const blockers = useSelector((state) => state.game.blockers);

  const cellOnClick = (rowIndex, cellIndex, side) => {

    //need simplify
    if (rowIndex === currentSelected[0] && currentSelected[1] === cellIndex) {
        // clearSelectionDispatch();
      dispatch(Actions.clearSelectionDispatch(board));
      // console.log(currentSelected);
    
    } else {
      calculatePath(rowIndex, cellIndex);

      // console.log(currentSelected);
    }
  } 
  const doNothing = () => {
    return ""
  }

  const checkBlocker = (cell,pathOpen) => {
    // console.log(String(cell));
    // console.log(String(blockers).includes("4,3"));
    if (pathOpen) {

      if (blockers.has(String(cell)) === true) {
      return false
    }
    return true
    }
    return false

  }

  const calculatePath = (rowIndex, cellIndex) => {
    let cellToChange = [];
    let middle = Math.floor(height / 2);

    let topLeftAdjustmentValue = 0;
    let topRightAdjustmentValue = 0;
    let botRightAdjustmentValue = 0;
    let botLeftAdjustmentValue = 0;

    let topLeftCont = true;
    let topRightCont = true;
    let botLeftCont = true;
    let botRightCont = true;
    let leftCont = true;
    let rightCont = true;
    for (let i = 0; i <= 8; i++){
      // can maybe add if all the cont conditions are true
      // need refactoring, simplify
      // top 
      let rowUp = rowIndex - i;
      if (rowUp >= 0) {

        //top left
        (rowUp < middle & rowUp !== rowIndex) ? topLeftAdjustmentValue += 1 : doNothing();
        let topLeftIndex = cellIndex - topLeftAdjustmentValue;
        topLeftCont = checkBlocker([rowUp, topLeftIndex],topLeftCont);
        topLeftCont && topLeftIndex >= 0 ? cellToChange.push([rowUp, cellIndex - topLeftAdjustmentValue]) : doNothing();


        //top right
        (rowUp >= middle & rowUp !== rowIndex) ? topRightAdjustmentValue += 1 : doNothing();
        let topRightIndex = cellIndex + topRightAdjustmentValue;
        topRightCont = checkBlocker([rowUp, topRightIndex],topRightCont);
        topRightCont && topRightIndex < rowsLengthList[rowUp] ? cellToChange.push([rowUp, topRightIndex]) : doNothing();

      }

      // bot 
      let rowDown = rowIndex + i;
      if (rowDown <= height) {
        // bot right

        (rowDown <= middle & rowDown !== rowIndex) ? botRightAdjustmentValue += 1 : doNothing();
        let botRightIndex = cellIndex + botRightAdjustmentValue;
        botRightCont = checkBlocker([rowDown, botRightIndex],botRightCont);
        botRightCont && botRightIndex < rowsLengthList[rowDown] ? cellToChange.push([rowDown, botRightIndex]) : doNothing();


        // bot left

        (rowDown > middle & rowDown !== rowIndex) ? botLeftAdjustmentValue += 1 : doNothing();
        let botLeftIndex = cellIndex - botLeftAdjustmentValue;
        botLeftCont = checkBlocker([rowDown, botLeftIndex],botLeftCont);
        botLeftCont && botLeftIndex >= 0 ? cellToChange.push([rowDown, botLeftIndex]) : doNothing();
        



      }
      
      //left
      let leftIndex = cellIndex - i;
      leftCont = checkBlocker([rowIndex, leftIndex],leftCont);
      leftCont &&leftIndex >= 0 ? cellToChange.push([rowIndex, leftIndex]) : doNothing();
      

      

      //right
      let rightIndex = cellIndex + i;
      rightCont = checkBlocker([rowIndex, rightIndex], rightCont);
      rightCont && rightIndex < rowsLengthList[rowIndex] ? cellToChange.push([rowIndex, rightIndex]) : doNothing();
      

    }
    // console.log(cellToChange);

        dispatch({
      type: "selectedAction",
      payload: { cellToChange,rowIndex,cellIndex },
    })
    
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