import * as socketSender from "../../socket/socket.sender";


export const SETUP_ID = "SETUP SOCKET ID";

const boardItems = [["fish","white",1],["fish2","white",2], ["fish3","white",3]];
const rowsLengthList = [5, 6, 7, 8, 9, 8, 7, 6, 5];
const height = rowsLengthList.length - 1;
export const createBoard = () => {
  const board = rowsLengthList.map((length) =>
    new Array(length)
      .fill()
      .map(() => boardItems[Math.floor(Math.random() * boardItems.length)])
  );

  socketSender.broadcastToAll({
    type: "SET_BOARD",
    payload: { board },
  });
};
  
export const addPlayerPiece = (board,rowIndex,cellIndex,blockers,playerInfo,playerTurn,points) => {

  const newBoard = board;
  newBoard[rowIndex][cellIndex][0] = playerInfo[playerTurn][0];
  playerInfo[playerTurn][1].push(`${rowIndex},${cellIndex}`);
  playerInfo[playerTurn][2] += points;
  blockers.push(`${rowIndex},${cellIndex}`);

  socketSender.broadcastToAll({
    type: "SPIECE",
    payload: { newBoard, rowIndex, cellIndex,blockers,playerInfo }
  });
  
}

export const movePlayerPiece = (board,currentSelected,rowIndex,cellIndex,blockers,playerInfo,playerTurn,points) => {

  // let newBoard = board;
  board[rowIndex][cellIndex][0] = playerInfo[playerTurn][0];
  // console.log("movee");
  board[currentSelected[0]][currentSelected[1]][0] = "nothing"; 
  let newBoard = clearSelection(board);
  let nextPhase = "selectPiecePhase";
  playerInfo[playerTurn][1] = playerInfo[playerTurn][1].filter(function (e) { return e !== `${currentSelected[0]},${currentSelected[1]}` })
  playerInfo[playerTurn][1].push(`${rowIndex},${cellIndex}`)
  playerInfo[playerTurn][2] += points;
  // add to blockers
  blockers.push(`${rowIndex},${cellIndex}`);
  socketSender.broadcastToAll({
    type: "MOVE_PIECE",
    payload: { newBoard, rowIndex, cellIndex, nextPhase,blockers,playerInfo }
  });
  
}

export const addBlockers = (blockers,rowIndex, cellIndex) => {
  
  blockers.add(`${rowIndex},${cellIndex}`);
  return {
    type: "SET_BLOCKER",
    payload:{blockers}
  }

}

const changeHighlight = (selectedCell, currentSelected) => {
  if (selectedCell[0] === currentSelected[0] && currentSelected[1] === selectedCell[1]) {
      return "white"
  } else {
      return  "selected"
  }
}
export const selectedAction = (
  board,
  side, //side = highlighted or not
  rowIndex,
  cellIndex,
  blockers,
  currentSelected
) => {
  //calculate the path
  const cellToChange = calculatePath(rowIndex,cellIndex,blockers)
  const highlight = changeHighlight([rowIndex, cellIndex], currentSelected);
  const newBoard = clearSelection(board);
  cellToChange.map((arr) => {
    //arr sample = [rowIndex,cellIndex]s
    newBoard[arr[0]][arr[1]][1] = side;

  });
  let nextPhase = "movePiecePhase";
  socketSender.broadcastToAll({
    type: "SELECTED_ACTION",
    payload: { newBoard, highlight, rowIndex, cellIndex, nextPhase ,cellToChange},
  });
};


export function clearSelection(board) {
  board.map((arrs) => {
    arrs.forEach((part, index, arr) => {
      arr[index][1] = "white";
    });
  });

  return board;
}

export function clearSelectionDispatch(board) {
  board = clearSelection(board);
  let nextPhase = "selectPiecePhase";
  socketSender.broadcastToAll({
    type: "CLEAR",
    payload: { board ,nextPhase},
  });
}

export const changeSide = (side, currentSelected) => {
  // console.log(currentSelected);
  if (side[0] === currentSelected[0] && currentSelected[1] === side[1]) {
    return ["", "white"];
  } else {
    return ["", "selected"];
  }
};

const checkBlocker = (cell, pathOpen, blockers) => {


  if (pathOpen) {
    if (isArrayInArray(blockers,`${cell[0]},${cell[1]}`) === true) {
      return false;
    }
    return true;

  }
  return false;
};
const doNothing = () => {
  return "";
};
const calculatePath = (rowIndex, cellIndex, blockers) => {
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
  for (let i = 1; i <= height; i++) {
    // can maybe add if all the cont conditions are true
    // need refactoring, simplify
    // top
    let rowUp = rowIndex - i;
    if (rowUp >= 0) {
      //top left
      (rowUp < middle) & (rowUp !== rowIndex)
        ? (topLeftAdjustmentValue += 1)
        : doNothing();
      let topLeftIndex = cellIndex - topLeftAdjustmentValue;
      topLeftCont = checkBlocker([rowUp, topLeftIndex], topLeftCont, blockers);
      topLeftCont && topLeftIndex >= 0
        ? cellToChange.push([rowUp, cellIndex - topLeftAdjustmentValue])
        : doNothing();

      //top right
      (rowUp >= middle) & (rowUp !== rowIndex)
        ? (topRightAdjustmentValue += 1)
        : doNothing();
      let topRightIndex = cellIndex + topRightAdjustmentValue;
      topRightCont = checkBlocker(
        [rowUp, topRightIndex],
        topRightCont,
        blockers
      );
      topRightCont && topRightIndex < rowsLengthList[rowUp]
        ? cellToChange.push([rowUp, topRightIndex])
        : doNothing();
    }

    // bot
    let rowDown = rowIndex + i;
    if (rowDown <= height) {
      // bot right

      (rowDown <= middle) & (rowDown !== rowIndex)
        ? (botRightAdjustmentValue += 1)
        : doNothing();
      let botRightIndex = cellIndex + botRightAdjustmentValue;
      botRightCont = checkBlocker(
        [rowDown, botRightIndex],
        botRightCont,
        blockers
      );
      botRightCont && botRightIndex < rowsLengthList[rowDown]
        ? cellToChange.push([rowDown, botRightIndex])
        : doNothing();

      // bot left

      (rowDown > middle) & (rowDown !== rowIndex)
        ? (botLeftAdjustmentValue += 1)
        : doNothing();
      let botLeftIndex = cellIndex - botLeftAdjustmentValue;
      botLeftCont = checkBlocker(
        [rowDown, botLeftIndex],
        botLeftCont,
        blockers
      );
      botLeftCont && botLeftIndex >= 0
        ? cellToChange.push([rowDown, botLeftIndex])
        : doNothing();
    }

    //left
    let leftIndex = cellIndex - i;
    leftCont = checkBlocker([rowIndex, leftIndex], leftCont, blockers);
    leftCont && leftIndex >= 0
      ? cellToChange.push([rowIndex, leftIndex])
      : doNothing();

    //right
    let rightIndex = cellIndex + i;
    rightCont = checkBlocker([rowIndex, rightIndex], rightCont, blockers);
    rightCont && rightIndex < rowsLengthList[rowIndex]
      ? cellToChange.push([rowIndex, rightIndex])
      : doNothing();
    // console.log("---------------------------");
    // console.log("tl",topLeftCont);
    // console.log("tr",topRightCont);
    // console.log("bl",botLeftCont);
    // console.log("br",botRightCont);
    // console.log("left",leftCont);
    // console.log("right",rightCont);

  }

  return cellToChange;
};

export const checkPossibleMoves = (playerPieces, blockers) => {
  let moves = 0

  playerPieces[1].forEach(cell => {
    let coord = cell.split(",");
    let availableNeighbours = getAvailableNeighbours(Number(coord[0]), Number(coord[1]), blockers);

    availableNeighbours.forEach(neighbour => {
      if (checkBlocker(neighbour, true, blockers) === true) {
        moves += 1;
      }
    })
    
  })
  return moves > 0
}

export const isArrayInArray = (arr, item) => {
  var item_as_string = JSON.stringify(item);

  var contains = arr.some(function(ele){
    return JSON.stringify(ele) === item_as_string;
  });
  return contains;
}

const getAvailableNeighbours = (rowIndex, cellIndex, blockers) => {
  let cellToChange = [];
  let middle = Math.floor(height / 2);

  let topLeftAdjustmentValue = 0;
  let topRightAdjustmentValue = 0;
  let botRightAdjustmentValue = 0;
  let botLeftAdjustmentValue = 0;

  for (let i = 1; i <2; i++) {

  let rowUp = rowIndex - i;
  if (rowUp >= 0) {
    //top left
    (rowUp < middle) & (rowUp !== rowIndex)
      ? (topLeftAdjustmentValue += 1)
      : doNothing();
    let topLeftIndex = cellIndex - topLeftAdjustmentValue;
      topLeftIndex >= 0
      ? cellToChange.push([rowUp, cellIndex - topLeftAdjustmentValue])
      : doNothing();

    //top right
    (rowUp >= middle) & (rowUp !== rowIndex)
      ? (topRightAdjustmentValue += 1)
      : doNothing();
    let topRightIndex = cellIndex + topRightAdjustmentValue;
    topRightIndex < rowsLengthList[rowUp]
      ? cellToChange.push([rowUp, topRightIndex])
      : doNothing();
  }

  // bot
  let rowDown = rowIndex + i;
  if (rowDown <= height) {
    // bot right

    (rowDown <= middle) & (rowDown !== rowIndex)
      ? (botRightAdjustmentValue += 1)
      : doNothing();
    let botRightIndex = cellIndex + botRightAdjustmentValue;
      botRightIndex < rowsLengthList[rowDown]
      ? cellToChange.push([rowDown, botRightIndex])
      : doNothing();

    // bot left

    (rowDown > middle) & (rowDown !== rowIndex)
      ? (botLeftAdjustmentValue += 1)
      : doNothing();
    let botLeftIndex = cellIndex - botLeftAdjustmentValue;
      botLeftIndex >= 0
      ? cellToChange.push([rowDown, botLeftIndex])
      : doNothing();
  }

  //left
  let leftIndex = cellIndex - i;
      leftIndex >= 0
    ? cellToChange.push([rowIndex, leftIndex])
    : doNothing();

  //right
  let rightIndex = cellIndex + i;
      rightIndex < rowsLengthList[rowIndex]
    ? cellToChange.push([rowIndex, rightIndex])
    : doNothing();

  }

  return cellToChange;
};

export const updateTurn = () => {
    socketSender.broadcastToAll({
    type: "SKIP_TURN"
  });
}

export const gameEnd = () => {
  let newPhase = "gameEnd";
    socketSender.broadcastToAll({
      type: "CHANGE_PHASE",
      payload:{newPhase}
  });
}
// [["player1",[],0],["player2",[],0],["player3",[],0],["player4",[],0]], //[player,[pieces],points]
export const addPlayer = (playerId, planerName, playerInfo) => {

  
  let player = "player" + (playerInfo.length + 1);

  playerInfo.push([player, [], 0, playerId, planerName]);


  socketSender.broadcastToAll({
      type: "ADD_PLAYER",
      payload:{playerInfo}
  });
}

export const setHost = (host) => {
    socketSender.broadcastToAll({
      type: "SET_HOST",
      payload:{host}
  });
}