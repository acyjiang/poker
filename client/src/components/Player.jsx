import React from "react";
import PlayingCard from "./card";
import { createStyles, Card, Button } from "@mantine/core";

export default function Player({ data, onSit }) {
  const { classes } = useStyles();
  return (
    data ? <Card
      withBorder
      shadow="lg"
      className={classes.player}
    >
      {data.name}
      <PlayingCard data={data.hand[0]} />
      <PlayingCard data={data.hand[1]} />
      {data.stack}
    </Card> :
    <Button
      shadow="lg"
      className={classes.player}
      onClick={onSit}
    >
      Sit
    </Button>
  );
}

const useStyles = createStyles(() => ({
  player: {
    display: "flex",
    // width: "60px",
    // height: "80px",
    // margin: "5px",
    backgroundColor: "lightblue"
  },
}));