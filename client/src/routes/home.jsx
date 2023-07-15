import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../main";
import logo from "../logo.svg";
import "../styles.css";
import { Anchor, Button, Code, Text } from "@mantine/core";

export default function HomePage() {
  const socket = useContext(SocketContext);

  const [response, setResponse] = useState("none");

  useEffect(() => {
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <Text>Fair Poker ???</Text>
      <Anchor href="/game">
        <Button>Join game</Button>
      </Anchor>
      <Text>Response: {response}</Text>
    </>
  );
}
