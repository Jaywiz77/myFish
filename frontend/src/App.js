import logo from './logo.svg';
import Board from "./components/board"
import './App.css';
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
    <div className="App bg">
      <div className='bar'>

      </div>
      <Board/>
      </div>
      </Provider>
  );
}

export default App;
