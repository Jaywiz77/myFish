import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions"
import Board from "./board";
const GameRoom = ()=> {
    const dispatch = useDispatch();
    const gamePhase = useSelector((state) => state.game.gamePhase);
    const blockers = useSelector((state) => state.game.blockers);
    const iterable = [...blockers];
    const changePhase = (gamePhase) => { 
        let newPhase = gamePhase === "setPlayerPieces" ?  "selectPiecePhase" : "setPlayerPieces" ;
        dispatch({
            type: "CHANGE_PHASE",
            payload: { newPhase }
        })
    }
    return (
        <div style={{display:"flex"}}>
            <div style={{ minWidth: "30%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h4>Current Phase: </h4>
                <label>{gamePhase}</label>
                {/* <label>Blocks at {iterable.map(x => "[" + x + "] ") }</label> */}
                <button onClick={()=>{changePhase(gamePhase)}}>change Phase</button>
            </div>
        <Board style={{minWidth:"70%"}} />
        </div>

    )
}
export default GameRoom;