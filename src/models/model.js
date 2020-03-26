const model = {
  findFourthPoint: (points) => {
    if (!points) return null
    if (points.length !== 3) return null
    const [p1, p2, p3] = points
    return ({
      x: p1.x + p3.x - p2.x,
      y: p1.y + p3.y - p2.y
    })
  },

  findCenterOfParallelogram: (points) => {
    if (!points) return null
    if (points.length !== 4) return null
    const [p1, p2, p3, p4] = points
    return ({
        x : (p1.x + p2.x + p3.x + p4.x) / 4,
        y : (p1.y + p2.y + p3.y + p4.y) / 4
    })
  },

  calculateAreaOfParallelogram: (points) => {
    if (!points) return null
    if (points.length !== 4) return null
    const [p1, p2, _, p4] = points
    
    // 𝐴parallelogram=(𝑏1−𝑎1)(𝑑2−𝑎2)−(𝑏2−𝑎2)(𝑑1−𝑎1)
    return Math.abs((p2.x - p1.x) * (p4.y-p1.y) - (p2.y - p1.y) * (p4.x - p1.x))
  },

  calculateRadius: (area) => {
    if (area === undefined || area === null) return null
    return Math.sqrt(area / Math.PI).toFixed(2);
  }
}

export default model