import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../main";
import logo from "../logo.svg";
import "../styles.css";
import { Anchor, Button, Code, Text, TextInput } from "@mantine/core";

export default function HomePage() {
  const socket = useContext(SocketContext);

  const [response, setResponse] = useState("none");
  const [gameId, setGameId] = useState("");

  useEffect(() => {
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <Text>Fair Poker ???</Text>
      <Button>Create Game</Button>
      <form action={`/game/${gameId}`}>
        <TextInput
          value={gameId}
          onChange={(event) => setGameId(event.target.value)}
        />
        <Button type="submit">Join game</Button>
      </form>
      <Text>Response: {response}</Text>
    </>
  );
}
