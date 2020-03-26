import model from './model'

describe("model", () => {
  describe("findFourthPoint", () => {
    it("should return null if the array has not exactly 3 points", () => {
      expect(model.findCenterOfParallelogram(null)).toBe(null)
      expect(model.findCenterOfParallelogram(undefined)).toBe(null)
      expect(model.findCenterOfParallelogram(1)).toBe(null)
      expect(model.findCenterOfParallelogram({})).toBe(null)
      expect(model.findFourthPoint([])).toBe(null)
      expect(model.findFourthPoint([{}])).toBe(null)
      expect(model.findFourthPoint([{}, {}])).toBe(null)
      expect(model.findFourthPoint([{}, {}, {}, {}])).toBe(null)
    })

    it("should find the fouth when the parallelogram is a square", () => {
      const p00 = { x: 0, y: 0 }
      const p01 = { x: 0, y: 1 }
      const p10 = { x: 1, y: 0 }
      const p11 = { x: 1, y: 1 }
      expect(model.findFourthPoint([p00, p01, p11])).toStrictEqual(p10)
    })

    it("should find the fouth when the parallelogram is a rectangule", () => {
      const p00 = { x: 0, y: 0 }
      const p02 = { x: 0, y: 2 }
      const p20 = { x: 2, y: 0 }
      const p22 = { x: 2, y: 2 }
      expect(model.findFourthPoint([p00, p02, p22])).toStrictEqual(p20)
    })

    it("should find the fouth when the parallelogram is a losangle", () => {
      const p00 = { x: 0, y: 0 }
      const p11 = { x: 1, y: 1 }
      const p21 = { x: 2, y: 1 }
      const p10 = { x: 1, y: 0 }
      expect(model.findFourthPoint([p00, p11, p21])).toStrictEqual(p10)
    })

  })

  describe("findCenterOfParallelogram", () => {
    it("should return null if the array has not exactly 4 points", () => {
      expect(model.findCenterOfParallelogram(null)).toBe(null)
      expect(model.findCenterOfParallelogram(undefined)).toBe(null)
      expect(model.findCenterOfParallelogram(1)).toBe(null)
      expect(model.findCenterOfParallelogram({})).toBe(null)
      expect(model.findCenterOfParallelogram([])).toBe(null)
      expect(model.findCenterOfParallelogram([{}])).toBe(null)
      expect(model.findCenterOfParallelogram([{}, {}])).toBe(null)
      expect(model.findCenterOfParallelogram([{}, {}, {}])).toBe(null)
      expect(model.findCenterOfParallelogram([{}, {}, {}, {}, {}])).toBe(null)
    })
    it("should fine the center of a square", () => {
      const p1 = { x: 0, y: 0 }
      const p2 = { x: 0, y: 2 }
      const p3 = { x: 2, y: 0 }
      const p4 = { x: 2, y: 2 }
      const result = { x: 1, y: 1 }
      expect(model.findCenterOfParallelogram([p1,p2,p3,p4])).toStrictEqual(result)
    })
    it("should fine the center of a rectangle", () => {
      const p1 = { x: 0, y: 0 }
      const p2 = { x: 0, y: 2 }
      const p3 = { x: 4, y: 0 }
      const p4 = { x: 4, y: 2 }
      const result = { x: 2, y: 1 }
      expect(model.findCenterOfParallelogram([p1,p2,p3,p4])).toStrictEqual(result)
    })
    it("should fine the center of a losangle", () => {
      const p1 = { x: 0, y: 0 }
      const p2 = { x: 1, y: 2 }
      const p3 = { x: 2, y: 2 }
      const p4 = { x: 1, y: 0 }
      const result = { x: 1, y: 1 }
      expect(model.findCenterOfParallelogram([p1,p2,p3,p4])).toStrictEqual(result)
    })
  })

  describe("calculateAreaOfParallelogram", () => {
    it("should return null if the array has not exactly 4 points", () => {
      expect(model.findCenterOfParallelogram(null)).toBe(null)
      expect(model.findCenterOfParallelogram(undefined)).toBe(null)
      expect(model.findCenterOfParallelogram(1)).toBe(null)
      expect(model.findCenterOfParallelogram({})).toBe(null)
      expect(model.calculateAreaOfParallelogram([])).toBe(null)
      expect(model.calculateAreaOfParallelogram([{}])).toBe(null)
      expect(model.calculateAreaOfParallelogram([{}, {}])).toBe(null)
      expect(model.calculateAreaOfParallelogram([{}, {}, {}])).toBe(null)
      expect(model.calculateAreaOfParallelogram([{}, {}, {}, {}, {}])).toBe(null)
    })
    it("should calculate the area of a square", () => {
      const p1 = { x: 0, y: 0 }
      const p2 = { x: 0, y: 1 }
      const p3 = { x: 1, y: 0 }
      const p4 = { x: 1, y: 1 }
      expect(model.calculateAreaOfParallelogram([p1, p2, p3, p4])).toBe(1)
    })

    it("should calculate the area of a rectangule", () => {
      const p1 = { x: 0, y: 0 }
      const p2 = { x: 0, y: 2 }
      const p3 = { x: 2, y: 0 }
      const p4 = { x: 2, y: 2 }
      expect(model.calculateAreaOfParallelogram([p1, p2, p3, p4])).toBe(4)
    })

    it("should  calculate the area of a losangle", () => {
      const p1 = { x: 0, y: 0 }
      const p2 = { x: 1, y: 1 }
      const p3 = { x: 2, y: 1 }
      const p4 = { x: 1, y: 0 }
      expect(model.calculateAreaOfParallelogram([p1, p2, p3, p4])).toBe(1)
    })
  })

  describe("calculateRadius", () => {
    it("should return null if area is not provides", () => {
      expect(model.calculateRadius()).toBe(null)
      expect(model.calculateRadius(null)).toBe(null)
      expect(model.calculateRadius(undefined)).toBe(null)
    })
    it("should find the radius", () => {
      expect(model.calculateRadius(0)).toBe(0)
      expect(model.calculateRadius(Math.PI * 1 * 1)).toBe(1)
      expect(model.calculateRadius(Math.PI * 2 * 2)).toBe(2)
      expect(model.calculateRadius(Math.PI * 3 * 3)).toBe(3)
      expect(model.calculateRadius(Math.PI * Math.PI * Math.PI)).toBe(Math.PI)
    })
  })
})
