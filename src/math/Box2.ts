import { vec2, vec3 } from "gl-matrix";

export class Box2 {
  private min: vec2;
  private max: vec2;
  constructor(min: vec2, max: vec2) {
    this.min = min;
    this.max = max;
  }

  public isEmpty() {
    return this.max[0] < this.min[0] || this.max[1] < this.min[1];
  }

  public getCenter(): vec2 {
    if (this.isEmpty()) {
      return vec2.fromValues(0, 0);
    }
    const out: vec2 = vec2.create();
    vec2.add(out, this.min, this.max);
    vec2.multiply(out, out, [0.5, 0.5]);
    return out;
  }

  public containsPoint(point: vec2): boolean {
    return !(point[0] < this.min[0] || point[0] > this.max[0] || point[1] < this.min[1] || point[1] > this.max[1]);
  }

  public containBox(box: Box2): boolean {
    return box.max[0] < this.max[0] && box.min[0] > this.max[0]
      && box.max[1] < this.max[1] && box.min[1] > this.min[1];
  }

  public intersectBox(box: Box2): boolean {
    return !(box.max[0] < this.min[0] || box.min[0] > this.max[0]
      || box.max[1] < this.min[1] || box.min[1] > this.max[1]);
  }
}
