import React from "react";
import { Text, Circle, Group } from "react-konva";

const Point = ({x, y, onDragMove}) => (
  <Group draggable onDragMove={onDragMove} x={x} y={y}>
    <Text text={`(${x},${y})`} />
    <Circle radius={5.5} fill="red" />
  </Group>
)

export default Point