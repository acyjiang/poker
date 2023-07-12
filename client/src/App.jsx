
import './App.css';
import socketIOClient from "socket.io-client";

import {
  Route,
  Routes
} from 'react-router-dom'

import Home from './routes/Home';
const ENDPOINT = "http://127.0.0.1:8080";

const App = () => {
  
  const socket = socketIOClient(ENDPOINT);

  return (
    <Home socket = {socket}/>
  );
};

export default App;
