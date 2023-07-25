import React from "react";
import "../styles.css";
import { Button, Text } from "@mantine/core";
import { createGame } from "../api/game";

export default function HomePage() {

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
