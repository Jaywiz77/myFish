import React from "react";
import "../styles.css";
import {Hex} from "./hex"

const r = 100;
const rowsLengthList = [5, 6, 7, 8, 9, 8, 7, 6, 5];
const height = rowsLengthList.length - 1;
const boardItems = ["fish", "fish2", "fish3", "empty"];
// const length = [5, 6, 7, 8, 9, 8, 7, 6, 5];
function createBoard() {

  let board = rowsLengthList.map(length => new Array(length).fill().map(
    () => [boardItems[Math.floor(Math.random() * boardItems.length)],"white"])
  )

  return board
}

function clearSelection(board) {

  board.map(arrs => {
    arrs.forEach((part, index, arr) => {
      arr[index][1] = "white";
    });
  })
  return board
}




// function put(board, rowIndex, cellIndex, side) {
//   const newBoard = board.map(row => [...row]);
//   newBoard[rowIndex][cellIndex] = side;
//   return newBoard;
// }

function selectedAction(board, cellToChange, side) { //side = highlighted or not

  const newBoard = clearSelection(board);
  cellToChange.map(arr => {
    //arr sample = [rowIndex,cellIndex]
    newBoard[arr[0]][arr[1]][1] = side;
  })


  
  return newBoard;
}

  const changeSide = (side,currentSelected) =>{
    if (side[0] === currentSelected[0] && currentSelected[1] === side[1]) {
      return ["", "white"]
    } else {
      return  ["","selected"]
    }
  }


function reducer(state, action) {
  switch (action.type) {
    case "selectedAction":
      return {
        ...state,
        board: selectedAction(
          state.board,
          action.payload.cellToChange,
          state.currentSide[1],
        ),
        currentSide: changeSide([action.payload.rowIndex,action.payload.cellIndex],state.currentSelected),
        currentSelected:[action.payload.rowIndex,action.payload.cellIndex]

        
      };
    case "clear":
      return {
        ...state,
        board: clearSelection(state.board),
        currentSide: ["fish", "selected"],
        currentSelected:"",
      }
    default:
      return state;
  }
}



export default function Board() {
  const [state, dispatch] = React.useReducer(reducer, {
    board: createBoard(),
    currentSide: ["fish", "selected"],
    currentSelected: ""
  });
  console.log(state.board);
  //onClick functions
  const cellOnClick = (rowIndex, cellIndex, side) => {
    // console.log("selected", [rowIndex,cellIndex]);
    // console.log("currentSelected", state.currentSelected);
    // console.log();

    //need simplify
    if (rowIndex === state.currentSelected[0] && state.currentSelected[1] === cellIndex ) {
      clearSelectionDispatch();
    } else {
      calculatePath(rowIndex, cellIndex);
    }
  } 


  //callculate path to highlight
  const calculatePath = (rowIndex, cellIndex) => {
    let cellToChange = [];

  
    let middle = Math.floor(height / 2);
    let adjustmentValue = 0;
    let rightAdjustmentValue = 0;
    let leftAdjustmentValue = 0;
    // let check =  Math.abs(middle - rowIndex)  ;
    rowIndex > middle ? rightAdjustmentValue = rowIndex - middle : rightAdjustmentValue = 0;
    for (let i = 0; i <= height; i++){
      
      // for top bot right side
      // need simplyfy
      if (rowIndex < middle && i > rowIndex && i <= middle) {
        adjustmentValue += 1;
        
      } 
      if (rowIndex > middle && i <= rowIndex && i > middle) {
        rightAdjustmentValue -= 1;
      } 

      // for top bot left
      if (i <= rowIndex) {
        leftAdjustmentValue = Math.abs(rowIndex - i);
      } else if (i > middle) {
        leftAdjustmentValue += 1;
      }

      // for left right
       rowsLengthList[rowIndex] > i ?  cellToChange.push([rowIndex, i]) : console.log("") ;
      // cellToChange.push([rowIndex,i]);

      // if (i === rowIndex) {
      //   for (let j = 0; j < rowsLengthList[i]; j++){
      //     if (j !== cellIndex) {
      //       cellToChange.push([i, j]);
      //     }
      //   }
      // }
    
    
    let tempCellValue = 0;
    let tempCellValue2 = 0;

    rightAdjustmentValue > 0 ? tempCellValue = cellIndex + adjustmentValue + rightAdjustmentValue : tempCellValue = cellIndex + adjustmentValue;
    tempCellValue2 = cellIndex - leftAdjustmentValue;

    rightAdjustmentValue > 0 ? tempCellValue2 = cellIndex - leftAdjustmentValue + rightAdjustmentValue : tempCellValue2 = cellIndex - leftAdjustmentValue;

    tempCellValue2 >= 0 ? cellToChange.push([i, tempCellValue2 ]) : console.log("");
    tempCellValue < rowsLengthList[i] ? cellToChange.push([i, tempCellValue]) : console.log("");    
    
    }


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
      {/* <button onClick={calculatePath(4,4)}>sasd</button> */}
      <div>
        {state.board.map((row, rowIndex) => {
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
