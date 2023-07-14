import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../main";
import "../styles.css";
import Player from "../components/player";
import PlayingCard from "../components/card";
import { Container } from "@mantine/core";

export default function GamePage() {
  const socket = useContext(SocketContext);

  const [players, setPlayers] = useState([]);
  const [community, setCommunity] = useState([]);

  useEffect(() => {
    socket.emit("connect to game", 0);

    socket.on("update game state", (data) => {
      setPlayers(data.players);
      setCommunity(data.community);
    });
  }, []);

  return (
    <>
      <Container display="flex">
        {players.map((player) => (
          <Player key={player.name} data={player} />
        ))}
      </Container>
      <Container display="flex">
        {community.map((card) => (
          <PlayingCard key={card} data={card} />
        ))}
      </Container>
    </>
  );
}
