import { vec3 } from "gl-matrix";
import { Geometry } from "./Geometry";

interface ISphereConfig {
    loAngleStart?: number;
    laAngleStart?: number;
    laStepLength?: number;
    loStepLength?: number;
    loAngleEnd?: number;
    laAngleEnd?: number;
    radius: number;
}

export class SphereGeometry extends Geometry {
    private config: ISphereConfig;

    constructor(config: ISphereConfig) {
        super();

        this.config = Object.assign({
            laAngleEnd: 2 *  Math.PI,
            laAngleStart: 0,
            laStepLength: Math.PI / 50,
            loAngleEnd: Math.PI / 2,
            loAngleStart: - Math.PI / 2,
            loStepLength: Math.PI / 100,
        }, config);
    }

    public buildGeometry() {
        const {
            loAngleStart,
            laAngleStart,
            laStepLength,
            loStepLength,
            loAngleEnd,
            laAngleEnd,
            radius,
        } = this.config;

        const laStepCount = (laAngleEnd - laAngleStart) / laStepLength;
        const loStepCount = (loAngleEnd - loAngleStart) / loStepLength;

        for (let i = 0; i <  loStepCount; i++) {
            const loAngle = loAngleStart + i * loStepLength;

            const z = radius * Math.cos(loAngle);
            const xy = radius * Math.sin(loAngle);

            for (let j = 0; j < laStepCount; j++) {
                const laAngle = laAngleStart + j * laStepLength;

                const x = xy * Math.cos(laAngle);
                const y = xy * Math.sin(laAngle);
                this.pushPoint(vec3.fromValues(x, y, z));
            }
        }
    }
}
