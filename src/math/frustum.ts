import { mat4 } from "gl-matrix";
import { Plane } from "./plane";
export class Frustum {
  private p0: Plane;
  private p1: Plane;
  private p2: Plane;
  private p3: Plane;
  private p4: Plane;
  private p5: Plane;
  constructor(p0: Plane, p1: Plane, p2: Plane, p3: Plane, p4: Plane, p5: Plane) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
    this.p5 = p5;
  }

  /**
   * near = m4 + m3
   * far = m4 - m3
   * left =  m4 + m1
   * right = m4 - m1
   * bottom = m4 + m2
   * top = m4 - m2
   */
  public fromMatrix(m: mat4): void {
    const m0 = m[0]; const m1 = m[1]; const m2 = m[2]; const m3 = m[3]; // m1
    const m4 = m[4]; const m5 = m[5]; const  m6 = m[6]; const m7 = m[7]; // m2
    const m8 = m[8]; const m9 = m[9]; const m10 = m[10]; const m11 = m[11];  // m3
    const m12 = m[12]; const m13 = m[13]; const m14 = m[14]; const m15 = m[15]; // m4

    this.p0.setComponent(m[12] + m[8], m[13] + m[9], m[14] + m[10], m[15] + m[11]);
    this.p1.setComponent(m[12] - m[8], m[13] - m[9], m[14] - m[10], m[15] - m[11]);
    this.p2.setComponent(m[12] - m[0], m[13] + m[1], m[14] + m[2], m[15] + m[3]);
    this.p3.setComponent(m[12] - m[0], m[13] - m[1], m[14] - m[2], m[15] - m[3]);
    this.p4.setComponent(m[12] + m[4], m[13] + m[5], m[14] + m[6], m[15] + m[7]);
    this.p5.setComponent(m[12] - m[4], m[13] - m[5], m[14] - m[6], m[15] - m[7]);
  }

}
