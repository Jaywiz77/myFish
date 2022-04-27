import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions"


const PlayerBoard = (playerInfo,index) => {
    // let penguin = "p" + playerInfo[0].substr(playerInfo[0].length - 1);
    let penguin = "p" + (index + 1);
    let container = "pb" +  (index + 1);
    // let container = "pb" + playerInfo[0].substr(playerInfo[0].length - 1);
    return (
        <div className={container} style={{ minWidth:60, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", margin: 3 }}>
            <div className={ penguin } style={{height:45,width:45}}>
                </div>
            <label>{playerInfo[4]}</label>
            <label style={{fontSize:13}}>Points: {playerInfo[2]}</label>
        </div>

    )

}


export default PlayerBoard;