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
    // const iterable = [...blockers];
    const changePhase = (gamePhase) => { 
        let newPhase = gamePhase === "setPlayerPieces" ?  "selectPiecePhase" : "setPlayerPieces" ;
        dispatch({
            type: "CHANGE_PHASE",
            payload: { newPhase }
        })
    }

    return (
        <div style={{ minWidth: "30%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" ,backgroundColor:"azure",marginLeft:10,maxHeight:300}}>
            <label style={{marginTop:20}}>Current Phase: {gamePhase} </label>
            <label>Turn Number {turnNumber}</label>
            <label>Player {turnNumber % playerInfo.length + 1} 's turn</label>

            <button onClick={() => { changePhase(gamePhase) }}>change Phase</button>
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