import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../main";
import "../styles.css";
import Player from "../components/player";
import PlayingCard from "../components/card";

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
    <div className="App">
      <header className="App-header">
        <div className="flex-container">
          {players.map((player) => (
            <Player key={player.name} data={player} />
          ))}
        </div>
        <div className="flex-container">
          {community.map((card) => (
            <PlayingCard key={card} data={card} />
          ))}
        </div>
      </header>
    </div>
  );
}
