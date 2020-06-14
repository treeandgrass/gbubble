import { vec3 } from "gl-matrix";
export class Plane {
  private normal: vec3;
  private constant: number;
  constructor(x: number, y: number, z: number, w: number) {
    this.normal = vec3.fromValues(x, y, z);
    this.constant = w;
  }

  public setComponent(x: number, y: number, z: number, w: number) {
    vec3.set(this.normal, x, y, z);
    this.constant = w;
  }

  // calculate distance between point to plane
  public distanceToPoint(point: vec3) {
      return vec3.dot(point, this.normal) + this.constant;
  }
}
