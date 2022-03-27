import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions"
import game from "../store/reducers/game.reducer";
import Board from "./board";
import PlayerBoard from "./playerBoard";
const ScoreBoard = () => {
    const dispatch = useDispatch();
    const gamePhase = useSelector((state) => state.game.gamePhase);
    // const blockers = useSelector((state) => state.game.blockers);
    const playerInfo = useSelector((state) => state.game.playerInfo);
    const turnNumber = useSelector((state) => state.game.turn);
    const disable = useSelector((state) => state.game.startBtn);
    const playerWithoutMove = useSelector((state) => state.game.playerWithoutMove); 
    let winner = "";
    // const iterable = [...blockers];

    if (gamePhase === "gameEnd") {
        let scores = [];
        playerInfo.forEach(player => {
            scores.push(player[2]);
        });

        winner = scores.indexOf(Math.max(...scores));

    }   

    let phase = "";
    if (gamePhase === "gameEnd") {
        phase = "Game Ended"; 
    } else if (gamePhase === "setPlayerPieces") {
        phase = "Set Your Pieces";
    } else {
        phase = "Get The Fishes!"
    }

    return (
        <div style={{ minWidth: "30%", display: "flex" ,flexDirection:"column", height:"98vh"}}>

        
            <div style={{ width:"100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" ,height:"45%",backgroundColor:"azure",marginLeft:10,maxHeight:350,paddingTop:20}}>
                {gamePhase !== "waitingPhase" ? <label style={{ marginTop: 10 }}>{phase} </label> :""}
                
                { gamePhase === "gameEnd" ? <label>Player {playerInfo[winner][4]} Won</label> : ""}
                
                {
                    gamePhase !== "waitingPhase" && gamePhase !== "gameEnd" ?
                        (

                            <label style={{margin:5,fontSize:"30px"}}>Player {playerInfo.length > 0 ? playerInfo[turnNumber % playerInfo.length][4] : "0"} 's turn</label>

                        ):""
                            
                }


                <button style={{ margin: 5 }} disabled={gamePhase !== "waitingPhase" && gamePhase !== "gameEnd"} onClick={() => {  Actions.setNewGame(playerInfo)}}>Start Game</button>
                <button hidden={ gamePhase === "waitingPhase" || gamePhase === "gameEnd"|| playerWithoutMove.length < playerInfo.length - 1} style={{margin:5}} onClick={() => { Actions.gameEnd() }}>End Game</button>
                <div style={{display:"flex", margin:15, flexWrap:"wrap",justifyContent:"center"}}>
                    {
                        playerInfo.map((player) => {
                            return (
                                PlayerBoard(player)
                        
                            )
                        })
                    }
                </div>
                                
            </div>
            
            <div style={{ width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "azure", height: "45%", marginLeft: 10, maxHeight: 400, marginTop: 30, paddingTop:20 }}>
                <label>How to play</label>
                <label>The game is played in 2 Phases: </label>
                <label>Set Piece Phase and Play Phase</label>
                <br/>
                <label>1. Set Piece Phase: </label>
                <label>Set your pieces anywhere in the board</label>
                <label>2 players: 4 Pieces each</label>
                <label>3 players: 3 Pieces each</label>
                <label>4 players: 2 Pieces each</label>
                <br/>
                <label>2. Play Phase</label>
                <label>Take turns to move your pieces to collect points</label>
                <label>You can only move in straight line to tiles connected</label>
                <label>and not blocked by any penguins</label>
                <label>Each fish on the tiles = 1 point</label>
                <label>Tiles disappear after penguins moved</label>
                <br />
                <label>Game ends when everyone has no possible move left</label>

            </div>
            
            </div>

    )

}


export default ScoreBoard;