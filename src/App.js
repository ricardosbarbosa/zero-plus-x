import React, { useState, useEffect } from "react";
import "./styles.css";
import { Stage, Layer, Shape, Text, Circle, Group } from "react-konva";

export default function App() {
  const [dots, setDots] = useState([]);
  const [center, setCenter] = useState(null);
  const [area, setArea] = useState();
  const [radius, setRadius] = useState();

  useEffect(() => {
    if (area) {
      const r = Math.sqrt(area / Math.PI);
      setRadius(r);
    }
  }, [area]);
  useEffect(() => {
    if (dots.length === 4) {
      setArea(calcArea(dots));
    }
  }, [dots]);
  useEffect(() => {
    console.log(dots.length);
    if (dots.length === 4) {
      const m = { x: 0, y: 0 };
      dots.forEach(({ x, y }) => {
        m.x = m.x + x;
        m.y = m.y + y;
      });

      m.x = m.x / 4;
      m.y = m.y / 4;

      setCenter(m);
    }
  }, [dots]);

  useEffect(() => {
    if (dots.length === 3) {
      const newPoint = { x: 0, y: 0 };
      dots.forEach(({ x, y }) => {
        newPoint.x = newPoint.x + x;
        newPoint.y = newPoint.y + y;
      });

      newPoint.x = newPoint.x / 3;
      newPoint.y = newPoint.y / 3;

      setDots([...dots, newPoint]);
    }
  }, [dots]);

  function handleClick(e) {
    if (dots.length < 4) {
      var x = e.evt.clientX;
      var y = e.evt.clientY;
      const point = { x, y };
      setDots([...dots, point]);
    }
  }

  function calcArea(points) {
    const [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x3, y: y3 },
      { x: x4, y: y4 }
    ] = points;
    return (
      Math.abs(
        x1 * y2 -
          y1 * x2 +
          x2 * y3 -
          y2 * x3 +
          x3 * y4 -
          y3 * x4 +
          x4 * y1 -
          y4 * x1
      ) / 2
    );
  }

  function drawShape(context, shape) {
    const [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x3, y: y3 },
      { x: x4, y: y4 }
    ] = dots;
    context.beginPath();

    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.lineTo(x4, y4);
    // context.quadraticCurveTo(150, 100, 260, 170);
    context.closePath();
    // (!) Konva specific method, it is very important
    context.fillStrokeShape(shape);
  }

  return (
    <div className="App">
      {JSON.stringify(center)} - {JSON.stringify(area)} -{" "}
      {JSON.stringify(radius)}
      <button
        onClick={() => {
          setDots([]);
          setCenter(null);
          setArea(null);
          setRadius(null);
        }}
      >
        reset
      </button>
      <Stage
        onClick={handleClick}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          {dots.map(({ x, y }, i) => (
            <Group key={i}>
              <Text x={x} y={y} text={`(${x},${y})`} />
              <Circle radius={5.5} x={x} y={y} fill="red" />
            </Group>
          ))}

          {center && (
            <Shape sceneFunc={drawShape} stroke="blue" strokeWidth={1} />
          )}

          {center && (
            <Group>
              <Text
                x={center.x}
                y={center.y}
                text={`(${center.x},${center.y})`}
              />
              <Circle
                radius={radius}
                x={center.x}
                y={center.y}
                stroke="yellow"
                strokeWidth={1}
              />
            </Group>
          )}
        </Layer>
      </Stage>
    </div>
  );
}
