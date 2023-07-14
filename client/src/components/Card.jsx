import React from "react";
import "../styles.css";
import { Card } from "@mantine/core";

export default function PlayingCard({ data }) {
  return (
    <Card>
      <span className="value">{data}</span>
    </Card>
  );
}
