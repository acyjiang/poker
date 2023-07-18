import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../main";
import "../styles.css";
import { Button, Text, TextInput } from "@mantine/core";
import { createGame } from "../api/game";

export default function HomePage() {
  const socket = useContext(SocketContext);

  const handleNewGame = async () => {
    const newGameId = await createGame();
    location.href = `/game/${newGameId}`;
  }

  return (
    <>
      <Text>Fair Poker ???</Text>
      <Button onClick={handleNewGame}>Create Game</Button>
    </>
  );
}
