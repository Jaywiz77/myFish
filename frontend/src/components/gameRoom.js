import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions"
import Board from "./board";
import ScoreBoard from "./scoreBoard";
const GameRoom = ()=> {
  let winWidth = window.innerWidth;
    return (
        <div style={{ display: "flex", flexWrap: "wrap",justifyContent:"center"}} className="bg">
        <ScoreBoard />
        <Board />
        {    winWidth > 500 ? "" : <div style={{ width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "azure", height: "35%", maxHeight: 400, paddingTop:20 }}>
                <label>How to play</label>
                <label>The game is played in 2 Phases: </label>
                <label>Set Penguins Phase and Play Phase</label>
                <br/>
                <label>1. Set Piece Phase: </label>
                <label>Set your penguins <b>anywhere</b> on the board</label>
                <label>2 players: 4 penguins each</label>
                <label>3 players: 3 penguins each</label>
                <label>4 players: 2 penguins each</label>
                <br/>
                <label>2. Play Phase</label>
                <label>Take turns to move your pieces to collect points</label>
                <label>Each fish on the tiles = 1 point</label>
                <label>You can only move to any tiles connected in a <b>straight line</b></label>
                <label>and not blocked by any penguins or water</label>
                <label>Tiles disappear after penguins moved</label>
                <br />
                <label>Game ends when everyone has no possible move left</label>

            </div> }
        </div>

    )
}
export default GameRoom;