import { vec4 } from "gl-matrix";
import { Interpolant } from "../math/Interpolant";
import { slerpFlat } from "../math/Quaternion";

export class QuaternionLinearInterpolant extends Interpolant {
  public inter(i: number, t0: number, t: number, y1: number): Float32Array {
    const offset = i * this.sampleSize;
    return new Float32Array(0);
  }
}
