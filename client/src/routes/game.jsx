import React, { useState, useEffect, useContext } from "react";
import "../styles.css";
import Player from "../components/player";
import PlayingCard from "../components/card";
import { Container } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { BACKEND_URL } from "../config";

export default function GamePage() {
  const socket = useLoaderData();

  const [players, setPlayers] = useState([]);
  const [community, setCommunity] = useState([]);

  useEffect(() => {
    socket.on('state', (state) => {
      setCommunity(state.community);
      setPlayers(state.players);
    });
  }, [socket]);

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

export function gameLoader({ params }) {
  console.log(params);
  const socket = socketIOClient(BACKEND_URL);
  socket.emit('ingress', params.gameId);
  return socket;
}
