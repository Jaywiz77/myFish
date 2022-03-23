import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions"


const PlayerBoard = (playerInfo) => {
    let penguin = "p"+playerInfo[0].substr(playerInfo[0].length - 1);
    return (
        <div style={{ minWidth: "30%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", border: "2px solid #4682b4", margin: 5 }}>
            <div className={ penguin } style={{height:50,width:50}}>
                </div>
            <label>{playerInfo[0]}</label>
            <label>Points : {playerInfo[2]}</label>
        </div>

    )

}


export default PlayerBoard;