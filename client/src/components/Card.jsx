import React from "react";
import "../styles.css";
import { Card } from "@mantine/core";

export default function PlayingCard({ data }) {
  return (
    <Card padding="sm" m="sm" shadow="lg" withBorder>
      {data}
    </Card>
  );
}
