import { vec3 } from "gl-matrix";
import { Color } from "../color";
import { Texture } from "../textures";
import { Geometry } from "./Geometry";

interface ISphereConfig {
    loAngleStart?: number;
    laAngleStart?: number;
    laStepLength?: number;
    loStepLength?: number;
    loAngleEnd?: number;
    laAngleEnd?: number;
    radius: number;
    color: Color;
}

export class SphereGeometry extends Geometry {
    private config: ISphereConfig;
    private texture?: Texture;

    constructor(config: ISphereConfig) {
        super();

        this.config = config;
    }

    public buildGeometry() {
        const {
            loAngleStart = - Math.PI / 2,
            laAngleStart = 0,
            laStepLength = Math.PI / 50,
            loStepLength = Math.PI / 100,
            loAngleEnd = Math.PI / 2,
            laAngleEnd  = 2 *  Math.PI,
            radius,
        } = this.config;

        const laStepCount = (laAngleEnd - laAngleStart) / laStepLength;
        const loStepCount = (loAngleEnd - loAngleStart) / loStepLength;

        for (let i = 0; i <  loStepCount; i++) {
            const loAngle = loAngleStart + i * loStepLength;

            const y = radius * Math.cos(loAngle);
            const xz = radius * Math.sin(loAngle);

            for (let j = 0; j < laStepCount; j++) {
                const laAngle = laAngleStart + j * laStepLength;

                const x = xz * Math.cos(laAngle);
                const z = xz * Math.sin(laAngle);
                this.pushPoint(vec3.fromValues(x, y, z));

                if (this.texture) {
                    this.pushColor(this.texture.interpolateColor(x, y, z));
                } else {
                    this.pushColor(this.config.color);
                }
            }
        }
    }
}
