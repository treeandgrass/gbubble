import { vec3 } from "gl-matrix";
import { Color } from "../color";
import { Texture } from "../textures";
import { Geometry } from "./Geometry";

interface ISphereConfig {
    loAngleStart?: number;
    laAngleStart?: number;
    laStep?: number;
    loStep?: number;
    radius: number;
    color: Color;
    loLength?: number;
    laLength?: number;
}

export class SphereGeometry extends Geometry {
    private config: ISphereConfig;
    private texture?: Texture;

    constructor(config: ISphereConfig) {
        super();

        this.config = config;

        this.buildGeometry();
    }

    public buildGeometry() {
        const {
            loAngleStart = 0,
            laAngleStart = 0,
            laStep = 32,
            loStep = 32,
            radius,
        } = this.config;

        // clear old data
        const loLength = this.config.loLength !== undefined ? this.config.loLength : Math.PI;
        const laLength  = this.config.laLength !== undefined ? this.config.laLength : Math.PI * 2;

        const grid: number[][] = [];
        let index: number  = 0;
        for (let i = 0; i <=  loStep; i++) {
            const loAngle = loAngleStart + (i / loStep) * Math.PI;

            const y = radius * Math.cos(loAngle);
            const xz = radius * Math.sin(loAngle);

            const vertexsRow: number[] = [];
            for (let j = 0; j <= laStep; j++) {
                const laAngle = laAngleStart + j / laStep * 2 * Math.PI;

                const x = xz * Math.cos(laAngle);
                const z = xz * Math.sin(laAngle);
                this.pushPoint(vec3.fromValues(x, y, z));

                if (this.texture) {
                    this.pushColor(this.texture.interpolateColor(x, y, z));
                } else {
                    this.pushColor(this.config.color);
                }
                vertexsRow.push(index++);
            }
            grid.push(vertexsRow);
        }

        for ( let iy = 0; iy < loStep; iy ++ ) {

          for ( let ix = 0; ix < laStep; ix ++ ) {
            const a = grid[ iy ][ ix + 1 ];
            const b = grid[ iy ][ ix ];
            const c = grid[ iy + 1 ][ ix ];
            const d = grid[ iy + 1 ][ ix + 1 ];
            if ( iy !== 0 || loAngleStart > 0 ) {
              this.pushIndices([a, b, d]);
            }
            if ( iy !==  loStep - 1 || loLength < Math.PI ) {
              this.pushIndices([b, c, d]);
            }
          }
        }
    }
}
