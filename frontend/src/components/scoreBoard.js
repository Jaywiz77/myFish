import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions"
import Board from "./board";
const ScoreBoard = () => {
    const dispatch = useDispatch();
    const gamePhase = useSelector((state) => state.game.gamePhase);
    // const blockers = useSelector((state) => state.game.blockers);
    const playerInfo = useSelector((state) => state.game.playerInfo);
    // const iterable = [...blockers];
    const changePhase = (gamePhase) => { 
        let newPhase = gamePhase === "setPlayerPieces" ?  "selectPiecePhase" : "setPlayerPieces" ;
        dispatch({
            type: "CHANGE_PHASE",
            payload: { newPhase }
        })
    }

    return (
        <div style={{ minWidth: "30%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h4>Current Phase: </h4>
            <label>{gamePhase}</label>
            

            <button onClick={() => { changePhase(gamePhase) }}>change Phase</button>
                            {
                playerInfo.map((player) => {return(
                    <>
                    <label>{player[0]}</label>
                    <label>{player[2]}</label>
                        </>
                    )
                })
            }
        </div>

    )

}


export default ScoreBoard;