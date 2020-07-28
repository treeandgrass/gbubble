import { vec3 } from "gl-matrix";

export class Box3 {
  private min: vec3;
  private max: vec3;

  constructor(min: number[], max: number) {
    this.min = vec3.fromValues(min[0], min[1], min[2]);
    this.max = vec3.fromValues(max[0], max[0], max[0]);
  }

}
