import { mat4, quat, vec4 } from "gl-matrix";
import { Euler } from "./Euler";


export function setFromRotationMatrix(out: quat, matrix: mat4) {
    const te = mat4.create();

    mat4.transpose(te, matrix);

    const m11 = te[ 0 ];
    const m12 = te[ 4 ];
    const m13 = te[ 8 ];
    const m21 = te[ 1 ];
    const m22 = te[ 5 ];
    const m23 = te[ 9 ];
    const m31 = te[ 2 ];
    const m32 = te[ 6 ];
    const m33 = te[ 10 ];

    const trace = m11 + m22 + m33;

    let x = 0;
    let y = 0;
    let z = 0;
    let w = 0;

    if ( trace > 0 ) {

        const s = 0.5 / Math.sqrt( trace + 1.0 );

        w = 0.25 / s;
        x = ( m32 - m23 ) * s;
        y = ( m13 - m31 ) * s;
        z = ( m21 - m12 ) * s;

    } else if ( m11 > m22 && m11 > m33 ) {

        const s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

        w = ( m32 - m23 ) / s;
        x = 0.25 * s;
        y = ( m12 + m21 ) / s;
        z = ( m13 + m31 ) / s;

    } else if ( m22 > m33 ) {

        const s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

        w = ( m13 - m31 ) / s;
        x = ( m12 + m21 ) / s;
        y = 0.25 * s;
        z = ( m23 + m32 ) / s;

    } else {

        const s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

        w = ( m21 - m12 ) / s;
        x = ( m13 + m31 ) / s;
        y = ( m23 + m32 ) / s;
        z = 0.25 * s;
    }

    // update quat
    out[0] = x;
    out[0] = y;
    out[0] = z;
    out[0] = w;
}


export function setFromEuler(out: quat, euler: Euler) {

    const x = euler.x;
    const y = euler.y;
    const z = euler.z;
    const order = euler.order;

    const cos = Math.cos;
    const sin = Math.sin;

    const c1 = cos( x / 2 );
    const c2 = cos( y / 2 );
    const c3 = cos( z / 2 );

    const s1 = sin( x / 2 );
    const s2 = sin( y / 2 );
    const s3 = sin( z / 2 );

    let outX = 0;
    let outY = 0;
    let outZ = 0;
    let outW = 0;

    if ( order === "XYZ" ) {
        outX = s1 * c2 * c3 + c1 * s2 * s3;
        outY = c1 * s2 * c3 - s1 * c2 * s3;
        outZ = c1 * c2 * s3 + s1 * s2 * c3;
        outW = c1 * c2 * c3 - s1 * s2 * s3;

    } else if ( order === "YXZ" ) {

        outX = s1 * c2 * c3 + c1 * s2 * s3;
        outY = c1 * s2 * c3 - s1 * c2 * s3;
        outZ = c1 * c2 * s3 - s1 * s2 * c3;
        outW = c1 * c2 * c3 + s1 * s2 * s3;

    } else if ( order === "ZXY" ) {

        outX = s1 * c2 * c3 - c1 * s2 * s3;
        outY = c1 * s2 * c3 + s1 * c2 * s3;
        outZ = c1 * c2 * s3 + s1 * s2 * c3;
        outW = c1 * c2 * c3 - s1 * s2 * s3;

    } else if ( order === "ZYX" ) {

        outX = s1 * c2 * c3 - c1 * s2 * s3;
        outY = c1 * s2 * c3 + s1 * c2 * s3;
        outZ = c1 * c2 * s3 - s1 * s2 * c3;
        outW = c1 * c2 * c3 + s1 * s2 * s3;

    } else if ( order === "YZX" ) {

        outX = s1 * c2 * c3 + c1 * s2 * s3;
        outY = c1 * s2 * c3 + s1 * c2 * s3;
        outZ = c1 * c2 * s3 - s1 * s2 * c3;
        outW = c1 * c2 * c3 - s1 * s2 * s3;

    } else if ( order === "XZY" ) {

        outX = s1 * c2 * c3 - c1 * s2 * s3;
        outY = c1 * s2 * c3 - s1 * c2 * s3;
        outZ = c1 * c2 * s3 + s1 * s2 * c3;
        outW = c1 * c2 * c3 + s1 * s2 * s3;

    }
    // update out
    out[0] = outX;
    out[1] = outY;
    out[2] = outZ;
    out[3] = outW;
}

export function slerpFlat(src0: vec4, src1: vec4, t: number): vec4 {
  let x0 = src0[0];
  let y0 = src0[1];
  let z0 = src0[2];
  let w0 = src0[3];

  const x1 = src1[0];
  const y1 = src1[1];
  const z1 = src1[2];
  const w1 = src1[3];

  if (x0 !== x1 || y0 !== y1 || z0 !== z1 || w0 !== w1) {
    const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1;
    const s = 1 - t;

    const direction = cos >= 0 ? 1 : -1;
    const squareSin = 1 - cos * cos;
    let at = t;
    let bt = s;
    if (squareSin > Number.EPSILON) {
      const sin = Math.sqrt(squareSin);
      const angleLength = Math.atan2(sin, direction * cos);
      at = Math.sin(angleLength * t) / sin;
      bt = Math.sin(angleLength * s) / sin;
    }

    const atDir = at * direction;
    x0 = x0 * bt + x1 * atDir;
    y0 = y0 * bt + y1 * atDir;
    z0 = z0 * bt + z1 * atDir;
    w0 = w0 * bt + w1 * atDir;
  }


  return vec4.fromValues(x0, y0, z0, w0);
}

