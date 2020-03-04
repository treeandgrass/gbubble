import { vec3 } from "gl-matrix";
import { Color } from "../color";
export class Texture {
    public interpolateColor(x: number, y: number, z: number): Color {
        const color = new Color(vec3.fromValues(1.0, 1.0, 1.0));
        return color;
    }
}
