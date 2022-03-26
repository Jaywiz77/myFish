import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions"
import Board from "./board";
import PlayerBoard from "./playerBoard";
const ScoreBoard = () => {
    const dispatch = useDispatch();
    const gamePhase = useSelector((state) => state.game.gamePhase);
    // const blockers = useSelector((state) => state.game.blockers);
    const playerInfo = useSelector((state) => state.game.playerInfo);
    const turnNumber = useSelector((state) => state.game.turn);
    const disable = useSelector((state) => state.game.startBtn);
    let winner = "";
    // const iterable = [...blockers];
    const changePhase = (gamePhase) => { 
        // let newPhase = gamePhase === "setPlayerPieces" ?  "selectPiecePhase" : "setPlayerPieces" ;
        Actions.changeSetPiecePhase();
    }

    if (gamePhase === "gameEnd") {
        let scores = [];
        playerInfo.forEach(player => {
            scores.push(player[2]);
        });

        winner = scores.indexOf(Math.max(...scores)) + 1;

    }

    return (
        <div style={{ minWidth: "30%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" ,backgroundColor:"azure",marginLeft:10,maxHeight:300}}>
            {/* <label style={{marginTop:20}}>Current Phase: {gamePhase} </label> */}
            
            { gamePhase === "gameEnd" ? <label>Player {winner} Won</label> : ""}
            
            {
                disable === true ?
                    (
                        <>
                            <label>Turn Number {turnNumber}</label>
                            <label>Player {playerInfo.length > 0 ? playerInfo[turnNumber % playerInfo.length][4] : "0"} 's turn</label>
                        </>   
                    ):""
                        
            }


            <button disabled={disable} onClick={() => { changePhase(gamePhase) }}>Start Game</button>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
                {
                    playerInfo.map((player) => {
                        return (
                            PlayerBoard(player)
                    
                        )
                    })
                }
            </div>
                            
        </div>

    )

}


export default ScoreBoard;