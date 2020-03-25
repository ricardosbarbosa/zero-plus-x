import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";
import { Stage, Layer, Shape, Text, Circle, Group } from "react-konva";
import Konva  from "konva";

const HEADER_HEIGHT = 0

const model = {
  findFourthPoint: ([p1, p2, p3]) => ({
    x: p1.x + p3.x - p2.x,
    y: p1.y + p3.y - p2.y
  }),

  findCenterOfParallelogram: ([p1, p2, p3, p4]) => ({
      x : (p1.x + p2.x + p3.x + p4.x) / 4,
      y : (p1.y + p2.y + p3.y + p4.y) / 4
  }),

  calculateAreaOfParallelogram: ([ p1, p2, p3, p4]) => Math.abs( p1.x * p2.y - p1.y * p2.x + p2.x * p3.y - p2.y * p3.x + p3.x * p4.y - p3.y * p4.x + p4.x * p1.y - p4.y * p1.x ) / 2
}
export default function App() {
  const [dots, setDots] = useState([]);
  const [center, setCenter] = useState();
  const [area, setArea] = useState();
  const [radius, setRadius] = useState();

  const addDot = useCallback((point, dots) => setDots([...dots, point]), [setDots])

  useEffect(() => {
    if (area) {
      const r = Math.sqrt(area / Math.PI);
      setRadius(r);
    }
  }, [area]);

  useEffect(() => {
    if (dots.length === 3) {
      const point = model.findFourthPoint(dots)
      addDot(point, dots)
    }
    if (dots.length === 4) {
      const center = model.findCenterOfParallelogram(dots)
      setCenter(center)
      const area = model.calculateAreaOfParallelogram(dots)
      setArea(area);
    }
  }, [dots, addDot]);

  const handleClick = (e) => {
    if (dots.length < 4) {
      var x = e.evt.x ;
      var y = e.evt.y - HEADER_HEIGHT;
      const point = { x, y };
      addDot(point, dots)
    }
  }

  function drawShape(context, shape) {
    const [ p1, p2, p3, p4] = dots;
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.lineTo(p4.x, p4.y);
    context.closePath();
    context.fillStrokeShape(shape);
  }

  const reset = () => {
    setDots([]);
    setCenter();
    setArea();
    setRadius();
  }

  const handleDragMove = index => e => {
    const old = dots[index] 
    const x = e.evt.clientX 
    const y = e.evt.clientY// - HEADER_HEIGHT
    let newArr = [...dots]; // copying the old datas array
    newArr[index] = {x,y};
    const next = (index + 1) === 4 ? 0 : index + 1 
    newArr[next] = {
      x: newArr[next].x + (x - old.x),
      y: newArr[next].y + (y - old.y),
    }
    setDots(newArr)
  }

  return (
    <div className="App">
      
      <Stage
        onClick={handleClick}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          
          {center && (<Shape sceneFunc={drawShape} stroke="blue" strokeWidth={1} />)}
          {center && (
            <Group>
              <Text x={center.x} y={center.y} text={`Area: ${area}`} />
              <Circle radius={radius} x={center.x} y={center.y} stroke="orange" strokeWidth={1} />
            </Group>
          )}
          {dots.map(({ x, y }, i) => (<Point  x={x} y={y} onDragMove={handleDragMove(i)}/>))}

          
        </Layer>
      </Stage>

    </div>
  );
}

const Point = ({x, y, onDragMove}) => (
  <Group draggable onDragMove={onDragMove} x={x} y={y}>
    <Text text={`(${x},${y})`} />
    <Circle radius={5.5} fill="red" />
  </Group>
)