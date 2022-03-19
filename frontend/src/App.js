import logo from './logo.svg';
import GameRoom from "./components/gameRoom"
import './App.css';

import { Provider } from "react-redux";
import store from "./store";
import SocketReceiver from "./socket/SocketReceiver";
function App() {
  return (
    <Provider store={store}>
      <SocketReceiver />
      <div className="App bg">
        <div className="bar"></div>
        <GameRoom/>
      </div>
      
    </Provider>
  );
}

export default App;
