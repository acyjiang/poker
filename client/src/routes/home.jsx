import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../main";
import logo from "../logo.svg";
import "../styles.css";

export default function HomePage() {
  const socket = useContext(SocketContext);
  const [count, setCount] = useState(0);

  const [response, setResponse] = useState("none");

  const joinGame = () => {
    window.location.replace("/game");
  };

  useEffect(() => {
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          <button onClick={joinGame}>Join game</button>
        </p>
        <p>Response: {response}</p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}
