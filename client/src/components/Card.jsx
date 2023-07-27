import React from "react";
import "../styles.css";
import { createStyles, Card } from "@mantine/core";

export default function PlayingCard({ data }) {
  const { classes } = useStyles();
  return (
    data ? 
      <Card padding={0} shadow="lg" className={classes.card} withBorder>{data} </Card> :
      <Card padding={0} shadow="lg" className={classes.card} withBorder></Card>
  );
}

const useStyles = createStyles(() => ({
  card: {
    fontSize: "50px",
    width: "60px",
    height: "80px",
    margin: "0px",
  },
}));