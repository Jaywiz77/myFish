import React,{useEffect} from "react";
import "../styles.css";
import { Hex } from "./hex"
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions"
// import { act } from "react-dom/test-utils";
import socket from "../socket";

import click1 from '../sounds/click.wav';
import move2 from '../sounds/move1.wav';

const audio = new Audio();

// const BoopButton = () => {
//   const [play] = useSound(click1);

//   return <button onClick={play}>Boop!</button>;
// };
function Board() {
  // const [playClick] = useSound(click1,{ volume: 0.5 });
  // const [playMove] = useSound(move1,{ volume: 0.5 });
  const pieces = [0, 5, 4, 3, 2,2,2];
  // dispatch(Actions.createBoard());
  const r = useSelector((state) => state.game.radius);
  const board = useSelector((state) => state.game.board);
  const currentSelected = useSelector((state) => state.game.currentSelected);
  const blockers = useSelector((state) => state.game.blockers);
  const currentSide = useSelector((state) => state.game.currentSide);
  const gamePhase = useSelector((state) => state.game.gamePhase);
  const highlighted = useSelector((state) => state.game.highlightedPath);
  const playerInfo = useSelector((state) => state.game.playerInfo);
  const turnNumber = useSelector((state) => state.game.turn);
  const playerTurn = turnNumber % playerInfo.length;
  const playerWithoutMove = useSelector((state) => state.game.playerWithoutMove);
  // const id = useSelector((state) => state.game.SETUP_ID);
  
  const checkMovable = () => {
    if (turnNumber >= 8  && Actions.checkPossibleMoves(playerInfo[playerTurn], blockers) === false) {
      console.log(playerInfo[playerTurn][0], "has no moves left");
      if (!playerWithoutMove.includes(playerInfo[playerTurn][0])) {
        Actions.addPlayerWithoutMove(playerInfo[playerTurn][0]);
      }
      if (turnNumber < 150 && playerWithoutMove.length < playerInfo.length) {
        Actions.updateTurn();
      } else {
        Actions.gameEnd();
      }


      
    } 
  }


  useEffect(() => {
      
  function playAudio() {
    audio.src = click1;
    audio.play();
    }

    function playAudio2() {
    audio.src = move2;
    audio.play();
        // console.log('sdfsdfsdfd')
    }
    socket.on('playClick', playAudio);
    socket.on('playMove', playAudio2);
      Actions.createBoard();
          
    
  }, []);

  useEffect(() => {

    if (playerInfo.length > 0  && socket.id === playerInfo[playerTurn][3]) {
      checkMovable();
    }

    if (gamePhase !== "waitingPhase" && playerWithoutMove.length >= playerInfo.length) { 
      Actions.gameEnd()
    };
     
  }, [turnNumber]);


  const cellOnClick = (rowIndex, cellIndex, points) => {
    
    if (socket.id === playerInfo[playerTurn][3]) {
      
    

      if (gamePhase === "setPlayerPieces" && Actions.isArrayInArray(blockers,`${rowIndex},${cellIndex}`) === false) { //set player pieces 
        socket.emit('playClick',"");
        Actions.addPlayerPiece(board, rowIndex, cellIndex, blockers, playerInfo, playerTurn, points);
        if (turnNumber >= playerInfo.length * (pieces[playerInfo.length]) -1) {
          Actions.changePlayPhase();
        }

      } else if (gamePhase === "selectPiecePhase") { //select pieces to move
        
        if (Actions.isArrayInArray(playerInfo[playerTurn][1],`${rowIndex},${cellIndex}`)) {
          
          socket.emit('playClick',"");
          if (rowIndex === currentSelected[0] && currentSelected[1] === cellIndex) {
            Actions.clearSelectionDispatch(board);
          
          } else {

            Actions.selectedAction(board, currentSide, rowIndex, cellIndex, blockers, currentSelected);

          }
        }
        
      } else if (gamePhase === "movePiecePhase") { //move selected pieces
        if (rowIndex === currentSelected[0] && currentSelected[1] === cellIndex) {
            // clearSelectionDispatch();
          Actions.clearSelectionDispatch(board);
          
          } else if (currentSelected[0] !== "" && Actions.isArrayInArray(highlighted,[rowIndex,cellIndex])) {
            // console.log(currentSelected);
          socket.emit('playMove',"");
          Actions.movePlayerPiece(board, currentSelected, rowIndex, cellIndex, blockers, playerInfo, playerTurn, points);
          // playMove();
        } else if (Actions.isArrayInArray(playerInfo[playerTurn][1], `${rowIndex},${cellIndex}`)) {
          // playClick()
          Actions.selectedAction(board, currentSide, rowIndex, cellIndex, blockers, currentSelected);
          socket.emit('playClick',"");
          }

        
        }
    } 
    
  } 


  return (

    <div 
      style={{
        height: "98vh",
        width: "70%",
      }}>
      <div               style={{
        marginTop:"2vh",
                // display: "flex",
      justifyContent: "center",


              }}>
        {board.map((row, rowIndex) => {
          return (
            <div
              style={{
                marginTop: "-14px",
                display: "flex",
                justifyContent: "center",
                
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
      {/* <BoopButton/> */}
      </div>

  );
}

export default Board;