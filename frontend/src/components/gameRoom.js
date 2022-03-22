import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions"
import Board from "./board";
import ScoreBoard from "./scoreBoard";
const GameRoom = ()=> {

    return (
        <div style={{display:"flex"}}>
        <ScoreBoard />
        <Board  />
        </div>

    )
}
export default GameRoom;