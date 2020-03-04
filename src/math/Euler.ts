import { mat4 } from "gl-matrix";
import { clamp } from "./math";
import { Quaternion } from "./Quaternion";
import { OnChangeCallback } from "./type";

export class Euler {
    public x: number;
    public y: number;
    public z: number;
    public order: string;
    public onChangeCallback: OnChangeCallback;

    constructor(x: number, y: number, z: number, order: string) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.order = order;

        this.onChangeCallback = () => {
            // do nothing
        };
    }

    public setFromRotationMatrix( m: mat4, order: string, update: boolean ) {

        const te = mat4.create();
        mat4.transpose(te, m);
        const m11 = te[ 0 ];
        const m12 = te[ 4 ];
        const m13 = te[ 8 ];
        const m21 = te[ 1 ];
        const m22 = te[ 5 ];
        const m23 = te[ 9 ];
        const m31 = te[ 2 ];
        const m32 = te[ 6 ];
        const m33 = te[ 10 ];

        order = order || this.order;

        if ( order === "XYZ" ) {

            this.y = Math.asin( clamp( m13, - 1, 1 ) );

            if ( Math.abs( m13 ) < 0.99999 ) {

                this.x = Math.atan2( - m23, m33 );
                this.z = Math.atan2( - m12, m11 );

            } else {

                this.x = Math.atan2( m32, m22 );
                this.z = 0;

            }

        } else if ( order === "YXZ" ) {

            this.x = Math.asin( - clamp( m23, - 1, 1 ) );

            if ( Math.abs( m23 ) < 0.99999 ) {

                this.y = Math.atan2( m13, m33 );
                this.z = Math.atan2( m21, m22 );

            } else {

                this.y = Math.atan2( - m31, m11 );
                this.z = 0;

            }

        } else if ( order === "ZXY" ) {

            this.x = Math.asin( clamp( m32, - 1, 1 ) );

            if ( Math.abs( m32 ) < 0.99999 ) {

                this.y = Math.atan2( - m31, m33 );
                this.z = Math.atan2( - m12, m22 );

            } else {

                this.y = 0;
                this.z = Math.atan2( m21, m11 );

            }

        } else if ( order === "ZYX" ) {

            this.y = Math.asin( - clamp( m31, - 1, 1 ) );

            if ( Math.abs( m31 ) < 0.99999 ) {

                this.x = Math.atan2( m32, m33 );
                this.z = Math.atan2( m21, m11 );

            } else {

                this.x = 0;
                this.z = Math.atan2( - m12, m22 );

            }

        } else if ( order === "YZX" ) {

            this.z = Math.asin( clamp( m21, - 1, 1 ) );

            if ( Math.abs( m21 ) < 0.99999 ) {

                this.x = Math.atan2( - m23, m22 );
                this.y = Math.atan2( - m31, m11 );

            } else {

                this.x = 0;
                this.y = Math.atan2( m13, m33 );

            }

        } else if ( order === "XZY" ) {

            this.z = Math.asin( - clamp( m12, - 1, 1 ) );

            if ( Math.abs( m12 ) < 0.99999 ) {

                this.x = Math.atan2( m32, m22 );
                this.y = Math.atan2( m13, m11 );

            } else {

                this.x = Math.atan2( - m23, m33 );
                this.y = 0;

            }

        } else {
            throw new Error(`wrong order: ${order}`);
        }

        this.order = order;

        if ( update !== false ) {
            this.onChangeCallback();
        }

    }

    // public setFromQuaternion( q: Quaternion, order, update ) {

    //     mat4.makeRotationFromQuaternion( q );

    //     return this.setFromRotationMatrix( matrix, order, update );

    // }
}
