import { vec3 } from "gl-matrix";

export class Vector {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public toVector() {
        return vec3.fromValues(this.x, this.y, this.z);
    }
}
