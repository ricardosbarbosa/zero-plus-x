import React, { useState, useEffect, useCallback } from "react"
import "./styles.css"
import { Stage, Layer } from "react-konva"
import model from './models/model'
import Paralelogram from "./components/Paralelogram"
import CircleWithArea from "./components/CircleWithArea"
import Point from "./components/Point"

const HEADER_HEIGHT = 54

export default function App() {
  const [dots, setDots] = useState([])
  const [center, setCenter] = useState()
  const [area, setArea] = useState()
  const [radius, setRadius] = useState()

  const addDot = useCallback((point, dots) => setDots([...dots, point]), [])

  useEffect(() => {
    if (dots.length === 3) {
      const point = model.findFourthPoint(dots)
      addDot(point, dots)
    }
    if (dots.length === 4) {
      const center = model.findCenterOfParallelogram(dots)
      setCenter(center)
      const area = model.calculateAreaOfParallelogram(dots)
      setArea(area)
    }
  }, [dots, addDot])

  useEffect(() => {
    if (area) {
      const r = model.calculateRadius(area)
      setRadius(r)
    }
  }, [area])

  const handleClick = (e) => {
    if (dots.length < 4) {
      var x = e.evt.x 
      var y = e.evt.y - HEADER_HEIGHT
      const point = { x, y }
      addDot(point, dots)
    }
  }

  const reset = () => {
    setDots([])
    setCenter()
    setArea()
    setRadius()
  }

  const handleDragMove = index => e => {
    const old = dots[index] 
    const x = e.evt.clientX 
    const y = e.evt.clientY - HEADER_HEIGHT
    let newArr = [...dots]
    newArr[index] = { x, y }

    const next = (index + 1) === 4 ? 0 : index + 1 //find next point's index 
    newArr[next].x = newArr[next].x + (x - old.x)
    newArr[next].y = newArr[next].y + (y - old.y)
    
    setDots(newArr)
  }

  const about = () => {
    alert(`
      Use the mouse to click in 3 points in the screen.

      The application will:
      1. find one fourth point and conect them, drawing so one blue parallelogram in the screen.
      2. present the coordinates of the vertices. 
      3. show the area of the parallelogram in the center of it.
      4. draw one yellow circle centered in the parallelogram's center of mass, the area of the circle will be the same of parallelogram's area.
    
      Now, you can:
      1. reset the application clicking in the reset button and start again.
      2. drag any points and the application will redraw the chapes and recalculate the values (area, radius and coordinates)
    `)
  }

  return (
    <div className="App">
      <header>
        <button onClick={reset}>reset</button>
        <button onClick={about}>about</button>
      </header>
      
      <Stage onClick={handleClick} width={window.innerWidth} height={window.innerHeight}>        
        <Layer>
          {center && (<Paralelogram dots={dots} />)}
          {center && (<CircleWithArea center={center} radius={radius} area={area} />)}
          {dots.map(({ x, y }, i) => (<Point x={x} y={y} onDragMove={handleDragMove(i)} />))}
        </Layer>
      </Stage>
    </div>
  )
}

