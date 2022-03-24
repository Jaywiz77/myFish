import logo from './logo.svg';
import GameRoom from "./components/gameRoom"
import LoginPage from './components/loginPage';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Provider } from "react-redux";
import store from "./store";
import SocketReceiver from "./socket/SocketReceiver";

function App() {
  const [page, setPage] = useState("login");
  return (
    <Provider store={store}>
      <SocketReceiver />
      <div className="App bg">
        <div className="bar"></div>
        { page === "login" ?<LoginPage setPage={setPage}/> : <GameRoom/> }
      </div>
      
    </Provider>
  );
}

export default App;
