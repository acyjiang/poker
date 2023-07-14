import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../main";
import logo from "../logo.svg";
import "../styles.css";
import { Button, Code, Text } from "@mantine/core";

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
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <Text>Hello Vite + React!</Text>
      <Button onClick={() => setCount((count) => count + 1)} mb="sm">
        count is: {count}
      </Button>
      <Button onClick={joinGame}>Join game</Button>
      <Text>Response: {response}</Text>
      <Text>
        Edit <Code>App.jsx</Code> and save to test HMR updates.
      </Text>
    </>
  );
}
