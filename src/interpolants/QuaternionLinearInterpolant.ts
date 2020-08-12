import { vec4 } from "gl-matrix";
import { Interpolant } from "../math/Interpolant";
import { slerpFlat } from "../math/Quaternion";

export class QuaternionLinearInterpolant extends Interpolant {
  public inter(i: number, t0: number, t: number, t1: number): Float32Array {
    const offset = i * this.sampleSize;
    const alpha = (t - t0) / (t1 - t0);
    const end = this.sampleSize + offset;
    let result = new Float32Array(4);
    for (let index = offset; index !== end; index += 4 ) {
      const vector: vec4 = slerpFlat(this.samples, index - this.sampleSize, this.samples, index, alpha);
      result = new Float32Array(vector);

    }
    return result;
  }
}
