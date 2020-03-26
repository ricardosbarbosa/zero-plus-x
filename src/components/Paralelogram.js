import React from "react";
import { Shape} from "react-konva";

const drawShape = dots => (context, shape) => {
  const [ p1, p2, p3, p4] = dots;
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.lineTo(p3.x, p3.y);
  context.lineTo(p4.x, p4.y);
  context.closePath();
  context.fillStrokeShape(shape);
}

const Paralelogram = ({ dots }) => (<Shape sceneFunc={drawShape(dots)} stroke="blue" strokeWidth={1} />)

export default Paralelogram