import React from "react";
import { Text, Circle} from "react-konva";

const CircleWithArea = ({ center, area, radius }) => (
  <>
    <Text x={center.x} y={center.y} text={`Area: ${area}`} />
    <Circle radius={radius} x={center.x} y={center.y} stroke="orange" strokeWidth={1} />
  </>
)

export default CircleWithArea