import { vec3 } from "gl-matrix";

export class Scale {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number = 1, y: number = 1, z: number = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public toVector() {
        return vec3.fromValues(this.x, this.y, this.z);
    }
}
