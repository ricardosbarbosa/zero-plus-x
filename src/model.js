const model = {
  findFourthPoint: ([p1, p2, p3]) => ({
    x: p1.x + p3.x - p2.x,
    y: p1.y + p3.y - p2.y
  }),

  findCenterOfParallelogram: ([p1, p2, p3, p4]) => ({
      x : (p1.x + p2.x + p3.x + p4.x) / 4,
      y : (p1.y + p2.y + p3.y + p4.y) / 4
  }),

  calculateAreaOfParallelogram: ([ p1, p2, p3, p4]) => Math.abs( p1.x * p2.y - p1.y * p2.x + p2.x * p3.y - p2.y * p3.x + p3.x * p4.y - p3.y * p4.x + p4.x * p1.y - p4.y * p1.x ) / 2,

  calculateRadius: (area) => Math.sqrt(area / Math.PI)
}

export default model