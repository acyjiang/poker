import React from "react";
import PlayingCard from "./card";
import { Card } from "@mantine/core";

export default function Player({ data }) {
  return (
    <Card
      m="xs"
      display="flex"
      withBorder
      shadow="lg"
      style={{ backgroundColor: "lightblue" }}
    >
      {data.name}
      <PlayingCard data={data.cards[0]} />
      <PlayingCard data={data.cards[1]} />
      {data.stack}
    </Card>
  );
}
