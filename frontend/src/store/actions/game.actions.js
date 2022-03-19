
const boardItems = ["fish", "fish2", "fish3"];
const rowsLengthList = [5, 6, 7, 8, 9, 8, 7, 6, 5];
const height = rowsLengthList.length - 1;
export const createBoard = () => {



  const board = rowsLengthList.map(length => new Array(length).fill().map(
    () => [boardItems[Math.floor(Math.random() * boardItems.length)], "white"])
  )
  return {
      type: "SET_BOARD",
      payload:{board}
      }
}
const changeHighlight = (selectedCell, currentSelected) => {
  if (selectedCell[0] === currentSelected[0] && currentSelected[1] === selectedCell[1]) {
      return ["", "white"]
  } else {
      return  ["","selected"]
  }
}


export const addPlayerPiece = (board,player,rowIndex,cellIndex) => {

  const newBoard = board;
  newBoard[rowIndex][cellIndex][0] = player;
  
  return {
    type: "SET_PIECE",
    payload:{newBoard,rowIndex,cellIndex}
  }
  
}


export const selectedAction = (board, side, rowIndex, cellIndex,blockers, currentSelected) => { //side = highlighted or not
  
  //calculate the path
  const cellToChange = calculatePath(rowIndex,cellIndex,blockers)
  const highlight = changeHighlight([rowIndex, cellIndex], currentSelected);
  const newBoard = clearSelection(board);
  cellToChange.map(arr => {
    //arr sample = [rowIndex,cellIndex]
    newBoard[arr[0]][arr[1]][1] = side;
  })
  return {
    type: "SELECTED_ACTION",
    payload: { newBoard, highlight, rowIndex, cellIndex }
  };
}


export function clearSelection(board) {

  board.map(arrs => {
    arrs.forEach((part, index, arr) => {
      arr[index][1] = "white";
    });
  })

  return board
}


export function clearSelectionDispatch(board) {

  board = clearSelection(board);
  return {
    type: "CLEAR",
    payload:{board}
  }
}





const checkBlocker = (cell,pathOpen,blockers) => {

  if (pathOpen) {

    if (blockers.has(String(cell)) === true) {
    return false
  }
    return true
  }
  return false


  
}
  const doNothing = () => {
    return ""
  }
const calculatePath = (rowIndex, cellIndex,blockers) => {
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
        topLeftCont = checkBlocker([rowUp, topLeftIndex],topLeftCont,blockers);
        topLeftCont && topLeftIndex >= 0 ? cellToChange.push([rowUp, cellIndex - topLeftAdjustmentValue]) : doNothing();


        //top right
        (rowUp >= middle & rowUp !== rowIndex) ? topRightAdjustmentValue += 1 : doNothing();
        let topRightIndex = cellIndex + topRightAdjustmentValue;
        topRightCont = checkBlocker([rowUp, topRightIndex],topRightCont,blockers);
        topRightCont && topRightIndex < rowsLengthList[rowUp] ? cellToChange.push([rowUp, topRightIndex]) : doNothing();

      }

      // bot 
      let rowDown = rowIndex + i;
      if (rowDown <= height) {
        // bot right

        (rowDown <= middle & rowDown !== rowIndex) ? botRightAdjustmentValue += 1 : doNothing();
        let botRightIndex = cellIndex + botRightAdjustmentValue;
        botRightCont = checkBlocker([rowDown, botRightIndex],botRightCont,blockers);
        botRightCont && botRightIndex < rowsLengthList[rowDown] ? cellToChange.push([rowDown, botRightIndex]) : doNothing();


        // bot left

        (rowDown > middle & rowDown !== rowIndex) ? botLeftAdjustmentValue += 1 : doNothing();
        let botLeftIndex = cellIndex - botLeftAdjustmentValue;
        botLeftCont = checkBlocker([rowDown, botLeftIndex],botLeftCont,blockers);
        botLeftCont && botLeftIndex >= 0 ? cellToChange.push([rowDown, botLeftIndex]) : doNothing();
        



      }
      
      //left
      let leftIndex = cellIndex - i;
      leftCont = checkBlocker([rowIndex, leftIndex],leftCont,blockers);
      leftCont &&leftIndex >= 0 ? cellToChange.push([rowIndex, leftIndex]) : doNothing();
      

      

      //right
      let rightIndex = cellIndex + i;
      rightCont = checkBlocker([rowIndex, rightIndex], rightCont,blockers);
      rightCont && rightIndex < rowsLengthList[rowIndex] ? cellToChange.push([rowIndex, rightIndex]) : doNothing();
      

  }
  
  return cellToChange
   
    
  }