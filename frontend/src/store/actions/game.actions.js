

export const createBoard = () => {

  const boardItems = ["fish", "fish2", "fish3", "empty"];
  const rowsLengthList = [5, 6, 7, 8, 9, 8, 7, 6, 5];

  const board = rowsLengthList.map(length => new Array(length).fill().map(
    () => [boardItems[Math.floor(Math.random() * boardItems.length)], "white"])
  )
  return {
      type: "SET_BOARD",
      payload:{board}
      }
}


export const selectedAction =(board, cellToChange, side)  => { //side = highlighted or not

  const newBoard = clearSelection(board);
  cellToChange.map(arr => {
    //arr sample = [rowIndex,cellIndex]
    newBoard[arr[0]][arr[1]][1] = side;
  })


  
  return newBoard;
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


export const changeSide = (side,currentSelected) =>{
if (side[0] === currentSelected[0] && currentSelected[1] === side[1]) {
    return ["", "white"]
} else {
    return  ["","selected"]
}
}

