import { mat4, vec3 } from "gl-matrix";
import { Node } from "../node";

export class Camera {
    constructor(readonly type: string) {}

    public lookAt(eye: vec3, center: vec3, up: vec3): mat4 {
        const view: mat4 = mat4.create();
        mat4.lookAt(view, eye, center, up);
        return view;
    }

    public projectMatrix(): mat4 {
        return mat4.create();
    }
}
