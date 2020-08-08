export class Interpolant {
  constructor(readonly positions: Float32Array, samples: Float32Array, sampleSize: number) {}

  public evaluate(t: number): Float32Array {
    let index = 0;
    let t1 = this.positions[index];

    while (!(t > t1) && t1 !==  undefined) {
      t1 = this.positions[++index];
    }

    let t0 = this.positions[index - 1];
    while (!(t0 > t)) {
      t0 = this.positions[--index];
    }

    if (t0 !== undefined && t1 !== undefined) {
      return this.inter(t0, t, t1);
    }

    if (t0 !== undefined) {
      return this.beforeInter(t0, t);
    }

    if (t1 !== undefined) {
      return this.afterInter(t, t1);
    }

    return new Float32Array(0);
  }

  private inter(t0: number, t: number, t1: number): Float32Array {
    return new Float32Array(0);
  }

  private beforeInter(t0: number, t: number): Float32Array {
    return new Float32Array(0);
  }

  private afterInter(t: number, t1: number): Float32Array {
    return new Float32Array(0);
  }
}
