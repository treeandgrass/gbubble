import { vec3 } from "gl-matrix";

export type ColorType = string | vec3;

export class Color {
    private color: ColorType;
    constructor(color: ColorType = vec3.fromValues(1.0, 1.0, 1.0)) {
        this.color = color || vec3.fromValues(1.0, 1.0, 1.0);
    }

    public toRGB(): vec3 {
        if (typeof this.color === "string") {
            return vec3.fromValues(1.0, 1.0, 1.0);
        } else {
            return this.color;
        }
    }
}
