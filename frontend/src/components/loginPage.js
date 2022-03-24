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
        setPage("go Next");
        Actions.addPlayer(socket.id, name, playerInfo);
    }   
    return (
        <div style={{ display: "flex", justifyContent: "center",height:"99vh" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", border: "5px solid azure", height: "30%", marginTop: "10%", width: "300px" }}>
                
                <label>Enter Name</label>
                <input type="text" value={name} onChange={handleChange}/>
            <button onClick={onClick}>Submit</button>
            </div>

        </div>

    )
}
export default LoginPage;