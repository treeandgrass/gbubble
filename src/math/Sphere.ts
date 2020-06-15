import { vec3 } from "gl-matrix";
import { Plane } from "./Plane";
export class Sphere {
  public center: vec3;
  public radius: number;
  constructor(center: vec3, radius: number) {
    this.center = center;
    this.radius = radius;
  }

  public distanceToPoint(point: vec3): number {
    return vec3.distance(point, this.center) - this.radius;
  }

  /**
   * 判断点是否包含在球内
   */
  public containPoint(point: vec3): boolean {
    const subVector: vec3 = vec3.create();
    vec3.sub(subVector, point, this.center);
    return vec3.dot(subVector, subVector) <= this.radius * this.radius;
  }

  public intersectSphere(sphere: Sphere) {
    const radiusSum: number = sphere.radius + this.radius;
    const subVector: vec3 = vec3.create();
    vec3.sub(subVector, sphere.center, this.center);

    return vec3.dot(subVector, subVector) <= radiusSum * radiusSum;
  }

  public intersectsPlane(plane: Plane): boolean {
    return plane.distanceToPoint(this.center) < this.radius;
  }
}
