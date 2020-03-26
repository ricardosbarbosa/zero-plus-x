import React from "react";
import { Group, Text, Circle} from "react-konva";

const CircleWithArea = ({ center, area, radius }) => (
  <Group>
    <Text x={center.x} y={center.y} text={`Area: ${area}\nRadius: ${radius}`} />
    <Circle radius={radius} x={center.x} y={center.y} stroke="orange" strokeWidth={1} />
  </Group>
)

export default CircleWithArea