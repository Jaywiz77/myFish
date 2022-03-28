import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions"
import Board from "./board";
import ScoreBoard from "./scoreBoard";
import socket from '../socket';
const LoginPage = ({ setPage }) => {
    const [name, setName] = useState("");
    const handleChange = (event) => {
        setName(event.target.value);
    }

    const playerInfo = useSelector((state) => state.game.playerInfo);
    const onClick = () => {
        if (name !== "") {
        setPage("go Next");
        Actions.addPlayer(socket.id, name, playerInfo);            
        } else {
            alert("Please enter your name");
        }

    }   
    return (
        <div style={{ display: "flex", justifyContent: "center",height:"99vh" }}>
            <div className="pengu" style={{ display: "flex", flexDirection: "column",alignItems:"center", textAlign:"center",alignContent:"center",justifyContent: "center", border: "5px solid azure", minHeight:200,height: "25%", marginTop: "10%", width: "380px" }}>
                <label hidden={playerInfo.length !== 4}>Game is full</label>
                <label style={{ fontSize: "20px", marginBottom: 130 }} ></label>
                
                <label style={{ fontSize: "15px", maxWidth: 200 }} >Enter Name</label>
                <input  style={{width:200}} type="text" value={name} onChange={handleChange}/>
                <button style={{width:100,marginTop:2}}disabled={playerInfo.length === 4} onClick={onClick}>Enter</button>
                
                            {/* <div className="pengu"  style={{height:100,width:100}}>
                </div> */}
            </div>

        </div>

    )
}
export default LoginPage;